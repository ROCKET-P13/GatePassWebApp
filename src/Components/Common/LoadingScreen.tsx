interface LoadingScreenProps {
	message?: string
}

export const LoadingScreen = ({ message = 'Loading...' } : LoadingScreenProps) => {
	return (
		<div
			className='fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background'
		>

			<div className="relative h-10 w-10">
				<div className="absolute inset-0 rounded-full border-4 border-muted opacity-25" />
				<div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
			</div>

			<p className="mt-6 text-sm text-muted-foreground tracking-wide">
				{message}
			</p>
		</div>
	);
};