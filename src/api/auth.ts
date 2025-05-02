import { axiosInstance } from './'

interface LoginCredentials {
  login: string
  password: string
}

export interface User {
  id: string
  login: string
  token: string
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await axiosInstance.post('login', credentials)
    return response.data
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('logout')
  },
}
