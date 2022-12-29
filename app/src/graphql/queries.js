import { gql } from "@apollo/client";

export const getSoccerPlayers = gql`
    query PlayersQuery {
        players {
            name
            matches
            id
            goals
            shirt_number
        }
    }
`

export const getSoccerPlayersASC = gql`
    query PlayersQuery {
        players(order_by: {name: asc}) {
            name
            matches
            id
            goals
            shirt_number
        }
    }
`

export const getSoccerPlayersDESC = gql`
    query PlayersQuery {
        players(order_by: {name: desc}) {
            name
            matches
            id
            goals
            shirt_number
        }
    }
`