/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { GlowBackground } from "./components/ui/GlowBackground";
import { Home } from "./pages/Home";
import { Portfolio } from "./pages/Portfolio";
import { Pricing } from "./pages/Pricing";
import { About } from "./pages/About";
import { MorphLab } from "./pages/MorphLab";
import { ProjectCase } from "./pages/ProjectCase";
import { LanguageProvider } from "./contexts/LanguageContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppShell() {
  const { pathname } = useLocation();
  const isMorphRoute = pathname === "/lab/morph" || pathname === "/MorphLab" || pathname === "/morphlab";

  return (
    <div className={`min-h-screen bg-brand-dark text-brand-light font-sans selection:bg-brand-pink/30 selection:text-white ${isMorphRoute ? "h-screen overflow-hidden" : ""}`}>
      <GlowBackground />
      <Navbar />
      <main className={isMorphRoute ? "h-screen overflow-hidden" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectCase />} />
          <Route path="/lab/morph" element={<MorphLab />} />
          <Route path="/MorphLab" element={<MorphLab />} />
          <Route path="/morphlab" element={<MorphLab />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      {!isMorphRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppShell />
      </BrowserRouter>
    </LanguageProvider>
  );
}
