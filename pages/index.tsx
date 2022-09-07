import type { NextPage } from 'next';
import Link from 'next/link';
import { Title } from '@/ui/title';
const Home: NextPage = () => {
	return (
		<div className="">
			<h1>
				<Link href="/api/login">
					<a>Login</a>
				</Link>
			</h1>
			<Title>PIPPO</Title>
		</div>
	);
};

export default Home;
