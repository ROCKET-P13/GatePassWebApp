import { Link } from '@tanstack/react-router';
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	getSortedRowModel,
	SortingState,
	OnChangeFn
} from '@tanstack/react-table';
import { Icon } from '@ui/Icon';
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	TableContainer
} from '@ui/Table';
import { ChevronDown, ChevronsUpDown, ChevronUp, Pencil, Trash } from 'lucide-react';
import { useMemo } from 'react';

import { Routes } from '@/Common/routes';

interface Participant {
	id: string;
	firstName: string;
	lastName: string;
	createdAt: string;
}

interface ParticipantsTableProps {
	participants: Participant[];
	sorting: SortingState;
	onSortingChange: OnChangeFn<SortingState>;
}

export const ParticipantsTable = ({ participants, sorting, onSortingChange }: ParticipantsTableProps) => {
	const columns = useMemo(
		() => [
			{
				accessorKey: 'firstName',
				header: 'First Name',
				cell: (info: any) => (
					<Link
						to={`${Routes.DASHBOARD}/${Routes.PARTICIPANTS}/$participantId`}
						params={{ participantId: info.row.original.id }}
						className="font-medium text-primary hover:underline"
					>{info.getValue()}</Link>
				),
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
				cell: ({ row }: any) => (
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
													}[header.column.getIsSorted() as string] ?? (
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
