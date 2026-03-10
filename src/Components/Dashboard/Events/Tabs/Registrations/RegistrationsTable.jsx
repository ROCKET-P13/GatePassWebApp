import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '../../../../ui/Table';
import { Icon } from '../../../../ui/Icon';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';

export const RegistrationsTable = ({ registrations, sorting, onSortingChange }) => {
	const columns = useMemo(
		() => [
			{
				accessorKey: 'fistName',
				header: 'First Name',
			},
			{
				accessorKey: 'lastName',
				header: 'Last Name',
			},
			{
				accessorKey: 'class',
				header: 'Class',
			},
			{
				accessorKey: 'checkedIn',
				header: 'Checked In',
			},
		],
		[]
	);

	// eslint-disable-next-line react-hooks/incompatible-library
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
								))}
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