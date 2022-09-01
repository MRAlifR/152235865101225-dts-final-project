import { Navigate } from 'react-router-dom';
import React from 'react';
import { auth } from '../services/auth/firebaseAuth';
import { useAuthState } from 'react-firebase-hooks/auth';

const ProtectedComponent = ({ children, mustLogin = true }) => {
	const [user, isLoading] = useAuthState(auth);

	if (user && !mustLogin) {
		return <Navigate to='/' replace={true} />;
	}

	if (!user && mustLogin) {
		return <Navigate to='/login' />;
	}

	return isLoading ? <div>Loading....</div> : children;
};

export default ProtectedComponent;
