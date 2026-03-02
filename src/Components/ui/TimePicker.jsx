import dayjs from 'dayjs';
import { Select } from './Select';
import _ from 'lodash';

export const TimePicker = ({ value, onChange }) => {
	const time = value ? dayjs(value) : dayjs();

	const hour = time.format('hh');
	const minute = time.format('mm');
	const period = time.format('A');

	const updateTime = (h = hour, m = minute, p = period) => {
		const newTime = dayjs()
			.hour(
				p === 'PM'
					? (parseInt(h) % 12) + 12
					: parseInt(h) % 12
			)
			.minute(parseInt(m))
			.second(0);

		onChange?.(newTime);
	};

	const hours = _.map(_.range(0, 12), (x) => {
		const res = x + 1;
		return res < 10 ? `0${res}` : res.toString();
	});

	const minutes = _.map(_.range(0, 12), (x) => {
		const res = x * 5;
		return res < 10 ? `0${res}` : res.toString();
	});

	return (
		<div className="flex gap-2">
			<Select value={hour} onChange={(h) => updateTime(h)}>
				<Select.Trigger />
				<Select.Content maxHeight={48}>
					{hours.map((h) => (
						<Select.Item key={h} value={h}>{h}</Select.Item>
					))}
				</Select.Content>
			</Select>

			<Select value={minute} onChange={(m) => updateTime(hour, m)}>
				<Select.Trigger />
				<Select.Content maxHeight={48}>
					{minutes.map((m) => (
						<Select.Item key={m} value={m}>{m}</Select.Item>
					))}
				</Select.Content>
			</Select>

			<Select value={period} onChange={(p) => updateTime(hour, minute, p)}>
				<Select.Trigger />
				<Select.Content>
					<Select.Item value="AM">AM</Select.Item>
					<Select.Item value="PM">PM</Select.Item>
				</Select.Content>
			</Select>
		</div>
	);
};