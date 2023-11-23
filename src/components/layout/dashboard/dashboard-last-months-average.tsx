import { api } from "@/utils/api";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";


export function DashboardLastMonthsAverage() {
	const { data } = api.reports.lastMonthsAverage.useQuery();
	return (
		<div className="w-full p-4 border rounded overflow-x-auto">
			<p className="mb-8">
				Média de vendas dos últimos 12 meses
			</p>

			<ResponsiveContainer width="100%" height={350}>
				<BarChart data={data}>
					<XAxis
						dataKey="month"
						className="stroke-muted-foreground"
						tickLine={false}
						axisLine={false}
					/>
					<YAxis
						className="stroke-muted-foreground"
						tickLine={false}
						axisLine={false}
						tickFormatter={(value) => `$${value}`}
					/>
					<Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}