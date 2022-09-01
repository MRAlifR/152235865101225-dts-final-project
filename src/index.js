import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import DetailGamePage from './containers/DetailGamePage';
import GameListPage from './containers/GameListPage';
import LoginPage from './containers/LoginPage';
import ProtectedComponent from './components/ProtectedComponent';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}></Route>
				<Route
					path=':gameSlug'
					element={
						<ProtectedComponent>
							<DetailGamePage />
						</ProtectedComponent>
					}
				/>
				<Route path='search/:searchValue' element={<GameListPage />}></Route>
				<Route path='login' element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
