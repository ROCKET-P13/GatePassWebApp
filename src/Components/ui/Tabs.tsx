import { HTMLAttributes, ReactElement, ReactNode, useState, Children, cloneElement } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

interface TabsProps {
	defaultValue?: string;
	value?: string;
	onChange?: (value: string) => void;
	children: ReactNode;
}

export const Tabs = ({ defaultValue, value: controlledValue, onChange, children }: TabsProps) => {
	const [activeTab, setActiveTab] = useState(defaultValue || null);
	const selectedValue = controlledValue !== undefined ? controlledValue : activeTab;

	const handleSelect = (val: string) => {
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
						const element = child as ReactElement;
						if (element.type !== Tab) {
							return null;
						}

						const isActive = element.props.value === selectedValue;
						return cloneElement(element, {
							isActive,
							onSelect: handleSelect,
						});
					})
				}
			</div>

			<div className="mt-4">
				{
					Children.map(children, (child) => {
						const element = child as ReactElement;
						if (element.type !== TabPanel) {
							return null;
						}
						return element.props.value === selectedValue ? child : null;
					})
				}
			</div>
		</div>
	);
};

interface TabProps {
	value: string;
	children: ReactNode;
	isActive?: boolean;
	onSelect?: (value: string) => void;
}

export const Tab = ({ value, children, isActive, onSelect }: TabProps) => {
	return (
		<button
			type="button"
			onClick={() => onSelect?.(value)}
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

interface TabPanelProps {
	value?: string;
	children: ReactNode;
}

export const TabPanel = ({ children }: TabPanelProps) => {
	return <div>{children}</div>;
};
