import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { auth, logOut } from '../services/auth/firebaseAuth';

import AppLogo from '../assets/images/AppLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useAuthState } from 'react-firebase-hooks/auth';

const NavBar = () => {
	const navigate = useNavigate();
	const [user] = useAuthState(auth);
	const [searchValue, setSearchValue] = useState('');

	const textSearchOnChangeHandler = (event) => {
		setSearchValue(event.target.value);
	};

	const textSearchOnKeyDownHandler = (event) => {
		if (event.key === 'Enter') navigate(`/search/${searchValue}`);
	};

	const buttonLogoutOnClickHandler = async () => {
		await logOut();
		navigate('/');
	};

	const buttonSearchOnClickHandler = async () => {
		navigate(`/search/${searchValue}`);
	};

	return (
		<div className='navbar sticky top-0 z-30 bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 lg:px-10 shadow-2xl'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<label tabIndex='0' className='btn btn-ghost lg:hidden'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h8m-8 6h16'
							/>
						</svg>
					</label>
					<ul
						tabIndex='0'
						className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li tabIndex='0'>
							<div className='justify-between'>
								<Link to='/'>
									Game <FontAwesomeIcon icon={solid('caret-right')} />
								</Link>
							</div>
							<ul className='p-2'>
								<li>
									<Link to='/'>Popular</Link>
								</li>
								<li>
									<Link to='/'>Upcoming</Link>
								</li>
								<li>
									<Link to='/'>Most Rated</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link to='/'>My Wishlist</Link>
						</li>
					</ul>
				</div>
				<button>
					<img className='h-10' src={AppLogo} alt='app logo '></img>
				</button>
			</div>

			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal p-0'>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li tabIndex='0'>
						<Link to='/'>
							Game
							<FontAwesomeIcon icon={solid('caret-down')} />
						</Link>
						<ul className='p-2 rounded-none bg-base-300 w-56'>
							<li>
								<Link to='/'>Popular</Link>
							</li>
							<li>
								<Link to='/'>Upcoming</Link>
							</li>
							<li>
								<Link to='/'>Most Rated</Link>
							</li>
						</ul>
					</li>
					<li>
						<Link to='/'>My Wishlist</Link>
					</li>
				</ul>
			</div>

			<div className='navbar-end'>
				<div className='form-control'>
					<div className='input-group'>
						<input
							type='text'
							placeholder='Search…'
							className='input input-bordered'
							value={searchValue}
							onKeyDown={textSearchOnKeyDownHandler}
							onChange={textSearchOnChangeHandler}
						/>
						<button
							className='btn btn-square'
							onClick={buttonSearchOnClickHandler}>
							<FontAwesomeIcon icon={solid('magnifying-glass')} size='lg' />
						</button>
					</div>
				</div>

				<button className='btn btn-ghost'>
					<FontAwesomeIcon icon={solid('bell')} size='lg' />
				</button>

				<div className='dropdown dropdown-end'>
					<label tabIndex='0' className='btn px-0'>
						<div className='flex items-end'>
							<div className='avatar placeholder'>
								<div className='w-11 rounded-full ml-2 bg-primary'>
									{user ? (
										<span className='text-2xl'>{user.email.charAt(0)}</span>
									) : (
										<span className='text-2xl'>G</span>
									)}
								</div>
							</div>
							<FontAwesomeIcon icon={solid('caret-down')} />
						</div>
					</label>
					<ul
						tabIndex='0'
						className='menu dropdown-content p-2 shadow bg-base-300 rounded-box w-52 mt-4'>
						<li>
							{user ? (
								<button
									className='btn btn-ghost'
									onClick={buttonLogoutOnClickHandler}>
									Log Out
								</button>
							) : (
								<Link to='/login'>Log In</Link>
							)}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
