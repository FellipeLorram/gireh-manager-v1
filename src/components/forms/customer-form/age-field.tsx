import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
	birthDate: string | undefined;
}

export function AgeField({ birthDate }: Props) {
	const age = birthDate ? new Date().getFullYear() - new Date(birthDate).getFullYear() : 0;

	return (
		<FormItem className="w-full">
			<FormLabel className="text-lg">Idade</FormLabel>
			<FormControl>
				<Input
					type="number"
					placeholder="age"
					value={age}
					readOnly
				/>
			</FormControl>
		</FormItem>
	)
}