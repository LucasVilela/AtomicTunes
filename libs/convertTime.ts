/**
 * @param milliseconds: number
 * @returns string in format hh:mm:ss
 * @description Converts milliseconds to a string of the form hh:mm:ss
 */
export const convertTime = (milliseconds: number) => {
	const minutes = Math.floor(milliseconds / 60000);
	const seconds = ((milliseconds % 60000) / 1000).toFixed(0) as any;
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
