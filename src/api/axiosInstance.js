import axios from "axios";


const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers :{
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status
            switch (status){
                case 400:
                    console.error("400 bad request")
                    break
                case 401:
                    localStorage.removeItem("token")
                    localStorage.removeItem("role")
                    window.location.href("/login")
                    break
                case 403:
                    console.error("403 Forbidden")
                    break
                case 404:
                    console.error("404 not found")
                    break
                case 500:
                    console.error("500 server error")
                    break
            }
        }else if(error.request){
            console.error("server error")
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;