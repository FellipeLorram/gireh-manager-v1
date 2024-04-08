import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsLayout } from "@/components/layout/settings-layout";
import { ChangeUserPasswordDialog, type NewPasswordFormValues } from "@/components/layout/settings-layout/change-user-password-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed, Eye, EyeOff } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Nome inválido' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().optional(),
})

type FormValues = z.infer<typeof FormSchema>;

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const { data, update, } = useSession();
  const { mutate, isLoading: isMutationLoading } = api.user.update.useMutation({
    onSuccess: async (data) => {
      await update({
        email: data.email,
        name: data.name,
      });

      form.reset({
        name: data?.name ?? '',
        email: data?.email,
      });
    }
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.user.name ?? '',
      email: data?.user.email ?? '',
    }
  });

  async function onSubmit(data: FormValues) {
    mutate(data);

    if (data.password) await signOut();
  }

  function onChangePasswordSubmit(data: NewPasswordFormValues) {
    form.setValue('password', data.password);
  }

  return (
    <DashboardLayout>
      <SettingsLayout>
        <div className="border rounded bg-card">
          <div className="p-4 border-b">
            <h1 className="text-lg font-medium">Suas Informações</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6 w-full p-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="email" type="email" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="p-4 border rounded space-y-4">
                  <FormItem>
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <FormField
                        disabled
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <div className="flex flex-row ">
                            <Input
                              className="flex-1 rounded-r-none"
                              placeholder="Nova Senha"
                              type={showPassword ? "text" : "password"}
                              {...field}
                            />
                            <Button
                              onClick={() => setShowPassword(!showPassword)}
                              type="button"
                              variant="outline"
                              className="rounded-l-none"
                            >
                              {showPassword ? <EyeOff className="w-4 stroke-muted-foreground" /> : <Eye className="w-4" />}
                            </Button>
                          </div>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <ChangeUserPasswordDialog
                    onSubmit={onChangePasswordSubmit}
                  />
                </div>
              </div>

              <div className="p-4 flex justify-end items-center border-t">
                <Button
                  disabled={isMutationLoading}
                  className="w-full md:w-auto"
                  type="submit"
                >
                  {isMutationLoading && <CircleDashed className="animate-spin mr-2" />}
                  Salvar
                </Button>
              </div>

            </form>
          </Form>

        </div>
      </SettingsLayout>
    </DashboardLayout>
  )
}
