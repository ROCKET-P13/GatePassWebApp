import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

export const Icon = ({ as: Component, size = 16, className, ...props }) => {
	return (
		<Component
			size={size}
			className={
				mergeTailwindClasses(
					'text-primary',
					'transition-colors',
					className
				)
			}
			{...props}
		/>
	);
};