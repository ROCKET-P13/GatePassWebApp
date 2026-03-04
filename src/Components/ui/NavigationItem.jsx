import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';
import { Icon } from './Icon';

export const NavigationItem = (
	{
		icon: NavigationItemIcon,
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
					'text-foreground',
					'hover:bg-accent',
					'hover:text-accent-foreground',
					active && [
						'bg-accent',
						'text-accent-foreground',
					],
					disabled && 'opacity-50 pointer-events-none',
					className
				)
			}
			{...props}
		>
			{
				NavigationItemIcon && (
					<Icon as={NavigationItemIcon} className="text-muted-foreground" />
				)
			}
			<span className="truncate">{children}</span>
		</button>
	);
};