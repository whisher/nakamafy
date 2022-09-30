import React from 'react';
import type { MeDto } from '@/types/spotify';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { FaUser } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

export interface AccountProps {
	data: MeDto;
}

const Account: React.FC<AccountProps> = ({ data }) => {
	const { images, display_name } = data;
	const hasAvatar = images.length > 0;
	return (
		<Menu as="div" className="relative block">
			{({ open }) => (
				<>
					<Menu.Button className="inline-flex items-center h-7 pl-1 pr-1 rounded-full bg-black">
						{hasAvatar ? (
							<img src={images[0].url} alt={display_name} className="h-6 w-6 rounded-full" />
						) : (
							<FaUser className="h-5 w-5 text-white/80" />
						)}
						<span className="flex-1 pl-2 pr-1 text-sm font-medium text-white">{display_name}</span>
						<IoMdArrowDropdown
							className={`h-5 w-5 text-white transition ${open ? 'rotate-180' : 'rotate-0'}`}
						/>
					</Menu.Button>
					<Transition
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<Menu.Items className="absolute right-0 mt-1 w-48 origin-top-right rounded bg-[#282828] shadow focus:outline-none">
							<Menu.Item>
								<Link href={'/profile'}>
									<a className="block pl-3 py-3 text-xs text-white/90">Profile</a>
								</Link>
							</Menu.Item>
							<Menu.Item>
								<Link href="/api/logout">
									<a className="block py-2 border-t border-white/10 mx-0.5">
										<span className="text-xs text-white/90 pl-3"> Log out</span>
									</a>
								</Link>
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};
export { Account };
