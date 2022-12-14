import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';

import { isAuthenticate } from '@/util/spotify';
import { Profile } from '@/features/profile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	return await isAuthenticate(req, res);
};

const ProfilePage: NextPage = () => {
	return <Profile />;
};

export default ProfilePage;
