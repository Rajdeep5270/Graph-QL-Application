import { gql, type TypedDocumentNode } from "@apollo/client";

export interface GetBookData {
  getSingle: {
    __typename: 'Book',
    id: string,
    name: string,
    price: string,
    author: {
      __typename: 'Author',
      id: string,
      author_name: string
    }
  }
}

export interface GetBookVariables {
  id: string
}

export const FETCH_SINGLE_BOOK: TypedDocumentNode<GetBookData, GetBookVariables> = gql`
query getSingleBookFromId($id : String!) {
  getSingle(bookId : $id) {
    id 
    name
    price
    author {
      id
      author_name
    }
  }
}
`;