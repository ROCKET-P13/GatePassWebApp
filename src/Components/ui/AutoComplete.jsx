import { useState, useRef, useEffect, useMemo } from 'react';
import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';
import { Input } from './Input';
import _ from 'lodash';

export const Autocomplete = ({
	options = [],
	onChange,
	getOptionLabel = (option) => option?.label ?? '',
	placeholder = 'Search...',
	className,
	label,
}) => {
	const [query, setQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);

	const EventKeys = Object.freeze({
		ARROW_UP: 'ArrowUp',
		ARROW_DOWN: 'ArrowDown',
		ENTER: 'Enter',
	});

	const containerRef = useRef(null);
	const filteredOptions = useMemo(() => {
		return _.filter(options, (option) => {
			return getOptionLabel(option)
				.toLowerCase()
				.includes(query.toLowerCase());
		});
	}, [options, getOptionLabel, query]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!containerRef.current?.contains(event.target)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	const selectOption = (option) => {
		onChange?.(option);
		setQuery(getOptionLabel(option));
		setIsOpen(false);
	};

	const handleKeyDown = (e) => {
		if (!isOpen) return;

		if (e.key === EventKeys.ARROW_DOWN) {
			setActiveIndex((prev) =>
				prev < filteredOptions.length - 1 ? prev + 1 : prev
			);
		}

		if (e.key === EventKeys.ARROW_UP) {
			setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
		}

		if (e.key === EventKeys.ENTER && activeIndex >= 0) {
			selectOption(filteredOptions[activeIndex]);
		}
	};

	return (
		<div
			ref={containerRef}
			className={mergeTailwindClasses('relative w-full', className)}
		>
			<Input
				value={query}
				placeholder={placeholder}
				onFocus={() => setIsOpen(true)}
				onChange={(e) => {
					setQuery(e.target.value);
					setIsOpen(true);
				}}
				onKeyDown={handleKeyDown}
				label={label}
				autoComplete="off"
			/>
			{
				isOpen && filteredOptions.length > 0 && (
					<ul className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-md max-h-60 overflow-auto">
						{
							_.map(filteredOptions, (option, index) => (
								<li
									key={index}
									onClick={() => selectOption(option)}
									className={
										mergeTailwindClasses(
											'cursor-pointer px-3 py-2 text-sm',
											index === activeIndex
												? 'bg-accent text-accent-foreground'
												: 'hover:bg-accent'
										)
									}
								>
									{getOptionLabel(option)}
								</li>
							))
						}
					</ul>
				)
			}
		</div>
	);
};