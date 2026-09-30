import { gql, type TypedDocumentNode } from "@apollo/client";

export interface DeleteBookData {
    deleteBook: {
        id: string,
        name: string
        price: string
    }
}

export interface DeleteBookVariables {
    id: string
}

export const DELETE_BOOK: TypedDocumentNode<DeleteBookData, DeleteBookVariables> = gql`
    mutation DeleteBook($id : String!) {
        deleteBook(deleteId : $id) {
            id
            name
        }
    }
`;