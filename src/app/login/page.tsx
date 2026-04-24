"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWalletStore } from "@/store/useWalletStore";
import { authApi } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, ShieldCheck, Activity, Loader2, Mail, Lock, User, Hospital, AlertCircle } from "lucide-react";

export default function AuthPage() {
    const router = useRouter();
    const { connectWallet, isConnected } = useWalletStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor'>('patient');
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleWalletConnect = async () => {
        setIsLoading(true);
        try {
            await connectWallet(selectedRole);

            setTimeout(() => {
                document.cookie = `auth_token=trusted-wallet-${selectedRole}; path=/`;
                router.push(`/dashboard/${selectedRole}`);
            }, 1000);

        } catch (error) {
            console.error("Wallet Connection failed:", error);
            setIsLoading(false);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let role: string;
            if (isLogin) {
                const res = await authApi.login({ email, password });
                role = res.role === 'DOCTOR' ? 'doctor' : 'patient';
            } else {
                await authApi.register({
                    email,
                    password,
                    role: selectedRole === 'doctor' ? 'DOCTOR' : 'PATIENT',
                });
                const res = await authApi.login({ email, password });
                role = res.role === 'DOCTOR' ? 'doctor' : 'patient';
            }

            // Set the auth cookie using the REAL role from the backend
            document.cookie = `auth_token=jwt-${role}; path=/; max-age=3600`;
            router.push(`/dashboard/${role}`);
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: Record<string, unknown>; status?: number } };
            if (axiosError.response?.data) {
                const data = axiosError.response.data;
                const msg = data.detail || data.error || data.email || data.password || JSON.stringify(data);
                setError(String(msg));
            } else {
                setError('Connection failed. Is the backend server running on port 8000?');
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-primary">
            {/* LEFT SIDE - Branding & Medical Imagery */}
            <div className="hidden lg:flex flex-col justify-between p-12 text-primary-foreground relative overflow-hidden">
                {/* Abstract shapes / medical UI feel */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
                            <Stethoscope className="h-8 w-8 text-white" />
                        </div>
                        <span className="font-bold text-3xl tracking-tight text-white">Medchain</span>
                    </div>

                    <div className="space-y-6 max-w-lg mt-12">
                        <h1 className="text-4xl font-extrabold tracking-tight leading-tight text-white">
                            The Future of Secure <br /> Electronic Health Records.
                        </h1>
                        <p className="text-white/80 text-lg leading-relaxed">
                            Medical data ownership powered by Polygon blockchain architecture. Access your history securely, grant permissions transparently, and verify immutability without trusting centralized silos.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 grid grid-cols-2 gap-6 mt-16 pb-8">
                    <div className="space-y-2">
                        <ShieldCheck className="h-6 w-6 text-white/80" />
                        <h3 className="font-semibold text-white">Military Grade</h3>
                        <p className="text-sm text-white/60">AES-256-GCM client-side encryption.</p>
                    </div>
                    <div className="space-y-2">
                        <Activity className="h-6 w-6 text-white/80" />
                        <h3 className="font-semibold text-white">Always Verifiable</h3>
                        <p className="text-sm text-white/60">IPFS pinning + smart contract tracking.</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE - Auth Flow */}
            <div className="flex flex-col items-center justify-center p-8 sm:p-12 lg:p-24 relative">

                {/* Mobile Heading */}
                <div className="flex lg:hidden items-center gap-3 mb-8 justify-center z-10">
                    <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
                        <Stethoscope className="h-8 w-8 text-white" />
                    </div>
                    <span className="font-bold text-3xl tracking-tight text-white">Medchain</span>
                </div>

                <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

                    {/* The 3D Card Container */}
                    <Card className="w-full bg-card border-border shadow-[0_12px_40px_-15px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] hover:-translate-y-1">
                        <CardHeader className="space-y-4 pb-4">
                            <div className="flex flex-col text-center space-y-1.5">
                                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                                    {isLogin ? "Welcome Back" : "Create an Account"}
                                </CardTitle>
                                <CardDescription className="text-base text-muted-foreground">
                                    {isLogin
                                        ? "Enter your credentials to access your account"
                                        : "Sign up to join the decentralized network"}
                                </CardDescription>
                            </div>

                            {/* Role Selection Tabs */}
                            <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl">
                                <button
                                    type="button"
                                    onClick={() => setSelectedRole('patient')}
                                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${selectedRole === 'patient'
                                        ? 'bg-background text-foreground shadow-sm ring-1 ring-border'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10'
                                        }`}
                                >
                                    <User className="w-4 h-4" />
                                    Patient
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedRole('doctor')}
                                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${selectedRole === 'doctor'
                                        ? 'bg-background text-foreground shadow-sm ring-1 ring-border'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10'
                                        }`}
                                >
                                    <Hospital className="w-4 h-4" />
                                    Provider
                                </button>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                {!isLogin && (
                                    <div className="space-y-2 relative">
                                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input id="name" required placeholder="John Doe" className="pl-10 h-11" value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2 relative">
                                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="email" type="email" required placeholder="name@example.com" className="pl-10 h-11" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div className="space-y-2 relative">
                                    <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="password" type="password" required placeholder="••••••••" className="pl-10 h-11" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>

                                <Button type="submit" variant="default" className="w-full h-11 mt-2 text-base font-semibold shadow-md active:scale-[0.98] transition-all" disabled={isLoading}>
                                    {isLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        isLogin ? "Sign In" : "Create Account"
                                    )}
                                </Button>

                                {error && (
                                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-[13px] font-medium text-red-600">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        {error}
                                    </div>
                                )}
                            </form>

                            <div className="relative my-6 text-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground font-medium">Or continue with</span>
                                </div>
                            </div>

                            {/* Wallet Option */}
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-11 text-base gap-3 border-border hover:bg-secondary transition-colors"
                                onClick={handleWalletConnect}
                                disabled={isLoading || isConnected}
                            >
                                <svg className="w-5 h-5 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M29.5855 12.0125L16.2941 2.21989C16.1207 2.0921 15.8793 2.0921 15.7059 2.21989L2.41452 12.0125C2.15576 12.2031 2.06208 12.5694 2.1932 12.8767L7.26941 24.757C7.38883 25.0366 7.66224 25.2152 7.96577 25.2152H24.0342C24.3378 25.2152 24.6112 25.0366 24.7306 24.757L29.8068 12.8767C29.9379 12.5694 29.8442 12.2031 29.5855 12.0125Z" fill="#E2761B" />
                                    <path d="M29.5855 12.0125L24.0342 25.2152V18.232L29.5855 12.0125Z" fill="#E4761B" />
                                    <path d="M24.0342 25.2152L16 30L7.96577 25.2152L16 22.0621L24.0342 25.2152Z" fill="#D7C1B3" />
                                    <path d="M16 2.05371L24.0342 8.5284V18.232L16 22.0621V2.05371Z" fill="#E4761B" />
                                    <path d="M16 2.05371V22.0621L7.96577 18.232V8.5284L16 2.05371Z" fill="#F6851B" />
                                    <path d="M2.41452 12.0125L7.96577 18.232V25.2152L2.41452 12.0125Z" fill="#E2761B" />
                                </svg>
                                Web3 Wallet
                            </Button>
                        </CardContent>
                        <CardFooter className="flex justify-center border-t border-border bg-muted/30 py-4">
                            <p className="text-sm text-muted-foreground">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors border-none bg-transparent"
                                >
                                    {isLogin ? "Register now" : "Log in"}
                                </button>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
