import { useMutation, useQuery } from 'react-query';
import httpRequestAuth from './httpRequestAuth';

const userService = {
	getList: (params) => httpRequestAuth.get('v1/user', params),
	getByID: (id, params) => httpRequestAuth.get(`v1/user/${id}`, { params }),
	update: (data) => httpRequestAuth.patch('v1/user', data),
	delete: (id, params) => httpRequestAuth.delete(`v2/user/${id}`, { params }),
	create: (data) => httpRequestAuth.post('v1/admin/register', data),
};

export const useUsersListQuery = ({ params = {}, queryParams } = {}) => {
	return useQuery(
		['USERS', params],
		() => {
			return userService.getList(params);
		},
		queryParams
	);
};

export const useUserGetByIdQuery = ({ id, params = {}, queryParams }) => {
	return useQuery(
		['USER_BY_ID', { id, ...params }],
		() => {
			return userService.getByID(id, params);
		},
		queryParams
	);
};

export const useUserCreateMutation = (mutationSettings) => {
	return useMutation((data) => userService.create(data), mutationSettings);
};

export const useUserUpdateMutation = (mutationSettings) => {
	return useMutation((data) => userService.update(data), mutationSettings);
};

export const useUserDeleteMutation = (mutationSettings, params) => {
	return useMutation((id) => userService.delete(id, params), mutationSettings);
};

export default userService;
