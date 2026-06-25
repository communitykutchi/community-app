import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from '../components/Navbar.js';
export default function MainLayout({ children }) {
    return (_jsxs("div", { className: "min-h-screen w-full flex flex-col", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1 w-full bg-gray-50 p-6 flex items-center justify-center", children: _jsx("div", { className: "w-full max-w-4xl mx-auto", children: children }) }), _jsx("footer", { className: "bg-gray-100 w-full", children: _jsx("div", { className: "max-w-4xl mx-auto w-full text-center text-sm text-gray-600 p-4", children: "\u00A9 2025 All Kutchi Community's Hub. All rights reserved." }) })] }));
}
