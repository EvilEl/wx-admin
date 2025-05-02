import { axiosInstance } from './'

interface LoginCredentials {
  login: string
  password: string
}

interface User {
  id: string
  login: string
}

interface AuthResponse {
  data: User
  token: string
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post('login', credentials)
    return response.data
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('logout')
  },
}
