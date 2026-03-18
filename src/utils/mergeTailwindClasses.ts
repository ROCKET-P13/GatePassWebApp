import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const mergeTailwindClasses = (...inputs: string[]) => twMerge(clsx(inputs));