const UserRole = {
	ADMIN :"ADMIN",
	USER :"USER",
} as const

type UserRole = (typeof UserRole)[keyof typeof UserRole];


export interface User {
	id: number;
	username: string;
	email: string;
	password: string;
	role: UserRole;
	createdAt?: Date;
	updatedAt?: Date;
}
