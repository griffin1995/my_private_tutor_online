import { verifySession } from '@/lib/auth/dal';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
	children: ReactNode;
	fallback?: ReactNode;
}

export default async function ProtectedRoute({
	children,
	fallback,
}: ProtectedRouteProps): Promise<JSX.Element> {
	try {
		const session = await verifySession();
		if (session.role !== 'admin') {
			console.warn(
				`Access denied: User ${session.userId} does not have admin privileges`,
			);
			return fallback ? <>{fallback}</> : <div>Unauthorized</div>;
		}
		return <>{children}</>;
	} catch (error) {
		console.error('ProtectedRoute error:', error);
		return fallback ? <>{fallback}</> : <div>Unauthorized</div>;
	}
}
export function ClientProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
