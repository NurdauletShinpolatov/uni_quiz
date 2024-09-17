import { useMutation, useQuery } from "react-query";
import httpRequest from "./httpRequest";

const orderService = {
  getList: (params) => {
    return httpRequest.post("object/get-list/orders", params);
  },
  getExcel: (body) => httpRequest.post("object/excel/orders", body),
  getObjectList: (tableSlug, params) =>
    httpRequest.post(`object/get-list/${tableSlug}`, params),
  getByID: (id, params) => httpRequest.get(`object/orders/${id}`, { params }),
  update: (data) => httpRequest.put("object/orders", { data }),
  updateEnd: (data) =>
    httpRequest.post(
      "invoke_function/qwatt-stoporder-4dbfb907-8b4b-460b-906b-cc81c58e656c",
      data
    ),
  // delete: (id, params) => httpRequest.delete(`v2/user/${id}`, { params }),
  // create: (data) => httpRequest.post('admin/register', data),
};

// export const useUsersListQuery = ({ params = {}, queryParams } = {}) => {
// 	return useQuery(
// 		['USERS', params],
// 		() => {
// 			return userService.getList(params);
// 		},
// 		queryParams
// 	);
// };

export const useOrderGetById = ({ id, params = {}, queryParams }) => {
  return useQuery(
    ["ORDER_BY_ID", { id, ...params }],
    () => {
      return orderService.getByID(id, params);
    },
    queryParams
  );
};

export const useOrderGet = ({ params = {}, queryParams }) => {
  return useQuery(
    ["GET_ORDERS", params],
    async () => {
      return await orderService.getList(params).then((elem) => ({
        response: elem.data.data.response,
        count: elem.data.data.count,
      }));
    },
    queryParams
  );
};

// export const useGetOrdersMutation = (mutationSettings) => {
//   return useMutation((data) => orderService.getList(data), mutationSettings);
// };

export const usePutOrdersMutation = (mutationSettings) => {
  return useMutation((data) => orderService.update(data), mutationSettings);
};

export const usePutOrdersEndMutation = (mutationSettings) => {
  return useMutation((data) => orderService.updateEnd(data), mutationSettings);
};

export const useGetOrdersExcelMutation = (mutationSettings) => {
  return useMutation((data) => orderService.getExcel(data), mutationSettings);
};

export const useGetUserGuidMutation = (mutationSettings) => {
  return useMutation(
    (data) => orderService.getUserGuid(data),
    mutationSettings
  );
};

// export const useUserUpdateMutation = (mutationSettings) => {
// 	return useMutation((data) => userService.update(data), mutationSettings);
// };

// export const useUserDeleteMutation = (mutationSettings, params) => {
// 	return useMutation((id) => userService.delete(id, params), mutationSettings);
// };

export default orderService;
