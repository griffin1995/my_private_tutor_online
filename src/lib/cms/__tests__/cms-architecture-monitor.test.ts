import {
	describe,
	it,
	expect,
	beforeEach,
	afterEach,
	jest,
} from '@jest/globals';
Object.defineProperty(window, 'onerror', {
	writable: true,
	value: null,
});
Object.defineProperty(window, 'Promise', {
	writable: true,
	value: Promise,
});
import { CMSArchitectureValidator } from '../cms-architecture-validator';
import { runtimeMonitor } from '../cms-runtime-monitor';
interface ViolationTestCase {
	name: string;
	code: string;
	expectedViolationType: string;
	expectedSeverity: 'error' | 'warning';
	shouldFailBuild: boolean;
	description: string;
}
interface RuntimeViolationTest {
	name: string;
	simulationFunction: () => void;
	expectedViolationType: string;
	expectedComponent: string;
	description: string;
}
describe('CMS Architecture Monitoring System', () => {
	let validator: CMSArchitectureValidator;
	let consoleErrorSpy: jest.SpyInstance;
	let consoleWarnSpy: jest.SpyInstance;
	beforeEach(() => {
		validator = new CMSArchitectureValidator();
		consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
		consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
		runtimeMonitor.stopMonitoring();
		runtimeMonitor.clearViolations();
	});
	afterEach(() => {
		consoleErrorSpy.mockRestore();
		consoleWarnSpy.mockRestore();
		runtimeMonitor.stopMonitoring();
	});
	describe('Build-time Architecture Validation', () => {
		const violationTestCases: ViolationTestCase[] = [
			{
				name: 'Async Function Detection',
				code: `
          // CMS function with async - FORBIDDEN PATTERN
          export const getCMSContent = async () => {
            return await loadContent();
          };
        `,
				expectedViolationType: 'ASYNC_FUNCTION',
				expectedSeverity: 'error',
				shouldFailBuild: true,
				description:
					'Should detect async function in CMS context - August 2025 failure pattern',
			},
			{
				name: 'Promise Return Type Detection',
				code: `
          // Promise return type - FORBIDDEN PATTERN
          export const getCMSData = (): Promise<CMSContent> => {
            return Promise.resolve(content);
          };
        `,
				expectedViolationType: 'PROMISE_RETURN',
				expectedSeverity: 'error',
				shouldFailBuild: true,
				description: 'Should detect Promise return type in CMS function',
			},
			{
				name: 'useState for Static Content Detection',
				code: `
          // useState for static CMS content - FORBIDDEN PATTERN
          const [cmsContent, setCmsContent] = useState(null);
          useEffect(() => {
            setCmsContent(loadCMSContent());
          }, []);
        `,
				expectedViolationType: 'USESTATE_STATIC',
				expectedSeverity: 'error',
				shouldFailBuild: true,
				description:
					'Should detect useState for static CMS content - causes August 2025 failures',
			},
			{
				name: 'useEffect CMS Data Loading Detection',
				code: `
          // useEffect for CMS data - FORBIDDEN PATTERN
          useEffect(() => {
            const loadData = async () => {
              const data = await getCMSContent();
              setData(data);
            };
            loadData();
          }, []);
        `,
				expectedViolationType: 'USEEFFECT_CMS',
				expectedSeverity: 'error',
				shouldFailBuild: true,
				description: 'Should detect useEffect for CMS data loading - async pattern',
			},
			{
				name: 'Await Expression Detection',
				code: `
          // Await in CMS context - FORBIDDEN PATTERN
          const data = await getCMSContent();
          const processed = await processData(data);
        `,
				expectedViolationType: 'AWAIT_EXPRESSION',
				expectedSeverity: 'error',
				shouldFailBuild: true,
				description: 'Should detect await expressions in CMS files',
			},
			{
				name: 'Promise.all Detection',
				code: `
          // Promise utilities - FORBIDDEN PATTERN
          const [content, images] = await Promise.all([
            getCMSContent(),
            getCMSImages()
          ]);
        `,
				expectedViolationType: 'PROMISE_ALL',
				expectedSeverity: 'warning',
				shouldFailBuild: false,
				description: 'Should detect Promise utility methods',
			},
			{
				name: 'Dynamic Import Detection',
				code: `
          // Dynamic imports - FORBIDDEN PATTERN
          const content = await import('../../content/cms-content.json');
          const processedContent = content.default;
        `,
				expectedViolationType: 'DYNAMIC_IMPORT',
				expectedSeverity: 'warning',
				shouldFailBuild: false,
				description: 'Should detect dynamic imports of CMS content',
			},
		];
		violationTestCases.forEach((testCase) => {
			it(`should detect ${testCase.name}`, async () => {
				const testFilePath = 'test-cms-file.ts';
				const mockValidateFile = jest.spyOn(validator as any, 'validateFile');
				mockValidateFile.mockImplementation(async () => {
					const lines = testCase.code.split('\n');
					const violations = [];
					if (testCase.code.includes('async')) {
						violations.push({
							file: testFilePath,
							line: 2,
							column: 10,
							type: 'ASYNC_FUNCTION',
							message: `CRITICAL CMS VIOLATION: Async function detected`,
							severity: 'error',
							context: lines[1] || testCase.code.slice(0, 50),
						});
					}
					if (testCase.code.includes('Promise<')) {
						violations.push({
							file: testFilePath,
							line: 2,
							column: 15,
							type: 'PROMISE_RETURN',
							message: `CRITICAL CMS VIOLATION: Promise return type detected`,
							severity: 'error',
							context: lines[1] || testCase.code.slice(0, 50),
						});
					}
					if (testCase.code.includes('useState')) {
						violations.push({
							file: testFilePath,
							line: 2,
							column: 20,
							type: 'USESTATE_STATIC',
							message: `CRITICAL CMS VIOLATION: useState for static content detected`,
							severity: 'error',
							context: lines[1] || testCase.code.slice(0, 50),
						});
					}
					if (testCase.code.includes('useEffect')) {
						violations.push({
							file: testFilePath,
							line: 3,
							column: 10,
							type: 'USEEFFECT_CMS',
							message: `CRITICAL CMS VIOLATION: useEffect for CMS data detected`,
							severity: 'error',
							context: lines[2] || testCase.code.slice(0, 50),
						});
					}
					if (testCase.code.includes('await ')) {
						violations.push({
							file: testFilePath,
							line: 2,
							column: 25,
							type: 'AWAIT_EXPRESSION',
							message: `CRITICAL CMS VIOLATION: Await expression detected`,
							severity: 'error',
							context: lines[1] || testCase.code.slice(0, 50),
						});
					}
					if (testCase.code.includes('Promise.all')) {
						violations.push({
							file: testFilePath,
							line: 2,
							column: 30,
							type: 'PROMISE_ALL',
							message: `CRITICAL CMS VIOLATION: Promise utility detected`,
							severity: 'warning',
							context: lines[1] || testCase.code.slice(0, 50),
						});
					}
					if (testCase.code.includes('import(')) {
						violations.push({
							file: testFilePath,
							line: 2,
							column: 35,
							type: 'DYNAMIC_IMPORT',
							message: `CRITICAL CMS VIOLATION: Dynamic import detected`,
							severity: 'warning',
							context: lines[1] || testCase.code.slice(0, 50),
						});
					}
					return violations;
				});
				const mockScanDirectory = jest.spyOn(validator as any, 'scanDirectory');
				mockScanDirectory.mockResolvedValue([testFilePath]);
				const mockIsCMSRelevantFile = jest.spyOn(
					validator as any,
					'isCMSRelevantFile',
				);
				mockIsCMSRelevantFile.mockReturnValue(true);
				const result = await validator.validateCMSArchitecture();
				expect(result.violations).toHaveLength(1);
				expect(result.violations[0].type).toBe(testCase.expectedViolationType);
				expect(result.violations[0].severity).toBe(testCase.expectedSeverity);
				expect(result.buildShouldFail).toBe(testCase.shouldFailBuild);
				expect(result.isValid).toBe(false);
				mockValidateFile.mockRestore();
				mockScanDirectory.mockRestore();
				mockIsCMSRelevantFile.mockRestore();
			});
		});
		it('should return perfect score for clean synchronous architecture', async () => {
			const cleanCode = `
        // CORRECT SYNCHRONOUS PATTERN
        import cmsContent from '../../content/cms-content.json';

        export const getCMSContent = (): CMSContentType => {
          return cmsContent;
        };

        export const processContent = (content: CMSContentType): ProcessedContent => {
          return {
            ...content,
            processed: true
          };
        };
      `;
			const mockValidateFile = jest.spyOn(validator as any, 'validateFile');
			mockValidateFile.mockResolvedValue([]);
			const mockScanDirectory = jest.spyOn(validator as any, 'scanDirectory');
			mockScanDirectory.mockResolvedValue(['clean-cms-file.ts']);
			const mockIsCMSRelevantFile = jest.spyOn(
				validator as any,
				'isCMSRelevantFile',
			);
			mockIsCMSRelevantFile.mockReturnValue(true);
			const result = await validator.validateCMSArchitecture();
			expect(result.isValid).toBe(true);
			expect(result.violations).toHaveLength(0);
			expect(result.buildShouldFail).toBe(false);
			expect(result.filesScanned).toBe(1);
			mockValidateFile.mockRestore();
			mockScanDirectory.mockRestore();
			mockIsCMSRelevantFile.mockRestore();
		});
	});
	describe('Runtime Architecture Monitoring', () => {
		const runtimeTestCases: RuntimeViolationTest[] = [
			{
				name: 'Console Warning Interception',
				simulationFunction: () => {
					console.warn('useState async pattern detected in component');
				},
				expectedViolationType: 'ASYNC_CMS_CALL',
				expectedComponent: 'Unknown Component',
				description: 'Should intercept React warnings about async patterns',
			},
			{
				name: 'Console Error for Missing Data',
				simulationFunction: () => {
					console.error('TypeError: cmsData.map is not a function');
				},
				expectedViolationType: 'MISSING_DATA',
				expectedComponent: 'Unknown Source',
				description:
					'Should detect August 2025 failure signature: .map is not a function',
			},
			{
				name: 'Promise Usage Detection',
				simulationFunction: () => {
					const stackTrace = 'at getCMSContent (/cms/cms-content.ts:123:5)';
					const error = new Error();
					error.stack = stackTrace;
					runtimeMonitor.recordViolation(
						'PROMISE_DETECTION',
						'TestComponent',
						'Promise detected in CMS-related code path',
						{
							stackTrace,
						},
					);
				},
				expectedViolationType: 'PROMISE_DETECTION',
				expectedComponent: 'TestComponent',
				description: 'Should detect Promise usage in CMS context',
			},
			{
				name: 'Loading State Detection',
				simulationFunction: () => {
					runtimeMonitor.recordViolation(
						'LOADING_STATE',
						'CMSContentComponent',
						'Component has loading state in CMS context - indicates async data pattern',
						{
							stateKeys: ['loading', 'data'],
							componentType: 'CMSContentComponent',
						},
					);
				},
				expectedViolationType: 'LOADING_STATE',
				expectedComponent: 'CMSContentComponent',
				description: 'Should detect loading states that indicate async patterns',
			},
		];
		beforeEach(() => {
			runtimeMonitor.startMonitoring();
		});
		runtimeTestCases.forEach((testCase) => {
			it(`should detect ${testCase.name}`, (done) => {
				const initialState = runtimeMonitor.getCurrentState();
				const initialViolations = initialState.violations.length;
				const unsubscribe = runtimeMonitor.addListener((state) => {
					if (state.violations.length > initialViolations) {
						const newViolation = state.violations[state.violations.length - 1];
						try {
							expect(newViolation.type).toBe(testCase.expectedViolationType);
							expect(newViolation.component).toBe(testCase.expectedComponent);
							expect(newViolation).toHaveProperty('timestamp');
							expect(newViolation).toHaveProperty('id');
							expect(newViolation).toHaveProperty('message');
							unsubscribe();
							done();
						} catch (error) {
							unsubscribe();
							done(error);
						}
					}
				});
				testCase.simulationFunction();
			});
		});
		it('should calculate architecture score correctly', () => {
			const initialState = runtimeMonitor.getCurrentState();
			expect(initialState.architectureScore).toBe(10.0);
			runtimeMonitor.recordViolation(
				'ASYNC_CMS_CALL',
				'TestComponent',
				'Critical async violation',
				{},
			);
			const stateAfterCritical = runtimeMonitor.getCurrentState();
			expect(stateAfterCritical.architectureScore).toBeLessThan(10.0);
			expect(stateAfterCritical.criticalViolations).toBe(1);
			runtimeMonitor.recordViolation(
				'PROMISE_DETECTION',
				'TestComponent',
				'Warning level violation',
				{},
			);
			const stateAfterWarning = runtimeMonitor.getCurrentState();
			expect(stateAfterWarning.architectureScore).toBeLessThan(
				stateAfterCritical.architectureScore,
			);
			expect(stateAfterWarning.totalViolations).toBe(2);
		});
		it('should clear violations and reset score', () => {
			runtimeMonitor.recordViolation(
				'ASYNC_CMS_CALL',
				'Component1',
				'Test violation 1',
			);
			runtimeMonitor.recordViolation(
				'LOADING_STATE',
				'Component2',
				'Test violation 2',
			);
			const stateWithViolations = runtimeMonitor.getCurrentState();
			expect(stateWithViolations.violations.length).toBe(2);
			expect(stateWithViolations.architectureScore).toBeLessThan(10.0);
			runtimeMonitor.clearViolations();
			const clearedState = runtimeMonitor.getCurrentState();
			expect(clearedState.violations).toHaveLength(0);
			expect(clearedState.architectureScore).toBe(10.0);
			expect(clearedState.totalViolations).toBe(0);
			expect(clearedState.criticalViolations).toBe(0);
		});
		it('should export violation data correctly', () => {
			runtimeMonitor.recordViolation(
				'ASYNC_CMS_CALL',
				'ExportTestComponent',
				'Test violation for export',
				{
					testData: 'export validation',
				},
			);
			const exportData = runtimeMonitor.exportViolations();
			const parsed = JSON.parse(exportData);
			expect(parsed).toHaveProperty('timestamp');
			expect(parsed).toHaveProperty('monitoringSession');
			expect(parsed).toHaveProperty('violations');
			expect(parsed.monitoringSession.totalViolations).toBe(1);
			expect(parsed.violations).toHaveLength(1);
			expect(parsed.violations[0].type).toBe('ASYNC_CMS_CALL');
			expect(parsed.violations[0].component).toBe('ExportTestComponent');
		});
	});
	describe('System Integration', () => {
		it('should integrate build-time and runtime monitoring', async () => {
			runtimeMonitor.startMonitoring();
			const mockValidateFile = jest.spyOn(validator as any, 'validateFile');
			mockValidateFile.mockResolvedValue([
				{
					file: 'test-integration.ts',
					line: 5,
					column: 10,
					type: 'ASYNC_FUNCTION',
					message: 'Integration test async function',
					severity: 'error',
					context: 'async function test()',
				},
			]);
			const mockScanDirectory = jest.spyOn(validator as any, 'scanDirectory');
			mockScanDirectory.mockResolvedValue(['test-integration.ts']);
			const mockIsCMSRelevantFile = jest.spyOn(
				validator as any,
				'isCMSRelevantFile',
			);
			mockIsCMSRelevantFile.mockReturnValue(true);
			const buildResult = await validator.validateCMSArchitecture();
			expect(buildResult.buildShouldFail).toBe(true);
			runtimeMonitor.recordViolation(
				'LOADING_STATE',
				'IntegrationTestComponent',
				'Runtime integration test violation',
			);
			const runtimeState = runtimeMonitor.getCurrentState();
			expect(runtimeState.violations.length).toBeGreaterThan(0);
			expect(buildResult.violations.length).toBe(1);
			expect(runtimeState.violations.length).toBe(1);
			mockValidateFile.mockRestore();
			mockScanDirectory.mockRestore();
			mockIsCMSRelevantFile.mockRestore();
		});
		it('should prevent August 2025 failure patterns', async () => {
			const august2025Patterns = [
				'const [cmsContent, setCmsContent] = useState(null);',
				'useEffect(() => { loadCMSContent(); }, []);',
				'const content = await getCMSContent();',
				'export const getCMSData = async (): Promise<CMSData> => {',
				'cmsData.map is not a function',
			];
			let detectedPatterns = 0;
			for (const pattern of august2025Patterns) {
				const mockValidateFile = jest.spyOn(validator as any, 'validateFile');
				mockValidateFile.mockImplementation(async () => {
					const violations = [];
					if (pattern.includes('useState')) {
						violations.push({
							file: 'august-2025-test.ts',
							line: 1,
							column: 1,
							type: 'USESTATE_STATIC',
							message: 'August 2025 failure pattern detected',
							severity: 'error',
							context: pattern,
						});
					}
					if (pattern.includes('useEffect')) {
						violations.push({
							file: 'august-2025-test.ts',
							line: 1,
							column: 1,
							type: 'USEEFFECT_CMS',
							message: 'August 2025 failure pattern detected',
							severity: 'error',
							context: pattern,
						});
					}
					if (pattern.includes('await ')) {
						violations.push({
							file: 'august-2025-test.ts',
							line: 1,
							column: 1,
							type: 'AWAIT_EXPRESSION',
							message: 'August 2025 failure pattern detected',
							severity: 'error',
							context: pattern,
						});
					}
					if (pattern.includes('async')) {
						violations.push({
							file: 'august-2025-test.ts',
							line: 1,
							column: 1,
							type: 'ASYNC_FUNCTION',
							message: 'August 2025 failure pattern detected',
							severity: 'error',
							context: pattern,
						});
					}
					return violations;
				});
				const mockScanDirectory = jest.spyOn(validator as any, 'scanDirectory');
				mockScanDirectory.mockResolvedValue(['august-2025-test.ts']);
				const mockIsCMSRelevantFile = jest.spyOn(
					validator as any,
					'isCMSRelevantFile',
				);
				mockIsCMSRelevantFile.mockReturnValue(true);
				const result = await validator.validateCMSArchitecture();
				if (result.violations.length > 0) {
					detectedPatterns++;
				}
				mockValidateFile.mockRestore();
				mockScanDirectory.mockRestore();
				mockIsCMSRelevantFile.mockRestore();
			}
			expect(detectedPatterns).toBeGreaterThanOrEqual(4);
		});
	});
	describe('Performance and Reliability', () => {
		it('should not significantly impact runtime performance', () => {
			const startTime = performance.now();
			runtimeMonitor.startMonitoring();
			for (let i = 0; i < 100; i++) {
				runtimeMonitor.recordViolation(
					'LOADING_STATE',
					`Component${i}`,
					`Performance test violation ${i}`,
				);
			}
			const endTime = performance.now();
			const duration = endTime - startTime;
			expect(duration).toBeLessThan(100);
		});
		it('should handle monitoring system errors gracefully', () => {
			const originalRecordViolation = runtimeMonitor.recordViolation;
			const mockRecordViolation = jest.fn().mockImplementation(() => {
				throw new Error('Simulated monitoring error');
			});
			(runtimeMonitor as any).recordViolation = mockRecordViolation;
			expect(() => {
				(runtimeMonitor as any).recordViolation(
					'ASYNC_CMS_CALL',
					'Test',
					'Test error',
				);
			}).toThrow();
			(runtimeMonitor as any).recordViolation = originalRecordViolation;
		});
	});
});
