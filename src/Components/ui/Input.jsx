import { useId } from 'react';
import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';

export const Input = (
	{
		className,
		type = 'text',
		label,
		error,
		required,
		id,
		...props
	},
	ref
) => {
	const generatedId = useId();
	const inputId = id ?? generatedId;

	return (
		<div className="space-y-4">
			{
				label && (
					<label
						htmlFor={inputId}
						className={
							mergeTailwindClasses(
								'text-sm font-medium leading-none',
								'text-foreground',
								error && 'text-destructive'
							)
						}
					>
						{label}
						{
							required && (
								<span className="ml-1 text-destructive">*</span>
							)
						}
					</label>
				)
			}

			<input
				id={inputId}
				ref={ref}
				type={type}
				aria-invalid={!!error}
				aria-required={required}
				className={
					mergeTailwindClasses(
						'flex h-10 w-full rounded-md border px-3 py-2 mt-1 text-sm',
						'bg-background text-foreground border-input',
						'placeholder:text-muted-foreground',
						'transition-colors',
						'focus-visible:outline-none',
						'focus-visible:ring-2',
						'focus-visible:ring-ring',
						'focus-visible:ring-offset-2',
						'focus-visible:ring-offset-background',
						'disabled:cursor-not-allowed disabled:opacity-50',
						'file:border-0 file:bg-transparent file:text-sm file:font-medium',
						error && 'border-destructive focus-visible:ring-destructive',
						className
					)
				}
				{...props}
			/>
		</div>
	);
};