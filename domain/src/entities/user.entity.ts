const Role = {
	ADMIN :"ADMIN",
	USER :"USER",
} as const

export type Role = (typeof Role)[keyof typeof Role];


export interface User {
	id: string;
	name: string | null;
	email: string;
	password: string;
	Role: Role;
	createdAt?: Date;
	updatedAt?: Date;
}
