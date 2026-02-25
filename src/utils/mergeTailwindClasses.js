import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const mergeTailwindClasses = (...inputs) => twMerge(clsx(inputs));