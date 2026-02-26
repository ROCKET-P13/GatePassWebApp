import React, { useEffect, useRef, useState } from 'react';
import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';

const Dialog = ({ open, onClose, children }) => {
	return children.map
		? React.Children.map(children, (child) =>
			React.cloneElement(child, { open, onClose })
		)
		: React.cloneElement(children, { open, onClose });
};
const DialogContent = ({
	open,
	onClose,
	className,
	children,
}) => {
	const [isMounted, setIsMounted] = useState(false);
	const ref = useRef(null);

	if (open && !isMounted) {
		setIsMounted(true);
	}

	// ESC handler
	useEffect(() => {
		const handleKey = (event) => {
			if (event.key === 'Escape') {
				onClose?.(false);
			}
		};

		if (isMounted) {
			document.addEventListener('keydown', handleKey);
		}
		return () => document.removeEventListener('keydown', handleKey);
	}, [isMounted, onClose]);

	// Handle unmount after exit animation
	const handleAnimationEnd = (e) => {
		if (!open && e.target === ref.current) {
			setIsMounted(false);
		}
	};

	if (!isMounted) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Overlay */}
			<div
				onClick={() => onClose?.(false)}
				className={mergeTailwindClasses(
					'fixed inset-0 bg-background/50 backdrop-blur-sm',
					open
						? 'animate-[dialog-overlay-in_150ms_ease-out]'
						: 'animate-[dialog-overlay-out_150ms_ease-in_forwards]'
				)}
			/>

			{/* Content */}
			<div
				ref={ref}
				onClick={(e) => e.stopPropagation()}
				onAnimationEnd={handleAnimationEnd}
				className={mergeTailwindClasses(
					'relative z-50 w-full max-w-lg rounded-xl border border-border bg-card shadow-lg pt-5 px-5',
					open
						? 'animate-[dialog-content-in_200ms_ease-out]'
						: 'animate-[dialog-content-out_200ms_ease-in_forwards]',
					className
				)}
			>
				{children}

				<button
					className={mergeTailwindClasses(
						'absolute top-4 right-4 rounded-sm opacity-70',
						'transition-opacity hover:opacity-100 focus:outline-none',
						'focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer'
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
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter
};