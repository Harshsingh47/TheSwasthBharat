  import { createRoot } from "react-dom/client";
  import { GoogleOAuthProvider } from "@react-oauth/google";
  import App from "./App.tsx";
  import "./styles/index.css";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { Toaster } from "sonner";

  const queryClient = new QueryClient();
 
  createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster richColors position="top-center" expand={true} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );