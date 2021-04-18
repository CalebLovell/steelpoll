export interface CreateUserRequest {
	uid?: string;
	name: string;
	email: string;
	providerId?: string;
}

export interface User {
	name: string;
	email: string;
	provider: string;
	photoUrl: string;
	createdAt: string;
	updatedAt: string;
}

export interface SignupRequest {
	name: string;
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
