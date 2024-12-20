import { OrderForm } from "@/components/forms/order-form";
import { type OrderFormFields } from "@/components/forms/order-form/form-schema";
import { CentralizedLayout } from "@/components/layout/centralized-layout";
import CustomerInfo from "@/components/layout/customer/customer-info";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { CircleDashed } from "lucide-react";
import { useRouter } from "next/router";

export default function Page() {
	const { toast } = useToast();
	const { push, query } = useRouter();
	const { mutate, isLoading } = api.order.update.useMutation({
		onSuccess: async ({ id }) => {
			toast({
				description: 'Venda editada com sucesso!',
			});

			await push(`/orders/${id}`);
		},
		onError: (error) => {
			toast({
				title: 'Volte e edite os pagamentos',
				description: error.message,
			});
		}
	});

	const { data: order } = api.order.get.useQuery({
		id: query.orderid as string,
	});

	const frames = order?.Frame.map(frame => ({
		...frame,
		price: frame.price.toString(),
		height: frame.height?.toString() ?? '',
		reference: frame.reference ?? '',
		image_url: frame.image_url ?? '',
		supplier: frame.supplier ?? '',
		orderId: frame.orderId ?? '',
	})) ?? [];

	const lenses = order?.Lenses.map(lens => ({
		...lens,
		price: lens.price.toString(),
	})) ?? [];

	const onSubmit = (data: OrderFormFields) => {
		mutate({
			...data,
			id: query.orderid as string,
			axle_left: Number(data.axle_left),
			axle_right: Number(data.axle_right),
			total: Number(data.total),
			dnp_left: Number(data.dnp_left),
			dnp_right: Number(data.dnp_right),
			frame: data.frame?.map(frame => ({
				...frame,
				price: Number(frame.price),
				height: Number(frame.heightOd),
				heightOe: Number(frame.heightOe),
				id: frame.id ?? '',
			})) ?? [],
			lenses: data.lenses?.map(lens => ({
				...lens,
				price: Number(lens.price),
			})) ?? [],
		});
	}

	return (
		<CentralizedLayout>
			<CustomerInfo
				// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
				id={order?.customerId as string}
			/>
			<div className="w-full mt-4">
				<OrderForm
					onSubmit={onSubmit}
					defaultValues={{
						esf_right: order?.esf_right ?? '-0.00',
						cil_right: order?.cil_right ?? '-0.00',
						axle_right: order?.axle_right?.toString() ?? '0',
						dnp_right: order?.dnp_right?.toString() ?? '0',
						esf_left: order?.esf_left ?? '-0.00',
						cil_left: order?.cil_left ?? '-0.00',
						axle_left: order?.axle_left?.toString() ?? '0',
						dnp_left: order?.dnp_left?.toString() ?? '0',
						add: order?.add ?? '-0.00',
						frame: frames.map(frame => ({
							...frame,
							heightOd: frame.height,
							heightOe: frame.heightOe?.toString() ?? '',
						})) ?? [],
						lenses: lenses,
						observation: order?.observation ?? '',
						total: order?.total ?? 0,
					}}
					SubmitButton={
						<Button
							disabled={isLoading}
							className="w-full mt-4 md:w-auto"
							type="submit"
						>
							{isLoading ? (
								<CircleDashed className="animate-spin" size={16} />
							) : "Salvar Alterações"}
						</Button>
					}
				/>
			</div>
		</CentralizedLayout>

	)
}
