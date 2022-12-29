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

export const getSoccerPlayersGoalsASC = gql`
    query PlayersQuery {
        players(order_by: {goals: asc}) {
            name
            matches
            id
            goals
            shirt_number
        }
    }
`

export const getSoccerPlayersGoalsDESC = gql`
    query PlayersQuery {
        players(order_by: {goals: desc}) {
            name
            matches
            id
            goals
            shirt_number
        }
    }
`
export const getSoccerPlayersMatchesASC = gql`
    query PlayersQuery {
        players(order_by: {matches: asc}) {
            name
            matches
            id
            goals
            shirt_number
        }
    }
`

export const getSoccerPlayersMatchesDESC = gql`
    query PlayersQuery {
        players(order_by: {matches: desc}) {
            name
            matches
            id
            goals
            shirt_number
        }
    }
`