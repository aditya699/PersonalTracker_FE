import apiClient from "./client";
import { ENDPOINTS } from "./config";
import type {
  RegisterRequest,
  LoginRequest,
  TokenResponse,
  TokenRefreshRequest,
  UserProfile,
} from "../types/auth";

export async function register(
  data: RegisterRequest,
): Promise<TokenResponse> {
  const response = await apiClient.post<TokenResponse>(
    ENDPOINTS.AUTH.register,
    data,
  );
  return response.data;
}

export async function login(data: LoginRequest): Promise<TokenResponse> {
  const response = await apiClient.post<TokenResponse>(
    ENDPOINTS.AUTH.login,
    data,
  );
  return response.data;
}

export async function refreshToken(
  data: TokenRefreshRequest,
): Promise<TokenResponse> {
  const response = await apiClient.post<TokenResponse>(
    ENDPOINTS.AUTH.refresh,
    data,
  );
  return response.data;
}

export async function getMe(): Promise<UserProfile> {
  const response = await apiClient.get<UserProfile>(ENDPOINTS.AUTH.me);
  return response.data;
}
