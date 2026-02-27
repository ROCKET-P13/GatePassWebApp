import {
	createContext,
	useContext,
	useState,
	useRef,
	useEffect,
	useId
} from 'react';
import { createPortal } from 'react-dom';
import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SelectContext = createContext(null);

function useSelectContext () {
	const context = useContext(SelectContext);
	if (!context) {
		throw new Error(
			'Select components must be rendered inside a <Select> provider'
		);
	}
	return context;
}

export function Select ({ value: controlledValue, defaultValue, onChange, children }) {
	const [open, setOpen] = useState(false);
	const [internalValue, setInternalValue] = useState(defaultValue);

	const triggerRef = useRef(null);
	const contentRef = useRef(null);

	const value = controlledValue !== undefined ? controlledValue : internalValue;

	const setValue = (val) => {
		if (controlledValue === undefined) setInternalValue(val);
		onChange?.(val);
		setOpen(false);
	};

	useEffect(() => {
		function handleClick (e) {
			if (
				contentRef.current
        && !contentRef.current.contains(e.target)
        && triggerRef.current
        && !triggerRef.current.contains(e.target)
			) {
				setOpen(false);
			}
		}

		if (open) document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [open]);

	return (
		<SelectContext.Provider
			value={{ value, setValue, open, setOpen, triggerRef, contentRef }}
		>
			<div className="relative inline-block w-full">{children}</div>
		</SelectContext.Provider>
	);
}

Select.Trigger = function Trigger ({ placeholder = 'Select...', label, className, required = false }) {
	const { open, setOpen, value, triggerRef } = useSelectContext();
	const inputId = useId();
	return (
		<div className='space-y-4'>
			{
				label && (
					<label
						htmlFor={inputId}
						className={
							mergeTailwindClasses(
								'text-sm font-medium leading-none',
								'text-foreground'
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
			<button
				ref={triggerRef}
				id={inputId}
				type="button"
				onClick={() => setOpen(!open)}
				className={
					mergeTailwindClasses(
						'flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 mt-1 text-sm',
						'bg-background border-input text-foreground',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
						'disabled:cursor-not-allowed disabled:opacity-50',
						className
					)
				}
			>
				<span className="truncate">
					{value || <span className="text-muted-foreground">{placeholder}</span>}
				</span>

				<ArrowDropDownIcon
					fontSize="small"
					className={mergeTailwindClasses('transition-transform', open && 'rotate-180')}
				/>
			</button>
		</div>

	);
};
Select.Content = function Content ({ children, maxHeight = 25 }) {
	const { open, triggerRef, contentRef } = useContext(SelectContext);
	const [position, setPosition] = useState(null);

	useEffect(() => {
		if (open && triggerRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			setPosition({
				top: rect.bottom + window.scrollY,
				left: rect.left + window.scrollX,
				width: rect.width,
			});
		}
	}, [open, triggerRef]);

	if (!open || !position) return null;

	return createPortal(
		<div
			ref={contentRef}
			style={{
				position: 'absolute',
				top: position.top,
				left: position.left,
				width: position.width,
				maxHeight: maxHeight * 2.5,
			}}
			className={
				mergeTailwindClasses(
					'z-50 rounded-md border bg-popover text-popover-foreground shadow-md overflow-y-auto scrollbar-hidden',
					'animate-in fade-in-0 zoom-in-95 duration-150'
				)
			}
		>
			<div className="p-1">{children}</div>
		</div>,
		document.body
	);
};

Select.Item = function Item ({ value, children, className }) {
	const { value: selected, setValue } = useSelectContext();
	const isSelected = selected === value;

	return (
		<div
			onClick={() => setValue(value)}
			className={
				mergeTailwindClasses(
					'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
					'hover:bg-accent hover:text-accent-foreground',
					isSelected && 'bg-accent text-accent-foreground',
					className
				)
			}
		>
			{children}
		</div>
	);
};