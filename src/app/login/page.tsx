"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LeftPanel from "@/components/auth/LeftPanel";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import RoleSelection from "@/components/auth/RoleSelection";
import WalletConnection from "@/components/auth/WalletConnection";

type ViewState = "login" | "register-1" | "register-2" | "register-3";

export default function AuthPage() {
  const router = useRouter();
  const [view, setView] = useState<ViewState>("login");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const handleLogin = () => {
    // Navigate to patient dashboard for now as default login mock
    document.cookie = `auth_token=trusted-wallet-patient; path=/`;
    router.push("/dashboard/patient");
  };

  const renderRegisterLayout = (content: React.ReactNode) => (
    <div className="min-h-screen flex flex-col bg-med-bg text-med-text">
      {/* Top Navigation Bar */}
      <header className="bg-med-bg/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <div className="font-manrope font-black text-2xl text-med-blue tracking-tighter cursor-pointer" onClick={() => setView("login")}>
            MedChain
          </div>
          <div className="flex items-center gap-6">
            <a className="text-med-secondary font-medium text-sm hover:text-med-blue transition-colors" href="#">Help</a>
            <a className="text-med-secondary font-medium text-sm hover:text-med-blue transition-colors" href="#">Support</a>
            <button 
              onClick={() => setView("login")}
              className="clinical-gradient text-white px-6 py-2 rounded-full font-bold transition-all active:scale-95 shadow-sm"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Main Registration Canvas */}
      <main className="flex-grow flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-med-blue/5 blur-[120px] -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-blue-400/5 blur-[100px] -z-10"></div>
        
        {content}
      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t border-gray-100 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 max-w-7xl mx-auto gap-8">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <div className="font-manrope font-black text-xl text-med-blue tracking-tighter">MedChain</div>
            <p className="text-sm tracking-wide text-med-secondary">
              © 2024 MedChain Health Systems. Clinical Etherealism Design.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-sm tracking-wide text-med-secondary hover:text-med-blue transition-colors" href="#">Privacy Policy</a>
            <a className="text-sm tracking-wide text-med-secondary hover:text-med-blue transition-colors" href="#">Terms of Service</a>
            <a className="text-sm tracking-wide text-med-secondary hover:text-med-blue transition-colors" href="#">HIPAA Compliance</a>
          </div>
        </div>
      </footer>
    </div>
  );

  if (view === "register-1") {
    return renderRegisterLayout(
      <RegisterForm 
        onSwitchToLogin={() => setView("login")} 
        onNext={(name) => {
          setUserName(name);
          setView("register-2");
        }}
      />
    );
  }

  if (view === "register-2") {
    return renderRegisterLayout(
      <RoleSelection 
        onBack={() => setView("register-1")}
        onContinue={(role) => {
          setUserRole(role);
          setView("register-3");
        }}
      />
    );
  }

  if (view === "register-3") {
    return renderRegisterLayout(
      <WalletConnection 
        onBack={() => setView("register-2")}
        onComplete={(addr) => {
          console.log("Account created with wallet:", addr);
          document.cookie = `auth_token=trusted-wallet-${userRole}; path=/`;
          if (userRole === "patient") {
            router.push("/dashboard/patient");
          } else {
            router.push(`/dashboard/${userRole}`);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-stretch bg-med-bg">
      {/* Left Panel: Brand & Visuals */}
      <LeftPanel />

      {/* Right Panel: Interaction Canvas */}
      <main className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-24 relative">
        <LoginForm 
          onSwitchToRegister={() => setView("register-1")} 
          onLogin={handleLogin}
        />

        {/* Shared Footer */}
        <footer className="absolute bottom-8 left-0 w-full px-8 pointer-events-none">
          <div className="max-w-md mx-auto flex flex-col items-center gap-4 opacity-40">
            <p className="text-xs text-slate-500">
              © 2024 MedChain Digital Sanctuary. All rights reserved.
            </p>
            <div className="flex gap-4 pointer-events-auto">
              <a className="text-xs text-slate-500 hover:text-med-blue transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="text-xs text-slate-500 hover:text-med-blue transition-colors" href="#">
                Terms of Service
              </a>
              <a className="text-xs text-slate-500 hover:text-med-blue transition-colors" href="#">
                Support
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
