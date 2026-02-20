import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Chip,
	IconButton,
	Stack,
	TableSortLabel,
	Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useMemo, useState } from 'react';
import { DeleteEventDialog } from '../Dialog/DeleteEventDialog';
import { EditEventDialog } from '../Dialog/EditEventDialog';
import { editEventStore } from '../../../Store/editEventStore';
import { Link, useNavigate } from '@tanstack/react-router';
import { Routes } from '../../../Common/routes';

const EventStatusColor = Object.freeze({
	LIVE: 'success',
	SCHEDULED: 'warning',
});

export const EventsTable = ({ events, sorting, onSortingChange }) => {
	const [eventToDelete, setEventToDelete] = useState(null);
	const [isDeleteEventDialogOpen, setisDeleteEventDialogOpen] = useState(false);

	const navigate = useNavigate();

	const {
		openDialog: openEditEventDialog,
		isOpen: isEditEventDialogOpen,
		eventDraft,
		setEventDraft,
	} = editEventStore((state) => state);

	const columns = useMemo(() => [
		{
			accessorKey: 'name',
			header: 'Event',
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'date',
			header: 'Date',
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'startTime',
			header: 'Time',
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: (info) => (
				<Chip
					label={info.getValue()}
					color={EventStatusColor[info.getValue().toUpperCase()] ?? 'default'}
					size="small"
				/>
			),
		},
		{
			id: 'actions',
			header: '',
			cell: ({ row }) => (
				<Stack direction="row" spacing={1}>
					<IconButton
						size="small"
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
						<EditIcon fontSize="small" />
					</IconButton>
					<IconButton
						size="small"
						color="error"
						onClick={() => {
							setisDeleteEventDialogOpen(true);
							setEventToDelete(row.original);
						}}
					>
						<DeleteIcon fontSize="small" />
					</IconButton>
					<IconButton
						size='small'
						onClick={() => navigate({
							to: `${Routes.DASHBOARD}/${Routes.EVENTS}/$eventId`,
							params: { eventId: row.original.id },
						})}
					>
						<Typography variant='h5' color='white'>View</Typography>
					</IconButton>

				</Stack>
			),
		},
	], [openEditEventDialog, setEventDraft, navigate]);

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
		<TableContainer component={Paper}>
			<Table size="small">
				<TableHead>
					{
						table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{
									headerGroup.headers.map((header) => (
										<TableCell key={header.id}>
											{
												header.isPlaceholder
													? null
													: (
														<TableSortLabel
															active={header.column.getIsSorted()}
															direction={header.column.getIsSorted() || 'asc'}
															onClick={header.column.getToggleSortingHandler()}
														>
															{
																flexRender(
																	header.column.columnDef.header,
																	header.getContext()
																)
															}
														</TableSortLabel>
													)
											}
										</TableCell>
									))
								}
							</TableRow>
						))
					}
				</TableHead>

				<TableBody>
					{
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} hover>
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

			<DeleteEventDialog
				open={isDeleteEventDialogOpen}
				eventToDelete={eventToDelete}
				onClose={() => {
					setisDeleteEventDialogOpen(false);
				}}
				onExited={() => setEventToDelete(null)}
				sorting={sorting}
			/>
			{
				isEditEventDialogOpen
				&& <EditEventDialog
					open={isEditEventDialogOpen}
					eventDraft={eventDraft}
					sorting={sorting}
				/>
			}

		</TableContainer>
	);
};
