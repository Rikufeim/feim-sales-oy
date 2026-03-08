import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeContext";
import MessageBubble from "@/components/MessageBubble";
import Index from "./pages/Index";
import Verkkosivut from "./pages/Verkkosivut";
import WebSovellukset from "./pages/WebSovellukset";
import Prototyypit from "./pages/Prototyypit";
import Palvelut from "./pages/Palvelut";
import Referenssit from "./pages/Referenssit";
import Meista from "./pages/Meista";
import Yhteystiedot from "./pages/Yhteystiedot";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <MessageBubble />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/palvelut" element={<Palvelut />} />
              <Route path="/verkkosivut" element={<Verkkosivut />} />
              <Route path="/web-sovellukset" element={<WebSovellukset />} />
              <Route path="/prototyypit" element={<Prototyypit />} />
              <Route path="/referenssit" element={<Referenssit />} />
              <Route path="/meista" element={<Meista />} />
              <Route path="/yhteystiedot" element={<Yhteystiedot />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

