import 'swiper/css';
import 'swiper/css/free-mode';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { FreeMode } from 'swiper';
import { Link } from 'react-router-dom';
import rawg from '../services/api/rawg';

const ListGame = (props) => {
	const [games, setGames] = useState([]);

	useEffect(() => {
		const fetchGames = async () => {
			try {
				const gamesResult = await rawg.get(props.url, {
					params: props.queryParam,
				});

				const result = gamesResult.data.results;
				setGames(result);
			} catch (err) {
				console.log(err);
			}
		};

		fetchGames();
	}, [props.queryParam, props.url]);

	return (
		<div className='px-8 pt-6'>
			<h1 className='text-white pb-3'>{props.title}</h1>

			<Swiper
				slidesPerView={'auto'}
				spaceBetween={10}
				freeMode={true}
				modules={[FreeMode]}>
				{games.map((game) => (
					<SwiperSlide key={game.slug}>
						<Link to={`/${game.slug}`} key={game.id}>
							<img
								className='object-cover w-72 aspect-video rounded-md'
								src={game.background_image}
								alt={game.name}
							/>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ListGame;
