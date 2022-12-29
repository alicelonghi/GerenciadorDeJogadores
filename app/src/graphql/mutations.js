import { gql } from "@apollo/client";

export const updatePlayers = gql`
  mutation UpdatePlayer($id: Int!, $goals: Int, $matches: Int, $shirt_number: Int) {
    update_players_by_pk(
      _set: { goals: $goals, matches: $matches, shirt_number: $shirt_number }
      pk_columns: { id: $id }
    ) {
      goals
      id
      matches
      name
      shirt_number
    }
  }
`;
