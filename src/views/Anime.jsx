import React, { useEffect, useState } from "react";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

const API = "https://api.jikan.moe/v3/search/anime"

const Animes = () => {
	const [state, setState] = useState({
		data: [],
		loading: true,
		searchTerm: "",
		error: "",
	});

	const getAnimes = async () => {
		// search
		const res = await fetch(`${API}?q=Naruto`);
		const resJSON = await res.json();

		if (resJSON) {
			setState({
				data: resJSON.results,
				loading: false,
				error: "",
			});
		}
		// console.log(resJSON.results)
	};

	useEffect(() => {
		getAnimes();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (state.searchTerm === "") {
			return setState({ ...state, error: "Please write a valid text" });
		}

		const response = await fetch(`${API}?q=${state.searchTerm}`);
		const data = await response.json();

		if (!data.results) {
			return setState({ ...state, error: "There are no results." });
		}

		return setState({
			data: data.results,
			searchTerm: "",
			error: "",
		});
	};

	const { data, loading } = state;

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<form onSubmit={handleSubmit} class="container mx-auto p-5 w-full max-w-sm">
				<div class="flex items-center border-yellow-500 border-b-2  py-2">
					<input
						class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
						type="text"
						placeholder="Buscar"
						onChange={(e) => setState({ ...state, searchTerm: e.target.value })}
						value={state.searchTerm}
						aria-label="Full name" />
				</div>
			</form>
			
			<div class="container mx-auto p-5 grid grid-cols-4 gap-4">
				{data.map((anime) => (
					<div class="max-w-sm rounded overflow-hidden shadow-lg">
						<img class="w-full" src={anime.image_url} alt="Sunset in the mountains" />
						<div class="px-6 py-4">
							<div class="font-bold text-xl mb-2">{anime.title} - score: {anime.score}</div>

						</div>
						<div class="px-6 pt-4 pb-2">
							<p class="text-gray-700 text-base">
								Tipo: {anime.type}
							</p>
						</div>
					</div>
				))}
			</div>

		</>
	);
};

export default Animes;