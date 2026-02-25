import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';

const Input = (
	{
		className,
		type = 'text',
		...props
	},
	ref
) => {
	return (
		<input
			type={type}
			ref={ref}
			className={
				mergeTailwindClasses(
					'flex h-10 w-full px-3 py-2 text-sm',

					'rounded-(--radius) border',

					'bg-[rgb(var(--background))]',
					'text-[rgb(var(--foreground))]',
					'border-[rgb(var(--input))]',

					'placeholder:text-[rgb(var(--muted-foreground))]',

					'focus:outline-none focus:ring-2',
					'focus:ring-[rgb(var(--ring))]',
					'focus:ring-offset-2',
					'focus:ring-offset-[rgb(var(--background))]',

					'disabled:cursor-not-allowed disabled:opacity-50',

					'file:border-0 file:bg-transparent file:text-sm file:font-medium',

					'transition-colors',

					className
				)
			}
		/>
	);
};

export { Input };