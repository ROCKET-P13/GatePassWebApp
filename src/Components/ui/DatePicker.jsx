import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';
import { Button } from './Button';

export const DatePicker = ({ value, onChange }) => {
	const [currentMonth, setCurrentMonth] = useState(value || dayjs());

	const selected = value ? dayjs(value) : dayjs();

	const buildCalendarDays = (month) => {
		const start = month.startOf('month').startOf('week');
		const end = month.endOf('month').endOf('week');

		const days = [];
		let day = start;

		while (day.isBefore(end) || day.isSame(end, 'day')) {
			days.push(day);
			day = day.add(1, 'day');
		}

		return days;
	};

	const currentDays = useMemo(
		() => buildCalendarDays(currentMonth),
		[currentMonth]
	);

	const changeMonth = (dir) => {
		setCurrentMonth((prev) =>
			dir > 0 ? prev.add(1, 'month') : prev.subtract(1, 'month')
		);
	};

	const renderGrid = (days, month) => (
		<div className="grid grid-cols-7 gap-1 text-center text-sm">
			{days.map((day) => {
				const isCurrentMonth = day.month() === month.month();
				const isSelected = selected && day.isSame(selected, 'day');

				return (
					<button
						key={day.toString()}
						onClick={() => onChange?.(day)}
						className={mergeTailwindClasses(
							'h-8 w-8 rounded-md text-sm transition-colors',
							isCurrentMonth ? 'hover:bg-accent' : 'opacity-30',
							isSelected && 'bg-primary text-primary-foreground'
						)}
					>
						{day.date()}
					</button>
				);
			})}
		</div>
	);

	return (
		<div className="space-y-4 p-2">
			<div className="flex justify-between items-center">
				<Button size="sm" variant="ghost" onClick={() => changeMonth(-1)}>
					◀
				</Button>

				<div className="font-medium">
					{currentMonth.format('MMMM YYYY')}
				</div>

				<Button size="sm" variant="ghost" onClick={() => changeMonth(1)}>
					▶
				</Button>
			</div>

			<div className="h-40">
				{renderGrid(currentDays, currentMonth)}
			</div>
		</div>
	);
};