import { Link } from '@tanstack/react-router';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, OnChangeFn, SortingState, useReactTable } from '@tanstack/react-table';
import { Checkbox } from '@ui/Checkbox';
import { Icon } from '@ui/Icon';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@ui/Table';
import { ChevronDown, ChevronsUpDown, ChevronUp, Pencil, SquareArrowOutUpRight } from 'lucide-react';
import { useMemo } from 'react';

import { Routes } from '@/Common/routes';
import { EventRegistration } from '@/types/EventRegistration';

interface EventCheckinsTableProps {
	checkIns: EventRegistration[];
	sorting: SortingState;
	onSortingChange: OnChangeFn<SortingState>;
}

export const EventCheckinsTable = ({ checkIns, sorting, onSortingChange } : EventCheckinsTableProps) => {
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
				cell: ({ row }) => {
					return (
						<Checkbox
							className='opacity-100'
							disabled
							checked={row.original.checkedIn}
						/>
					);
				},
			},
			{
				accessorKey: 'actions',
				header: 'Actions',
				cell: ({ row }) => (
					<div className='flex gap-2'>
						<button
							className="p-1 rounded-md hover:bg-muted hover:cursor-pointer"
							onClick={() => console.log(row.original)}
						>
							<Icon as={Pencil} />
						</button>
						<Link
							to={`${Routes.DASHBOARD}/${Routes.PARTICIPANTS}/$participantId`}
							params={{ participantId: row.original.participantId }}
						>
							<button className='p-1 rounded-md hover:bg-muted hover:cursor-pointer'>
								<Icon as={SquareArrowOutUpRight} />
							</button>
						</Link>
					</div>
				),
			},
		],
		[]
	);

	const table = useReactTable({
		data: checkIns,
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