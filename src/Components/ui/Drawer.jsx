import { useEffect } from 'react';
import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';

const Drawer = ({ open, onClose, children }) => {
	useEffect(() => {
		function handleKey (e) {
			if (e.key === 'Escape') {
				onClose?.();
			}
		}

		if (open) {
			window.addEventListener('keydown', handleKey);
		}

		return () => {
			window.removeEventListener('keydown', handleKey);
		};
	}, [open, onClose]);

	return (
		<>
			<div
				onClick={onClose}
				className={
					mergeTailwindClasses(
						'fixed inset-0 z-40 bg-[rgb(var(--background))]80 backdrop-blur-sm transition-transform duration-300 ease-in-out',
						open ? 'opacity-100' : 'pointer-events-none opacity-0 overflow-hidden'
					)
				}
			/>

			{children}
		</>
	);
};

const DrawerContent = ({ side = 'right', className, children, open }, ref) => {
	const sideStyles = {
		right: 'right-0 top-0 h-full w-[400px] border-l',
		left: 'left-0 top-0 h-full w-[400px] border-r',
		bottomLeft: 'bottom-0 left-0 w-full h-[400px] border-t',
	};

	const slideStyles = {
		right: open ? 'translate-x-0' : 'translate-x-full',
		left: open ? 'translate-x-0' : '-translate-x-full',
		bottomLeft: open ? 'translate-y-0' : 'translate-y-full',
	};

	return (
		<div
			ref={ref}
			className={
				mergeTailwindClasses(
					'fixed z-50 shadow-lg transition-transform duration-300 ease-in-out',
					'bg-[rgb(var(--background))]',
					'text-[rgb(var(--foreground))]',
					'border-[rgb(var(--border))]',
					sideStyles[side],
					slideStyles[side],
					className
				)
			}
		>
			{children}
		</div>
	);
};

const DrawerHeader = ({ className, ...props }) => (
	<div
		className={mergeTailwindClasses(
			'p-6 border-b border-[rgb(var(--border))]',
			className
		)}
		{...props}
	/>
);

const DrawerTitle = ({ className, ...props }) => (
	<h2
		className={mergeTailwindClasses(
			'text-lg font-semibold tracking-tight',
			className
		)}
		{...props}
	/>
);

const DrawerDescription = ({ className, ...props }) => (
	<p
		className={mergeTailwindClasses(
			'text-sm text-[rgb(var(--muted-foreground))]',
			className
		)}
		{...props}
	/>
);

const DrawerFooter = ({ className, ...props }) => (
	<div
		className={mergeTailwindClasses(
			'p-6 border-t border-[rgb(var(--border))] flex justify-end gap-2',
			className
		)}
		{...props}
	/>
);

export {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter
};