import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AdminSplashScreen from "@/components/AdminSplashScreen";

const Login = () => {
    const [username, setUsername] = useState("admin@akirapahomecareus.com");
    const [password, setPassword] = useState("");
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAuthenticating(true);

        setTimeout(() => {
            if (login(username, password)) {
                toast({
                    title: "Welcome Admin Workspace",
                    description: "You have successfully authenticated.",
                });
                navigate("/admin/careers");
            } else {
                setIsAuthenticating(false);
                toast({
                    title: "Access Denied",
                    description: "Invalid admin credentials. Use: admin@akirapahomecareus.com / admin123",
                    variant: "destructive",
                });
            }
        }, 600);
    };

    if (isAuthenticating) {
        return <AdminSplashScreen message="Verifying credentials & launching admin workspace..." />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans text-left">
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 space-y-6">
                
                {/* Brand Logo & Title Header */}
                <div className="text-center space-y-3">
                    <div className="w-24 h-24 mx-auto p-3 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center">
                        <img src="/akirapa-logo.png" alt="Akirapa Home Care" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-[#76248a]">Akirapa Admin Portal</h1>
                        <p className="text-xs text-gray-500 mt-1 font-medium">Enter administrator credentials to access dashboard</p>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="username" className="text-xs font-bold text-gray-700">Admin Email / Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="admin@akirapahomecareus.com"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-50 h-12 text-xs"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="password" className="text-xs font-bold text-gray-700">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-50 h-12 text-xs"
                            required
                        />
                    </div>

                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-[11px] text-[#76248a] font-semibold space-y-0.5">
                        <p className="font-bold">🔑 Default Credentials:</p>
                        <p>User: <span className="font-bold">admin@akirapahomecareus.com</span></p>
                        <p>Pass: <span className="font-bold">admin123</span></p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 text-sm font-extrabold bg-[#76248a] hover:bg-[#561868] text-white rounded-xl shadow-md transition-all hover:scale-[1.02]"
                    >
                        Sign In to Admin Workspace
                    </Button>
                </form>

            </div>
        </div>
    );
};

export default Login;
