import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { LoginRequest, RegisterRequest, UserProfile } from "../types/auth";
import { AuthContext } from "./authContextValue";
import type { AuthContextValue } from "./authContextValue";
import * as authApi from "../api/authApi";
import { getAccessToken, setAccessToken, clearAccessToken } from "../utils/token";

export { AuthContext } from "./authContextValue";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const profile = await authApi.getMe();
      setUser(profile);
    } catch {
      clearAccessToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (data: LoginRequest) => {
    const tokenResponse = await authApi.login(data);
    setAccessToken(tokenResponse.access_token);
    const profile = await authApi.getMe();
    setUser(profile);
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    const tokenResponse = await authApi.register(data);
    setAccessToken(tokenResponse.access_token);
    const profile = await authApi.getMe();
    setUser(profile);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clearAccessToken();
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
