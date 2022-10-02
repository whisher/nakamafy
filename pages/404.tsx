import type { NextPage } from 'next';
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';
const Page404: NextPage = () => {
	return (
		<div className="h-screen flex flex-col justify-center items-center bg-[#121212]">
			<div className="flex flex-col items-center">
				<FaSpotify className="h-14 w-14 text-brand-300 rounded-full" />
				<h2 className="mt-9 font-bold text-4xl text-white">Page not found</h2>
				<h3 className="mt-3 text-base text-white">
					We can’t seem to find the page you are looking for.
				</h3>
				<Link href="/">
					<a className="h-10 w-28 flex justify-center items-center mt-9 bg-white text-base font-bold text-black rounded-full">
						Home
					</a>
				</Link>
			</div>
		</div>
	);
};

export default Page404;
