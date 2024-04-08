import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";

interface Props {
	children: React.ReactNode
}

export function CentralizedLayout({ children }: Props) {
	const { back } = useRouter();

	return (
		<div className='w-11/12 mx-auto max-w-3xl py-4 pb-12 relative'>
			<div
				onClick={back}
				className='flex items-center justify-center rounded-md border mb-4 md:absolute md:mb-0 w-8 h-8 -left-12 top-4 cursor-pointer group bg-card'
			>
				<ChevronLeft className='cursor-pointer w-4 stroke-muted-foreground group-hover:stroke-foreground duration-200 ease-in-out' />
			</div>
			{children}
		</div>
	)
}
