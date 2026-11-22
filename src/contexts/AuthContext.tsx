import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export type SignUpDetails = {
  fullName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
};

type AuthResult = { error: string | null; needsConfirmation: boolean };

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (details: SignUpDetails) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signInWithLovable: () => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const toMessage = (err: unknown, fallback: string): string =>
  err instanceof Error && err.message ? err.message : fallback;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (active) setSession(data.session);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
      },
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signUp = useCallback(async (details: SignUpDetails): Promise<AuthResult> => {
    const { data, error } = await supabase.auth.signUp({
      email: details.email,
      password: details.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: details.fullName,
          phone: details.phone,
          username: details.username,
        },
      },
    });

    if (error) {
      return { error: toMessage(error, "Could not create your account."), needsConfirmation: false };
    }

    return { error: null, needsConfirmation: data.session === null };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? toMessage(error, "Could not sign you in.") : null };
  }, []);

  const signInWithProvider = useCallback(
    async (provider: "google" | "lovable") => {
      const result = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: window.location.origin,
      });

      if (result.error) {
        return { error: toMessage(result.error, `Could not sign you in with ${provider}.`) };
      }

      return { error: null };
    },
    [],
  );

  const signInWithGoogle = useCallback(
    () => signInWithProvider("google"),
    [signInWithProvider],
  );

  const signInWithLovable = useCallback(
    () => signInWithProvider("lovable"),
    [signInWithProvider],
  );

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/profile/account`,
    });
    return { error: error ? toMessage(error, "Could not send the reset link.") : null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithLovable,
        resetPassword,
        signOut,
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
