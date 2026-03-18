import _ from 'lodash';
import { useState } from 'react';

import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

const Sizes = {
	sm: 'h-8 w-8 text-xs',
	md: 'h-10 w-10 text-sm',
	lg: 'h-12 w-12 text-base',
	xl: 'h-16 w-16 text-lg',
};

export const Avatar = ({ src, name, size = 'md', className }) => {
	const [imgError, setImgError] = useState(false);

	// Get initials from name
	const getInitials = (fullName) => {
		if (!fullName) {
			return '';
		};

		const names = _.chain(fullName).trim().split(' ').value();

		const initials = names.length > 1
			? `${names[0].charAt(0)}${_.last(names).charAt(0)}`
			: names[0].charAt(0);

		return initials.toUpperCase();
	};

	return (
		<div
			className={
				mergeTailwindClasses(
					'inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 overflow-hidden',
					Sizes[size],
					className
				)
			}
		>
			{
				src && !imgError
					? (
						<img
							src={src}
							alt={name || 'Avatar'}
							onError={() => setImgError(true)}
							className="h-full w-full object-cover"
						/>
					)
					: (
						<span className="font-medium select-none">
							{getInitials(name)}
						</span>
					)
			}
		</div>
	);
};