import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { CircleDashed } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export function ChangeAvatar() {
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

	// const handleSubmit = () => {
	// 	mutate({ name: username });
	// }

	return (
		<div className="w-full border rounded">
			<div className="p-4">
				<h1 className="text-lg font-medium">
					Imagem
				</h1>
			</div>
		</div>
	)
}
