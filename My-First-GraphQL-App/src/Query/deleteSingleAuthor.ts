import { gql, type TypedDocumentNode } from "@apollo/client";

interface DeleteAuthorData {
    removeAuthor: {
        __typename: 'Author',
        id: string,
        author_name: string
    }
}

interface DeleteAuthorVariables {
    deleteId: string;
}

export const DELETE_AUTHOR: TypedDocumentNode<DeleteAuthorData, DeleteAuthorVariables> = gql`
mutation DeleteSingleAuthor($deleteId : String!) {
  removeAuthor(id : $deleteId) {
    author_name
  }
}
`;