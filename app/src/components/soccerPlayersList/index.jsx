import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  getSoccerPlayers,
  getSoccerPlayersASC,
  getSoccerPlayersDESC,
  getSoccerPlayersGoalsASC,
  getSoccerPlayersGoalsDESC,
  getSoccerPlayersMatchesASC,
  getSoccerPlayersMatchesDESC
} from "../../graphql/queries";
import { TbArrowsDownUp } from "react-icons/tb";

import "./styles.css";
export default function SoccerPlayersList() {
  const navigate = useNavigate();

  const { data } = useQuery(getSoccerPlayers);
  const { data: dataAsc } = useQuery(getSoccerPlayersASC);
  const { data: dataDesc } = useQuery(getSoccerPlayersDESC);
  const { data: goalsAsc } = useQuery(getSoccerPlayersGoalsASC);
  const { data: goalsDesc } = useQuery(getSoccerPlayersGoalsDESC);
  const { data: matchesAsc } = useQuery(getSoccerPlayersMatchesASC);
  const { data: matchesDesc } = useQuery(getSoccerPlayersMatchesDESC);


  const [orders, setOrders] = useState({
    name: true,
    goals: false,
  });
  const [soccerPlayers, setSoccerPlayers] = useState([]);

  const orderPlayers = (type) => {
    if (type === "name") {
      setOrders((prevState) => ({
        name: !prevState.name
      }));

      if (orders.name) {
        setSoccerPlayers(dataAsc?.players);
      } else {
        setSoccerPlayers(dataDesc?.players);
      }
    }

    if(type === "goals") {
      setOrders((prevState) => ({
        goals: !prevState.goals,
      }));
      if (orders.goals) {
        setSoccerPlayers(goalsAsc?.players);
      } else {
        setSoccerPlayers(goalsDesc?.players);
      }
    }

    if(type === "matches") {
      setOrders((prevState) => ({
        matches: !prevState.matches,
      }));
      if (orders.matches) {
        setSoccerPlayers(matchesAsc?.players);
      } else {
        setSoccerPlayers(matchesDesc?.players);
      }
    }
  };

  useEffect(() => {
    setSoccerPlayers(data?.players);
  }, [data]);

  return (
    <div>
      <div className="alignSearch">
        <p>Busca</p>
      <input
            className="form-control"
            type="text"
            name="search"
            onChange={(value) => {
              if(!!value.target.value) {
                const pattern = new RegExp(`\\b(\\w*${value.target.value}\\w*)`, 'i');
                setSoccerPlayers(soccerPlayers.filter(x => pattern.test(x.name)));
              } else {
                setSoccerPlayers(data?.players);
              }
              }
            }
            
          />
      </div>
      <table class="table table-action">
        <thead>
          <tr>
            <th class="t-small"></th>
            <th class="t-small" onClick={() => orderPlayers("name")}>
              Jogador <TbArrowsDownUp />
            </th>
            <th class="t-small" onClick={() => orderPlayers("goals")}>
              Gols <TbArrowsDownUp />
            </th>
            <th class="t-small" onClick={() => orderPlayers("matches")}>
              Partidas <TbArrowsDownUp />
            </th>
            <th class="t-small">Ações</th>
          </tr>
        </thead>

        <tbody>
          {!!soccerPlayers &&
            soccerPlayers.map(({ id, name, goals, matches, shirt_number }) => (
              <tr key={id}>
                <td className="shirt">{shirt_number}</td>
                <td>{name}</td>
                <td>{goals}</td>
                <td>{matches}</td>
                <td
                  className="link-editar"
                  onClick={() =>
                    navigate(`/edit/`, {
                      state: {
                        id: id,
                        name: name,
                        goals: goals,
                        matches: matches,
                        shirt_number: shirt_number,
                      },
                    })
                  }
                >
                  Editar
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
