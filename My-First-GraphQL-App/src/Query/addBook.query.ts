import { gql, type TypedDocumentNode } from "@apollo/client";

export interface AddBookData {
  createBook: {
    __typename: 'Book',
    name: string,
    price: number
    authorId: string
  }
}

export interface AddBookVariables {
  name: string,
  price: number,
  authorId: string
}

export const ADD_BOOK: TypedDocumentNode<AddBookData, AddBookVariables> = gql`
    mutation CreateBook($name : String!, $price : Int!, $authorId : String!) {
  createBook(input : {name : $name, price : $price,  authorId: $authorId}) {
    id
    name
    price
  }
}
`;