import { useQuery } from "react-query";
import httpRequest from "./httpRequest";

const todoService = {
	getList: (params) => httpRequest.get('todos', params)
}

export const useTodosListQuery = ({ params = {}, queryParams } = {}) => {
	return useQuery(
		['TODOS', params],
		() => {
			return todoService.getList(params);
		},
		queryParams
	);
};

export default todoService