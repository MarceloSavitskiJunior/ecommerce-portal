import { api } from "@/lib/axios";
import type { AuthResponse, CredentialDTO, RegisterDTO, UserResponse } from "../dtos/auth.dto";

const BASE_URL = '/auth'

export const AuthService = {
 
    async signUp(data: RegisterDTO): Promise<UserResponse> {
        const response = await api.post(`${BASE_URL}/signup`, data)
        return response.data
    },

    async signIn(data: CredentialDTO): Promise<AuthResponse> {
        const response = await api.post(`${BASE_URL}/signin`, data)
        return response.data
    }
}