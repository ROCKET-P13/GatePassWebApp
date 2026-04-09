import { Link } from '@tanstack/react-router';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, SortingState, OnChangeFn, ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@ui/Checkbox';
import { Icon } from '@ui/Icon';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@ui/Table';
import { Tooltip } from '@ui/Tooltip';
import { ChevronDown, ChevronsUpDown, ChevronUp, Pencil, SquareArrowOutUpRight } from 'lucide-react';
import { useMemo } from 'react';

import { Routes } from '@/Common/routes';
import { checkinParticipantStore } from '@/stores/checkinParticipantStore';
import { EventRegistration } from '@/types/EventRegistration';
interface EventRegistrationsTableProps {
	registrations: EventRegistration[];
	sorting: SortingState;
	onSortingChange: OnChangeFn<SortingState>;
}

export const EventRegistrationsTable = ({ registrations, sorting, onSortingChange }: EventRegistrationsTableProps) => {
	const setParticipantToCheckin = checkinParticipantStore((state) => state.setParticipantToCheckin);
	const openCheckinParticipantDialog = checkinParticipantStore((state) => state.openDialog);

	const columns = useMemo<ColumnDef<EventRegistration>[]>(
		() => [
			{
				accessorKey: 'participantFirstName',
				header: 'First Name',
			},
			{
				accessorKey: 'participantLastName',
				header: 'Last Name',
			},
			{
				accessorKey: 'eventNumber',
				header: 'Event Number',
			},
			{
				accessorKey: 'class',
				header: 'Class',
			},
			{
				accessorKey: 'checkedIn',
				header: 'Checked In',
				cell: (info) => {
					const registration = info.row.original;
					return (
						<Checkbox
							checked={registration.checkedIn}
							className='opacity-100'
							disabled={registration.checkedIn}
							onChange={() => {
								if (registration.checkedIn) {
									return;
								}
								setParticipantToCheckin({
									id: registration.participantId,
									firstName: registration.participantFirstName,
									lastName: registration.participantLastName,
								});
								openCheckinParticipantDialog();
							}}
						/>
					);
				},
			},
			{
				accessorKey: 'actions',
				header: 'Actions',
				cell: ({ row }) => (
					<div className='flex gap-2'>
						<Tooltip content="Edit Registration">
							<button
								className="p-1 rounded-md hover:bg-muted hover:cursor-pointer"
								onClick={() => console.log(row.original)}
							>
								<Icon as={Pencil} />
							</button>
						</Tooltip>

						<Tooltip content="View Particpant">
							<Link
								to={`${Routes.DASHBOARD}/${Routes.PARTICIPANTS}/$participantId`}
								params={{ participantId: row.original.participantId }}
								target='_blank'
							>
								<button className='p-1 rounded-md hover:bg-muted hover:cursor-pointer'>
									<Icon as={SquareArrowOutUpRight} />
								</button>
							</Link>
						</Tooltip>

					</div>
				),
			},
		],
		[openCheckinParticipantDialog, setParticipantToCheckin]
	);

	const table = useReactTable({
		data: registrations,
		columns,
		state: { sorting },
		onSortingChange,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<TableContainer>
			<Table>
				<TableHeader>
					{
						table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{
									headerGroup.headers.map((header) => (
										<TableHead key={header.id}>
											{
												header.isPlaceholder ? null : (
													<button
														onClick={header.column.getToggleSortingHandler()}
														className="flex items-center gap-2"
													>
														{
															flexRender(
																header.column.columnDef.header,
																header.getContext()
															)
														}
														{{
															asc: <Icon as={ChevronUp} />,
															desc: <Icon  as={ChevronDown} />,
														}[header.column.getIsSorted() as string] ?? (
															header.column.getCanSort() && (
																<Icon as={ChevronsUpDown} />
															)
														)}
													</button>
												)
											}
										</TableHead>
									))
								}
							</TableRow>
						))
					}
				</TableHeader>

				<TableBody>
					{
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								className="hover:bg-muted/50 transition-colors"
							>
								{
									row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{
												flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)
											}
										</TableCell>
									))
								}
							</TableRow>
						))
					}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
