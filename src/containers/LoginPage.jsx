import LoginForm from '../components/LoginForm';
import React from 'react';

const LoginPage = () => {
	return (
		<div className='flex flex-col justify-center items-center h-screen w-screen'>
			{/* <NavBar></NavBar> */}
			<LoginForm></LoginForm>
			{/* <Footer></Footer> */}
		</div>
	);
};

export default LoginPage;
