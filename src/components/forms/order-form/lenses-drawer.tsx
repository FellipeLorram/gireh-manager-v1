import { useCallback, useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { type OrderFormFields } from "./form-schema";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ResponsiveDrawer } from "@/components/ui/responsive-drawer";

interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function LensesDrawer({ form }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<ResponsiveDrawer
			title="Adicionar Lente"
			open={open}
			setOpen={setOpen}
			trigger={<Button variant="secondary">
				Adicionar
			</Button>}
			content={
				<Tabs defaultValue="default" className="w-full p-4">
					<TabsList className="w-full">
						<TabsTrigger className="w-full" value="default">Padrão</TabsTrigger>
						<TabsTrigger className="w-full" value="other">Outra</TabsTrigger>
					</TabsList>

					<DefaultTabs form={form} setOpen={setOpen} />
					<OtherTabs form={form} setOpen={setOpen} />
				</Tabs>
			}
		/>
	)
}

interface TabsProps extends Props {
	setOpen: (value: boolean) => void;
}

const DefaultTabs = ({ form, setOpen }: TabsProps) => {
	const [lensesValues, setLensesValues] = useState({
		type: "",
		material: "",
		treatment: "",
		price: "",
	});

	const onAddClick = useCallback(() => {
		const isEveryFieldFilled = Object.values(lensesValues).every((value) => value !== "");

		if (!isEveryFieldFilled) {
			return;
		}

		form.setValue("lenses", [...(form.getValues().lenses ?? []), {
			name: `${lensesValues.type} ${lensesValues.material} ${lensesValues.treatment}`,
			price: lensesValues.price,
			id: Math.random().toString(36).slice(2, 11),
		}]);

		setLensesValues({
			type: "",
			material: "",
			treatment: "",
			price: "",
		});
		setOpen(false)
	}, [form, lensesValues, setOpen])

	return <TabsContent value="default">
		<Label>
			Tipo
			<Select
				value={lensesValues.type}
				onValueChange={(value) => setLensesValues((prev) => ({ ...prev, type: value }))}
			>
				<SelectTrigger className="w-full mt-2 mb-4">
					<SelectValue placeholder="tipo" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="Visão simples">Visão Simples</SelectItem>
					<SelectItem value="Multifocal">Multifocal</SelectItem>
				</SelectContent>
			</Select>
		</Label>

		<Label>
			Material
			<Select
				value={lensesValues.material}
				onValueChange={(value) => setLensesValues((prev) => ({ ...prev, material: value }))}
			>
				<SelectTrigger className="w-full mt-2 mb-4">
					<SelectValue placeholder="material" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="Resina">Resina</SelectItem>
					<SelectItem value="Policarbonato">Policarbonato</SelectItem>
					<SelectItem value="1.61">Resina 1.61</SelectItem>
					<SelectItem value="1.67">Resina 1.67</SelectItem>
					<SelectItem value="1.70">Resina 1.70</SelectItem>
					<SelectItem value="1.74">Resina 1.74</SelectItem>
				</SelectContent>
			</Select>
		</Label>

		<Label>
			Tratamento
			<Select
				value={lensesValues.treatment}
				onValueChange={(value) => setLensesValues((prev) => ({ ...prev, treatment: value }))}
			>
				<SelectTrigger className="w-full mt-2 mb-4">
					<SelectValue placeholder="tratamento" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="Branca">Branca</SelectItem>
					<SelectItem value="Antirreflexo">Antirreflexo</SelectItem>
					<SelectItem value="Blue Cut">Blue Cut</SelectItem>
					<SelectItem value="Foto AR">Foto AR</SelectItem>
					<SelectItem value="Foto Blue">Foto Blue</SelectItem>
				</SelectContent>
			</Select>
		</Label>

		<Label>
			Preço
			<Input
				value={lensesValues.price}
				onChange={(e) => setLensesValues((prev) => ({ ...prev, price: e.target.value }))}
				className="w-full mt-2 mb-4"
				placeholder="preço"
				type="number"
			/>
		</Label>

		<Button onClick={onAddClick} className="w-full">
			Adicionar
		</Button>
	</TabsContent>
}

const OtherTabs = ({ form, setOpen }: TabsProps) => {
	const [lensesValues, setLensesValues] = useState({
		lenses: "",
		price: "",
	});

	const onAddClick = useCallback(() => {
		const isEveryFieldFilled = Object.values(lensesValues).every((value) => value !== "");

		if (!isEveryFieldFilled) {
			return;
		}

		form.setValue("lenses", [...(form.getValues().lenses ?? []), {
			name: lensesValues.lenses,
			price: lensesValues.price,
			id: Math.random().toString(36).slice(2, 11),
		}]);

		setLensesValues({
			lenses: "",
			price: "",
		});
		setOpen(false)
	}, [lensesValues, form, setOpen])

	return <TabsContent value="other">
		<Label>
			Lente
			<Input
				value={lensesValues.lenses}
				onChange={(e) => setLensesValues((prev) => ({ ...prev, lenses: e.target.value }))}
				className="w-full mt-2 mb-4"
				placeholder="lente"
			/>
		</Label>

		<Label>
			Preço
			<Input
				value={lensesValues.price}
				onChange={(e) => setLensesValues((prev) => ({ ...prev, price: e.target.value }))}
				className="w-full mt-2 mb-4"
				placeholder="preço"
				type="number"
			/>
		</Label>

		<Button onClick={onAddClick} className="w-full">
			Adicionar
		</Button>

	</TabsContent>
}
