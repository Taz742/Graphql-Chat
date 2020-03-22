import gql from 'graphql-tag';

export const GET_CHANNELS_QUERY = gql`
  query {
    channels {
      id,
      name,
      nameNormalized
    }
  }
`;

export const CHANNEL_CREATED_SUBSCRIPTION = gql`
  subscription channelCreated {
    channelCreated {
      id,
      name,
      nameNormalized
    }
  }
`

export const CHANNEL_DELETED_SUBSCRIPTION = gql`
  subscription channelDeleted {
    channelDeleted {
      id,
    }
  }
`
