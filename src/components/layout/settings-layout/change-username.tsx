import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { CircleDashed } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export function ChangeUsername() {
	const { data } = useSession();
	const { toast } = useToast();
	const [username, setUsername] = useState(data?.user?.name ?? '')
	const { mutate, isLoading } = api.user.update.useMutation({
		onSuccess: () => {
			toast({
				title: 'Nome de usuário atualizado',
			})
		},
		onError: () => {
			toast({
				title: 'Erro ao atualizar nome de usuário',
			})
		}
	})

	const handleSubmit = () => {
		mutate({ name: username });
	}

	return (
		<div className="w-full border rounded">
			<div className="p-4">
				<Label className="flex flex-col gap-4">
					<p className="text-lg">
						Nome de usuário
					</p>
					<Input
						value={username}
						onChange={e => setUsername(e.target.value)}
						placeholder="Digite seu nome de usuário"
					/>
				</Label>
			</div>
			<div className="w-full border-t p-4 flex justify-end flex-row">
				<Button
					onClick={handleSubmit}
					disabled={isLoading}
				>
					{isLoading && <CircleDashed className="w-5 animate-spin mr-2" />}
					Salvar
				</Button>
			</div>
		</div>
	)
}
