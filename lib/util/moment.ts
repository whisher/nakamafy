import moment from 'moment';

export const fromNow = (d: string) => {
	return moment(new Date(d)).fromNow();
};
