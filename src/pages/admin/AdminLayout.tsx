import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, MessageSquare, Briefcase, Users, LogOut, Settings, Menu, X, Globe, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminSplashScreen from "@/components/AdminSplashScreen";

const AdminLayout = () => {
    const { isAuthenticated, logout } = useAuth();
    const { isSupabaseConnected } = useData();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 900);
        return () => clearTimeout(timer);
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    if (showSplash) {
        return <AdminSplashScreen message="Initializing Akirapa Management System..." />;
    }

    const navItems = [
        { label: "Careers & Jobs", path: "/admin/careers", icon: Briefcase },
        { label: "Client Messages", path: "/admin", icon: MessageSquare },
        { label: "Donations", path: "/admin/donations", icon: LayoutDashboard },
        { label: "Videos Gallery", path: "/admin/videos", icon: MessageSquare },
        { label: "Staff & Members", path: "/admin/members", icon: Users },
        { label: "Care Programs", path: "/admin/projects", icon: Briefcase },
        { label: "Partners", path: "/admin/partners", icon: Settings },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-gray-100 flex relative font-sans">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex border-r border-gray-100
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/akirapa-logo.png" alt="Akirapa Home Care" className="h-10 w-auto object-contain" />
                        <div>
                            <h2 className="text-base font-extrabold text-[#76248a]">Akirapa Admin</h2>
                            <p className="text-[10px] font-semibold text-[#40ddd3] tracking-wider uppercase">Care Management</p>
                        </div>
                    </div>
                    {/* Close button for mobile */}
                    <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => setIsSidebarOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${isActive
                                    ? "bg-[#76248a] text-white shadow-md"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-[#76248a]"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#76248a]"}`} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100 space-y-2">
                    <div className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between border ${
                        isSupabaseConnected 
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                            : "bg-blue-50 text-blue-800 border-blue-200"
                    }`}>
                        <div className="flex items-center gap-2">
                            <Database className="w-4 h-4 shrink-0 text-[#76248a]" />
                            <span>Backend Database</span>
                        </div>
                        <span className={`w-2 h-2 rounded-full ${isSupabaseConnected ? "bg-emerald-500 animate-pulse" : "bg-blue-400"}`} />
                    </div>
                    <Button variant="outline" asChild className="w-full justify-start gap-2 border-gray-200 text-xs font-bold text-gray-700">
                        <Link to="/careers" target="_blank">
                            <Globe className="w-4 h-4 text-[#76248a]" />
                            View Public Careers Page
                        </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 text-xs font-bold" onClick={logout}>
                        <LogOut className="w-4 h-4" />
                        Logout Admin
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between z-10 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <button onClick={toggleSidebar} className="text-gray-700 p-1">
                            <Menu className="w-6 h-6 text-[#76248a]" />
                        </button>
                        <span className="font-extrabold text-[#76248a] text-base">Akirapa Admin Dashboard</span>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
