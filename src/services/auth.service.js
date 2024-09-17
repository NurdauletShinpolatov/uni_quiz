import { useMutation } from 'react-query';
import httpRequestAuth from './httpRequestAuth';

const authService = {
	login: (data) => httpRequestAuth.post('v2/login', data),
	oneLogin: (data) => httpRequestAuth.post('v2/multi-company/one-login', data),
	forgot: (data) => httpRequestAuth.post('v2/forgot-password', data),
	verify: (data) => httpRequestAuth.post('v2/verify-only-email', data),
	reset: (data) => httpRequestAuth.post('v2/reset-password', data),
	
	
};

export const useLoginMutation = (mutationSettings) => {
	return useMutation((data) => authService.login(data), mutationSettings);
};
export const useOneLoginMutation = (mutationSettings) => {
	return useMutation((data) => authService.oneLogin(data), mutationSettings);
};
export const useForgot = (mutationSettings) => {
	return useMutation((data) => authService.forgot(data), mutationSettings);
};
export const useVerify = (mutationSettings) => {
	return useMutation((data) => authService.verify(data), mutationSettings);
};
export const useResetPassword = (mutationSettings) => {
	return useMutation((data) => authService.reset(data), mutationSettings);
};
