import React, { useEffect } from 'react';
import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';

const Drawer = ({ open, onClose, children }) => {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

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
			{/* Overlay */}
			<div
				onClick={onClose}
				className={mergeTailwindClasses(
					'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity',
					open ? 'opacity-100' : 'pointer-events-none opacity-0'
				)}
			/>

			{children}
		</>
	);
};

const DrawerContent = React.forwardRef(
	(
		{ side = 'right', className, children, open },
		ref
	) => {
		const sideStyles = {
			right: 'right-0 top-0 h-full w-[400px] border-l',
			left: 'left-0 top-0 h-full w-[400px] border-r',
			bottom: 'bottom-0 left-0 w-full h-[400px] border-t',
		};

		const slideStyles = {
			right: open ? 'translate-x-0' : 'translate-x-full',
			left: open ? 'translate-x-0' : '-translate-x-full',
			bottom: open ? 'translate-y-0' : 'translate-y-full',
		};

		return (
			<div
				ref={ref}
				className={mergeTailwindClasses(
					'fixed z-50 shadow-lg transition-transform duration-300 ease-in-out',
					'bg-[rgb(var(--card))]',
					'text-[rgb(var(--card-foreground))]',
					'border-[rgb(var(--border))]',
					sideStyles[side],
					slideStyles[side],
					className
				)}
			>
				{children}
			</div>
		);
	}
);

DrawerContent.displayName = 'DrawerContent';

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