import Link from 'next/link';
import { useRange } from '@/components/layout/dashboard/atoms';
import { DailyAppointments } from '@/components/layout/dashboard/daily-appointments';
import { DatePickerWithRange } from '@/components/layout/dashboard/daily-custom-date-range';
import { DailyEarnsOrders } from '@/components/layout/dashboard/daily-earns-orders';
import { DailyOrders } from '@/components/layout/dashboard/daily-orders';
import { DailyPayments } from '@/components/layout/dashboard/daily-payments';
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button, buttonVariants } from '@/components/ui/button';

export default function Page() {
	const {
		range,
		setToday,
		setYesterday,
		setThisMonth,
		setThisWeek,
	} = useRange();

	return (
		<DashboardLayout>
			<Link
				className={buttonVariants({ className: 'w-full mb-4 md:hidden' })}
				href="/customers/new">
				Novo Cliente
			</Link>
			<div className='w-full flex flex-row flex-wrap gap-2'>
				<Button
					size="sm"
					onClick={setToday}
					variant={range.label === 'Hoje' ? 'secondary' : 'outline'}
				>
					Hoje
				</Button>
				<Button
					size="sm"
					onClick={setYesterday}
					variant={range.label === 'Ontem' ? 'secondary' : 'outline'}
				>
					Ontem
				</Button>
				<Button
					size="sm"
					onClick={setThisWeek}
					variant={range.label === 'Semana' ? 'secondary' : 'outline'}
				>
					Semana
				</Button>
				<Button
					size="sm"
					onClick={setThisMonth}
					variant={range.label === 'Mês' ? 'secondary' : 'outline'}
				>
					Mês
				</Button>
				<DatePickerWithRange />
			</div>

			<DailyEarnsOrders />

			<div className="w-full flex flex-col md:flex-row gap-4 md:gap-2 mt-4">
				<DailyOrders />
				<DailyPayments />
			</div>

			<div className='mt-4'>
				<DailyAppointments />
			</div>
		</DashboardLayout>
	)
}
