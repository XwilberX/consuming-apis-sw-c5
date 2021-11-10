import React, { useEffect, useState } from "react";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

const API = "https://deezerdevs-deezer.p.rapidapi.com/search"

const Music = () => {

    const [state, setState] = useState({
        data: [],
        tracks: [],
        loading: true,
        searchTerm: "",
        error: "",
    });

    const getMusics = async () => {
        // search
        const res = await fetch(`${API}?q=jose madero`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "a82c7a318amsh14854848913a73dp1d81f5jsnd66c5fdaf870"
            }
        });
        const resJSON = await res.json();

        const data = resJSON.data;

        const songs = data.map(song => {
            const container = {};

            container.url = song.preview;
            container.title = song.title;
            container.tags = [song.type]

            return container;
        })


        if (resJSON) {
            setState({
                data: resJSON.data,
                tracks: songs,
                loading: false,
                error: "",
            });
        }
        // console.log(resJSON.data)
    };

    useEffect(() => {
        getMusics();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (state.searchTerm === "") {
            return setState({ ...state, error: "Please write a valid text" });
        }

        const response = await await fetch(`${API}?q=${state.searchTerm}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "a82c7a318amsh14854848913a73dp1d81f5jsnd66c5fdaf870"
            }
        });
		const data = await response.json();
        const data2 = data.data;

        console.log(data2)

        const songs2 = data2.map(song => {
            const container = {};

            container.url = song.preview;
            container.title = song.title;
            container.tags = [song.type]

            return container;
        })

        if (!data.data) {
            return setState({ ...state, error: "There are no results." });
        }

        return setState({
            data: data.data,
            tracks: songs2,
            searchTerm: "",
            error: "",
        });
    };

    const { tracks, loading } = state;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <form onSubmit={handleSubmit} class="container mx-auto p-5 w-full max-w-sm">
                <div class="flex items-center border-green-500 border-b-2  py-2">
                    <input
                        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Buscar"
                        onChange={(e) => setState({ ...state, searchTerm: e.target.value })}
                        value={state.searchTerm}
                        aria-label="Full name" />
                </div>
            </form>
            <div class="container mx-auto p-5 grid">
                <Player trackList={tracks} />
            </div>
        </>
    );
};

export default Music;