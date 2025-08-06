/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Advanced visual debugging utilities
 * VISUAL DEBUG REASON: Official Tailwind CSS patterns for visual debugging and layout inspection
 * IMPLEMENTATION REASON: Context7 MCP verified patterns for comprehensive debugging systems
 */

import React, { ReactNode, useState, useEffect } from 'react';
import { DebugWrapper, useDebugInfo } from './debug-utils';
import { DEBUG_CONFIG, isDebugEnabled } from './debug-config';

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Layout debugging with visual indicators
 * LAYOUT DEBUG REASON: Official Tailwind CSS patterns for visual layout debugging
 */
interface DebugSectionProps {
  children: ReactNode;
  id: string;
  label?: string;
  description?: string;
  backgroundColor?: string;
  showMetrics?: boolean;
  className?: string;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition with debugging features
 * SECTION DEBUG REASON: Official React patterns for section-level debugging and identification
 */
export const DebugSection: React.FC<DebugSectionProps> = ({
  children,
  id,
  label,
  description,
  backgroundColor,
  showMetrics = false,
  className = ''
}) => {
  const { debugLog } = useDebugInfo('DebugSection', { id, label });

  if (!isDebugEnabled()) {
    return <>{children}</>;
  }

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dynamic background color application
  // BACKGROUND REASON: Official Tailwind CSS patterns for conditional background application
  const backgroundClass = backgroundColor ? `bg-${backgroundColor}` : '';
  const combinedClassName = [backgroundClass, className].filter(Boolean).join(' ');

  return (
    <DebugWrapper
      label={label || id}
      level="primary"
      id={id}
      className={combinedClassName}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Floating debug information panels */}
      {/* DEBUG PANEL REASON: Official Tailwind CSS patterns for floating debug information */}
      {description && DEBUG_CONFIG.showLabels && (
        <div className="absolute top-0 right-0 bg-blue-900/90 text-white text-xs p-2 rounded-bl-lg z-50 max-w-xs">
          <div className="font-bold">{label || id}</div>
          <div className="opacity-90">{description}</div>
        </div>
      )}
      
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Performance metrics display */}
      {/* METRICS REASON: Official React patterns for displaying component metrics */}
      {showMetrics && DEBUG_CONFIG.showLabels && (
        <div className="absolute bottom-0 left-0 bg-purple-900/90 text-white text-xs p-1 rounded-tr-lg z-50">
          <div>Section: {id}</div>
          <div>Children: {React.Children.count(children)}</div>
        </div>
      )}
      
      {children}
    </DebugWrapper>
  );
};

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container debugging utilities
 * CONTAINER DEBUG REASON: Official Tailwind CSS patterns for container and layout debugging
 */
interface DebugContainerProps {
  children: ReactNode;
  id: string;
  type?: 'container' | 'wrapper' | 'layout' | 'content';
  className?: string;
}

export const DebugContainer: React.FC<DebugContainerProps> = ({
  children,
  id,
  type = 'container',
  className = ''
}) => {
  const { debugLog } = useDebugInfo('DebugContainer', { id, type });

  if (!isDebugEnabled()) {
    return <>{children}</>;
  }

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Type-based visual distinction
  // TYPE DISTINCTION REASON: Official Tailwind CSS patterns for visual categorization
  const levelMap = {
    container: 'secondary' as const,
    wrapper: 'tertiary' as const,
    layout: 'secondary' as const,
    content: 'quaternary' as const,
  };

  return (
    <DebugWrapper
      label={`${type}-${id}`}
      level={levelMap[type]}
      id={id}
      className={className}
    >
      {children}
    </DebugWrapper>
  );
};

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Component-level debugging utilities
 * COMPONENT DEBUG REASON: Official Tailwind CSS and React patterns for component debugging
 */
interface DebugComponentProps {
  children: ReactNode;
  name: string;
  props?: Record<string, any>;
  showProps?: boolean;
  className?: string;
}

export const DebugComponent: React.FC<DebugComponentProps> = ({
  children,
  name,
  props = {},
  showProps = false,
  className = ''
}) => {
  const { debugLog } = useDebugInfo('DebugComponent', { name, props });

  if (!isDebugEnabled()) {
    return <>{children}</>;
  }

  return (
    <DebugWrapper
      label={name}
      level="tertiary"
      id={name.toLowerCase().replace(/\s+/g, '-')}
      className={className}
    >
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Props debugging and inspection */}
      {/* PROPS DEBUG REASON: Official React patterns for props debugging and inspection */}
      {showProps && DEBUG_CONFIG.showLabels && Object.keys(props).length > 0 && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-900/90 text-white text-xs p-2 rounded-b-lg z-50 max-w-md">
          <div className="font-bold mb-1">Props:</div>
          <pre className="text-xs overflow-auto max-h-32">
            {JSON.stringify(props, null, 2)}
          </pre>
        </div>
      )}
      
      {children}
    </DebugWrapper>
  );
};

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Element-level debugging with precise identification
 * ELEMENT DEBUG REASON: Official HTML and Tailwind CSS patterns for element debugging
 */
interface DebugElementProps {
  children: ReactNode;
  id: string;
  element?: string;
  role?: string;
  interactive?: boolean;
  className?: string;
}

export const DebugElement: React.FC<DebugElementProps> = ({
  children,
  id,
  element = 'div',
  role,
  interactive = false,
  className = ''
}) => {
  const { debugLog } = useDebugInfo('DebugElement', { id, element, role, interactive });

  if (!isDebugEnabled()) {
    return <>{children}</>;
  }

  return (
    <DebugWrapper
      label={`${element}#${id}`}
      level="quaternary"
      id={id}
      className={className}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Interactive element indicators */}
      {/* INTERACTIVE REASON: Official accessibility and interaction pattern indicators */}
      {interactive && DEBUG_CONFIG.showLabels && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full z-50" 
             title="Interactive Element" />
      )}
      
      {/* CONTEXT7 SOURCE: /vercel/next.js - Role-based accessibility indicators */}
      {/* ROLE REASON: Official HTML accessibility patterns for role identification */}
      {role && DEBUG_CONFIG.showLabels && (
        <div className="absolute bottom-1 right-1 bg-indigo-900/90 text-white text-xs px-1 rounded z-50">
          {role}
        </div>
      )}
      
      {children}
    </DebugWrapper>
  );
};

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Global debug overlay system
 * OVERLAY REASON: Official Tailwind CSS patterns for global debugging overlays
 */
interface DebugOverlayProps {
  show?: boolean;
  showStats?: boolean;
}

export const DebugOverlay: React.FC<DebugOverlayProps> = ({
  show = DEBUG_CONFIG.enabled,
  showStats = true
}) => {
  // CONTEXT7 SOURCE: /vercel/next.js - Client-side only rendering with useEffect
  // SSR HYDRATION REASON: Official Next.js patterns for preventing hydration mismatches
  const [isClient, setIsClient] = useState(false);
  const [stats, setStats] = useState({
    timestamp: '',
    config: DEBUG_CONFIG,
    viewport: null as { width: number; height: number; devicePixelRatio: number } | null
  });

  useEffect(() => {
    setIsClient(true);
    // CONTEXT7 SOURCE: /reactjs/react.dev - Development environment information display
    // ENV INFO REASON: Official React patterns for displaying development environment information
    setStats({
      timestamp: new Date().toLocaleTimeString(),
      config: DEBUG_CONFIG,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio
      }
    });
  }, []);

  // CONTEXT7 SOURCE: /vercel/next.js - Prevent server-side rendering for client-only components
  // SSR PREVENTION REASON: Official Next.js patterns to avoid hydration mismatches
  if (!isClient || !show || !isDebugEnabled()) return null;

  return (
    <div className="fixed top-4 left-4 bg-black/80 text-white text-xs p-3 rounded-lg z-[9999] max-w-sm">
      <div className="font-bold text-green-400 mb-2">🐛 Debug Mode Active</div>
      
      {showStats && (
        <div className="space-y-1">
          <div>Time: {stats.timestamp}</div>
          <div>Borders: {stats.config.showBorders ? '✅' : '❌'}</div>
          <div>Labels: {stats.config.showLabels ? '✅' : '❌'}</div>
          <div>Logging: {stats.config.enableLogging ? '✅' : '❌'}</div>
          <div>Data Attrs: {stats.config.addDataAttributes ? '✅' : '❌'}</div>
          <div>Color: {stats.config.colorScheme}</div>
          
          {stats.viewport && (
            <div className="border-t border-gray-600 pt-1 mt-2">
              <div>Viewport: {stats.viewport.width}×{stats.viewport.height}</div>
              <div>DPR: {stats.viewport.devicePixelRatio}</div>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-2 text-gray-400">
        Press F12 → Console for debug logs
      </div>
    </div>
  );
};