import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import RankTable from "./components/RankTable";
import Pagination from "./components/Pagination";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(100);

  useEffect(() => {
    axios(process.env.REACT_APP_API_URL)
      .then((response) =>
        response.data.map((user, index) => ({
          id: user._id,
          franceRank: index,
          name: user.name,
          inGameName: user.inGameName,
          brawlID: user.brawlID,
          level: user.level,
          region: user.region,
          rating: user.rating,
          peakRating: user.peakRating,
          globalRank: user.globalRank,
          regionRank: user.regionRank,
          mainLevelCharacter: user.mainLevelCharacter,
          mainLevelCharacterSort: parseInt(user.mainLevelCharacter.split("Lvl")[1].split(" ")[1].slice(0, -1)),
          mainRankedCharacter: user.mainRankedCharacter,
          mainRankedCharacterSort: parseInt(user.mainRankedCharacter.split("(")[1].slice(0, -1)),
          pictureMainLevelCharacter: user.pictureMainLevelCharacter,
          pictureMainRankedCharacter: user.pictureMainRankedCharacter,
          mainWeapon: user.mainWeapon,
          trueLevel: user.trueLevel,
          passiveAgressive: user.passiveAgressive,
          timePlayed: user.timePlayed,
          earnings:
            "$" +
            user.earnings.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
          earningsSort: user.earnings,
        }))
      )
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div className="container">
        <select className="select-country">
          <option value="france">France</option>
        </select>
        <select className="select-season">
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
