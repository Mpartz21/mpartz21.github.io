import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { logoWhite, menu, close } from '../assets';
import SectionWrapper from '../hoc/SectionWrapper';

const Navbar = () => {

	const [activePage, setActivePage] = useState('');
	const [navToggle, setNavToggle] = useState(false);

	return (
		<nav
			className={`${styles.paddingX} w-full flex items-center z-20 bg-primary py-5`}
		>
			<div className='w-full flex items-center justify-between max-w-7xl mx-auto'>
				<Link
					to='/'
					className='flex items-center gap-2'
					onClick={() => {
						setActivePage('');
						window.scrollTo(0, 0);
					}}
				>
					<img
						src={logoWhite}
						alt='logo'
						className='w-9 h-9 object-contain'
					/>
					<p className='text-white text-18[18px] font-bold cursor-pointer flex'>
						Miguel Partida &nbsp;<span className='sm:block hidden'>| Full Stack Developer </span>
					</p>
				</Link>
				<ul className='list-none hidden sm:flex flex-row gap-10'>
					{navLinks.map((link) => (
						<li key={link.id}>
							<a
								href={`#${link.id}`}
								className={`${
									activePage === link.title ? 'text-white' : 'text-secondary'
								} hover:text-white text-[18px] font-medium cursor-pointer`}
								onClick={() => setActivePage(link.title)}
							>
								{link.title}
							</a>
						</li>
					))}
				</ul>
				<div className='sm:hidden flex flex-1 justify-end items-center gap-2'>
					<img
						src={menu}
						alt='menu'
						className='w-[28px] h-[28px] object-contain cursor-pointer'
						onClick={() => setNavToggle(!navToggle)}
					/>
					<div
						className={`${
							!navToggle ? 'hidden' : 'flex'
						} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
					>
						<ul className='list-none flex justify-end items-start flex-col gap-4'>
							{navLinks.map((link) => (
								<li key={link.id}>
									<a
										href={`#${link.id}`}
										className={`${
											activePage === link.title ? 'text-white' : 'text-secondary'
										} font-poppins font-medium cursor-pointer text-[18px]`}
										onClick={() => {
											setActivePage(link.title);
											setNavToggle(!navToggle);
										}}
									>
										{link.title}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default SectionWrapper(Navbar, 'navbar');
