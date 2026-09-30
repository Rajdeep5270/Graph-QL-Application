import { gql, type TypedDocumentNode } from "@apollo/client";

export interface AddAuthorData {
    createAuthor: {
        __typename: 'Author',
        author_name: string
    }
}

export interface AddAuthorVariables {
    author_name: string;
}

export const ADD_AUTHOR: TypedDocumentNode<AddAuthorData, AddAuthorVariables> = gql`
    mutation CreateAuthor($author_name : String!) {
        createAuthor (createAuthorInput : {author_name : $author_name}){
            author_name
        }
    }
`;