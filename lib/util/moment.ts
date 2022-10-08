import moment from 'moment';

export const fromNow = (d: string) => {
	return moment(new Date(d)).fromNow();
};

/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 216699 -> '3:36'
 */
export const formatDuration = (ms: number): string => {
	const minutes = Math.floor(ms / 60000);
	const seconds = Math.floor((ms % 60000) / 1000);
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 260785 -> 'min 4 sec 20'
 */
export const toHHMMSS = (ms: number): string => {
	const secNum = Math.floor(ms / 1000);
	const hours = Math.floor(secNum / 3600);
	const minutes = Math.floor(secNum / 60) % 60;
	const seconds = secNum % 60;
	const hoursFormat = hours > 0 ? `h ${hours}` : '';
	const minutesFormat = minutes > 0 ? `min ${minutes}` : '';
	const secondsFormat = seconds > 0 ? `sec ${seconds}` : '';
	return [hoursFormat, minutesFormat, secondsFormat].join(' ');
};

/**
 * Format milliseconds to time duration
 * @param {dateStr} string
 * @returns {string} formatted duration string
 * @example 2022-07-04 -> 'Jul 2022'
 */
export const humanReadable = (dateStr: string) => {
	const date = new Date(dateStr);
	const dateTimeFormat = new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	return dateTimeFormat.format(date).replace(',', '');
};
