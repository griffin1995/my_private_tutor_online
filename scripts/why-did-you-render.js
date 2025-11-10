// CONTEXT7 SOURCE: @welldone-software/why-did-you-render - Official setup for Next.js
// Why Did You Render configuration for development debugging
// Helps identify unnecessary re-renders and component performance issues

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const React = require('react');
  const whyDidYouRender = require('@welldone-software/why-did-you-render');

  whyDidYouRender(React, {
    // Only track components explicitly marked for debugging
    trackAllPureComponents: false,

    // Track hooks that cause unnecessary re-renders
    trackHooks: true,

    // Enhanced logging for LLM analysis
    logOnDifferentValues: true,
    logOwnerReasons: true,

    // Console output formatting for Claude analysis
    consoleLog: {
      use: true,
      expanded: true
    },

    // Include component stack traces
    include: [/.*Section/, /.*Component/, /.*Provider/],

    // Exclude common components that often re-render naturally
    exclude: [/^ForwardRef/, /^Memo/],

    // Enhanced output for debugging
    hotReloadBufferMs: 300,

    // Notification settings
    notifier: (updateInfo) => {
      console.log(
        '%c🔄 Why Did You Render',
        'background: #ff6b35; color: white; padding: 2px 5px; border-radius: 2px; font-weight: bold;',
        updateInfo
      );
    }
  });

  console.log(
    '%c🔍 Why Did You Render - Active (Development Only)',
    'background: #4a90e2; color: white; padding: 5px 10px; font-weight: bold; border-radius: 3px;',
    '\n📋 To track a component: ComponentName.whyDidYouRender = true'
  );
}