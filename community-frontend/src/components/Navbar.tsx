import React, { useEffect, useState } from 'react';
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

	return (
		<header className="bg-blue-500 text-white w-full">
			<div className="max-w-6xl mx-auto w-full flex items-center justify-between py-5 px-4 md:px-0">
				{/* Title - left */}
				<div className="text-xl font-bold">All Kutchi Community's Hub</div>

				{/* Desktop nav */}
				<nav className="hidden md:flex gap-6 items-center">
					{isAuthenticated ? (
						<>
							<Link to="/" className="text-white visited:text-white focus:text-white hover:underline">Home</Link>
							<Link to="/feed" className="text-white visited:text-white focus:text-white hover:underline">Feed</Link>
							<button onClick={handleLogout} className="text-white hover:underline">Logout</button>
						</>
					) : (
						<>
							<Link to="/login" className="text-white visited:text-white focus:text-white hover:underline">Login</Link>
							<Link to="/register" className="text-white visited:text-white focus:text-white hover:underline">Register</Link>
						</>
					)}
				</nav>

				{/* Mobile menu button */}
				<button
					className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded={open}
					onClick={() => setOpen((s) => !s)}
				>
					{open ? (
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					)}
				</button>
			</div>

			<div id="mobile-menu" className={`md:hidden ${open ? 'block' : 'hidden'} bg-blue-500 border-t border-blue-600`}>
				<div className="max-w-6xl mx-auto px-3 py-3 flex flex-col gap-3 items-center">
					{isAuthenticated ? (
						<>
							<Link to="/" className="text-white visited:text-white focus:text-white hover:underline text-center" onClick={() => setOpen(false)}>Home</Link>
							<Link to="/feed" className="text-white visited:text-white focus:text-white hover:underline text-center" onClick={() => setOpen(false)}>Feed</Link>
							<button onClick={handleLogout} className="text-white hover:underline text-center">Logout</button>
						</>
					) : (
						<>
							<Link to="/login" className="text-white visited:text-white focus:text-white hover:underline text-center" onClick={() => setOpen(false)}>Login</Link>
							<Link to="/register" className="text-white visited:text-white focus:text-white hover:underline text-center" onClick={() => setOpen(false)}>Register</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
}

