import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import parse from 'html-react-parser';
import rawg from '../services/api/rawg';
import { useParams } from 'react-router-dom';

const DetailGamePage = () => {
	let { gameSlug } = useParams();
	const [game, setGame] = useState();

	useEffect(() => {
		const fetchGames = async () => {
			try {
				const gamesResult = await rawg.get(`/games/${gameSlug}`);

				const result = gamesResult.data;
				setGame(result);
			} catch (err) {
				console.log(err);
			}
		};

		fetchGames();
	}, [gameSlug]);

	return (
		<>
			{game ? (
				<>
					<NavBar></NavBar>
					<div
						className='hero h-[500px] object-cover'
						style={{
							backgroundImage: `url("${game?.background_image}")`,
						}}>
						<div className='hero-overlay bg-opacity-60'></div>
						<div className='hero-content text-center text-neutral-content'>
							<div className='max-w-md'>
								<h1 className='mb-5 text-5xl font-bold'>{game?.name}</h1>
								<p className='mb-5'>
									{game?.platforms
										?.map((platform) => platform?.platform?.name)
										.join(', ')}
								</p>
							</div>
						</div>
					</div>

					<div className='flex flex-row justify-center gap-x-24 pt-6 px-44'>
						<div className='flex flex-col gap-y-10'>
							<div className='stats stats-vertical shadow'>
								<div className='stat place-items-center'>
									<div className='stat-title'>Publisher</div>
									<div className='stat-value text-primary'>
										{game.publishers[0]?.name ?? 'N/A'}
									</div>
								</div>
								<div className='stat place-items-center'>
									<div className='stat-title '>Metacritic</div>
									<div className='stat-value text-primary'>
										{game.metacritic ?? 'N/A'}
									</div>
								</div>

								<div className='stat place-items-center'>
									<div className='stat-title'>Released</div>
									<div className='stat-value text-primary'>
										{game.released ?? 'TBA'}
									</div>
								</div>
							</div>

							<div className='flex flex-wrap flex-row justify-center gap-4'>
								{game.tags.map((tag) => (
									<div key={tag.id} className='badge badge-accent badge-lg'>
										{tag.name}
									</div>
								))}
							</div>
						</div>

						<article className='shrink-0 prose text-justify'>
							<h1 className='mb-2'>About</h1>
							{parse(game?.description)}
						</article>
					</div>

					<Footer></Footer>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default DetailGamePage;
