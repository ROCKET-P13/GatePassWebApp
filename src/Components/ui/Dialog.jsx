import React, { useEffect, useRef } from 'react';
import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';

const Dialog = ({ open, onClose, children }) => {
	return children.map
		? React.Children.map(children, (child) =>
			React.cloneElement(child, { open, onClose })
		)
		: React.cloneElement(children, { open, onClose });
};

const DialogTrigger = ({ children, onClose }) => {
	return React.cloneElement(children, {
		onClick: () => onClose?.(true),
	});
};

const DialogOverlay = ({ className, ...props }) => {
	return (
		<div
			className={mergeTailwindClasses(
				'fixed inset-0 z-50 bg-[rgb(var(--background))]50 backdrop-blur-sm',
				className
			)}
			{...props}
		/>
	);
};

const DialogContent = ({
	open,
	onClose,
	className,
	children,
}) => {
	const ref = useRef(null);

	useEffect(() => {
		function handleKey (e) {
			if (e.key === 'Escape') onClose?.(false);
		}
		if (open) document.addEventListener('keydown', handleKey);
		return () =>
			document.removeEventListener('keydown', handleKey);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<DialogOverlay onClick={() => onClose?.(false)} />

			<div
				ref={ref}
				onClick={(e) => e.stopPropagation()}
				className={
					mergeTailwindClasses(
						'relative z-50 w-full max-w-lg rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-lg pt-4 px-4',
						className
					)
				}
			>
				{children}
				<button
					onClick={() => onClose?.(false)}
					className="absolute right-4 top-4 rounded-md p-1 hover:bg-[rgb(var(--muted-foreground))]"
				>
          			✕
				</button>
			</div>
		</div>
	);
};

const DialogHeader = ({ className, ...props }) => {
	return (
		<div
			className={mergeTailwindClasses('flex flex-col space-y-2', className)}
			{...props}
		/>
	);
};

const DialogTitle = ({ className, ...props }) => {
	return (
		<h2
			className={mergeTailwindClasses(
				'text-lg font-semibold tracking-tight mb-4',
				className
			)}
			{...props}
		/>
	);
};

const DialogDescription = ({ className, ...props }) => {
	return (
		<p
			className={mergeTailwindClasses(
				'text-sm text-[rgb(var(--muted-foreground))]',
				className
			)}
			{...props}
		/>
	);
};

const DialogFooter = ({ className, children, ...props }) => {
	return (
		<div
			className={mergeTailwindClasses(
				'flex justify-end gap-2 pt-4 pb-4',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter
};