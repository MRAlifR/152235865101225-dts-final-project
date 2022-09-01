import Banner from '../components/Banner';
import Footer from '../components/Footer';
import ListGame from '../components/ListGame';
import NavBar from '../components/NavBar';
import React from 'react';

const HomePage = () => {
	const popular = {
		discover: true,
		page_size: 10,
	};

	const goty = {
		discover: true,
		page_size: 10,
		ordering: '-added',
	};

	const newAndTrending = {
		page_size: 10,
		discover: true,
		ordering: '-relevance',
	};

	return (
		<>
			<NavBar></NavBar>
			<Banner></Banner>
			<ListGame
				title='New and Trending'
				url='games/lists/main'
				queryParam={newAndTrending}></ListGame>
			<ListGame
				title='Game of The Year'
				url='games/lists/greatest'
				queryParam={goty}></ListGame>
			<ListGame
				title='Popular'
				url='games/lists/popular'
				queryParam={popular}></ListGame>
			<Footer></Footer>
		</>
	);
};

export default HomePage;
