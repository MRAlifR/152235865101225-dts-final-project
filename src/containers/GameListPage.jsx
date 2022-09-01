import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import rawg from '../services/api/rawg';

const GameListPage = () => {
	let { searchValue } = useParams();

	const [games, setGames] = useState([]);

	useEffect(() => {
		const fetchGames = async () => {
			try {
				const gamesResult = await rawg.get('/search', {
					params: { search: searchValue },
				});

				const result = gamesResult.data.results;
				setGames(result);
			} catch (err) {
				console.log(err);
			}
		};

		fetchGames();
	}, [searchValue]);

	return (
		<>
			<NavBar></NavBar>
			<div className='flex flex-wrap justify-center gap-5 pt-5'>
				{games.map((game) => (
					<Link to={`/${game.slug}`} key={game.id}>
						<div className='card w-96 bg-base-100 shadow-xl'>
							<figure>
								<img
									className='object-cover w-full aspect-video rounded-md'
									src={game.background_image}
									alt={game.name}
								/>
							</figure>
							<div className='card-body py-3'>
								<h2 className='card-title'>{game.name}</h2>
								<p>
									{game.platforms
										?.map((platform) => platform.platform.name)
										.join(', ')}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
			<Footer></Footer>
		</>
	);
};

export default GameListPage;
