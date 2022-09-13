import React from 'react';
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';
import { Login } from './login';
const Home: React.FC = () => {
	return (
		<Link href="/api/login">
			<a className="min-h-screen bg-black flex flex-col justify-center items-center cursor-pointer">
				<Login />
				<h1 className="mt-6 text-white uppercase">Click to connect to your spotify account</h1>
			</a>
		</Link>
	);
};

export { Home };
