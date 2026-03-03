import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';

import { useMemo } from 'react';
import { Link } from '@tanstack/react-router';

import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	TableContainer
} from '../../ui/Table';

import { DeleteEventDialog } from '../Dialog/DeleteEventDialog';
import { EditEventDialog } from '../Dialog/EditEventDialog';

import { editEventStore } from '../../../Store/editEventStore';
import { deleteEventStore } from '../../../Store/deleteEventStore';
import { EventStatusColorClass } from '../../../Common/eventStatus';
import { Routes } from '../../../Common/routes';
import { useEditEventTableMutation } from '../../../hooks/mutations/useEditEventTableMutation';
import { ChevronDown, ChevronUp, ListChevronsUpDown, Pencil, Trash } from 'lucide-react';

export const EventsTable = ({ events, sorting, onSortingChange }) => {
	const queryKey = ['events', sorting];

	const {
		openDialog: openEditEventDialog,
		isOpen: isEditEventDialogOpen,
		eventDraft,
		setEventDraft,
	} = editEventStore((state) => state);

	const {
		openDialog: openDeleteEventDialog,
		isOpen: isDeleteEventDialogOpen,
		setEventToDelete,
		eventToDelete,
	} = deleteEventStore((state) => state);

	const editEventMutation = useEditEventTableMutation({ queryKey });

	const columns = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Event',
				cell: (info) => (
					<Link
						to={`${Routes.DASHBOARD}/${Routes.EVENTS}/$eventId`}
						params={{ eventId: info.row.original.id }}
						className="font-medium text-primary hover:underline"
					>
						{info.getValue()}
					</Link>
				),
			},
			{
				accessorKey: 'date',
				header: 'Date',
			},
			{
				accessorKey: 'startTime',
				header: 'Time',
			},
			{
				accessorKey: 'status',
				header: 'Status',
				cell: (info) => {
					const status = info.getValue();
					return (
						<span className={`px-2 py-1 text-xs rounded-md font-medium ${EventStatusColorClass[status]}`}>
							{status}
						</span>
					);
				},
			},
			{
				id: 'actions',
				header: '',
				enableSorting: false,
				cell: ({ row }) => (
					<div className="flex gap-2">
						<button
							className="p-1 rounded-md hover:bg-muted"
							onClick={() => {
								openEditEventDialog();
								setEventDraft({
									id: row.original.id,
									name: row.original.name,
									status: row.original.status,
									participantCapacity: row.original.participantCapacity,
									startDateTime: row.original.startDateTime,
									startTime: row.original.startDateTime,
									date: row.original.startDateTime,
								});
							}}
						>
							<Pencil fontSize="small" />
						</button>

						<button
							className="p-1 rounded-md hover:bg-muted"
							onClick={() => {
								openDeleteEventDialog();
								setEventToDelete({
									id: row.original.id,
									name: row.original.name,
								});
							}}
						>
							<Trash fontSize="small" />
						</button>
					</div>
				),
			},
		],
		[openEditEventDialog, setEventDraft, openDeleteEventDialog, setEventToDelete]
	);

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data: events,
		columns,
		state: { sorting },
		onSortingChange,
		manualSorting: true,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (

		<TableContainer>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder ? null : (
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
												asc: <ChevronUp fontSize="inherit" />,
												desc: <ChevronDown fontSize="inherit" />,
											}[header.column.getIsSorted()] ?? (
												header.column.getCanSort() && (
													<ListChevronsUpDown />
												)
											)}
										</button>
									)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>

				<TableBody>
					{table.getRowModel().rows.map((row) => (
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
					))}
				</TableBody>
			</Table>

			<DeleteEventDialog
				open={isDeleteEventDialogOpen}
				eventToDelete={eventToDelete}
				queryKey={queryKey}
			/>

			<EditEventDialog
				open={isEditEventDialogOpen}
				eventDraft={eventDraft}
				editEventMutation={editEventMutation}
			/>
		</TableContainer>
	);
};