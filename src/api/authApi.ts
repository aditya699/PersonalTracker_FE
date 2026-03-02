import apiClient from "./client";
import { ENDPOINTS } from "./config";
import type {
  RegisterRequest,
  LoginRequest,
  TokenResponse,
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

export async function refreshToken(): Promise<TokenResponse> {
  // Cookie is sent automatically by the browser — no body needed
  const response = await apiClient.post<TokenResponse>(
    ENDPOINTS.AUTH.refresh,
    {},
  );
  return response.data;
}

export async function logout(): Promise<void> {
  await apiClient.post(ENDPOINTS.AUTH.logout);
}

export async function getMe(): Promise<UserProfile> {
  const response = await apiClient.get<UserProfile>(ENDPOINTS.AUTH.me);
  return response.data;
}
