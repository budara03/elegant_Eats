import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("eme_token");
    const storedUser = localStorage.getItem("eme_user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (token, user) => {
    localStorage.setItem("eme_token", token);
    localStorage.setItem("eme_user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("eme_token");
    localStorage.removeItem("eme_user");
    setToken(null);
    setUser(null);
  };

  // Guest mode: stores name in sessionStorage for chat-only usage
  const loginAsGuest = (name, phone) => {
    const guestUser = {
      _id: `guest_${Date.now()}`,
      name,
      phone,
      role: "user",
      isGuest: true,
    };
    sessionStorage.setItem("eme_guest", JSON.stringify(guestUser));
    setUser(guestUser);
  };

  const isAuthenticated = Boolean(token || (user && user.isGuest));
  const isOwner = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        loginAsGuest,
        isAuthenticated,
        isOwner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
