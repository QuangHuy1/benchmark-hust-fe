import API from "./method";

let url = process.env.REACT_APP_HUST_API;
let serviceHust = {
    findAllSchool: () => {
        console.log(url)
        return API.request({
            url: "/school",
            method: "GET",
            baseURL: url,
        });
    },
    findAllFaculty: () => {
        return API.request({
            url: "/faculty",
            method: "GET",
            baseURL: url,
        });
    },
    login: (params) => {
        return API.request({
            url: `/api/auth/login`,
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
