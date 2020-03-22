import gql from 'graphql-tag';

export const CREATE_CHANNEL_MUTATION = gql`
  mutation createChannel($input: ChannelInput!) {
    createChannel(input: $input) {
      id,
      name,
      nameNormalized
    }
  }
`
