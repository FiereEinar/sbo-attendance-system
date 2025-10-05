import { useEffect, useState } from 'react';

type LiveClockProps = {
	format?: '12' | '24'; // default 24
	showSeconds?: boolean; // default true
	locale?: string; // default "en-US"
	className?: string;
};

export default function LiveClock({
	format = '12',
	showSeconds = true,
	locale = 'en-US',
	className,
}: LiveClockProps) {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(interval);
	}, []);

	const formattedTime = time.toLocaleTimeString(locale, {
		hour12: format === '12',
		hour: '2-digit',
		minute: '2-digit',
		second: showSeconds ? '2-digit' : undefined,
	});

	return <p className={className}>{formattedTime}</p>;
}
