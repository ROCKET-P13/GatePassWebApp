import { useState, Children, cloneElement } from 'react';
import { mergeTailwindClasses } from '../../utils/mergeTailwindClasses';

export const Tabs = ({ defaultValue, value: controlledValue, onChange, children }) => {
	const [activeTab, setActiveTab] = useState(defaultValue || null);
	const selectedValue = controlledValue !== undefined ? controlledValue : activeTab;

	const handleSelect = (val) => {
		if (controlledValue === undefined) {
			setActiveTab(val);
		}
		onChange?.(val);
	};

	return (
		<div className="w-full">
			<div className="flex border-b border-border">
				{
					Children.map(children, (child) => {
						if (child.type.name !== Tab.name) {
							return null;
						}

						const isActive = child.props.value === selectedValue;
						return cloneElement(child, {
							isActive,
							onSelect: handleSelect,
						});
					})
				}
			</div>

			<div className="mt-4">
				{
					Children.map(children, (child) => {
						if (child.type.name !== TabPanel.name) {
							return null;
						}
						return child.props.value === selectedValue ? child : null;
					})
				}
			</div>
		</div>
	);
};

export const Tab = ({ value, children, isActive, onSelect }) => {
	return (
		<button
			type="button"
			onClick={() => onSelect(value)}
			className={mergeTailwindClasses(
				'px-4 py-2 font-medium transition-colors',
				isActive
					? 'border-b-2 border-primary text-primary'
					: 'text-muted-foreground hover:text-foreground'
			)}
		>
			{children}
		</button>
	);
};

export const TabPanel = ({ value, children }) => {
	return <div>{children}</div>;
};
