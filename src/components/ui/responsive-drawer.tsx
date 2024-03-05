import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"

interface Props {
	content: React.ReactNode;
	title: string;
	trigger: React.ReactNode;
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

export function ResponsiveDrawer({
	content,
	title,
	trigger,
	open,
	setOpen,
}: Props) {
	const isDesktop = useMediaQuery("(min-width: 768px)")

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					{trigger}
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] p-0">
					<DialogHeader className="p-4 pb-0">
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>
					{content}
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				{trigger}
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>{title}</DrawerTitle>
				</DrawerHeader>

				{content}

				<DrawerFooter className="pb-4">
					<DrawerClose asChild>
						<Button className="mb-8"variant="outline">Cancelar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

