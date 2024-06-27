import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
