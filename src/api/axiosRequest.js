import axios from "axios";
import { resetAccessTokenApi } from "@/api";
import { useNavigate } from "react-router-dom";

// Tạo một instance axios cơ bản với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/api",
  timeout: 10000,
});

// Cài đặt interceptor để xử lý response và lỗi
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.response.data.success &&
      error.response.data.isAccessTokenExpired &&
      window.location.pathname !== "/login"
    ) {
      try {
        // Get refresh token from local storage
        const refreshToken = localStorage.getItem("refreshToken");

        // Remove token from local storage
        localStorage.removeItem("accessToken");

        const response = await axiosRequest(resetAccessTokenApi(), {
          method: "POST",
          body: { refreshToken },
        });

        if (response.success) {
          const newAccessToken = response.data;
          localStorage.setItem("accessToken", newAccessToken);
          axiosInstance.defaults.headers.common["accessToken"] = newAccessToken;
          window.location.reload();
        }
      } catch (refreshError) {
        console.error("Error refreshing token: ", refreshError);
        // localStorage.removeItem("accessToken");
        window.location.pathname = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Hàm xuất khẩu, cập nhật token trước khi trả về instance
const axiosCustom = () => {
  // Lấy và cập nhật token cho mọi request
  const token = localStorage.getItem("accessToken");
  if (token) {
    axiosInstance.defaults.headers.common["accessToken"] = token;
  } else {
    delete axiosInstance.defaults.headers.common["accessToken"];
  }

  return axiosInstance;
};

// Hàm chung để thực hiện request với query, params, và body
const axiosRequest = async (
  url,
  { method = "get", params = {}, query = {}, body = {}, headers = {} } = {}
) => {
  try {
    const response = await axiosCustom()({
      method: method,
      url,
      params: query, // query string parameters
      data: body, // request body
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request error: ", error);
    return error.response.data;
  }
};

export default axiosRequest;

// const axiosCustom = () => {
//   return axios
//     .create({
//       baseURL: 'http://localhost:8081/api',
//       timeout: 10000,
//       headers: { token: localStorage.getItem('token') },
//     })
//     .interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response && error.response.status === 401) {
//           localStorage.removeItem('token');
//           window.location.pathname = '/login';
//         }
//         return Promise.reject(error);
//       }
//     );
// };

// export default axiosCustom;
