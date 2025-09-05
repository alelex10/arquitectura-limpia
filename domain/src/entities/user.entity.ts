const Role = {
	ADMIN :"ADMIN",
	USER :"USER",
} as const

export type Role = (typeof Role)[keyof typeof Role];


export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	role: Role;
	createdAt?: Date;
	updatedAt?: Date;
}
