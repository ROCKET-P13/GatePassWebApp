import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	getSortedRowModel
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	Chip,
	TableSortLabel,
	TableContainer
} from '@mui/material';

import { useMemo, useState } from 'react';

export const PeopleTable = ({ people }) => {
	const [sorting, setSorting] = useState([]);

	const columns = useMemo(() => [
		{
			accessorFn: (row) => `${row.firstName} ${row.lastName}`,
			header: 'Name',
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'role',
			header: 'Role',
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: (info) => (
				<Chip
					label={info.getValue()}
					color={info.getValue() === 'Checked In' ? 'success' : 'default'}
					size="small"
				/>
			),
		},
		{
			accessorKey: 'waiverStatus',
			header: 'Waiver',
			cell: (info) => (
				<Chip
					label={info.getValue()}
					color={info.getValue() === 'Complete' ? 'success' : 'warning'}
					size="small"
				/>
			),
		},
		{
			accessorKey: 'lastEvent',
			header: 'Last Event',
			cell: (info) => info.getValue(),
		},
	], []);

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data: people,
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
		</TableContainer>
	);
};
