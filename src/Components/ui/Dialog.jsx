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
				'fixed inset-0 z-50 bg-background/50 backdrop-blur-sm',
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
		const handleKey = (event) => {
			if (event.key !== 'Escape') {
				return;
			}

			onClose?.(false);
		};

		if (open) {
			document.addEventListener('keydown', handleKey);
		}
		return () => document.removeEventListener('keydown', handleKey);
	}, [open, onClose]);

	if (!open) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<DialogOverlay onClick={() => onClose?.(false)} />

			<div
				ref={ref}
				onClick={(e) => e.stopPropagation()}
				className={
					mergeTailwindClasses(
						'relative z-50 w-full max-w-lg rounded-xl border border-border bg-card shadow-lg pt-5 px-5',
						className
					)
				}
			>
				{children}
				<button
					className={
						mergeTailwindClasses(
							'ring-offset-background focus-visible:ring-ring',
							'data-[state=open]:bg-accent absolute top-4 right-4',
							'rounded-sm opacity-70 backdrop-blur-sm transition-opacity hover:opacity-100 focus:ring-offset-2',
							'focus:outline-none focus-visible:ring-2 disabled:pointer-events-none data-[state=open]:text-white cursor-pointer'
						)}
					onClick={() => onClose?.(false)}
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
			className={
				mergeTailwindClasses(
					'text-lg font-semibold tracking-tight mb-4',
					className
				)
			}
			{...props}
		/>
	);
};

const DialogDescription = ({ className, ...props }) => {
	return (
		<p
			className={
				mergeTailwindClasses(
					'text-sm text-muted-foreground',
					className
				)
			}
			{...props}
		/>
	);
};

const DialogFooter = ({ className, children, ...props }) => {
	return (
		<div
			className={
				mergeTailwindClasses(
					'flex justify-end gap-2 pt-4 pb-4',
					className
				)
			}
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