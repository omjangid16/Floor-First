import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import api, { getAuthToken, setAuthToken, getStoredUser, setStoredUser } from "@/lib/api";

const AuthContext = createContext(undefined);

const toMessage = (err, fallback) =>
  err instanceof Error && err.message ? err.message : fallback;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(true);

  // Validate session on load
  useEffect(() => {
    let active = true;
    const token = getAuthToken();

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((data) => {
        if (!active) return;
        const currentUser = data?.user || null;
        setUser(currentUser);
        setStoredUser(currentUser);
      })
      .catch(() => {
        if (!active) return;
        setAuthToken(null);
        setStoredUser(null);
        setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const signUp = useCallback(async (details) => {
    try {
      const data = await api.post("/auth/register", {
        email: details.email,
        password: details.password,
        fullName: details.fullName || details.name,
        phone: details.phone,
        username: details.username,
      });

      if (data?.token && data?.user) {
        setAuthToken(data.token);
        setStoredUser(data.user);
        setUser(data.user);
      }

      return {
        error: null,
        needsConfirmation: false,
      };
    } catch (err) {
      return {
        error: toMessage(err, "Could not create your account."),
        needsConfirmation: false,
      };
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    try {
      const data = await api.post("/auth/login", {
        email,
        password,
      });

      if (data?.token && data?.user) {
        setAuthToken(data.token);
        setStoredUser(data.user);
        setUser(data.user);
      }

      return { error: null };
    } catch (err) {
      return {
        error: toMessage(err, "Could not sign you in."),
      };
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    return {
      error: "Google Sign-in is available in production OAuth configurations. Please sign in with your email and password.",
    };
  }, []);

  const resetPassword = useCallback(async (email) => {
    try {
      await api.post("/auth/forgot-password", { email });
      return { error: null };
    } catch (err) {
      return {
        error: toMessage(err, "Could not send the reset link."),
      };
    }
  }, []);

  const updateCurrentUser = useCallback(async (updates) => {
    try {
      const data = await api.put("/auth/profile", updates);
      if (data?.user) {
        setUser(data.user);
        setStoredUser(data.user);
      }
      return { data: data?.user, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  }, []);

  const signOut = useCallback(async () => {
    setAuthToken(null);
    setStoredUser(null);
    setUser(null);
    localStorage.removeItem("isLoggedIn");
  }, []);

  const session = user ? { user } : null;

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        resetPassword,
        signOut,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
