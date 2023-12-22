import { z } from "zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/router";

const signinFormSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty({ message: "Senha é obrigatória" }),
});

type SigninFormValues = z.infer<typeof signinFormSchema>;

export default function SigninPage() {
  const { push } = useRouter();
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninFormValues) => {
    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: '/',
    });

    if (response?.error) {
      form.setError("email", {
        type: "manual",
        message: "e-mail ou senha inválidos"
      });

      return;
    }

    await push("/");
  }

  return (
    <div className="mx-auto w-11/12 max-w-xl p-4 flex items-center flex-col gap-10 justify-center h-screen">
      <h1 className="text-5xl font-medium">
        GIRÊH
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="seu@email.com" type="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Senha</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full md:w-auto"
            type="submit">
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  )
}
