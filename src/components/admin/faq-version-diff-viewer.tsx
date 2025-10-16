'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
	useVersionControlStore,
	DiffEngine,
} from '../../lib/faq-version-control/version-manager';
import type {
	FAQVersion,
	VersionComparisonResult,
	VersionComparisonRequest,
	DiffOperation,
} from '../../types/faq-version-control';
interface FAQVersionDiffViewerProps {
	readonly baseVersionId: string;
	readonly targetVersionId: string;
	readonly className?: string;
	readonly defaultView?: 'side-by-side' | 'inline' | 'unified';
	readonly showLineNumbers?: boolean;
	readonly highlightSyntax?: boolean;
	readonly contextLines?: number;
	readonly onClose?: () => void;
}
type DiffViewMode = 'side-by-side' | 'inline' | 'unified' | 'split';
export const FAQVersionDiffViewer: React.FC<FAQVersionDiffViewerProps> = ({
	baseVersionId,
	targetVersionId,
	className = '',
	defaultView = 'side-by-side',
	showLineNumbers = true,
	highlightSyntax = true,
	contextLines = 3,
	onClose,
}) => {
	const [viewMode, setViewMode] = useState<DiffViewMode>(defaultView);
	const [comparison, setComparison] = useState<VersionComparisonResult | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedChange, setSelectedChange] = useState<number>(-1);
	const [showMetadata, setShowMetadata] = useState(false);
	const [wrapLines, setWrapLines] = useState(false);
	const leftPaneRef = useRef<HTMLDivElement>(null);
	const rightPaneRef = useRef<HTMLDivElement>(null);
	const unifiedPaneRef = useRef<HTMLDivElement>(null);
	const store = useVersionControlStore();
	useEffect(() => {
		loadComparison();
	}, [baseVersionId, targetVersionId, contextLines, highlightSyntax]);
	const loadComparison = async () => {
		if (!baseVersionId || !targetVersionId) {
			setError('Invalid version IDs provided');
			setLoading(false);
			return;
		}
		try {
			setLoading(true);
			setError(null);
			const request: VersionComparisonRequest = {
				baseVersionId,
				targetVersionId,
				compareOptions: {
					includeMetadata: true,
					contextLines,
					ignoreWhitespace: false,
					highlightSyntax,
				},
			};
			const result = await store.compareVersions(request);
			setComparison(result);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to load comparison');
			console.error('Failed to load version comparison:', err);
		} finally {
			setLoading(false);
		}
	};
	const diffStats = useMemo(() => {
		if (!comparison) return null;
		return {
			totalChanges: comparison.statistics.totalChanges,
			additions: comparison.statistics.additionsCount,
			deletions: comparison.statistics.deletionsCount,
			modifications: comparison.statistics.modificationsCount,
			changePercentage: comparison.statistics.changePercentage.toFixed(1),
		};
	}, [comparison]);
	const changeNavigationItems = useMemo(() => {
		if (!comparison) return [];
		return comparison.diff.operations
			.map((op, index) => ({
				index,
				type: op.type,
				lineNumber: op.lineNumber || 1,
				preview: op.text.substring(0, 50) + (op.text.length > 50 ? '...' : ''),
			}))
			.filter((item) => item.type !== 'equal');
	}, [comparison]);
	const handleViewModeChange = (mode: DiffViewMode) => {
		setViewMode(mode);
		setSelectedChange(-1);
	};
	const handleChangeNavigation = (changeIndex: number) => {
		setSelectedChange(changeIndex);
		if (viewMode === 'side-by-side' || viewMode === 'split') {
			scrollToChange(changeIndex, 'side-by-side');
		} else {
			scrollToChange(changeIndex, 'unified');
		}
	};
	const scrollToChange = (
		changeIndex: number,
		displayMode: 'side-by-side' | 'unified',
	) => {
		const change = changeNavigationItems[changeIndex];
		if (!change) return;
		if (displayMode === 'side-by-side') {
			const leftElement = leftPaneRef.current?.querySelector(
				`[data-line="${change.lineNumber}"]`,
			);
			const rightElement = rightPaneRef.current?.querySelector(
				`[data-line="${change.lineNumber}"]`,
			);
			leftElement?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
			rightElement?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		} else {
			const unifiedElement = unifiedPaneRef.current?.querySelector(
				`[data-change="${changeIndex}"]`,
			);
			unifiedElement?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};
	const exportDiff = () => {
		if (!comparison) return;
		const diffContent = `
# FAQ Version Comparison Report
Generated: ${new Date().toISOString()}

## Version Information
- Base Version: ${comparison.baseVersion.versionString} (${comparison.baseVersion.id})
- Target Version: ${comparison.targetVersion.versionString} (${comparison.targetVersion.id})

## Statistics
- Total Changes: ${diffStats?.totalChanges}
- Additions: +${diffStats?.additions}
- Deletions: -${diffStats?.deletions}
- Modifications: ~${diffStats?.modifications}
- Change Percentage: ${diffStats?.changePercentage}%

## Diff Content
${comparison.visualDiff.inlineDiff}
`;
		const blob = new Blob([diffContent], {
			type: 'text/plain',
		});
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `faq-diff-${comparison.baseVersion.versionString}-to-${comparison.targetVersion.versionString}.txt`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};
	if (loading) {
		return (
			<div className={`flex items-center justify-center h-96 ${className}`}>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4'></div>
					<p className='text-gray-600'>Loading version comparison...</p>
				</div>
			</div>
		);
	}
	if (error) {
		return (
			<div className={`flex items-center justify-center h-96 ${className}`}>
				<div className='text-center'>
					<div className='text-red-600 text-xl mb-2'>⚠️</div>
					<p className='text-red-600 font-medium'>Error loading comparison</p>
					<p className='text-gray-600 text-sm mt-1'>{error}</p>
					<button
						onClick={loadComparison}
						className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'>
						Retry
					</button>
				</div>
			</div>
		);
	}
	if (!comparison) {
		return (
			<div className={`flex items-center justify-center h-96 ${className}`}>
				<p className='text-gray-600'>No comparison data available</p>
			</div>
		);
	}
	return (
		<div className={`bg-white border rounded-lg shadow-lg ${className}`}>
			{}
			<div className='px-6 py-4 border-b border-gray-200'>
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='text-xl font-semibold text-gray-900'>
							Version Comparison
						</h2>
						<div className='flex items-center space-x-4 text-sm text-gray-600 mt-1'>
							<span>
								<span className='font-medium'>Base:</span> v
								{comparison.baseVersion.versionString}
							</span>
							<span>•</span>
							<span>
								<span className='font-medium'>Target:</span> v
								{comparison.targetVersion.versionString}
							</span>
							{diffStats && (
								<>
									<span>•</span>
									<span className='text-green-600'>+{diffStats.additions}</span>
									<span className='text-red-600'>-{diffStats.deletions}</span>
									<span>({diffStats.changePercentage}% changed)</span>
								</>
							)}
						</div>
					</div>

					<div className='flex items-center space-x-3'>
						{onClose && (
							<button
								onClick={onClose}
								className='p-2 text-gray-400 hover:text-gray-600 transition-colors'
								aria-label='Close comparison'>
								<svg
									className='w-5 h-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						)}
					</div>
				</div>

				{}
				<div className='flex items-center justify-between mt-4'>
					<div className='flex items-center space-x-4'>
						{}
						<div className='flex bg-gray-100 rounded-lg p-1'>
							{[
								{
									id: 'side-by-side',
									label: 'Side by Side',
									icon: '⚌',
								},
								{
									id: 'inline',
									label: 'Inline',
									icon: '☰',
								},
								{
									id: 'unified',
									label: 'Unified',
									icon: '═',
								},
							].map((mode) => (
								<button
									key={mode.id}
									onClick={() => handleViewModeChange(mode.id as DiffViewMode)}
									className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${viewMode === mode.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
									<span className='mr-1'>{mode.icon}</span>
									{mode.label}
								</button>
							))}
						</div>

						{}
						<div className='flex items-center space-x-3 text-sm'>
							<label className='flex items-center space-x-2'>
								<input
									type='checkbox'
									checked={showLineNumbers}
									onChange={(e) => setShowLineNumbers(e.target.checked)}
									className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
								/>
								<span className='text-gray-700'>Line numbers</span>
							</label>

							<label className='flex items-center space-x-2'>
								<input
									type='checkbox'
									checked={wrapLines}
									onChange={(e) => setWrapLines(e.target.checked)}
									className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
								/>
								<span className='text-gray-700'>Wrap lines</span>
							</label>

							<label className='flex items-center space-x-2'>
								<input
									type='checkbox'
									checked={showMetadata}
									onChange={(e) => setShowMetadata(e.target.checked)}
									className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
								/>
								<span className='text-gray-700'>Show metadata</span>
							</label>
						</div>
					</div>

					<div className='flex items-center space-x-2'>
						<button
							onClick={exportDiff}
							className='px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors'>
							Export Diff
						</button>
					</div>
				</div>
			</div>

			{}
			{showMetadata && (
				<div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<VersionMetadataPanel
							title='Base Version'
							version={comparison.baseVersion}
						/>
						<VersionMetadataPanel
							title='Target Version'
							version={comparison.targetVersion}
						/>
					</div>
				</div>
			)}

			<div className='flex h-96'>
				{}
				{changeNavigationItems.length > 0 && (
					<div className='w-64 border-r border-gray-200 bg-gray-50'>
						<div className='px-4 py-3 border-b border-gray-200'>
							<h3 className='text-sm font-medium text-gray-900'>
								Changes ({changeNavigationItems.length})
							</h3>
						</div>

						<div className='overflow-y-auto h-full'>
							{changeNavigationItems.map((change, index) => (
								<button
									key={index}
									onClick={() => handleChangeNavigation(index)}
									className={`w-full text-left px-4 py-2 text-sm border-b border-gray-200 transition-colors ${selectedChange === index ? 'bg-blue-100 border-blue-200' : 'hover:bg-gray-100'}`}>
									<div className='flex items-center space-x-2'>
										<span
											className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getChangeTypeBadgeStyle(change.type)}`}>
											{getChangeTypeSymbol(change.type)}
										</span>
										<span className='text-gray-600'>Line {change.lineNumber}</span>
									</div>
									<p className='mt-1 text-gray-700 truncate'>{change.preview}</p>
								</button>
							))}
						</div>
					</div>
				)}

				{}
				<div className='flex-1 overflow-hidden'>
					{viewMode === 'side-by-side' && (
						<SideBySideDiffView
							comparison={comparison}
							showLineNumbers={showLineNumbers}
							wrapLines={wrapLines}
							leftPaneRef={leftPaneRef}
							rightPaneRef={rightPaneRef}
							selectedChange={selectedChange}
						/>
					)}

					{viewMode === 'inline' && (
						<InlineDiffView
							comparison={comparison}
							showLineNumbers={showLineNumbers}
							wrapLines={wrapLines}
							selectedChange={selectedChange}
						/>
					)}

					{viewMode === 'unified' && (
						<UnifiedDiffView
							comparison={comparison}
							showLineNumbers={showLineNumbers}
							wrapLines={wrapLines}
							unifiedPaneRef={unifiedPaneRef}
							selectedChange={selectedChange}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
interface VersionMetadataPanelProps {
	readonly title: string;
	readonly version: FAQVersion;
}
const VersionMetadataPanel: React.FC<VersionMetadataPanelProps> = ({
	title,
	version,
}) => (
	<div>
		<h4 className='text-sm font-medium text-gray-900 mb-2'>{title}</h4>
		<dl className='grid grid-cols-2 gap-2 text-xs'>
			<dt className='text-gray-600'>Version:</dt>
			<dd className='font-mono'>{version.versionString}</dd>

			<dt className='text-gray-600'>Author:</dt>
			<dd>{version.metadata.author}</dd>

			<dt className='text-gray-600'>Date:</dt>
			<dd>{new Date(version.metadata.timestamp).toLocaleString('en-GB')}</dd>

			<dt className='text-gray-600'>Change Type:</dt>
			<dd>
				<span
					className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getChangeTypeBadgeStyle(version.metadata.changeType)}`}>
					{version.metadata.changeType}
				</span>
			</dd>

			<dt className='text-gray-600 col-span-2'>Reason:</dt>
			<dd className='col-span-2 text-gray-800'>{version.metadata.changeReason}</dd>
		</dl>
	</div>
);
interface SideBySideDiffViewProps {
	readonly comparison: VersionComparisonResult;
	readonly showLineNumbers: boolean;
	readonly wrapLines: boolean;
	readonly leftPaneRef: React.RefObject<HTMLDivElement>;
	readonly rightPaneRef: React.RefObject<HTMLDivElement>;
	readonly selectedChange: number;
}
const SideBySideDiffView: React.FC<SideBySideDiffViewProps> = ({
	comparison,
	showLineNumbers,
	wrapLines,
	leftPaneRef,
	rightPaneRef,
	selectedChange,
}) => (
	<div className='flex h-full'>
		<div className='flex-1 border-r border-gray-200'>
			<div className='px-3 py-2 bg-red-50 border-b border-gray-200 text-sm font-medium text-red-800'>
				Base Version ({comparison.baseVersion.versionString})
			</div>
			<div
				ref={leftPaneRef}
				className={`overflow-auto h-full font-mono text-sm ${wrapLines ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}
				style={{
					fontSize: '13px',
					lineHeight: '1.5',
				}}>
				<div
					className='p-4'
					dangerouslySetInnerHTML={{
						__html: comparison.visualDiff.sideBySideDiff.leftColumn,
					}}
				/>
			</div>
		</div>

		<div className='flex-1'>
			<div className='px-3 py-2 bg-green-50 border-b border-gray-200 text-sm font-medium text-green-800'>
				Target Version ({comparison.targetVersion.versionString})
			</div>
			<div
				ref={rightPaneRef}
				className={`overflow-auto h-full font-mono text-sm ${wrapLines ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}
				style={{
					fontSize: '13px',
					lineHeight: '1.5',
				}}>
				<div
					className='p-4'
					dangerouslySetInnerHTML={{
						__html: comparison.visualDiff.sideBySideDiff.rightColumn,
					}}
				/>
			</div>
		</div>
	</div>
);
interface InlineDiffViewProps {
	readonly comparison: VersionComparisonResult;
	readonly showLineNumbers: boolean;
	readonly wrapLines: boolean;
	readonly selectedChange: number;
}
const InlineDiffView: React.FC<InlineDiffViewProps> = ({
	comparison,
	showLineNumbers,
	wrapLines,
	selectedChange,
}) => (
	<div className='h-full overflow-auto'>
		<div className='px-3 py-2 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-800'>
			Inline Diff View
		</div>
		<div
			className={`p-4 font-mono text-sm ${wrapLines ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}
			style={{
				fontSize: '13px',
				lineHeight: '1.5',
			}}
			dangerouslySetInnerHTML={{
				__html: comparison.visualDiff.htmlDiff,
			}}
		/>
	</div>
);
interface UnifiedDiffViewProps {
	readonly comparison: VersionComparisonResult;
	readonly showLineNumbers: boolean;
	readonly wrapLines: boolean;
	readonly unifiedPaneRef: React.RefObject<HTMLDivElement>;
	readonly selectedChange: number;
}
const UnifiedDiffView: React.FC<UnifiedDiffViewProps> = ({
	comparison,
	showLineNumbers,
	wrapLines,
	unifiedPaneRef,
	selectedChange,
}) => (
	<div className='h-full overflow-auto'>
		<div className='px-3 py-2 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-800'>
			Unified Diff View
		</div>
		<div
			ref={unifiedPaneRef}
			className={`p-4 font-mono text-sm bg-gray-900 text-gray-100 ${wrapLines ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}
			style={{
				fontSize: '13px',
				lineHeight: '1.5',
			}}>
			<pre className='text-gray-100'>{comparison.visualDiff.inlineDiff}</pre>
		</div>
	</div>
);
const getChangeTypeBadgeStyle = (changeType: string): string => {
	switch (changeType) {
		case 'insert':
			return 'bg-green-100 text-green-800';
		case 'delete':
			return 'bg-red-100 text-red-800';
		case 'replace':
			return 'bg-blue-100 text-blue-800';
		case 'major':
			return 'bg-red-100 text-red-800';
		case 'minor':
			return 'bg-yellow-100 text-yellow-800';
		case 'patch':
			return 'bg-green-100 text-green-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};
const getChangeTypeSymbol = (changeType: string): string => {
	switch (changeType) {
		case 'insert':
			return '+';
		case 'delete':
			return '-';
		case 'replace':
			return '~';
		case 'equal':
			return '=';
		default:
			return '•';
	}
};
export default FAQVersionDiffViewer;
