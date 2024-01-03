import axios from "axios";

const API = {
    request: (config) => {
        const {
            method = "GET",
            url,
            params,
            headers,
            baseURL = process.env.REACT_APP_API, // domain API
        } = config;

        const accessToken = localStorage.getItem("access-token") || sessionStorage.getItem("access-token") ; // lấy token

        let newHeaders = {
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "token-id": `${accessToken}`
        };
        if (headers) {
            newHeaders = {...newHeaders, ...headers};
        }

        const requestConfig = {
            method,
            url,
            baseURL,
            headers: newHeaders,
            timeout: 20000, //timeout error message 20s.
            timeoutErrorMessage: "Quá thời gian chờ dịch vụ",
        };

        if (params) {
            if (typeof method === "string" && method.toLowerCase().trim() === "get") {
                requestConfig.params = params;
            } else {
                requestConfig.data = params;
            }
        }

        return axios(requestConfig)
            .then((response) => response?.data)
            .catch((e) => {
                const error = e?.response?.data || {};
                return Promise.reject({...error, message: error.message});
            });
    },

    upload: (config) => {
        const {file, type, url} = config;
        if (!file) {
            return Promise.resolve(null);
        }

        const urlUpload =
            url || `${process.env.REACT_APP_CDN}/api/image_uploader?type=${type}`;
        const formData = new FormData();
        formData.append("file", file);
        let newHeaders = {
            "content-type": "multipart/form-data",
        };
        const accessToken = localStorage.getItem("access-token") || sessionStorage.getItem("access-token") ;
        if (accessToken) {
            newHeaders = {
                Authorization: `Bearer ${accessToken}`,
                "token-id": `${accessToken}`
            };
        }

        const configApi = {
            headers: newHeaders,
        };

        return axios
            .post(urlUpload, formData, configApi)
            .then((response) => response.data)
            .catch((error) => {
                if (error?.response?.status === 413) {
                    return Promise.reject(
                        new Error("Lỗi: Kích thước file tải lên quá lớn"),
                    );
                }

                if (error?.response?.data) {
                    const {message} = error.response.data;
                    return Promise.reject(message ? new Error(message) : error);
                }
                return Promise.reject(error);
            });
    },
};

export default API;
