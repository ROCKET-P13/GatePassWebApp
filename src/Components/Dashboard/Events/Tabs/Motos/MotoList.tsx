import _ from 'lodash';

import { Moto, MotoStatus, MotoType } from '@/types/Moto';
import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

interface MotoListProps {
	motos: Moto[];
}

const MotoStatusBadgeStyles: Record<MotoStatus, string> = {
	Scheduled: 'bg-muted text-muted-foreground',
	Staging: 'bg-yellow-500/10 text-yellow-500',
	Racing: 'bg-green-500/10 text-green-500',
	Finished: 'bg-muted text-muted-foreground',
};

const MotoTypeDisplayName: Record<MotoType, string> = {
	Heat: 'Heat',
	LastChanceQualifier: 'LCQ',
	Main: 'Main',
};

export const MotoList = ({ motos }: MotoListProps) => {
	return (
		<div className='space-y-6 flex-row overflow-x-auto scrollbar-hidden'>
			<div className="flex flex-row gap-2">
				{
					motos.map((moto) => {
						const isActive = moto.status === 'Racing' || moto.status === 'Staging';

						return (
							<button
								key={moto.id}
								onClick={() => console.log({ moto })}
								className={
									mergeTailwindClasses(
										'w-full text-left rounded-xl border p-3 transition-all',
										'bg-card text-card-foreground',
										'hover:bg-accent hover:text-accent-foreground',
										isActive ? 'border-primary shadow-md' : 'border-border'
									)
								}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										{
											isActive && (
												<span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
											)
										}
										<span className="font-medium">
											Moto {moto.motoNumber} -
										</span>
										<span className='text-sm'>
											{MotoTypeDisplayName[moto.type]}
										</span>
									</div>

									<span
										className={
											mergeTailwindClasses(
												'text-xs px-2 py-1 rounded-md font-medium',
												MotoStatusBadgeStyles[moto.status]
											)
										}
									>
										{moto.status}
									</span>
								</div>
							</button>
						);
					})}

				{
					_.isEmpty(motos) && (
						<div className="text-sm text-muted-foreground text-center py-6">
						No motos yet
						</div>
					)
				}
			</div>

		</div>
	);
};