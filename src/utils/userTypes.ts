export interface User {
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface SignupRequest {
	username: string;
	email: string;
	password: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface ChangePasswordRequest {
	userRef: string;
	newPassword: string;
}
