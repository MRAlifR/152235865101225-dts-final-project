import 'swiper/css';
import 'swiper/css/pagination';
import '../App.css';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Link } from 'react-router-dom';
import { Pagination } from 'swiper';
import rawg from '../services/api/rawg';

const Banner = () => {
	const [games, setGames] = useState([]);

	useEffect(() => {
		const fetchGames = async () => {
			try {
				const gamesResult = await rawg.get('/games', {
					params: {
						dates: '2022-01-01,2022-09-30',
						page_size: 5,
						ordering: '-added',
					},
				});

				const result = gamesResult.data.results;
				setGames(result);
			} catch (err) {
				console.log(err);
			}
		};

		fetchGames();
	});

	return (
		<div>
			<Swiper
				modules={[Pagination]}
				slidesPerView={1}
				centeredSlides={true}
				spaceBetween={30}
				pagination={{
					clickable: true,
				}}>
				{games.map((game) => (
					<SwiperSlide key={game.slug}>
						<Link to={`/${game.slug}`} key={game.id}>
							<div className='group'>
								<img
									src={game.background_image}
									className='object-cover h-[500px] w-full'
									alt='as'></img>

								<div
									className={`absolute bottom-0 left-0 right-0 px-4 py-8 bg-gray-900 opacity-70 invisible group-hover:visible`}>
									<h3 className='text-xl text-white font-bold'>{game.name}</h3>
									<p className='mt-2 text-sm text-gray-300'>
										{game?.genres.map((genre) => genre.name).join(', ')}
									</p>
									<p className='mt-2 text-sm text-gray-300'>
										{game.rating} / 5.0
									</p>
								</div>
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Banner;
