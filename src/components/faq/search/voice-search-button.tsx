"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, AlertCircle, Loader } from 'lucide-react';

// CONTEXT7 SOURCE: /jamesbrill/react-speech-recognition - Web Speech API integration patterns
// IMPLEMENTATION REASON: React Speech Recognition documentation Section 3.1 provides browser compatibility checks
// CONTEXT7 SOURCE: /context7/motion_dev - Pulse and scale animations for voice interfaces
// IMPLEMENTATION REASON: Motion documentation Section 9.1 recommends pulse animations for audio recording states

interface VoiceSearchButtonProps {
  onVoiceResult: (transcript: string) => void;
  onListeningChange?: (isListening: boolean) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  language?: string;
  continuous?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
}

interface VoiceState {
  isSupported: boolean;
  isListening: boolean;
  isPermissionGranted: boolean;
  transcript: string;
  interimTranscript: string;
  confidence: number;
  error: string | null;
}

// CONTEXT7 SOURCE: /jamesbrill/react-speech-recognition - Browser support detection patterns
// IMPLEMENTATION REASON: React Speech Recognition docs Section 2.1 specifies browser compatibility detection
const checkSpeechSupport = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return !!(
    window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition
  );
};

// British English language variants for premium tutoring service
const SUPPORTED_LANGUAGES = {
  'en-GB': 'British English',
  'en-US': 'American English',
  'en-AU': 'Australian English',
  'en-CA': 'Canadian English',
  'fr-FR': 'French',
  'es-ES': 'Spanish',
  'de-DE': 'German',
  'it-IT': 'Italian',
  'zh-CN': 'Chinese (Mandarin)',
  'ar-SA': 'Arabic'
};

const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({
  onVoiceResult,
  onListeningChange,
  onError,
  disabled = false,
  language = 'en-GB', // Default to British English for royal client standards
  continuous = false,
  className = "",
  size = 'md',
  variant = 'primary'
}) => {
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isSupported: false,
    isListening: false,
    isPermissionGranted: false,
    transcript: '',
    interimTranscript: '',
    confidence: 0,
    error: null
  });

  const [showTooltip, setShowTooltip] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    const isSupported = checkSpeechSupport();
    
    if (isSupported) {
      // CONTEXT7 SOURCE: /jamesbrill/react-speech-recognition - SpeechRecognition initialization
      // IMPLEMENTATION REASON: React Speech Recognition docs Section 3.2 recommends proper initialization
      const SpeechRecognition = 
        window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        
        // Configure recognition settings
        recognition.continuous = continuous;
        recognition.interimResults = true;
        recognition.lang = language;
        recognition.maxAlternatives = 1;

        recognitionRef.current = recognition;

        // Event handlers
        recognition.onstart = () => {
          setVoiceState(prev => ({ ...prev, isListening: true, error: null }));
          onListeningChange?.(true);
        };

        recognition.onend = () => {
          setVoiceState(prev => ({ ...prev, isListening: false }));
          onListeningChange?.(false);
        };

        // CONTEXT7 SOURCE: /jamesbrill/react-speech-recognition - Result handling patterns
        // IMPLEMENTATION REASON: React Speech Recognition docs Section 4.1 specifies result processing
        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            const confidence = event.results[i][0].confidence;

            if (event.results[i].isFinal) {
              finalTranscript += transcript;
              setVoiceState(prev => ({ 
                ...prev, 
                transcript: finalTranscript,
                confidence: confidence || 0
              }));
              
              // Return the final result
              if (finalTranscript.trim()) {
                onVoiceResult(finalTranscript.trim());
              }
            } else {
              interimTranscript += transcript;
              setVoiceState(prev => ({ 
                ...prev, 
                interimTranscript: interimTranscript
              }));
            }
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          let errorMessage = 'Speech recognition error occurred';
          
          switch (event.error) {
            case 'no-speech':
              errorMessage = 'No speech detected. Please try again.';
              break;
            case 'audio-capture':
              errorMessage = 'Audio capture failed. Check your microphone.';
              break;
            case 'not-allowed':
              errorMessage = 'Microphone access denied. Please enable microphone permissions.';
              setPermissionStatus('denied');
              break;
            case 'network':
              errorMessage = 'Network error occurred. Check your internet connection.';
              break;
            case 'language-not-supported':
              errorMessage = `Language ${language} is not supported.`;
              break;
            default:
              errorMessage = `Speech recognition error: ${event.error}`;
          }

          setVoiceState(prev => ({ ...prev, error: errorMessage, isListening: false }));
          onError?.(errorMessage);
        };
      }
    }

    setVoiceState(prev => ({ ...prev, isSupported }));

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [language, continuous, onVoiceResult, onListeningChange, onError]);

  // Check microphone permission
  const checkMicrophonePermission = useCallback(async () => {
    if (!navigator.permissions) {
      setPermissionStatus('unknown');
      return false;
    }

    try {
      const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      setPermissionStatus(permission.state);
      
      permission.onchange = () => {
        setPermissionStatus(permission.state);
      };

      return permission.state === 'granted';
    } catch (error) {
      console.warn('Permission check failed:', error);
      setPermissionStatus('unknown');
      return false;
    }
  }, []);

  // Start voice recognition
  const startListening = useCallback(async () => {
    if (!voiceState.isSupported || !recognitionRef.current || disabled) {
      return;
    }

    try {
      // Check permission first
      const hasPermission = await checkMicrophonePermission();
      
      if (permissionStatus === 'denied') {
        const errorMsg = 'Microphone access is required for voice search. Please enable microphone permissions in your browser settings.';
        setVoiceState(prev => ({ ...prev, error: errorMsg }));
        onError?.(errorMsg);
        return;
      }

      // Clear previous state
      setVoiceState(prev => ({ 
        ...prev, 
        transcript: '', 
        interimTranscript: '', 
        error: null,
        confidence: 0
      }));

      // Start recognition
      recognitionRef.current.start();

      // Set timeout for continuous mode
      if (!continuous) {
        timeoutRef.current = setTimeout(() => {
          stopListening();
        }, 10000); // 10 second timeout
      }

    } catch (error) {
      const errorMsg = 'Failed to start voice recognition. Please try again.';
      setVoiceState(prev => ({ ...prev, error: errorMsg }));
      onError?.(errorMsg);
    }
  }, [voiceState.isSupported, disabled, checkMicrophonePermission, permissionStatus, onError, continuous]);

  // Stop voice recognition
  const stopListening = useCallback(() => {
    if (recognitionRef.current && voiceState.isListening) {
      recognitionRef.current.stop();
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [voiceState.isListening]);

  // Toggle listening
  const toggleListening = () => {
    if (voiceState.isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Get button size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-8 h-8';
      case 'lg': return 'w-14 h-14';
      default: return 'w-10 h-10';
    }
  };

  // Get variant classes
  const getVariantClasses = () => {
    if (disabled) {
      return 'bg-gray-100 text-gray-400 cursor-not-allowed';
    }

    if (voiceState.isListening) {
      return 'bg-red-500 text-white shadow-lg';
    }

    switch (variant) {
      case 'secondary':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
      case 'ghost':
        return 'bg-transparent text-gray-600 hover:bg-gray-100';
      default:
        return 'bg-blue-500 text-white hover:bg-blue-600';
    }
  };

  // CONTEXT7 SOURCE: /context7/motion_dev - Pulse animation for recording states
  // IMPLEMENTATION REASON: Motion documentation Section 9.2 recommends pulse effects for active microphone states
  const buttonVariants = {
    idle: {
      scale: 1,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    },
    listening: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 4px 6px rgba(0, 0, 0, 0.1)",
        "0 8px 25px rgba(239, 68, 68, 0.3)",
        "0 4px 6px rgba(0, 0, 0, 0.1)"
      ],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const pulseVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [1, 1.5, 2],
      opacity: [0.7, 0.3, 0],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  if (!voiceState.isSupported) {
    return (
      <div className="relative">
        <button
          disabled
          className={`${getSizeClasses()} rounded-full bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center ${className}`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Voice search not supported"
        >
          <MicOff className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />
        </button>
        
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-50">
            Voice search not supported in this browser
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        variants={buttonVariants}
        animate={voiceState.isListening ? "listening" : "idle"}
        whileHover={!disabled ? "hover" : undefined}
        whileTap={!disabled ? "tap" : undefined}
        onClick={toggleListening}
        disabled={disabled}
        className={`${getSizeClasses()} rounded-full flex items-center justify-center transition-colors duration-200 relative overflow-hidden ${getVariantClasses()} ${className}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={voiceState.isListening ? "Stop voice search" : "Start voice search"}
        aria-pressed={voiceState.isListening}
      >
        {/* Pulse rings for listening state */}
        <AnimatePresence>
          {voiceState.isListening && (
            <>
              <motion.div
                variants={pulseVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute inset-0 border-2 border-red-400 rounded-full"
                style={{ animationDelay: '0ms' }}
              />
              <motion.div
                variants={pulseVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute inset-0 border-2 border-red-400 rounded-full"
                style={{ animationDelay: '500ms' }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Icon */}
        {voiceState.isListening ? (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Volume2 className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />
          </motion.div>
        ) : voiceState.error ? (
          <AlertCircle className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />
        ) : (
          <Mic className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />
        )}
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-50 max-w-xs"
          >
            {voiceState.error ? (
              <div className="text-center">
                <div className="font-medium text-red-200">Error</div>
                <div>{voiceState.error}</div>
              </div>
            ) : voiceState.isListening ? (
              <div className="text-center">
                <div className="font-medium">Listening...</div>
                <div>Speak your question</div>
                {voiceState.interimTranscript && (
                  <div className="text-gray-300 mt-1 italic">
                    "{voiceState.interimTranscript}"
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="font-medium">Voice Search</div>
                <div>Click to search by voice</div>
                <div className="text-gray-300 mt-1">
                  Language: {SUPPORTED_LANGUAGES[language as keyof typeof SUPPORTED_LANGUAGES] || language}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Permission request overlay */}
      <AnimatePresence>
        {permissionStatus === 'prompt' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-sm mx-4"
            >
              <div className="text-center">
                <Mic className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Enable Microphone Access
                </h3>
                <p className="text-gray-600 mb-4">
                  Allow microphone access to use voice search for finding FAQ answers quickly.
                </p>
                <div className="text-sm text-gray-500">
                  You can change this permission anytime in your browser settings.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceSearchButton;