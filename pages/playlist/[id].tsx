import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';

import { Playlist } from '@/features/playlist';

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
	const { id } = query;
	return {
		props: { id }
	};
};

type PlaylistPagePageProps = {
	id: string;
};
const PlaylistPage: NextPage<PlaylistPagePageProps> = ({ id }) => {
	return <Playlist id={id} />;
};

export default PlaylistPage;
