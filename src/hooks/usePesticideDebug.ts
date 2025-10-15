// src/hooks/usePesticideDebug.ts

// CONTEXT7 SOURCE: /vercel/next.js - Development-only debugging hook
// DEBUGGING TOOL REASON: React hook for toggling CSS debugging visualization

/**
 * Custom hook for toggling Pesticide CSS debugging tool
 * Only active in development mode
 * Keyboard shortcut: Ctrl/Cmd + Shift + D
 */

/*
export function usePesticideDebug() {
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    if (isDebugMode && !isStyleLoaded) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/styles/pesticide-debug.css';
      link.id = 'pesticide-debug-styles';
      document.head.appendChild(link);
      setIsStyleLoaded(true);
    }

    if (isDebugMode) {
      document.body.classList.add('pesticide-debug');
    } else {
      document.body.classList.remove('pesticide-debug');
    }

    return () => {
      document.body.classList.remove('pesticide-debug');
    };
  }, [isDebugMode, isStyleLoaded]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === 'd'
      ) {
        event.preventDefault();
        setIsDebugMode((prev) => !prev);

        const message =
          !isDebugMode
            ? '🐛 Pesticide Debug Mode: ON'
            : '✓ Pesticide Debug Mode: OFF';

        if (typeof window !== 'undefined' && 'Notification' in window) {
          if (Notification.permission === 'granted') {
            new Notification('My Private Tutor Online', {
              body: message,
              icon: '/favicon.ico',
            });
          }
        }

        console.log(
          `%c${message}`,
          `color: ${!isDebugMode ? '#00ff00' : '#ff0000'}; font-weight: bold; font-size: 14px;`,
        );
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isDebugMode]);

  const toggleDebugMode = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsDebugMode((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    if (isDebugMode) {
      console.log(
        '%c🐛 PESTICIDE DEBUG MODE ACTIVE',
        'background: #ff0000; color: white; padding: 5px 10px; font-weight: bold; border-radius: 3px;',
      );
      console.log(
        '%cPress Ctrl/Cmd + Shift + D to toggle',
        'color: #666; font-style: italic;',
      );
    }
  }, [isDebugMode]);

  return {
    isDebugMode,
    toggleDebugMode,
    isEnabled: process.env.NODE_ENV === 'development',
  };
}
*/

// ---- DEAD/NO-OP IMPLEMENTATION ----
// Keeps API intact, ensures DevToolbar does not render, no CSS is loaded
export function usePesticideDebug() {
	const isDebugMode = false;
	const toggleDebugMode = () => {};
	const isEnabled = false;

	// Optional backward-compatible stubs
	const enable = () => {};
	const disable = () => {};

	return { isDebugMode, toggleDebugMode, isEnabled, enable, disable };
}
