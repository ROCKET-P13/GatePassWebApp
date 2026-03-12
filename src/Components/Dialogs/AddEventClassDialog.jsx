import { useMemo } from 'react';
import { addEventClassStore } from '../../Store/addEventClassStore';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Gender } from '../../Common/Gender';
import { Button } from '../ui/Button';
import _ from 'lodash';

export const AddEventClassDialog = ({ open, eventId }) => {
	const {
		closeDialog,
		clearDialog,
		updateEventClassData,
		eventClass,
	} = addEventClassStore((state) => state);

	const createButtonIsDisabled = useMemo(() => {
		return !_.every([
			eventClass.name.length > 2,
			eventClass.name.length < 100,
		]);
	}, [eventClass.name]);

	const handleSubmit = () => {
		closeDialog();
		console.log({ eventClass });
	};

	return (
		<Dialog
			open={open}
			onClose={closeDialog}
			onExited={clearDialog}
		>
			<DialogContent>
				<DialogTitle>Add Class</DialogTitle>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-2'>
					<Input
						label="Name"
						value={eventClass.name}
						onChange={(e) => updateEventClassData({ name: e.target.value })}
					/>
					<Select
						value={eventClass.gender}
						onChange={(gender) => updateEventClassData({ gender })}
					>
						<Select.Trigger label='Gender' placeholder='Gender' />
						<Select.Content maxHeight={48}>
							<Select.Item value={Gender.MALE}>{Gender.MALE}</Select.Item>
							<Select.Item value={Gender.FEMALE}>{Gender.FEMALE}</Select.Item>
							<Select.Item value={Gender.BOTH}>{Gender.BOTH}</Select.Item>
						</Select.Content>
					</Select>
				</div>
				<div className='mb-4 w-50'>
					<Input
						label='Skill Level'
						placeholder='Any'
						type='Text'
						value={eventClass.skillLevel}
						onChange={(e) => updateEventClassData({ skillLevel: e.target.value })}
					/>
				</div>
				<div>
					<h2 className='px-2'>Participant Settings</h2>
				</div>
				<div className='flex flex-row gap-4 mb-4 justify-between border border-border rounded-xl p-5 mt-2'>
					<div>
						<Input
							label='Maximum Age'
							placeholder='Any'
							type='number'
							value={eventClass.maximumAge}
							onChange={(e) => updateEventClassData({ maximumAge: parseInt(e.target.value) })}
						/>
						<Input
							label='Minimum Age'
							type='number'
							placeholder='Any'
							value={eventClass.minimumAge}
							onChange={(e) => updateEventClassData({ minimumAge: parseInt(e.target.value) })}
						/>
					</div>
					<Input
						label='Participant Capacity'
						placeholder='Not Set'
						type='number'
						value={eventClass.participantCapacity}
						onChange={(e) => updateEventClassData({ participantCapacity: parseInt(e.target.value) })}
					/>
				</div>

				<DialogFooter>
					<Button variant='outline' onClick={closeDialog}>Cancel</Button>
					<Button
						variant='default'
						onClick={handleSubmit}
						disabled={createButtonIsDisabled}
					>
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};