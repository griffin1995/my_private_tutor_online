'use client';

import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100'>
			<div className='max-w-2xl mx-auto p-8 text-center'>
				<div className='bg-white rounded-2xl shadow-xl border border-slate-200 p-12'>
					<div className='flex justify-center mb-6'>
						<div className='text-8xl text-slate-300'>404</div>
					</div>

					<h1 className='text-3xl mb-4'>Page Not Found</h1>

					<p className='text-lg mb-8 leading-relaxed'>
						We apologise, but the page you are looking for could not be found. Our
						premium tutoring service continues to be available through our main
						navigation.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Link
							href='/'
							className='inline-flex items-center justify-center px-6 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors'>
							Return Home
						</Link>

						<Link
							href='/subject-tuition'
							className='inline-flex items-center justify-center px-6 py-3 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors'>
							Browse Subjects
						</Link>

						<Link
							href='/contact'
							className='inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors'>
							Contact Us
						</Link>
					</div>

					<div className='mt-8 pt-6 border-t border-slate-200'>
						<p className='text-sm text-slate-500'>
							If you believe this is an error, please contact our support team.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
