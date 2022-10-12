import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';

import { isAuthenticate } from '@/util/spotify';
import { Playlist } from '@/features/playlist';

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
	const { id } = query;
	console.log('ID', id);
	const auth = await isAuthenticate(req, res);
	if ('props' in auth) {
		auth.props = { id };
	}
	return auth;
};

type PlaylistPagePageProps = {
	id: string;
};
const PlaylistPage: NextPage<PlaylistPagePageProps> = ({ id }) => {
	console.log('ID', id);
	return <Playlist id={id} />;
};

export default PlaylistPage;
