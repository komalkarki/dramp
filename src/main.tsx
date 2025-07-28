import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { SavedListingsProvider } from "@/contexts/SavedListingsContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SavedListingsProvider>
          <App />
          <Toaster />
        </SavedListingsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>
);
