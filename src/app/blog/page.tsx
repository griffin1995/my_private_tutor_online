'use client';

import React from 'react';
import { BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import { m } from 'framer-motion';
import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientOverlay } from '@/components/ui/gradient-overlay';
import { WaveSeparator } from '@/components/ui/wave-separator';
export default function BlogPage() {
	return (
		<>
			{}
			{}
			{}
			{}
			<section id='blog-hero'>
				<SimpleHero
					backgroundImage='/images/hero/hero-exam-papers.jpg'
					h1='Educational Blog & Resources'
					h2='Coming Soon'
					decorativeStyle='lines'
				/>
			</section>
		</>
	);
}
