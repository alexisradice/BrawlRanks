import React, { useState, useMemo } from "react";
import SearchBox from "./SearchBox";
import { IconButton } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const useSortableData = (users, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { users: sortedUsers, requestSort, sortConfig };
};

const RankTable = (props) => {
  const { users, requestSort, sortConfig } = useSortableData(props.users);
  const { openInNewTab } = props;
  const [searchValue, setSearchValue] = useState("");
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const searchHandler = (value) => {
    setSearchValue(value);
  };

  let updateUsers = users.filter((user) => {
    return Object.keys(user).some((key) =>
      user[key]
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    );
  });

  return (
    <>
      <div className="container">
        <SearchBox searchHandler={searchHandler} />
        <table cellSpacing="0">
          <thead>
            <tr>
            <th>Rank</th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("mainLevelCharacter")}
                  className={getClassNamesFor("mainLevelCharacter")}
                >
                  Main
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("name")}
                  className={getClassNamesFor("name")}
                >
                  Name
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("rating")}
                  className={getClassNamesFor("rating")}
                >
                  Elo
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("peakRating")}
                  className={getClassNamesFor("peakRating")}
                >
                  Peak
                  <br />
                  Elo
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("trueLevel")}
                  className={getClassNamesFor("trueLevel")}
                >
                  True
                  <br />
                  Level
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("trueLevel")}
                  className={getClassNamesFor("trueLevel")}
                >
                  Time
                  <br />
                  Played
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("mainWeapon")}
                  className={getClassNamesFor("mainWeapon")}
                >
                  Main
                  <br />
                  Weapon
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("passiveAgressive")}
                  className={getClassNamesFor("passiveAgressive")}
                >
                  Passive /<br />
                  Agressive
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("regionRank")}
                  className={getClassNamesFor("regionRank")}
                >
                  EU
                  <br />
                  Rank
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("globalRank")}
                  className={getClassNamesFor("globalRank")}
                >
                  Global
                  <br />
                  Rank
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("mainLevelCharacter")}
                  className={getClassNamesFor("mainLevelCharacter")}
                >
                  Main
                  <br />
                  (Level)
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("mainRankedCharacter")}
                  className={getClassNamesFor("mainRankedCharacter")}
                >
                  Main
                  <br />
                  (Ranked)
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("earningsSort")}
                  className={getClassNamesFor("earningsSort")}
                >
                  Earnings
                </button>
              </th>
              <th>
                <button
                  type="button"
                >
                  Hz
                </button>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {updateUsers.length > 0 ? (
              updateUsers.map((user, index) => (
                <tr key={user.id}>
                  <td><b>{index + 1}</b></td>
                  <td>
                    <img
                      src={require("../../img/legends/" + user.pictureMainLevelCharacter.split("/")[5]+".png")}
                      alt={user.pictureMainLevelCharacter.split("/")[5]}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.rating}</td>
                  <td>{user.peakRating}</td>
                  <td>{user.trueLevel}</td>
                  <td>{user.timePlayed}</td>
                  <td>{user.mainWeapon}</td>
                  <td>{user.passiveAgressive}</td>
                  <td>{user.regionRank}</td>
                  <td>{user.globalRank}</td>
                  <td>{user.mainLevelCharacter}</td>
                  <td>{user.mainRankedCharacter}</td>
                  <td>{user.earnings}</td>
                  <td>?</td>
                  <td>
                    <IconButton style={{ backgroundColor: "#131516", color: "#dee2e6" }}
                      aria-label="rocket"
                      onClick={() => {
                        openInNewTab(
                          "http://corehalla.com/stats/player/" + user.brawlID
                        );
                      }}
                    >
                      < RocketLaunchIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Players</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RankTable;
