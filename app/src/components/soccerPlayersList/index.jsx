import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  getSoccerPlayers,
  getSoccerPlayersASC,
  getSoccerPlayersDESC,
} from "../../graphql/queries";
import { TbArrowsDownUp } from "react-icons/tb";
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "./styles.css";
export default function SoccerPlayersList() {
  const { error, loading, data } = useQuery(getSoccerPlayers);
  const [soccerPlayers, setSoccerPlayers] = useState([]);
  const orderSoccerPlayersByName = (type) => {
		
		if(type === "Jogador") {
			const { soccerPlayersASC } = useQuery(getSoccerPlayersASC);
			setSoccerPlayers(soccerPlayersASC?.players);
		}
	};

  useEffect(() => {
    setSoccerPlayers(data?.players);
  }, [data]);

  return (
    <div>
      <table class="table table-action">
        <thead>
          <tr>
            <th class="t-small"></th>
            <th class="t-small" onClick={orderSoccerPlayersByName("Jogador")}>
              Jogador <TbArrowsDownUp />
            </th>
            <th class="t-small" onClick={orderSoccerPlayersByName("Gols")}>
              Gols <TbArrowsDownUp /> onClick=
              {orderSoccerPlayersByName("Jogador")}
            </th>
            <th class="t-small" onClick={orderSoccerPlayersByName("Partidas")}>
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
                <td className="link-editar">Editar</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
