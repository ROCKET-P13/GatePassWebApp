import React from 'react';
import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';

export const NavigationItem = React.forwardRef(
	(
		{
			icon: Icon,
			children,
			active = false,
			disabled = false,
			className,
			...props
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				disabled={disabled}
				className={
					mergeTailwindClasses(
						'flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm transition-colors',
						'text-[rgb(var(--foreground))]',
						'hover:bg-[rgb(var(--accent))]',
						'hover:text-[rgb(var(--accent-foreground))]',
						active && [
							'bg-[rgb(var(--accent))]',
							'text-[rgb(var(--accent-foreground))]',
						],
						disabled && 'opacity-50 pointer-events-none',
						className
					)
				}
				{...props}
			>
				{
					Icon && (
						<Icon className="text-[rgb(var(--muted-foreground))]" fontSize="small" />
					)
				}
				<span className="truncate">{children}</span>
			</button>
		);
	}
);

NavigationItem.displayName = 'NavItem';