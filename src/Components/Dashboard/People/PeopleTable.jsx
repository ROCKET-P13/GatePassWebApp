import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	getSortedRowModel
} from '@tanstack/react-table';

import { useMemo, useState } from 'react';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	TableContainer
} from '../../ui/Table';

export const PeopleTable = ({ people }) => {
	const [sorting, setSorting] = useState([]);

	const columns = useMemo(
		() => [
			{
				accessorFn: (row) => `${row.firstName} ${row.lastName}`,
				id: 'name',
				header: 'Name',
			},
			{
				accessorKey: 'role',
				header: 'Role',
			},
			{
				accessorKey: 'status',
				header: 'Status',
				cell: (info) => {
					const value = info.getValue();
					const isCheckedIn = value === 'Checked In';

					return (
						<span
							className={`px-2 py-1 text-xs rounded-md font-medium ${
                isCheckedIn
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                  : 'bg-muted text-muted-foreground'
              }`}
						>
							{value}
						</span>
					);
				},
			},
			{
				accessorKey: 'waiverStatus',
				header: 'Waiver',
				cell: (info) => {
					const value = info.getValue();
					const isComplete = value === 'Complete';

					return (
						<span
							className={`px-2 py-1 text-xs rounded-md font-medium ${
                isComplete
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
              }`}
						>
							{value}
						</span>
					);
				},
			},
			{
				accessorKey: 'lastEvent',
				header: 'Last Event',
			},
		],
		[]
	);

	const table = useReactTable({
		data: people,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
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
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}

											{{
												asc: <ArrowUpwardIcon fontSize="inherit" />,
												desc: <ArrowDownwardIcon fontSize="inherit" />,
											}[header.column.getIsSorted()] ?? (
												header.column.getCanSort() && (
													<UnfoldMoreIcon fontSize="inherit" />
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