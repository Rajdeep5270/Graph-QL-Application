import { gql, type TypedDocumentNode } from "@apollo/client";

export interface GetBooksData {
    getAll: {
        __typename: 'Book',
        id: string,
        name: string,
        price: number
    }[];
}

export const FETCH_ALL_BOOK: TypedDocumentNode<GetBooksData> = gql`
    query FetchAllBooks {
        getAll {
            id
            name
            price
        }
    }
`;