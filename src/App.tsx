import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Verkkosivut from "./pages/Verkkosivut";
import WebSovellukset from "./pages/WebSovellukset";
import Prototyypit from "./pages/Prototyypit";
import Palvelut from "./pages/Palvelut";
import Prosessi from "./pages/Prosessi";
import Referenssit from "./pages/Referenssit";
import Meista from "./pages/Meista";
import UKK from "./pages/UKK";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/palvelut" element={<Palvelut />} />
            <Route path="/verkkosivut" element={<Verkkosivut />} />
            <Route path="/web-sovellukset" element={<WebSovellukset />} />
            <Route path="/prototyypit" element={<Prototyypit />} />
            <Route path="/prosessi" element={<Prosessi />} />
            <Route path="/referenssit" element={<Referenssit />} />
            <Route path="/meista" element={<Meista />} />
            <Route path="/ukk" element={<UKK />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
