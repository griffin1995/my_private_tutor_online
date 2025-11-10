'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import { useDropzone } from 'react-dropzone';
import { m, AnimatePresence } from 'framer-motion';
import {
	Upload,
	ImageIcon,
	Scan,
	Search,
	AlertCircle,
	CheckCircle,
	X,
	Eye,
	Zap,
	Target,
	Sparkles,
	Camera,
	FileImage,
	Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { FAQQuestion, FAQCategory } from '@/lib/cms/cms-content';
interface FAQVisualSearchProps {
	questions: FAQQuestion[];
	categories: FAQCategory[];
	onSearchResults: (results: VisualSearchResult[]) => void;
	onOCRText?: (text: string) => void;
	className?: string;
	maxFileSize?: number;
	supportedFormats?: string[];
	placeholder?: string;
	confidenceThreshold?: number;
}
interface VisualSearchResult {
	question: FAQQuestion;
	category?: FAQCategory;
	matchScore: number;
	matchType: 'text' | 'visual' | 'keyword' | 'semantic';
	extractedText?: string;
	highlightedTerms: string[];
}
interface OCRState {
	isProcessing: boolean;
	progress: number;
	stage: 'upload' | 'preprocessing' | 'ocr' | 'matching' | 'complete' | 'error';
	error?: string;
	extractedText?: string;
	processingTime?: number;
}
const OCR_CONFIG = {
	languages: ['eng'],
	options: {
		tessedit_pageseg_mode: '6',
		tessedit_char_whitelist:
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?:;-_()[]{}"\'/\\@#$%^&*+=<>|~`',
		preserve_interword_spaces: '1',
	},
};
export function FAQVisualSearch({
	questions,
	categories,
	onSearchResults,
	onOCRText,
	className,
	maxFileSize = 5 * 1024 * 1024,
	supportedFormats = [
		'image/png',
		'image/jpeg',
		'image/jpg',
		'image/webp',
		'image/bmp',
	],
	placeholder = 'Upload a screenshot of your issue for instant FAQ matching...',
	confidenceThreshold = 0.3,
}: FAQVisualSearchProps) {
	const [ocrState, setOcrState] = useState<OCRState>({
		isProcessing: false,
		progress: 0,
		stage: 'upload',
	});
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);
	const [searchResults, setSearchResults] = useState<VisualSearchResult[]>([]);
	const [showResults, setShowResults] = useState(false);
	const workerRef = useRef<Awaited<ReturnType<typeof createWorker>> | null>(
		null,
	);
	const processingStartTime = useRef<number>(0);
	useEffect(() => {
		return () => {
			if (workerRef.current) {
				workerRef.current.terminate();
				workerRef.current = null;
			}
			previewUrls.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [previewUrls]);
	const initializeWorker = useCallback(async () => {
		if (workerRef.current) {
			return workerRef.current;
		}
		const worker = await createWorker(OCR_CONFIG.languages, 1, {
			logger: (info: any) => {
				if (info.status === 'recognizing text') {
					setOcrState((prev) => ({
						...prev,
						progress: Math.round(info.progress * 100),
						stage: 'ocr',
					}));
				}
			},
		});
		await worker.setParameters(OCR_CONFIG.options);
		workerRef.current = worker;
		return worker;
	}, []);
	const extractTextFromImage = useCallback(
		async (file: File): Promise<string> => {
			processingStartTime.current = Date.now();
			setOcrState({
				isProcessing: true,
				progress: 0,
				stage: 'preprocessing',
			});
			try {
				const worker = await initializeWorker();
				setOcrState((prev) => ({
					...prev,
					stage: 'ocr',
					progress: 5,
				}));
				const {
					data: { text },
				} = await worker.recognize(file);
				const processingTime = Date.now() - processingStartTime.current;
				setOcrState({
					isProcessing: false,
					progress: 100,
					stage: 'complete',
					extractedText: text.trim(),
					processingTime,
				});
				return text.trim();
			} catch (error) {
				console.error('OCR processing failed:', error);
				setOcrState({
					isProcessing: false,
					progress: 0,
					stage: 'error',
					error: error instanceof Error ? error.message : 'OCR processing failed',
				});
				throw error;
			}
		},
		[initializeWorker],
	);
	const matchTextToFAQs = useCallback(
		(extractedText: string): VisualSearchResult[] => {
			if (!extractedText.trim()) {
				return [];
			}
			const results: VisualSearchResult[] = [];
			const searchTerms = extractedText
				.toLowerCase()
				.split(/\s+/)
				.filter((term) => term.length > 2);
			setOcrState((prev) => ({
				...prev,
				stage: 'matching',
			}));
			questions.forEach((question) => {
				const category = categories.find((cat) => cat.id === question.category);
				let matchScore = 0;
				const highlightedTerms: string[] = [];
				const questionText = question.question.toLowerCase();
				const answerText = question.answer.toLowerCase();
				const keywordText = question.searchKeywords.join(' ').toLowerCase();
				const tagText = question.tags.join(' ').toLowerCase();
				searchTerms.forEach((term) => {
					const termRegex = new RegExp(`\\b${term}\\b`, 'gi');
					if (questionText.includes(term)) {
						matchScore += 0.4;
						highlightedTerms.push(term);
					}
					if (answerText.includes(term)) {
						matchScore += 0.3;
						highlightedTerms.push(term);
					}
					if (keywordText.includes(term) || tagText.includes(term)) {
						matchScore += 0.2;
						highlightedTerms.push(term);
					}
				});
				const errorPatterns = [
					/error\s*:?\s*(.+)/i,
					/exception\s*:?\s*(.+)/i,
					/failed\s*:?\s*(.+)/i,
					/cannot\s+(.+)/i,
					/unable\s+to\s+(.+)/i,
					/\d{3,4}\s*error/i,
				];
				errorPatterns.forEach((pattern) => {
					if (pattern.test(extractedText)) {
						const match = extractedText.match(pattern);
						if (
							match &&
							(questionText.includes(match[1]?.toLowerCase() || '') ||
								answerText.includes(match[1]?.toLowerCase() || ''))
						) {
							matchScore += 0.5;
							highlightedTerms.push(match[1] || 'error');
						}
					}
				});
				if (matchScore >= confidenceThreshold) {
					results.push({
						question,
						category,
						matchScore: Math.min(matchScore, 1),
						matchType: matchScore > 0.6 ? 'semantic' : 'keyword',
						extractedText,
						highlightedTerms: [...new Set(highlightedTerms)],
					});
				}
			});
			return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 10);
		},
		[questions, categories, confidenceThreshold],
	);
	const handleFileDrop = useCallback(
		async (acceptedFiles: File[]) => {
			if (acceptedFiles.length === 0) return;
			const file = acceptedFiles[0];
			setUploadedFiles([file]);
			const previewUrl = URL.createObjectURL(file);
			setPreviewUrls([previewUrl]);
			try {
				const extractedText = await extractTextFromImage(file);
				if (onOCRText) {
					onOCRText(extractedText);
				}
				const results = matchTextToFAQs(extractedText);
				setSearchResults(results);
				setShowResults(true);
				onSearchResults(results);
			} catch (error) {
				console.error('Visual search failed:', error);
			}
		},
		[extractTextFromImage, matchTextToFAQs, onOCRText, onSearchResults],
	);
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: supportedFormats.reduce(
			(acc, format) => ({
				...acc,
				[format]: [],
			}),
			{},
		),
		maxFiles: 1,
		maxSize: maxFileSize,
		onDrop: handleFileDrop,
		disabled: ocrState.isProcessing,
	});
	const handleClear = useCallback(() => {
		setUploadedFiles([]);
		previewUrls.forEach((url) => URL.revokeObjectURL(url));
		setPreviewUrls([]);
		setSearchResults([]);
		setShowResults(false);
		setOcrState({
			isProcessing: false,
			progress: 0,
			stage: 'upload',
		});
	}, [previewUrls]);
	const dropzoneVariants = {
		idle: {
			borderColor: 'rgba(148, 163, 184, 0.5)',
			backgroundColor: 'rgba(248, 250, 252, 0.5)',
			scale: 1,
			transition: {
				duration: 0.2,
			},
		},
		dragActive: {
			borderColor: 'rgba(59, 130, 246, 1)',
			backgroundColor: 'rgba(59, 130, 246, 0.1)',
			scale: 1.02,
			transition: {
				duration: 0.2,
			},
		},
		dragAccept: {
			borderColor: 'rgba(34, 197, 94, 1)',
			backgroundColor: 'rgba(34, 197, 94, 0.1)',
			scale: 1.02,
			transition: {
				duration: 0.2,
			},
		},
		dragReject: {
			borderColor: 'rgba(239, 68, 68, 1)',
			backgroundColor: 'rgba(239, 68, 68, 0.1)',
			scale: 0.98,
			transition: {
				duration: 0.2,
			},
		},
		processing: {
			borderColor: 'rgba(168, 85, 247, 1)',
			backgroundColor: 'rgba(168, 85, 247, 0.1)',
			scale: 1.01,
			transition: {
				duration: 0.3,
			},
		},
	};
	const resultVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.4,
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
	};
	const getDropzoneState = () => {
		if (ocrState.isProcessing) return 'processing';
		if (isDragReject) return 'dragReject';
		if (isDragAccept) return 'dragAccept';
		if (isDragActive) return 'dragActive';
		return 'idle';
	};
	return (
		<div className={cn('space-y-6', className)}>
			<m.div
				{...getRootProps()}
				variants={dropzoneVariants}
				animate={getDropzoneState()}
				className='relative border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors duration-200 hover:bg-slate-50'>
				<input {...getInputProps()} />

				<div className='flex flex-col items-center justify-center space-y-4 text-center'>
					<m.div
						animate={
							ocrState.isProcessing ?
								{
									rotate: [0, 360],
									scale: [1, 1.1, 1],
								}
							:	{}
						}
						transition={{
							rotate: {
								duration: 2,
								repeat: Infinity,
								ease: 'linear',
							},
							scale: {
								duration: 1,
								repeat: Infinity,
								ease: 'easeInOut',
							},
						}}
						className='p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
						{ocrState.isProcessing ?
							<Scan className='w-8 h-8' />
						: isDragActive ?
							<Upload className='w-8 h-8' />
						:	<Camera className='w-8 h-8' />}
					</m.div>

					<div className='space-y-2'>
						<h3 className='text-xl font-semibold text-slate-900'>
							{ocrState.isProcessing ? 'Processing Image...' : 'Visual Search'}
						</h3>
						<p className='text-slate-600 max-w-md'>
							{ocrState.isProcessing ?
								`${
									ocrState.stage === 'preprocessing' ? 'Preparing image'
									: ocrState.stage === 'ocr' ? 'Extracting text'
									: ocrState.stage === 'matching' ? 'Finding matches'
									: 'Processing'
								}...`
							: isDragActive ?
								'Drop your image here'
							:	placeholder}
						</p>
					</div>

					{ocrState.isProcessing && (
						<div className='w-full max-w-xs space-y-2'>
							<Progress
								value={ocrState.progress}
								className='h-2'
							/>
							<div className='flex justify-between text-sm text-slate-500'>
								<span className='capitalize'>{ocrState.stage}</span>
								<span>{ocrState.progress}%</span>
							</div>
						</div>
					)}

					{!ocrState.isProcessing && !uploadedFiles.length && (
						<div className='space-y-2'>
							<div className='flex items-center space-x-4 text-sm text-slate-500'>
								<Badge
									variant='outline'
									className='flex items-center space-x-1'>
									<FileImage className='w-3 h-3' />
									<span>PNG, JPG, WebP</span>
								</Badge>
								<Badge
									variant='outline'
									className='flex items-center space-x-1'>
									<Target className='w-3 h-3' />
									<span>Max {Math.round(maxFileSize / (1024 * 1024))}MB</span>
								</Badge>
							</div>
							<p className='text-xs text-slate-400'>
								or click to select from your device
							</p>
						</div>
					)}

					{ocrState.stage === 'error' && ocrState.error && (
						<div className='flex items-center space-x-2 text-red-600'>
							<AlertCircle className='w-4 h-4' />
							<span className='text-sm'>{ocrState.error}</span>
						</div>
					)}
				</div>
			</m.div>

			{uploadedFiles.length > 0 && previewUrls.length > 0 && (
				<m.div
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						duration: 0.4,
					}}
					className='relative'>
					<Card className='overflow-hidden'>
						<CardContent className='p-4'>
							<div className='flex items-start space-x-4'>
								<div className='relative w-32 h-32 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0'>
									<img
										src={previewUrls[0]}
										alt='Uploaded image'
										className='w-full h-full object-cover'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
								</div>

								<div className='flex-1 min-w-0 space-y-3'>
									<div className='flex items-center justify-between'>
										<div>
											<p className='font-medium text-slate-900 truncate'>
												{uploadedFiles[0].name}
											</p>
											<p className='text-sm text-slate-500'>
												{(uploadedFiles[0].size / 1024 / 1024).toFixed(2)} MB
												{ocrState.processingTime && (
													<span className='ml-2'>
														• Processed in {(ocrState.processingTime / 1000).toFixed(1)}s
													</span>
												)}
											</p>
										</div>
										<Button
											variant='ghost'
											size='sm'
											onClick={handleClear}
											className='flex-shrink-0'>
											<X className='w-4 h-4' />
										</Button>
									</div>

									{ocrState.stage === 'complete' && (
										<div className='flex items-center space-x-2 text-green-600'>
											<CheckCircle className='w-4 h-4' />
											<span className='text-sm'>
												Text extracted successfully • {searchResults.length} matches found
											</span>
										</div>
									)}

									{ocrState.extractedText && (
										<div className='space-y-2'>
											<p className='text-sm font-medium text-slate-700'>Extracted Text:</p>
											<p className='text-sm text-slate-600 bg-slate-50 p-3 rounded-lg max-h-20 overflow-y-auto'>
												{ocrState.extractedText.length > 200 ?
													`${ocrState.extractedText.slice(0, 200)}...`
												:	ocrState.extractedText}
											</p>
										</div>
									)}
								</div>
							</div>
						</CardContent>
					</Card>
				</m.div>
			)}

			<AnimatePresence>
				{showResults && searchResults.length > 0 && (
					<m.div
						initial={{
							opacity: 0,
							height: 0,
						}}
						animate={{
							opacity: 1,
							height: 'auto',
						}}
						exit={{
							opacity: 0,
							height: 0,
						}}
						transition={{
							duration: 0.4,
						}}
						className='space-y-4'>
						<div className='flex items-center justify-between'>
							<h3 className='text-lg font-semibold text-slate-900 flex items-center space-x-2'>
								<Sparkles className='w-5 h-5 text-purple-600' />
								<span>Visual Search Results</span>
							</h3>
							<Badge
								variant='outline'
								className='flex items-center space-x-1'>
								<Eye className='w-3 h-3' />
								<span>{searchResults.length} matches</span>
							</Badge>
						</div>

						<div className='space-y-4'>
							{searchResults.map((result, index) => (
								<m.div
									key={result.question.id}
									variants={resultVariants}
									initial='hidden'
									animate='visible'
									transition={{
										delay: index * 0.1,
									}}>
									<Card className='hover:shadow-lg transition-shadow duration-200'>
										<CardContent className='p-6'>
											<div className='space-y-4'>
												<div className='flex items-start justify-between'>
													<div className='flex-1'>
														<h4 className='font-semibold text-slate-900 leading-tight'>
															{result.question.question}
														</h4>
														<div className='flex items-center space-x-3 mt-2'>
															{result.category && (
																<Badge
																	variant='secondary'
																	className='flex items-center space-x-1'>
																	<span>{result.category.icon}</span>
																	<span>{result.category.name}</span>
																</Badge>
															)}
															<Badge
																variant={result.matchScore > 0.7 ? 'default' : 'outline'}
																className='flex items-center space-x-1'>
																<Target className='w-3 h-3' />
																<span>{Math.round(result.matchScore * 100)}% match</span>
															</Badge>
															<Badge
																variant='outline'
																className='capitalize'>
																{result.matchType}
															</Badge>
														</div>
													</div>
												</div>

												<p className='text-slate-600 leading-relaxed'>
													{result.question.answer.length > 200 ?
														`${result.question.answer.slice(0, 200)}...`
													:	result.question.answer}
												</p>

												{result.highlightedTerms.length > 0 && (
													<div className='space-y-2'>
														<p className='text-sm font-medium text-slate-700'>
															Matched Terms:
														</p>
														<div className='flex flex-wrap gap-2'>
															{result.highlightedTerms.map((term, i) => (
																<Badge
																	key={i}
																	variant='outline'
																	size='sm'>
																	{term}
																</Badge>
															))}
														</div>
													</div>
												)}
											</div>
										</CardContent>
									</Card>
								</m.div>
							))}
						</div>
					</m.div>
				)}
			</AnimatePresence>

			{showResults && searchResults.length === 0 && ocrState.extractedText && (
				<m.div
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						duration: 0.4,
					}}
					className='text-center py-12'>
					<AlertCircle className='w-16 h-16 text-slate-300 mx-auto mb-4' />
					<h3 className='text-xl font-semibold text-slate-900 mb-2'>
						No Matches Found
					</h3>
					<p className='text-slate-600 mb-4 max-w-md mx-auto'>
						We couldn't find any FAQ items matching the text extracted from your
						image. Try uploading a clearer image or use the text search instead.
					</p>
					{ocrState.extractedText && (
						<p className='text-sm text-slate-500'>
							Extracted text: "{ocrState.extractedText.slice(0, 100)}..."
						</p>
					)}
				</m.div>
			)}
		</div>
	);
}
