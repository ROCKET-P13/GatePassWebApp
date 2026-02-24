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
	TableSortLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useMemo } from 'react';
import { DeleteEventDialog } from '../Dialog/DeleteEventDialog';
import { EditEventDialog } from '../Dialog/EditEventDialog';
import { editEventStore } from '../../../Store/editEventStore';
import { Link } from '@tanstack/react-router';
import { Routes } from '../../../Common/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EventsAPI } from '../../../API/EventsAPI';
import { useAuth0 } from '@auth0/auth0-react';
import _ from 'lodash';
import { deleteEventStore } from '../../../Store/deleteEventStore';
import { EventStatusColorClass } from '../../../Common/eventStatus';

export const EventsTable = ({ events, sorting, onSortingChange }) => {
	const { getAccessTokenSilently } = useAuth0();
	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

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

	const queryClient = useQueryClient();

	const editEventMutation = useMutation({
		mutationFn: (event) => eventsAPI.update(event),
		onMutate: async (updatedEvent) => {
			await queryClient.cancelQueries({ queryKey });

			const previousEvents = queryClient.getQueryData(queryKey);

			queryClient.setQueryData(
				queryKey,
				(oldEvents = []) => _.map(oldEvents, (event) => {
					return event.id === updatedEvent.id
						? {
							...event,
							...updatedEvent,
							isOptimistic: true,
						}
						: event;
				})
			);
			;
			return { previousEvents };
		},
		onError: (_err, _vars, context) => {
			queryClient.setQueryData(
				queryKey,
				context.previousEvents
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});

	const columns = useMemo(() => [
		{
			accessorKey: 'name',
			header: 'Event',
			cell: (info) => (
				<Link
					to={`${Routes.DASHBOARD}/${Routes.EVENTS}/$eventId`}
					params={{ eventId: info.row.original.id }}
				>
					{info.getValue()}
				</Link>
			),
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
					color={EventStatusColorClass[info.getValue()]}
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
							openDeleteEventDialog();
							setEventToDelete({
								id: row.original.id,
								name: row.original.name,
							});
						}}
					>
						<DeleteIcon fontSize="small" />
					</IconButton>
				</Stack>
			),
		},
	], [openEditEventDialog, setEventDraft, openDeleteEventDialog, setEventToDelete]);

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

			{
				isDeleteEventDialogOpen
				&& <DeleteEventDialog
					open={isDeleteEventDialogOpen}
					eventToDelete={eventToDelete}
					queryKey={queryKey}
				/>
			}
			{
				isEditEventDialogOpen
				&& <EditEventDialog
					open={isEditEventDialogOpen}
					eventDraft={eventDraft}
					editEventMutation={editEventMutation}
				/>
			}

		</TableContainer>
	);
};