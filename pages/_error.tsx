import { NextPageContext } from 'next';

interface ErrorPageProps {
	statusCode: number;
}

const ErrorPage = ({ statusCode }: ErrorPageProps) => {
	return (
		<div className="flex justify-center items-center h-screen bg-red-500 text-white">
			{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
		</div>
	);
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default ErrorPage;
