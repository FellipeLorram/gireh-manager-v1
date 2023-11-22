import {
	type Org,
	type Order,
	type Frame,
	type Lenses,
	type Payments,
} from "@prisma/client";
import { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
import {
	Table,
	TableBody,
	TableRow,
	TableCell,
} from "../ui/table";

type OrderWithItems = Order & {
	Frame: Frame[];
	Lenses: Lenses[];
	Payments: Payments[];
}

interface Props {
	order: OrderWithItems;
	org: Org;
}

export function PrintLaborCopy({ order, org }: Props) {
	const componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	return (
		<>
			<Button
				className="w-full md:w-auto"
				onClick={handlePrint}
				variant="outline"
			>
				Via Laboratório
			</Button>
			<div className="hidden">
				<LaborCopy ref={componentRef} order={order} org={org} />
			</div>
		</>
	)
}

export const LaborCopy = forwardRef<HTMLDivElement, Props>(({
	order,
	org
}, ref) => {
	return (
		<div ref={ref} className="w-1/2 border border-dashed bg-white text-gray-900">
			<div className="w-full p-4 flex flex-row justify-between gap-4 bg-gradient-to-b from-gray-400 to-white">
				<p className="text-lg font-semibold">
					{org.name}
				</p>
				<div className="text-right">
					<p className="text-xs font-medium">
						{order.createdAt.toLocaleDateString()}
					</p>
					<p className="text-xs font-medium">
						Ordem de serviço: {order.service_order}
					</p>
				</div>
			</div>

			<div className="w-11/12 mx-auto py-4">
				<Table>
					<TableBody>
						<TableRow>
							<TableCell />
							<TableCell className="p-1 text-xs">Esf</TableCell>
							<TableCell className="p-1 text-xs">Cil</TableCell>
							<TableCell className="p-1 text-xs">Eixo</TableCell>
							<TableCell className="p-1 text-xs">DNP</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 text-xs">OD</TableCell>
							<TableCell className="p-1 text-xs">{order.esf_right}</TableCell>
							<TableCell className="p-1 text-xs">{order.cil_right}</TableCell>
							<TableCell className="p-1 text-xs">{order.axle_right}</TableCell>
							<TableCell className="p-1 text-xs">{order.dnp_right}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 text-xs">OD</TableCell>
							<TableCell className="p-1 text-xs">{order.esf_left}</TableCell>
							<TableCell className="p-1 text-xs">{order.cil_left}</TableCell>
							<TableCell className="p-1 text-xs">{order.axle_left}</TableCell>
							<TableCell className="p-1 text-xs">{order.dnp_left}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 text-xs">ADD</TableCell>
							<TableCell />
							<TableCell className="p-1 text-xs">{order.add}</TableCell>
							<TableCell />
						</TableRow>
					</TableBody>
				</Table>

				<Table className="mt-2">
					<TableBody>
						<TableRow>
							<TableCell className="p-1 text-xs">
								Armação
							</TableCell>
							<TableCell className="p-1 text-xs">
								Altura
							</TableCell>
						</TableRow>
						{order.Frame.map((frame) => (
							<TableRow key={frame.id}>
								<TableCell className="p-1 text-xs">
									{frame.name}
								</TableCell>
								<TableCell className="p-1 text-xs">
									{frame.height}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<Table className="mt-2">
					<TableBody>
						<TableRow>
							<TableCell className="p-1 text-xs">
								Lentes
							</TableCell>
						</TableRow>
						{order.Lenses.map((frame) => (
							<TableRow key={frame.id}>
								<TableCell className="p-1 text-xs">
									{frame.name}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<div className="w-full mt-2 p-2 border-b" />
				<div className="w-full p-2 border-b" />
				<div className="w-full p-2 border-b" />
			</div>
		</div>
	);
});

LaborCopy.displayName = 'LaborCopy';
