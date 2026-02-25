import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';

const AppBar = ({ className, children, ...props }) => {
	return (
		<header
			// ref={ref}
			className={
				mergeTailwindClasses(
					'sticky top-0 z-40 w-full',
					'border-b border-border',
					'bg-background/80',
					'backdrop-blur supports-backdrop-filter:bg-background/60',
					className
				)
			}
			{...props}
		>
			<div className="flex h-14 items-center px-4 md:px-6">
				{children}
			</div>
		</header>

	);
};

const AppBarLeft = ({ className, ...props }) => (
	<div className={mergeTailwindClasses('flex items-center gap-2', className)} {...props} />
);

const AppBarCenter = ({ className, ...props }) => (
	<div
		className={mergeTailwindClasses(
			'flex flex-1 items-center justify-center',
			className
		)}
		{...props}
	/>
);

const AppBarRight = ({ className, ...props }) => (
	<div
		className={mergeTailwindClasses(
			'flex flex-1 items-center justify-end gap-2',
			className
		)}
		{...props}
	/>
);

const AppBarTitle = ({ className, ...props }) => (
	<h1
		className={mergeTailwindClasses(
			'text-sm font-semibold tracking-tight',
			className
		)}
		{...props}
	/>
);

export {
	AppBar,
	AppBarLeft,
	AppBarCenter,
	AppBarRight,
	AppBarTitle
};