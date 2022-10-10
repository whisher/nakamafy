import React from 'react';
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';
import { APP_EMAIL, APP_TITLE, REDIRECT_ROUTES } from '../../../constant';
import { encodeBase64, decodeBase64 } from '@/util/spotify';

const Home: React.FC = () => {
	const encEmail = encodeBase64(APP_EMAIL);
	const { home } = REDIRECT_ROUTES;
	return (
		<>
			<header className="fixed top-0 w-full bg-[#000000] text-white">
				<h1>
					<Link href={home}>
						<a className="flex items-center px-6 py-3">
							<FaSpotify role="img" className="h-9 w-9 text-white" />
							<span className="flex-1 pl-1 text-xl font-bold tracking-tighter text-white">
								{APP_TITLE}
								<sup className="relative top-px text-sm">&#174;</sup>
							</span>
						</a>
					</Link>
				</h1>
			</header>
			<main>
				<Link href="/api/login">
					<a
						data-testid="href-login"
						className="min-h-screen bg-black flex flex-col justify-center items-center gap-6"
					>
						<FaSpotify role="img" className="h-10 w-10 lg:h-20 lg:w-20 text-brand-300" />
						<h2 className="text-white text-sm uppercase">
							Click to connect to your spotify account
						</h2>
					</a>
				</Link>
			</main>
			<footer className="fixed bottom-0 w-full px-6 py-2 bg-[#000000]">
				<p className="text-right text-white/50">
					<a href={`mailto:${decodeBase64(encEmail)}`}>
						<small>Powered by ©ilwebdifabio.it</small>
					</a>
				</p>
			</footer>
		</>
	);
};

export { Home };
