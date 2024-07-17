import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../hooks/useApi";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,

      login: async (username, password) => {
        const response = await axiosInstance.post("/auth/login", {
          username: username,
          password: password,
        });

        if (response.status === 200) {
          const userData = jwtDecode(response.data.data.token);

          set({
            user: userData,
            token: response.data.data.token,
            isAuthenticated: true,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth",
    }
  )
);
