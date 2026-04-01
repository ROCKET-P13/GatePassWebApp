import { flexRender, getCoreRowModel, getSortedRowModel, OnChangeFn, SortingState, useReactTable } from '@tanstack/react-table';
import { Icon } from '@ui/Icon';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@ui/Table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { useMemo } from 'react';

import { EventClass } from '@/types/EventClass';

interface EventClassesTableProps {
	eventClasses: EventClass[];
	sorting: SortingState;
	onSortingChange: OnChangeFn<SortingState>;
}

export const EventClassesTable = ({ eventClasses, sorting, onSortingChange }: EventClassesTableProps) => {
	const columns = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
			},
			{
				accessorKey: 'gender',
				header: 'Gender',
			},
			{
				accessorKey: 'skillLevel',
				header: 'Skill Level',
			},
			{
				accessorKey: 'maximumAge',
				header: 'Maximum Age',
			},
			{
				accessorKey: 'minimumAge',
				header: 'Minimum Age',
			},
			{
				accessorKey: 'participantCapacity',
				header: 'Participant Capacity',
			},
		],
		[]
	);

	const table = useReactTable({
		data: eventClasses,
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