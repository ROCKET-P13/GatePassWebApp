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
import { useMemo, useState } from 'react';

const statusColor = (status) => {
	switch (status) {
		case 'Live':
			return 'success';
		case 'Upcoming':
			return 'warning';
		default:
			return 'default';
	}
};

export const EventsTable = ({ events }) => {
	const [sorting, setSorting] = useState([]);

	const columns = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Event',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'date',
				header: 'Date',
				cell: (info) =>
					new Date(info.getValue()).toLocaleDateString(),
			},
			{
				accessorKey: 'status',
				header: 'Status',
				cell: (info) => (
					<Chip
						label={info.getValue()}
						color={statusColor(info.getValue())}
						size="small"
					/>
				),
			},
			{
				id: 'actions',
				header: '',
				cell: () => (
					<Stack direction="row" spacing={1}>
						<IconButton size="small">
							<EditIcon fontSize="small" />
						</IconButton>
						<IconButton size="small" color="error">
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Stack>
				),
			},
		],
		[]
	);

	const table = useReactTable({
		data: events,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<TableContainer component={Paper}>
			<Table size="small">
				<TableHead>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableCell key={header.id}>
									{header.isPlaceholder ? null : (
										<TableSortLabel
											active={header.column.getIsSorted()}
											direction={header.column.getIsSorted() || 'asc'}
											onClick={header.column.getToggleSortingHandler()}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
										</TableSortLabel>
									)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>

				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow key={row.id} hover>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
