import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';

const baseStyles = `
  inline-flex
  items-center
  justify-center
  text-sm
  font-medium
  h-10
  px-4
  py-2
  rounded-[var(--radius)]
  transition-colors
  focus:outline-none
  focus:ring-2
  focus:ring-[rgb(var(--ring))]
  focus:ring-offset-2
  font-bold
`;

const Variants = Object.freeze({
	default: `
		bg-[rgb(var(--primary))]
		text-[rgb(var(--primary-foreground))]
		hover:opacity-90
  	`,
	secondary: `
		bg-[rgb(var(--secondary))]
		text-[rgb(var(--secondary-foreground))]
		hover:opacity-80
  	`,
	outline: `
		border border-[rgb(var(--border))]
		bg-transparent
		hover:bg-[rgb(var(--accent))]
  	`,
	ghost: `
		hover:bg-[rgb(var(--accent))]
  	`,
	destructive: `
		bg-[rgb(var(--destructive))]
		text-[rgb(var(--destructive-foreground))]
		hover:opacity-90
  	`,
});

const Sizes = Object.freeze({
	sm: 'h-8 px-3 text-xs',
	md: 'h-10 px-4 py-2',
	lg: 'h-12 px-6 text-base',
	icon: 'h-10 w-10',
});

export const Button = (
	{
		className,
		variant = 'default',
		size = 'md',
		children,
		...props
	},
	ref
) => {
	return (
		<button
			ref={ref}
			  className={
				mergeTailwindClasses(
					baseStyles,
					Variants[variant],
					Sizes[size],
					className
				)
			}
			{...props}
		>
			{children}
		</button>
	);
};