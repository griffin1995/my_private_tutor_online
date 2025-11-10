'use client';

import 'regenerator-runtime/runtime';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';
import {
	m,
	AnimatePresence,
	useAnimation,
	useMotionValue,
	useTransform,
} from 'framer-motion';
import {
	Mic,
	MicOff,
	Volume2,
	VolumeX,
	Play,
	Pause,
	RotateCcw,
	Zap,
	AlertCircle,
	CheckCircle,
	Loader2,
	Headphones,
	Languages,
	Settings,
	HelpCircle,
	Sparkles,
	Waves,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import type { FAQQuestion, FAQCategory } from '@/lib/cms/cms-content';
import { cn } from '@/lib/utils';
interface LanguageConfig {
	code: string;
	name: string;
	region: string;
	flag: string;
	confidence: number;
}
interface VoiceCommand {
	patterns: string[];
	action: string;
	description: string;
	category: 'search' | 'navigation' | 'control' | 'help';
	fuzzyMatch?: boolean;
}
interface FAQVoiceSearchProps {
	questions: FAQQuestion[];
	categories: FAQCategory[];
	onSearchQuery?: (query: string) => void;
	onCategorySelect?: (categoryId: string) => void;
	onQuestionSelect?: (questionId: string) => void;
	onVoiceCommand?: (command: string, parameters?: any) => void;
	className?: string;
	enableTTS?: boolean;
	enableAnalytics?: boolean;
	debugMode?: boolean;
}
export function FAQVoiceSearch({
	questions,
	categories,
	onSearchQuery,
	onCategorySelect,
	onQuestionSelect,
	onVoiceCommand,
	className,
	enableTTS = true,
	enableAnalytics = false,
	debugMode = false,
}: FAQVoiceSearchProps) {
	const voiceCommands = [
		{
			command: ['search for *', 'find *', 'look for *'],
			callback: (query: string) => {
				if (query && onSearchQuery) {
					onSearchQuery(query);
					setLastCommand(`Searching for: ${query}`);
					toast.success(`Searching for: ${query}`);
				}
			},
		},
		{
			command: ['show me *', 'go to *', 'open *'],
			callback: (category: string) => {
				const matchedCategory = categories.find(
					(cat) =>
						cat.name.toLowerCase().includes(category.toLowerCase()) ||
						cat.title.toLowerCase().includes(category.toLowerCase()),
				);
				if (matchedCategory && onCategorySelect) {
					onCategorySelect(matchedCategory.id);
					setLastCommand(`Opening category: ${matchedCategory.name}`);
					toast.success(`Opening category: ${matchedCategory.name}`);
				}
			},
		},
		{
			command: ['read question *', 'show question *'],
			callback: (questionNumber: string) => {
				const questionIndex = parseInt(questionNumber) - 1;
				if (questionIndex >= 0 && questionIndex < questions.length) {
					const question = questions[questionIndex];
					if (onQuestionSelect) {
						onQuestionSelect(question.id);
					}
					if (enableTTS && 'speechSynthesis' in window) {
						speakText(`${question.question}. ${question.answer}`);
					}
					setLastCommand(`Reading question ${questionNumber}`);
					toast.success(`Reading question ${questionNumber}`);
				}
			},
		},
		{
			command: ['help', 'commands', 'what can I say'],
			callback: () => {
				const helpText =
					'You can say: Search for [topic], Show me [category], Read question [number], Start listening, Stop listening, or Help.';
				if (enableTTS && 'speechSynthesis' in window) {
					speakText(helpText);
				}
				setLastCommand('Voice commands help');
				setShowHelp(true);
				toast.info('Voice commands help displayed');
			},
		},
		{
			command: ['start listening', 'begin listening', 'start voice'],
			callback: () => {
				handleStartListening();
				setLastCommand('Started listening');
			},
		},
		{
			command: ['stop listening', 'end listening', 'stop voice'],
			callback: () => {
				handleStopListening();
				setLastCommand('Stopped listening');
			},
		},
		{
			command: 'clear',
			callback: ({ resetTranscript }: any) => {
				resetTranscript();
				setLastCommand('Transcript cleared');
				toast.info('Voice transcript cleared');
			},
		},
	];
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
		isMicrophoneAvailable,
		browserSupportsContinuousListening,
	} = useSpeechRecognition({
		commands: voiceCommands,
	});
	const [selectedLanguage, setSelectedLanguage] = useState('en-GB');
	const [isListening, setIsListening] = useState(false);
	const [lastCommand, setLastCommand] = useState('');
	const [showHelp, setShowHelp] = useState(false);
	const [confidenceLevel, setConfidenceLevel] = useState(0);
	const [speechVolume, setSpeechVolume] = useState(0);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [voiceSettings, setVoiceSettings] = useState({
		rate: 1,
		pitch: 1,
		volume: 0.8,
		voice: null as SpeechSynthesisVoice | null,
	});
	const microphoneScale = useMotionValue(1);
	const microphoneGlow = useMotionValue(0);
	const volumeHeight = useMotionValue(0);
	const confidenceWidth = useTransform(confidenceLevel, [0, 1], ['0%', '100%']);
	const microphoneControls = useAnimation();
	const waveControls = useAnimation();
	const helpControls = useAnimation();
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const microphoneStreamRef = useRef<MediaStream | null>(null);
	const supportedLanguages: LanguageConfig[] = [
		{
			code: 'en-GB',
			name: 'English (UK)',
			region: 'United Kingdom',
			flag: '🇬🇧',
			confidence: 0.95,
		},
		{
			code: 'en-US',
			name: 'English (US)',
			region: 'United States',
			flag: '🇺🇸',
			confidence: 0.95,
		},
		{
			code: 'en-AU',
			name: 'English (AU)',
			region: 'Australia',
			flag: '🇦🇺',
			confidence: 0.9,
		},
		{
			code: 'en-CA',
			name: 'English (CA)',
			region: 'Canada',
			flag: '🇨🇦',
			confidence: 0.9,
		},
		{
			code: 'en-IN',
			name: 'English (IN)',
			region: 'India',
			flag: '🇮🇳',
			confidence: 0.85,
		},
		{
			code: 'en-ZA',
			name: 'English (ZA)',
			region: 'South Africa',
			flag: '🇿🇦',
			confidence: 0.85,
		},
		{
			code: 'fr-FR',
			name: 'Français',
			region: 'France',
			flag: '🇫🇷',
			confidence: 0.8,
		},
		{
			code: 'de-DE',
			name: 'Deutsch',
			region: 'Germany',
			flag: '🇩🇪',
			confidence: 0.8,
		},
		{
			code: 'es-ES',
			name: 'Español',
			region: 'Spain',
			flag: '🇪🇸',
			confidence: 0.8,
		},
		{
			code: 'it-IT',
			name: 'Italiano',
			region: 'Italy',
			flag: '🇮🇹',
			confidence: 0.75,
		},
	];
	const microphoneVariants = {
		idle: {
			scale: 1,
			boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
			backgroundColor: 'rgb(71, 85, 105)',
			transition: {
				duration: 0.3,
				ease: 'easeOut',
			},
		},
		listening: {
			scale: [1, 1.1, 1],
			boxShadow: [
				'0 4px 8px rgba(59, 130, 246, 0.3)',
				'0 8px 16px rgba(59, 130, 246, 0.5)',
				'0 4px 8px rgba(59, 130, 246, 0.3)',
			],
			backgroundColor: 'rgb(59, 130, 246)',
			transition: {
				duration: 2,
				repeat: Infinity,
				ease: 'easeInOut',
			},
		},
		processing: {
			scale: 1.05,
			boxShadow: '0 8px 16px rgba(168, 85, 247, 0.4)',
			backgroundColor: 'rgb(168, 85, 247)',
			transition: {
				duration: 0.3,
				ease: 'easeOut',
			},
		},
		success: {
			scale: [1, 1.15, 1],
			boxShadow: '0 8px 16px rgba(34, 197, 94, 0.4)',
			backgroundColor: 'rgb(34, 197, 94)',
			transition: {
				duration: 0.6,
				ease: 'easeOut',
			},
		},
		error: {
			scale: [1, 1.15, 1],
			boxShadow: '0 8px 16px rgba(239, 68, 68, 0.4)',
			backgroundColor: 'rgb(239, 68, 68)',
			transition: {
				duration: 0.6,
				ease: 'easeOut',
			},
		},
	};
	const waveVariants = {
		idle: {
			scaleY: 0.1,
			opacity: 0.3,
		},
		active: {
			scaleY: [0.1, 1, 0.1],
			opacity: [0.3, 1, 0.3],
			transition: {
				duration: 1.5,
				repeat: Infinity,
				ease: 'easeInOut',
			},
		},
	};
	const initializeAudioAnalysis = useCallback(async () => {
		try {
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				console.warn('Audio analysis not available');
				return;
			}
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
			microphoneStreamRef.current = stream;
			audioContextRef.current = new (window.AudioContext ||
				(window as any).webkitAudioContext)();
			analyserRef.current = audioContextRef.current.createAnalyser();
			const source = audioContextRef.current.createMediaStreamSource(stream);
			source.connect(analyserRef.current);
			analyserRef.current.fftSize = 256;
			const bufferLength = analyserRef.current.frequencyBinCount;
			const dataArray = new Uint8Array(bufferLength);
			const updateVolume = () => {
				if (analyserRef.current && isListening) {
					analyserRef.current.getByteFrequencyData(dataArray);
					const average = dataArray.reduce((a, b) => a + b) / bufferLength;
					const normalized = average / 255;
					setSpeechVolume(normalized);
					volumeHeight.set(normalized);
					if (normalized > 0.1) {
						setConfidenceLevel(Math.min(0.95, normalized * 1.2));
					}
					requestAnimationFrame(updateVolume);
				}
			};
			updateVolume();
		} catch (error) {
			console.error('Failed to initialize audio analysis:', error);
		}
	}, [isListening, volumeHeight]);
	const speakText = useCallback(
		(text: string) => {
			if (!enableTTS || !('speechSynthesis' in window)) return;
			window.speechSynthesis.cancel();
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.rate = voiceSettings.rate;
			utterance.pitch = voiceSettings.pitch;
			utterance.volume = voiceSettings.volume;
			if (voiceSettings.voice) {
				utterance.voice = voiceSettings.voice;
			} else {
				const voices = window.speechSynthesis.getVoices();
				const matchingVoice = voices.find(
					(voice) =>
						voice.lang.startsWith(selectedLanguage.split('-')[0]) ||
						voice.lang === selectedLanguage,
				);
				if (matchingVoice) {
					utterance.voice = matchingVoice;
				}
			}
			utterance.onstart = () => setIsSpeaking(true);
			utterance.onend = () => setIsSpeaking(false);
			utterance.onerror = () => setIsSpeaking(false);
			window.speechSynthesis.speak(utterance);
		},
		[enableTTS, voiceSettings, selectedLanguage],
	);
	const handleStartListening = useCallback(async () => {
		if (!browserSupportsSpeechRecognition) {
			toast.error('Speech recognition not supported in this browser');
			return;
		}
		if (!isMicrophoneAvailable) {
			toast.error(
				'Microphone access denied. Please enable microphone permissions.',
			);
			return;
		}
		try {
			setIsListening(true);
			await initializeAudioAnalysis();
			await SpeechRecognition.startListening({
				continuous: browserSupportsContinuousListening,
				language: selectedLanguage,
				interimResults: true,
			});
			microphoneControls.start('listening');
			waveControls.start('active');
			if (enableAnalytics) {
				if (typeof window !== 'undefined' && (window as any).gtag) {
					(window as any).gtag('event', 'voice_search_start', {
						language: selectedLanguage,
						continuous_support: browserSupportsContinuousListening,
					});
				}
			}
			toast.success('Voice recognition started');
		} catch (error) {
			console.error('Failed to start listening:', error);
			setIsListening(false);
			microphoneControls.start('error');
			toast.error('Failed to start voice recognition');
		}
	}, [
		browserSupportsSpeechRecognition,
		isMicrophoneAvailable,
		browserSupportsContinuousListening,
		selectedLanguage,
		initializeAudioAnalysis,
		microphoneControls,
		waveControls,
		enableAnalytics,
	]);
	const handleStopListening = useCallback(() => {
		setIsListening(false);
		SpeechRecognition.stopListening();
		if (microphoneStreamRef.current) {
			microphoneStreamRef.current.getTracks().forEach((track) => track.stop());
			microphoneStreamRef.current = null;
		}
		if (audioContextRef.current) {
			audioContextRef.current.close();
			audioContextRef.current = null;
		}
		microphoneControls.start('idle');
		waveControls.start('idle');
		setSpeechVolume(0);
		setConfidenceLevel(0);
		toast.success('Voice recognition stopped');
	}, [microphoneControls, waveControls]);
	const handleLanguageChange = useCallback(
		(languageCode: string) => {
			setSelectedLanguage(languageCode);
			const language = supportedLanguages.find(
				(lang) => lang.code === languageCode,
			);
			if (language && enableTTS) {
				speakText(`Language changed to ${language.name}`);
			}
			if (isListening) {
				handleStopListening();
				setTimeout(() => handleStartListening(), 500);
			}
			if (enableAnalytics) {
				if (typeof window !== 'undefined' && (window as any).gtag) {
					(window as any).gtag('event', 'voice_language_change', {
						new_language: languageCode,
						previous_language: selectedLanguage,
					});
				}
			}
			toast.success(`Voice language changed to ${language?.name}`);
		},
		[
			selectedLanguage,
			isListening,
			handleStopListening,
			handleStartListening,
			enableTTS,
			speakText,
			enableAnalytics,
		],
	);
	const handleReset = useCallback(() => {
		resetTranscript();
		setLastCommand('');
		setConfidenceLevel(0);
		setSpeechVolume(0);
		microphoneControls.start('idle');
		if (enableTTS) {
			speakText('Voice transcript cleared');
		}
		toast.info('Voice transcript reset');
	}, [resetTranscript, microphoneControls, enableTTS, speakText]);
	const handleToggleHelp = useCallback(() => {
		setShowHelp((prev) => !prev);
		helpControls.start(showHelp ? 'hidden' : 'visible');
		if (!showHelp && enableTTS) {
			speakText('Voice commands help opened');
		}
	}, [showHelp, helpControls, enableTTS, speakText]);
	useEffect(() => {
		if ('speechSynthesis' in window) {
			const loadVoices = () => {
				const voices = window.speechSynthesis.getVoices();
				const preferredVoice =
					voices.find((voice) => voice.lang === selectedLanguage && voice.default) ||
					voices.find((voice) =>
						voice.lang.startsWith(selectedLanguage.split('-')[0]),
					);
				if (preferredVoice) {
					setVoiceSettings((prev) => ({
						...prev,
						voice: preferredVoice,
					}));
				}
			};
			loadVoices();
			window.speechSynthesis.onvoiceschanged = loadVoices;
		}
	}, [selectedLanguage]);
	useEffect(() => {
		if (transcript && isListening) {
			const words = transcript.split(' ');
			const confidence = Math.min(0.95, (words.length / 10) * 0.8 + 0.2);
			setConfidenceLevel(confidence);
			if (words.length > 2) {
				microphoneControls.start('processing');
			}
		}
	}, [transcript, isListening, microphoneControls]);
	if (!browserSupportsSpeechRecognition) {
		return (
			<Card className={cn('bg-amber-50 border-amber-200', className)}>
				<CardContent className='p-6'>
					<div className='flex items-center space-x-3'>
						<AlertCircle className='w-6 h-6 text-amber-600' />
						<div>
							<h3 className='font-semibold text-amber-900'>
								Voice Search Not Available
							</h3>
							<p className='text-sm text-amber-700 mt-1'>
								Your browser doesn't support speech recognition. Please use a modern
								browser like Chrome, Firefox, or Safari.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}
	return (
		<TooltipProvider>
			<div className={cn('space-y-6', className)}>
				<Card className='bg-gradient-to-br from-slate-50 via-white to-blue-50 border-2 border-slate-200 shadow-lg'>
					<CardContent className='p-8'>
						<div className='flex items-center justify-between mb-6'>
							<div className='flex items-center space-x-3'>
								<div className='p-2 bg-blue-100 rounded-xl'>
									<Headphones className='w-6 h-6 text-blue-600' />
								</div>
								<div>
									<h3 className='text-xl font-serif font-bold text-slate-900'>
										Voice Search
									</h3>
									<p className='text-sm text-slate-600'>
										Ask questions naturally or use voice commands
									</p>
								</div>
							</div>

							<div className='flex items-center space-x-2'>
								<Select
									value={selectedLanguage}
									onValueChange={handleLanguageChange}>
									<SelectTrigger className='w-40'>
										<SelectValue>
											<div className='flex items-center space-x-2'>
												<Languages className='w-4 h-4' />
												<span className='text-sm'>
													{
														supportedLanguages.find((lang) => lang.code === selectedLanguage)
															?.flag
													}
													{
														supportedLanguages
															.find((lang) => lang.code === selectedLanguage)
															?.name.split(' ')[0]
													}
												</span>
											</div>
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										{supportedLanguages.map((language) => (
											<SelectItem
												key={language.code}
												value={language.code}>
												<div className='flex items-center space-x-2'>
													<span>{language.flag}</span>
													<span>{language.name}</span>
													<Badge
														variant='outline'
														className='text-xs ml-2'>
														{Math.round(language.confidence * 100)}%
													</Badge>
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant='outline'
											size='sm'
											onClick={handleToggleHelp}
											className={cn(
												'h-10 w-10 p-0',
												showHelp && 'bg-blue-100 text-blue-600 border-blue-300',
											)}>
											<HelpCircle className='w-4 h-4' />
										</Button>
									</TooltipTrigger>
									<TooltipContent>Voice commands help</TooltipContent>
								</Tooltip>
							</div>
						</div>

						<div className='flex flex-col items-center space-y-6'>
							<div className='relative'>
								<m.button
									variants={microphoneVariants}
									animate={microphoneControls}
									onClick={isListening ? handleStopListening : handleStartListening}
									disabled={!isMicrophoneAvailable}
									className='relative w-24 h-24 rounded-full text-white focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed'
									whileHover={{
										scale: 1.05,
									}}
									whileTap={{
										scale: 0.95,
									}}>
									{isListening ?
										<MicOff className='w-8 h-8 mx-auto' />
									:	<Mic className='w-8 h-8 mx-auto' />}
								</m.button>

								{isListening && (
									<div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-slate-200 rounded-full overflow-hidden'>
										<m.div
											className='h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full'
											style={{
												width: confidenceWidth,
											}}
											animate={{
												opacity: [0.7, 1, 0.7],
											}}
											transition={{
												duration: 1,
												repeat: Infinity,
											}}
										/>
									</div>
								)}
							</div>

							<div className='flex items-center justify-center space-x-1 h-12'>
								{[...Array(5)].map((_, i) => (
									<m.div
										key={i}
										className='w-1 bg-blue-400 rounded-full'
										variants={waveVariants}
										animate={isListening ? 'active' : 'idle'}
										transition={{
											delay: i * 0.1,
										}}
										style={{
											height: `${8 + speechVolume * 30}px`,
										}}
									/>
								))}
							</div>

							<div className='text-center space-y-2'>
								<div className='flex items-center justify-center space-x-2'>
									<Badge
										variant={isListening ? 'default' : 'secondary'}
										className={cn('px-3 py-1', isListening && 'animate-pulse')}>
										{isListening ?
											<>
												<Waves className='w-3 h-3 mr-1' />
												Listening...
											</>
										:	<>
												<Mic className='w-3 h-3 mr-1' />
												Click to speak
											</>
										}
									</Badge>

									{isSpeaking && (
										<Badge
											variant='outline'
											className='animate-pulse'>
											<Volume2 className='w-3 h-3 mr-1' />
											Speaking
										</Badge>
									)}
								</div>

								{confidenceLevel > 0 && (
									<div className='text-xs text-slate-500'>
										Confidence: {Math.round(confidenceLevel * 100)}%
									</div>
								)}
							</div>

							<div className='flex items-center space-x-3'>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant='outline'
											size='sm'
											onClick={handleReset}
											disabled={!transcript}>
											<RotateCcw className='w-4 h-4 mr-2' />
											Reset
										</Button>
									</TooltipTrigger>
									<TooltipContent>Clear voice transcript</TooltipContent>
								</Tooltip>

								{enableTTS && transcript && (
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant='outline'
												size='sm'
												onClick={() => speakText(transcript)}
												disabled={isSpeaking}>
												{isSpeaking ?
													<VolumeX className='w-4 h-4 mr-2' />
												:	<Volume2 className='w-4 h-4 mr-2' />}
												Read Back
											</Button>
										</TooltipTrigger>
										<TooltipContent>Read transcript aloud</TooltipContent>
									</Tooltip>
								)}
							</div>
						</div>

						{transcript && (
							<m.div
								className='mt-6 p-4 bg-white border-2 border-slate-200 rounded-xl'
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: 0,
								}}
								transition={{
									duration: 0.3,
								}}>
								<div className='flex items-center justify-between mb-2'>
									<div className='flex items-center space-x-2'>
										<Sparkles className='w-4 h-4 text-blue-600' />
										<span className='text-sm font-medium text-slate-700'>
											Voice Transcript
										</span>
									</div>

									{lastCommand && (
										<Badge
											variant='outline'
											className='text-xs'>
											<CheckCircle className='w-3 h-3 mr-1' />
											{lastCommand}
										</Badge>
									)}
								</div>

								<p className='text-slate-900 leading-relaxed'>{transcript}</p>
							</m.div>
						)}
					</CardContent>
				</Card>

				<AnimatePresence>
					{showHelp && (
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
								duration: 0.3,
							}}>
							<Card className='bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'>
								<CardContent className='p-6'>
									<div className='flex items-center justify-between mb-4'>
										<h4 className='text-lg font-semibold text-slate-900 flex items-center'>
											<HelpCircle className='w-5 h-5 mr-2 text-blue-600' />
											Voice Commands Guide
										</h4>
										<Button
											variant='ghost'
											size='sm'
											onClick={handleToggleHelp}>
											×
										</Button>
									</div>

									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div>
											<h5 className='font-medium text-slate-800 mb-2'>Search Commands</h5>
											<ul className='space-y-1 text-sm text-slate-600'>
												<li>• "Search for [topic]"</li>
												<li>• "Find [keyword]"</li>
												<li>• "Look for [question]"</li>
											</ul>
										</div>

										<div>
											<h5 className='font-medium text-slate-800 mb-2'>
												Navigation Commands
											</h5>
											<ul className='space-y-1 text-sm text-slate-600'>
												<li>• "Show me [category]"</li>
												<li>• "Go to [section]"</li>
												<li>• "Read question [number]"</li>
											</ul>
										</div>

										<div>
											<h5 className='font-medium text-slate-800 mb-2'>Control Commands</h5>
											<ul className='space-y-1 text-sm text-slate-600'>
												<li>• "Start listening"</li>
												<li>• "Stop listening"</li>
												<li>• "Clear" (reset transcript)</li>
											</ul>
										</div>

										<div>
											<h5 className='font-medium text-slate-800 mb-2'>Help Commands</h5>
											<ul className='space-y-1 text-sm text-slate-600'>
												<li>• "Help"</li>
												<li>• "Commands"</li>
												<li>• "What can I say"</li>
											</ul>
										</div>
									</div>

									<div className='mt-4 p-3 bg-blue-100 rounded-lg'>
										<p className='text-xs text-blue-800'>
											<strong>Tip:</strong> Speak clearly and naturally. The system
											supports multiple accents and languages. Voice recognition works best
											in quiet environments.
										</p>
									</div>
								</CardContent>
							</Card>
						</m.div>
					)}
				</AnimatePresence>

				{debugMode && (
					<Card className='bg-slate-50 border-slate-300'>
						<CardContent className='p-4'>
							<h4 className='text-sm font-semibold text-slate-700 mb-2'>
								Debug Information
							</h4>
							<div className='grid grid-cols-2 gap-2 text-xs text-slate-600'>
								<div>
									Browser Support: {browserSupportsSpeechRecognition ? 'Yes' : 'No'}
								</div>
								<div>
									Microphone: {isMicrophoneAvailable ? 'Available' : 'Unavailable'}
								</div>
								<div>
									Continuous: {browserSupportsContinuousListening ? 'Yes' : 'No'}
								</div>
								<div>Language: {selectedLanguage}</div>
								<div>Volume: {Math.round(speechVolume * 100)}%</div>
								<div>Confidence: {Math.round(confidenceLevel * 100)}%</div>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</TooltipProvider>
	);
}
