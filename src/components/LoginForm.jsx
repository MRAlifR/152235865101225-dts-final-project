import React, { useEffect, useState } from 'react';
import {
	auth,
	loginWithEmailAndPassword,
	registerWithEmailAndPassword,
} from '../services/auth/firebaseAuth';

import AppLogo from '../assets/images/AppLogo.png';
import Modal from './Modal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const navigate = useNavigate();
	const [user, isLoading] = useAuthState(auth);

	const [credential, setCredential] = useState({
		email: '',
		password: '',
	});

	const [modal, setModal] = useState({
		open: false,
		title: '',
		body: '',
	});

	useEffect(() => {
		if (isLoading) return;
		if (user) navigate('/');
	}, [user, isLoading, navigate]);

	const textFieldEmailOnChangeHandler = (event) => {
		setCredential({
			...credential,
			email: event.target.value,
		});
	};

	const textFieldPasswordOnChangeHandler = (event) => {
		setCredential({
			...credential,
			password: event.target.value,
		});
	};

	const closeModalHandler = () => {
		setModal({
			...modal,
			open: false,
		});
	};

	const loginHandler = async () => {
		try {
			await loginWithEmailAndPassword(credential.email, credential.password);
		} catch (error) {
			setModal({
				open: true,
				title: 'Login Failed',
				body: 'Please input correct email and password or contact system administrator',
			});
		}
	};

	const registerHandler = async () => {
		try {
			await registerWithEmailAndPassword(credential.email, credential.password);
		} catch (error) {
			setModal({
				open: true,
				title: 'Register Failed',
				body: 'Please input correct email and password or contact system administrator',
			});
		}
	};

	return (
		<>
			{modal.open ? (
				<Modal
					title={modal.title}
					body={modal.body}
					onClick={closeModalHandler}
				/>
			) : (
				''
			)}
			<div className='card w-full max-w-sm shadow-2xl bg-base-100'>
				<figure>
					<img className=' w-4/5' src={AppLogo} alt='app logo' />
				</figure>
				<div className='card-body pt-1'>
					<div className='form-control w-full max-w-xs'>
						<label className='label'>
							<span className='label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Type here'
							className='input input-bordered w-full max-w-xs'
							value={credential.email}
							onChange={textFieldEmailOnChangeHandler}
						/>
						<label className='label'>
							<span className='label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Type here'
							className='input input-bordered w-full max-w-xs'
							value={credential.password}
							onChange={textFieldPasswordOnChangeHandler}
						/>
						<button
							className='btn btn-primary btn-block mt-8'
							onClick={loginHandler}>
							LOGIN
						</button>
						<button
							className='btn btn-accent btn-block mt-2'
							onClick={registerHandler}>
							REGISTER
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
