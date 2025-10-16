import { verifySession } from '@/lib/auth/dal';
interface ProtectedRouteProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}
export default async function ProtectedRoute({
	children,
	fallback,
}: ProtectedRouteProps) {
	try {
		const session = await verifySession();
		if (session.role !== 'admin') {
			console.warn(
				`Access denied: User ${session.userId} does not have admin privileges`,
			);
			throw new Error('Insufficient privileges');
		}
		return <>{children}</>;
	} catch (error) {
		console.error('ProtectedRoute error:', error);
		return fallback || null;
	}
}
export function ClientProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
