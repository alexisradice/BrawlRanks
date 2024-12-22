import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import RankTable from "./components/RankTable";
import Pagination from "./components/Pagination";
import axios from "axios";

const App = () => {
	const [users, setUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage] = useState(200);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(`${process.env.API_URL}/currentSeason`);
				const data = response.data.map((user, index) => {
					const mappedUser = {
						id: user._id || "",
						franceRank: index,
						name: user.name || "",
						inGameName: user.inGameName || "",
						brawlID: user.brawlID || "",
						level: user.level || 0,
						region: user.region || "",
						rating: user.rating || 0,
						peakRating: user.peakRating || 0,
						globalRank: user.globalRank || 0,
						regionRank: user.regionRank || 0,
						mainLevelCharacter: user.mainLevelCharacter || "",
						mainRankedCharacter: user.mainRankedCharacter || "",
						pictureMainLevelCharacter: user.pictureMainLevelCharacter || "",
						pictureMainRankedCharacter: user.pictureMainRankedCharacter || "",
						mainWeapon: user.mainWeapon || "",
						trueLevel: user.trueLevel || 0,
						passiveAgressive: user.passiveAgressive || "",
						timePlayed: user.timePlayed || "",
						earnings: user.earnings !== undefined ? `$${user.earnings.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}` : "$0.00",
						winrate: user.winrate || "0%",
						clan: user.clan || "",
						totalCharactersLevels: user.totalCharactersLevels || 0,
					};

					// Handle sorting values
					mappedUser.mainLevelCharacterSort = user.mainLevelCharacter
						? parseInt(user.mainLevelCharacter.split("Lvl")[1]?.split(" ")[1]?.slice(0, -1)) || 0
						: 0;

					mappedUser.mainRankedCharacterSort = user.mainRankedCharacter
						? parseInt(user.mainRankedCharacter.split("(")[1]?.slice(0, -1)) || 0
						: 0;

					mappedUser.timePlayedSort = user.timePlayed
						? parseInt(user.timePlayed.split("h")[0]) || 0
						: 0;

					mappedUser.earningsSort = user.earnings || 0;

					mappedUser.winrateSort = user.winrate
						? parseInt(user.winrate.split("%")[0].replace(".", "")) || 0
						: 0;

					mappedUser.clanSort = user.clan ? user.clan.toLowerCase() : "";

					return mappedUser;
				});
				setUsers(data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, []);

	const openInNewTab = (url) => {
		const newWindow = window.open(url, "_blank", "noopener,noreferrer");
		if (newWindow) newWindow.opener = null;
	};

	const changeSeason = (event) => {
		const season = event.target.value;
		if (season) {
			window.location.href = `${window.location.origin}/season${season}`;
		}
	};

	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			<Header />
			<div className="container">
				<select className="select-country" defaultValue="france" disabled>
					<option value="france">France</option>
				</select>
				<select className="select-season" defaultValue="34" onChange={changeSeason}>
					<option value="34">Season 34</option>
					<option value="24">Season 24</option>
					<option value="23">Season 23</option>
				</select>
			</div>
			<RankTable users={currentUsers} openInNewTab={openInNewTab} />
			<Pagination
				usersPerPage={usersPerPage}
				totalUsers={users.length}
				paginate={paginate}
			/>
		</>
	);
};

export default App;
