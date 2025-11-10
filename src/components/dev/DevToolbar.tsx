'use client';

import React from 'react';
import { usePesticideDebug } from '@/hooks/usePesticideDebug';
export function DevToolbar() {
	const { isDebugMode, toggleDebugMode, isEnabled } = usePesticideDebug();
	if (!isEnabled) {
		return null;
	}
	return (
		<div
			className='fixed bottom-4 left-4 z-50 bg-gray-900 text-white rounded-lg shadow-xl p-2 flex items-center gap-2'
			style={{
				zIndex: 99998,
			}}>
			<div className='flex items-center gap-2 text-xs'>
				<span className='font-mono opacity-50'>DEV</span>

				<button
					onClick={toggleDebugMode}
					className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${isDebugMode ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
					title='Toggle Pesticide CSS Debug Mode (Ctrl/Cmd + Shift + D)'>
					<span className='mr-1'>🐛</span>
					{isDebugMode ? 'Debug ON' : 'Debug OFF'}
				</button>

				<div className='text-xs opacity-50 ml-2'>
					<kbd className='px-1 py-0.5 bg-gray-800 rounded text-[10px]'>
						Ctrl/Cmd + Shift + D
					</kbd>
				</div>
			</div>

			{isDebugMode && (
				<div className='ml-2 flex items-center gap-1'>
					<div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
					<span className='text-[10px] text-green-400'>Visual debugging active</span>
				</div>
			)}
		</div>
	);
}
