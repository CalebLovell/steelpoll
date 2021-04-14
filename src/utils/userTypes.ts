export interface User {
	id: string
	username: string;
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
