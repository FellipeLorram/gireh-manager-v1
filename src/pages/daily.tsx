import { useRange } from '@/components/layout/daily/atoms';
import { DailyAppointments } from '@/components/layout/daily/daily-appointments';
import { DatePickerWithRange } from '@/components/layout/daily/daily-custom-date-range';
import { DailyEarnsOrders } from '@/components/layout/daily/daily-earns-orders';
import { DailyOrders } from '@/components/layout/daily/daily-orders';
import { DailyPayments } from '@/components/layout/daily/daily-payments';
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button';

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
			<div className='w-full flex flex-row flex-wrap gap-2 mt-8'>
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

			<div className="w-full flex flex-col md:flex-row gap-8 md:gap-2 mt-8">
				<DailyOrders />
				<DailyAppointments />
			</div>

			<div className='mt-8'>
				<DailyPayments />
			</div>
		</DashboardLayout>
	)
}
