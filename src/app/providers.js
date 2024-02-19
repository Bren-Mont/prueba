'use client';

import { AuthContextProvider } from "@/app/Contexts/authContext";

export function Providers({ children }) {
  return (
      <AuthContextProvider>{children}</AuthContextProvider>
  );
}