import type { NextPage } from 'next';
import Link from 'next/link';

const Page404: NextPage = () => {
	return (
		<div className="h-screen flex justify-center items-center bg-black">
			<Link href="/">
				<a>
					<div className="h-36 w-36 flex justify-center items-center bg-white text-3xl text-black rounded-full">
						404
					</div>
				</a>
			</Link>
		</div>
	);
};

export default Page404;
