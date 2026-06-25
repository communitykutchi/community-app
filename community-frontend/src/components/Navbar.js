import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setIsAuthenticated(Boolean(localStorage.getItem('token')));
    }, [location]);
    function handleLogout() {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setOpen(false);
        navigate('/login');
    }
    return (_jsxs("header", { className: "bg-blue-500 text-white w-full", children: [_jsxs("div", { className: "max-w-6xl mx-auto w-full flex items-center justify-between py-5 px-4 md:px-0", children: [_jsx("div", { className: "text-xl font-bold", children: "All Kutchi Community's Hub" }), _jsx("nav", { className: "hidden md:flex gap-6 items-center", children: isAuthenticated ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/", className: "text-white visited:text-white focus:text-white hover:underline", children: "Home" }), _jsx(Link, { to: "/feed", className: "text-white visited:text-white focus:text-white hover:underline", children: "Feed" }), _jsx("button", { onClick: handleLogout, className: "text-white hover:underline", children: "Logout" })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", className: "text-white visited:text-white focus:text-white hover:underline", children: "Login" }), _jsx(Link, { to: "/register", className: "text-white visited:text-white focus:text-white hover:underline", children: "Register" })] })) }), _jsx("button", { className: "md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white", "aria-controls": "mobile-menu", "aria-expanded": open, onClick: () => setOpen((s) => !s), children: open ? (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })) : (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })) })] }), _jsx("div", { id: "mobile-menu", className: `md:hidden ${open ? 'block' : 'hidden'} bg-blue-500 border-t border-blue-600`, children: _jsx("div", { className: "max-w-6xl mx-auto px-3 py-3 flex flex-col gap-3 items-center", children: isAuthenticated ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/", className: "text-white visited:text-white focus:text-white hover:underline text-center", onClick: () => setOpen(false), children: "Home" }), _jsx(Link, { to: "/feed", className: "text-white visited:text-white focus:text-white hover:underline text-center", onClick: () => setOpen(false), children: "Feed" }), _jsx("button", { onClick: handleLogout, className: "text-white hover:underline text-center", children: "Logout" })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", className: "text-white visited:text-white focus:text-white hover:underline text-center", onClick: () => setOpen(false), children: "Login" }), _jsx(Link, { to: "/register", className: "text-white visited:text-white focus:text-white hover:underline text-center", onClick: () => setOpen(false), children: "Register" })] })) }) })] }));
}
