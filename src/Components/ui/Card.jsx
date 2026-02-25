import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';

const Card = (
	{ className, ...props },
	ref
) => {
	return (
		<div
			ref={ref}
			data-slot="card"
			className={
				mergeTailwindClasses(
					'rounded-(--radius) border shadow-sm p-2 mb-2',
					'bg-[rgb(var(--card))]',
					'text-[rgb(var(--card-foreground))]',
					'border-[rgb(var(--border))]',
					className
				)
			}
			{...props}
		/>
	);
};

const CardHeader = (
	{ className, ...props },
	ref
) => {
	return (
		<div
			ref={ref}
			data-slot="card-header"
			className={mergeTailwindClasses('flex flex-col space-y-1.5 p-6', className)}
			{...props}
		/>
	);
};

const CardTitle = (
	{ className, ...props },
	ref
) => {
	return (
		<h3
			ref={ref}
			data-slot="card-title"
			className={
				mergeTailwindClasses(
					'text-lg font-semibold leading-none tracking-tight',
					className
				)
			}
			{...props}
		/>
	);
};

const CardDescription = (
	{ className, ...props },
	ref
) => {
	return (
		<p
			ref={ref}
			data-slot="card-description"
			className={mergeTailwindClasses('text-sm text-gray-500', className)}
			{...props}
		/>
	);
};

const CardContent = (
	{ className, ...props },
	ref
) => {
	return (
		<div
			ref={ref}
			data-slot="card-content"
			className={mergeTailwindClasses('p-6 pt-0', className)}
			{...props}
		/>
	);
};

const CardFooter = (
	{ className, ...props },
	ref
) => {
	return (
		<div
			ref={ref}
			data-slot="card-footer"
			className={mergeTailwindClasses('flex items-center p-6 pt-0', className)}
			{...props}
		/>
	);
};

export {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter
};