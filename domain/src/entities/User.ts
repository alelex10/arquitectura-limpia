const UserRole = {
	ADMIN :"ADMIN",
	USER :"USER",
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole];


export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	role: UserRole;
	createdAt?: Date;
	updatedAt?: Date;
}
