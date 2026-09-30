import { gql, type TypedDocumentNode } from "@apollo/client";

export interface FetchAllAuthorData {
    findAllAuthor: {
        id: string;
        author_name: string;
        books: {
            id: string;
            name: string;
            price: number;
        }
    }[];
}

export const FETCH_ALL_AUTHOR: TypedDocumentNode<FetchAllAuthorData> = gql`
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