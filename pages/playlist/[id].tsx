import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';

import { isAuthenticate } from '@/util/spotify';
import { Playlist } from '@/features/playlist';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	return await isAuthenticate(req, res);
};

const PlaylistPage: NextPage = () => {
	return <Playlist />;
};

export default PlaylistPage;
