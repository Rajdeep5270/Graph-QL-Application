import { gql, type TypedDocumentNode } from "@apollo/client";

interface UpdateBookData {
    updateBook: {
        __typename: 'Book',
        id: string,
        name: string,
        price: number,
        author: {
            __typename: 'Author',
            id: string,
            name: string
        }
    }
}

interface UpdateBookVariables {
    editId: string,
    name: string,
    price: number,
    authorId: string
}

export const UPDATE_BOOK: TypedDocumentNode<UpdateBookData, UpdateBookVariables> = gql`
    mutation UpdateSingleBook($editId : String!, $name : String!, $price : Int!, $authorId : String!) {
        updateBook(editId : $editId, newData :{name : $name, price : $price, authorId : $authorId}) {
            id
            name
            price
        }
    }
`;