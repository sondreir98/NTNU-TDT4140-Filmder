export type Film = {
	movieId: string;
	name: string;
	year: number;
	genre: string[];
	info: string;
	logoPath: string;
};

export type User = {
	avatarPath: string;
	friends: string[];
};
