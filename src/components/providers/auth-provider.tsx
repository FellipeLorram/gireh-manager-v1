import { CircleDashed } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const { status } = useSession();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/auth/signin');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);

	if (status === 'authenticated' || pathname === '/auth/signin') {
		return children;
	}

	return <div className='h-screen w-full flex items-center justify-center'>
		<CircleDashed className='animate-spin' size={64} />
	</div>;
}
