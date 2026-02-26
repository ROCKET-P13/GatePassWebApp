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
					`w-full
					rounded-xl
					border
					border-border
					bg-card
					text-card-foreground
					shadow-sm
					transition-shadow
					hover:shadow-md
					`,
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
			className={mergeTailwindClasses('flex flex-col space-y-1.5 py-4', className)}
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
			className={mergeTailwindClasses('text-sm text-[rbg(var(--muted-foreground))]', className)}
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
			className={mergeTailwindClasses('flex items-center border-border bg-muted/40 p-6 pt-4', className)}
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