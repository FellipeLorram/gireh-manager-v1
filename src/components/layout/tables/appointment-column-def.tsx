import { type Appointment } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";

export const customerPageAppointmentColumnDef: ColumnDef<Appointment>[] = [
	{
		accessorKey: 'createdAt',
		header: 'Data',
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt);
			return date.toLocaleDateString();
		},
	},
];
