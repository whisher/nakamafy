import React, { ReactNode } from 'react';
import { FaSpotify } from 'react-icons/fa';

const Login: React.FC = () => {
	return (
		<button className="shadow-white" type="button">
			<FaSpotify className="h-10 w-10 lg:h-20 lg:w-20 text-brand-100/90" />
		</button>
	);
};

export { Login };
