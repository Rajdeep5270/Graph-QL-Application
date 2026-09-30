import { gql, type TypedDocumentNode } from "@apollo/client";

interface GetSingleAuthorData {
    author: {
        __typename: string,
        id: string,
        author_name: string
    }
}

interface GetSingleAuthorVariables {
    findId: string
}

export const FETCH_SINGLE_AUTHOR: TypedDocumentNode<GetSingleAuthorData, GetSingleAuthorVariables> = gql`
query FetchSingleAuthor($findId:String!){
  author(id : $findId) {
    author_name
  }
}
`;