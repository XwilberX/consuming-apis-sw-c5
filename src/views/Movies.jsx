import React, { useEffect, useState } from "react";

const API = "http://www.omdbapi.com/?&apikey=a43c6a1"


const Movies = () => {
	const [state, setState] = useState({
		data: [],
		loading: true,
		searchTerm: "",
		error: "",
	});

	const getMovies = async () => {
		// search
		const res = await fetch(`${API}&s=batman`);
		const resJSON = await res.json();

		if (resJSON) {
			setState({
				data: resJSON.Search,
				loading: false,
				error: "",
			});
		}
	};

	useEffect(() => {
		getMovies();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (state.searchTerm === "") {
			return setState({ ...state, error: "Please write a valid text" });
		}

		const response = await fetch(`${API}&s=${state.searchTerm}`);
		const data = await response.json();

		if (!data.Search) {
			return setState({ ...state, error: "There are no results." });
		}

		return setState({
			data: data.Search,
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
				<div class="flex items-center border-blue-900 border-b-2  py-2">
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
				{data.map((movie) => (
					<div class="max-w-sm rounded overflow-hidden shadow-lg">
						<img class="w-full" src={movie.Poster} alt="Sunset in the mountains" />
						<div class="px-6 py-4">
							<div class="font-bold text-xl mb-2">{movie.Title} ({movie.Year})</div>

						</div>
						<div class="px-6 pt-4 pb-2">
							<p class="text-gray-700 text-base">
								Tipo: {movie.Type}
							</p>
						</div>
					</div>
				))}
			</div>

		</>
	);
};

export default Movies;