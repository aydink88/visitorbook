import { type ComponentChildren, createContext } from "preact";
import { useCallback, useContext, useEffect, useReducer, useState } from "preact/hooks";
import { TStatus } from "src/types";
import { verifyToken, authenticate as authService } from "../services";

type TAuth = { userId: any; error: any; status: TStatus };
type TAuthContext = {
  auth: TAuth;
  authenticate: (email: string, password: string) => void;
  logout(): void;
};

type TAuthActionType = "idle" | "pending" | "success" | "error";
type TAuthAction = { type: TAuthActionType; payload?: unknown };
type TAuthSetter = (payload?: unknown) => TAuth;

const initialState: TAuth = { userId: null, error: null, status: "idle" };

const initialContext: TAuthContext = {
  auth: initialState,
  authenticate: (email: string, password: string) => {
    return;
  },
  logout() {
    return;
  },
};

const actions: Record<TAuthActionType, TAuthSetter> = {
  idle: () => initialState,
  pending: () => ({ userId: null, error: null, status: "pending" }),
  success: (payload) => ({ userId: payload, error: null, status: "success" }),
  error: (payload) => ({ userId: null, error: payload, status: "error" }),
};

const authReducer = (_state: TAuth, action: TAuthAction) => {
  return actions[action.type](action.payload);
};

export const AuthContext = createContext(initialContext);

export default function AppContextProvider({ children }: { children: ComponentChildren }) {
  const [auth, authDispatch] = useReducer(authReducer, initialState);

  const authenticate = useCallback((email: string, password: string) => {
    authDispatch({ type: "pending" });
    authService(email, password)
      .then((userId) => authDispatch({ payload: userId, type: "success" }))
      .catch((e) => authDispatch({ type: "error", payload: e.message || "login failed" }));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("vb_token");
    authDispatch({ type: "idle" });
  }, []);

  useEffect(() => {
    authDispatch({ type: "pending" });
    verifyToken()
      .then((userId) => {
        if (userId) {
          authDispatch({ payload: userId, type: "success" });
        }
      })
      .catch((e) =>
        authDispatch({ payload: e.message || "Verifying Session failed", type: "error" })
      );
  }, []);

  return (
    <AuthContext.Provider value={{ auth, authenticate, logout }}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("context should be in the provider");
  }
  return ctx;
};
