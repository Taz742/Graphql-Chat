import React from 'react';
import { StyledText, StyledButton } from '../../css';
import { StyledCreateChannelBottomRectangle, StyledCreateChannelRectangle } from './styles';
import { useMutation } from 'react-apollo';
import { Channel } from '..';
import { CreateChannelVariables } from './types';
import { CREATE_CHANNEL_MUTATION } from './gql';

interface PropsFromProps {
  onClose: () => void;
};

const CreateChannelView: React.FC<PropsFromProps> = ({ onClose }) => {
  console.log("create channel rendered");
  const [channelName, setChannelName] = React.useState("");
  const [createChannel, { loading }] = useMutation<Channel, CreateChannelVariables>(CREATE_CHANNEL_MUTATION, {
    // update: (proxy, { data: { createChannel }, error }: any) => {
    //   const data: ChannelData | null = proxy.readQuery({ query: GET_CHANNELS_QUERY });
  
    //   if (data) {
    //     data.channels.push(createChannel);
    //     proxy.writeQuery({ query: GET_CHANNELS_QUERY, data });
    //   } else {
    //     proxy.writeQuery({ query: GET_CHANNELS_QUERY, data: { channels: [createChannel] } });
    //   }

    //   console.log("create channel updated", data);
    // },
    // onCompleted: (data) => {
    //   console.log("create channel completed", data);
    //   props.onClose();
    //   // if (onCompleted)
    //   //   onCompleted();
    // },
    onCompleted: onClose
  });

  return (
    <React.Fragment>
      <StyledCreateChannelRectangle>
        <StyledText fontSize={22} fontWeight="bold">Create Channel</StyledText>
        <StyledText fontSize={16} color="grey">Choose Channel Name</StyledText>
        <input
          type="text"
          value={channelName}
          placeholder="Sample Name"
          style={{
            height: '50px',
            borderRadius: '2px',
            border: 'solid 1px #e8e9eb',
            backgroundColor: '#ffffff',
            fontSize: 16,
            textIndent: 10,
          }}
          onChange={(e: any) => {
            setChannelName(e.target.value);
          }}
        />
      </StyledCreateChannelRectangle>
      {/* {loading && <p><em>Creating New Channel</em></p>} */}
      <StyledCreateChannelBottomRectangle>
        <StyledButton
          style={{
            color: '#FFFFFF',
            fontSize: 16
          }}
          disabled={!channelName || loading}
          onClick={() => {
            createChannel({
              variables: {
                input: {
                  name: channelName,
                  nameNormalized: "f",
                  description: "s",
                  color: "red"
                }
              }
            })
          }}
        >
          Create Channel
        </StyledButton>
        <StyledButton
          style={{
            background: 'transparent',
            border: 'none',
            color: '#2772cc',
            fontSize: 16,
            textDecoration: 'underline'
          }}
          onClick={onClose}
        >
          Cancel
        </StyledButton>
      </StyledCreateChannelBottomRectangle>
    </React.Fragment>
  )
};

export const CreateChannel = React.memo(CreateChannelView);
