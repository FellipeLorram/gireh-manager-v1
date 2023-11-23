import { atom, useAtom } from 'jotai';

type range = {
	start: Date;
	end: Date;
	label: string;
}

const today: range = {
	start: new Date(new Date().setHours(0, 0, 0, 0)),
	end: new Date(new Date().setHours(23, 59, 59, 999)),
	label: 'Hoje',
}

const yesterday: range = {
	start: new Date(new Date().setDate(new Date().getDate() - 1)),
	end: new Date(new Date().setDate(new Date().getDate() - 1)),
	label: 'Ontem',
}

const thisWeek: range = {
	start: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
	end: new Date(new Date().setDate(new Date().getDate() + (6 - new Date().getDay()))),
	label: 'Semana',
}

const thisMonth: range = {
	start: new Date(new Date().setDate(1)),
	end: new Date(new Date().setDate(new Date().getDate() + (new Date().getDate() - 1))),
	label: 'Mês',
}


const rangeAtom = atom<range>(today);

export const useRange = () => {
	const [range, setRange] = useAtom(rangeAtom);

	const setToday = () => setRange(today);
	const setYesterday = () => setRange(yesterday);
	const setThisWeek = () => setRange(thisWeek);
	const setThisMonth = () => setRange(thisMonth);
	const setCustom = ({ start, end }: Omit<range, 'label'>) => setRange({ start, end, label: 'Custom' });

	return {
		range,
		setToday,
		setYesterday,
		setThisWeek,
		setThisMonth,
		setCustom,
	}
}
