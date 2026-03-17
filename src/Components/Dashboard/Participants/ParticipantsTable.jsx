import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	getSortedRowModel
} from '@tanstack/react-table';

import { useMemo } from 'react';

import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	TableContainer
} from '../../ui/Table';
import { ChevronDown, ChevronsUpDown, ChevronUp, Pencil, Trash } from 'lucide-react';
import { Icon } from '../../ui/Icon';

export const ParticipantsTable = ({ participants, sorting, onSortingChange }) => {
	const columns = useMemo(
		() => [
			{
				accessorKey: 'firstName',
				header: 'First Name',
			},
			{
				accessorKey: 'lastName',
				header: 'Last Name',
			},
			{
				accessorKey: 'createdAt',
				header: 'Participant Since',
			},
			{
				id: 'actions',
				header: '',
				enableSorting: false,
				cell: ({ row }) => (
					<div className="flex gap-2">
						<button
							className="p-1 rounded-md hover:bg-muted"
							onClick={() => console.log(row.original)}
						>
							<Icon as={Pencil} />
						</button>

						<button
							className="p-1 rounded-md hover:bg-muted"
							onClick={() => console.log(row.original)}
						>
							<Icon as={Trash} />
						</button>
					</div>
				),
			},
		],
		[]
	);

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data: participants,
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
					{
						table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{
									headerGroup.headers.map((header) => (
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
														asc: <Icon as={ChevronUp} />,
														desc: <Icon  as={ChevronDown} />,
													}[header.column.getIsSorted()] ?? (
														header.column.getCanSort() && (
															<Icon as={ChevronsUpDown} />
														)
													)}
												</button>
											)}
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