import API from "./method";

const url = process.env.REACT_APP_HUST_API;
const serviceHust = {
    findAllSchool: () => {
        return API.request({
            url: "/school",
            method: "GET",
            baseURL: url,
        });
    },
    addSchool: (params) => {
        return API.request({
            url: "/school",
            method: "POST",
            baseURL: url,
            params: params
        });
    },
    editSchool: (params, id) => {
        return API.request({
            url: "/school/" + id,
            method: "PUT",
            baseURL: url,
            params: params
        });
    },
    deleteSchool: (params, id) => {
        return API.request({
            url: "/school/" + id,
            method: "DELETE",
            baseURL: url,
            params: params
        });
    },
    findAllFaculty: (params) => {
        return API.request({
            url: "/faculty",
            method: "GET",
            baseURL: url,
            params: params
        });
    },
    findAllFacultyBySchoolId: (id) => {
        return API.request({
            url: "/school/" + id,
            method: "GET",
            baseURL: url,
        });
    },
    addFaculty: (params) => {
        return API.request({
            url: "/faculty",
            method: "POST",
            baseURL: url,
            params: params
        });
    },
    editFaculty: (params, id) => {
        return API.request({
            url: "/faculty/" + id,
            method: "PUT",
            baseURL: url,
            params: params
        });
    },
    deleteFaculty: (params, id) => {
        return API.request({
            url: "/faculty/" + id,
            method: "DELETE",
            baseURL: url,
            params: params
        });
    },
    findAllGroup: (params) => {
        return API.request({
            url: "/group",
            method: "GET",
            baseURL: url,
            params: params
        });
    },
    searchBenchmark: (params) => {
        return API.request({
            url: "/benchmark",
            method: "GET",
            baseURL: url,
            params: params
        });
    },
    addBenchmark: (params) => {
        return API.request({
            url: "/benchmark",
            method: "POST",
            baseURL: url,
            params: params
        });
    },
    editBenchmark: (params, id) => {
        return API.request({
            url: "/benchmark/" + id,
            method: "PUT",
            baseURL: url,
            params: params
        });
    },
    deleteBenchmark: (params, id) => {
        return API.request({
            url: "/benchmark/" + id,
            method: "DELETE",
            baseURL: url,
            params: params
        });
    },
    login: (params) => {
        return API.request({
            url: `/auth/login`,
            method: "POST",
            baseURL: url,
            params: params,
        });
    },
    getUser: () => {
        return API.request({
            url: `/user/token`,
            method: "GET",
            baseURL: url,
        });
    },
    suggest: (params) => {
        return API.request({
            url: `/faculty/suggest`,
            method: "POST",
            baseURL: url,
            params: params,
        });
    },
    changePassword: (params) => {
        return API.request({
            url: `/api/auth/change-password`,
            method: "POST",
            baseURL: url,
            params: params,
        });
    },
    resetPassword: (params) => {
        return API.request({
            url: `/api/auth/reset-pass`,
            method: "POST",
            baseURL: url,
            params: params,
        });
    },
    sendMailForgot: (email) => {
        return API.request({
            url: `/api/auth/forgot-mail/user/${email}`,
            method: "POST",
            baseURL: url,
        });
    },
    getUserProfile: (params) => {
        return API.request({
            url: `/api/user`,
            method: "GET",
            baseURL: url,
            params: params,
        });
    },
    getDataChart: () => {
        return API.request({
            url: `/api/investment/compare`,
            method: "GET",
            baseURL: url,
        });
    },
};

export {serviceHust};
