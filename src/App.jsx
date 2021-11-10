import React from "react";
import "./assets/css/output.css";
import { Router } from "@reach/router";
import Home from "./views/Home";
import Movies from "./views/Movies";
import Animes from "./views/Anime";
import Music from "./views/Music";
import Nav from "./components/Nav";

function App() {
	return (
		<>
			<Nav />
			<div className="dark:bg-gray-900 dark:text-gray-300">
				<Router>
					<Home path="/" />
					<Movies path="/movies" />
					<Animes path="/animes" />
					<Music path="/music" />
				</Router>
			</div>
		</>
	);
}

export default App;
