import { gql } from "@apollo/client";

export const FETCH_ALL_AUTHOR = gql`
    query FindAllAuthor {
    findAllAuthor {
        id
        author_name
        books {
            id
            name
            price
        }
  }
}
`;