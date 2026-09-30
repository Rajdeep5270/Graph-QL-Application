import { gql, type TypedDocumentNode } from "@apollo/client";

interface UpdateAuthorData {
  updateAuthor: {
    __typename: 'Author'
    id: string,
    author_name: string
  }
}

interface UpdateAuthorVariables {
  updateId: string;
  name: string;
}

export const UPDATE_AUTHOR: TypedDocumentNode<UpdateAuthorData, UpdateAuthorVariables> = gql`
mutation UpdateSingleAuthor($updateId : String!, $name:String!) {
  updateAuthor(updateAuthorInput : {id : $updateId, author_name : $name}) {
    id
    author_name
  }
}
`;  