import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updatePlayers } from "../../graphql/mutations";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";
export default function EditSoccerPlayer() {
  const [player, setPlayer] = useState({});

  /**
   * Objeto estrutura
   *  id: id,
      name: name,
      goals: goals,
      matches: matches,
      shirt_number: shirt_number,
   */

  const location = useLocation();

  useEffect(() => {
    setPlayer(location.state);
  }, [location]);

  const navigate = useNavigate();

  const [updatePlayer, { error }] = useMutation(updatePlayers);

  const update = () => {
    try {
      updatePlayer({
        variables: {
          id: location.state.id,
          shirt_number: parseInt(player.shirt_number),
          goals: parseInt(player.goals),
          matches: parseInt(player.matches),
        },
      });
      toast.success("Jogador atualizado!");
    } catch (error) {
      toast("erro");
    }
  };

  return (
    <div>
      <div className="form" noValidate>
        <p>Jogador: {location.state.name} </p>
        <div className="form-group">
          <label id="shirtNumberLabel">Número da camisa</label>
          <input
            className="form-control"
            type="text"
            name="shirtNumber"
            defaultValue={player.shirt_number}
            onBlur={(value) =>
              setPlayer({ ...player, shirt_number: value.target.value })
            }
            required
          />

          <label id="goalsLabel">Goals</label>
          <input
            className="form-control"
            type="text"
            name="goals"
            defaultValue={player.goals}
            onBlur={(value) =>
              setPlayer({ ...player, goals: value.target.value })
            }
            required
          />

          <label id="matchesLabel">Partidas</label>
          <input
            className="form-control"
            type="text"
            name="matches"
            defaultValue={player.matches}
            onBlur={(value) =>
              setPlayer({ ...player, matches: value.target.value })
            }
            required
          />
        </div>
        <div className="alignButtons">
          <button
            className="buttonForm"
            id="buttonCancelar"
            onClick={() => navigate(`/`)}
          >
            Cancelar
          </button>
          <button className="buttonForm" id="buttonSalvar" onClick={update}>
            Salvar
          </button>

          <ToastContainer position="top-left" autoClose={4000} theme="light" />
        </div>
      </div>
    </div>
  );
}
