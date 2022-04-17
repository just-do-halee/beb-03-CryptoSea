import gql from 'graphql-tag'


/**
 * Example :
 
 * const data = useQuery(QUERY_SearchNFT('보아', ['url', 'name', 'description']));
 
 */

export const QUERY_SearchNFT = (keyword) => {
    return [gql`
    query SearchNFTs($keyword: String!) {
      searchNFTs(keyword: $keyword) {
        ok {
          tid
          name
          description
          url
        }
        error
      }
    }`, { variables: { keyword } }];
}


export const QUERY_GetNFT = (tid) => {
    return [gql`
    query GetNFTs($where: [PartialNFTInput!]!) {
      getNFTs(where: $where) {
        ok {
          name
          description
          attributes {
            atype
            akey
            avalue
          }
          transaction {
            txhash
          }
          url
        }
        error
      }
    }`, { variables: { where: [{ tid: ~~tid }] } }];
} 