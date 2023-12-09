import { Menu } from "./menu";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

export function Navbar() {
  const { update } = useSession();
  const { data: org } = api.org.get.useQuery();
  const { data: orgs } = api.org.listUserOrgs.useQuery();

  return (
    <nav className="p-4 pl-8  border-r h-full hidden md:block">
      <Select>
        <SelectTrigger className="w-full">
          {org?.name}
        </SelectTrigger>
        <SelectContent>
          {orgs?.map((org) => (
            <SelectItem
              value={org.org.name}
              key={org.orgId}
              onClick={async () => {
                await update({ orgId: org.orgId });
              }}
            >
              {org.org.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="pr-16">
        <Menu />
      </div>
    </nav>
  )
}
