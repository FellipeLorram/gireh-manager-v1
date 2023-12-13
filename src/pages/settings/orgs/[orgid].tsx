import { api } from "@/utils/api"
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

export default function Page() {
	const { data } = api.org.listUserOrgs.useQuery();

	return (
		<div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-center justify-start py-4 gap-4">
			<div className="w-full flex flex-row">
				<Link href="/">
					<ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
				</Link>

				<h1 className="text-xl text-center mx-auto">Óticas</h1>
			</div>

			{/* <div className="w-full flex flex-wrap">
				{data?.map((org) => (
					<></>
				))}

			</div> */}
		</div>
	)
}
