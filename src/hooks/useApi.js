import axios from "axios";

export const DOMAIN_URL = "http://localhost:3000";
const BASE_URL = `${DOMAIN_URL}/api`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const useAxiosPrivateInstance = () => {
  const axiosPrivateInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return axiosPrivateInstance;
};
