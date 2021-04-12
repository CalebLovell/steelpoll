import { ChangePasswordRequest, LoginRequest, SignupRequest } from '@utils/userTypes';
import { Collection, Create, Index, Login, Logout, Match, Ref, Update } from 'faunadb';

import { faunaClient } from '@utils/fauna';

export const signup = async (user: SignupRequest) => {
	const res = await faunaClient.query(
		Create(Collection(`users`), {
			credentials: { password: user.password },
			data: {
				username: user.username,
				email: user.email,
			},
		})
	);
	if (res.requestResult.statusCode === 200) return res;
	else throw new Error(res.message);
};

export const login = async (user: LoginRequest) => {
	const res = await faunaClient.query(Login(Match(Index(`users_by_email`), user.email), { password: user.password }));
	if (res.requestResult.statusCode === 200) return res;
	else throw new Error(res.message);
};

export const logout = async (allTokens: boolean) => {
	const res = await faunaClient.query(Logout(allTokens));
	if (res.requestResult.statusCode === 200) return res;
	else throw new Error(res.message);
};

export const changePassword = async (changePasswordRequest: ChangePasswordRequest) => {
	const res = await faunaClient.query(
		Update(Ref(Collection(`users`), changePasswordRequest.userRef), {
			credentials: { password: changePasswordRequest.newPassword },
		})
	);
	if (res.requestResult.statusCode === 200) return res;
	else throw new Error(res.message);
};
