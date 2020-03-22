import React from 'react';
import { useHistory } from 'react-router-dom';

import { useQuery } from 'react-apollo';
import {
  StyledChannelsLayout,
  StyledChannelsTopLayout,
  StyledChannelRectangle
} from './styles';
import { StyledText } from '../../css';
import {
  Channel,
  ChannelData
} from './types';
import { CreateChannel } from '../CreateChannel';
import Modal from '../Modal';
import {
  GET_CHANNELS_QUERY,
  CHANNEL_CREATED_SUBSCRIPTION,
  CHANNEL_DELETED_SUBSCRIPTION
} from './gql';

const RenderChannels = React.memo((props: any) => {
  const history = useHistory();
  const channels = props.channels;

  return channels.map((channel: Channel, index: number) => {
    return (
      <StyledChannelRectangle
        borderColor={"red"}
        key={channel.id}
        style={{
          marginTop: index > 0 ? 10 : 0,
          padding: 0,
          cursor: "pointer",
        }}
        onClick={() => {
          history.push(`/messages/${channel.id}`)
        }}
      >
        <div style={{marginLeft: 15, marginRight: 5}}>
          <StyledText fontWeight={400} lineHeight="50%">{`# ${channel.name}`}</StyledText>
          <StyledText fontWeight={400} lineHeight="50%">{`${channel.nameNormalized || 'nameNormalized goes here?'}`}</StyledText>
        </div>
      </StyledChannelRectangle>
    )
  })
});

export const Channels: React.FC<any> = (props: any) => {
  const [test, setTest] = React.useState("");
  
  const [openCreateChannelDialog, setOpenCreateChannelDialog] = React.useState(false);
  const { loading, error, data, subscribeToMore } = useQuery<ChannelData>(GET_CHANNELS_QUERY);

  const subScribeToChannels = React.useCallback(() => {
    subscribeToMore({
      document: CHANNEL_CREATED_SUBSCRIPTION,
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data || !subscriptionData.data.channelCreated) return prev;
        const newChannel: Channel = subscriptionData.data.channelCreated;

        // check if newChannel already added from other subscription
        const found = prev.channels.find((channel: Channel) => channel.id === newChannel.id);

        if (found) return prev;
        
        return {
          ...prev,
          channels: [...prev.channels, newChannel],
        }
      }
    });

    subscribeToMore({
      document: CHANNEL_DELETED_SUBSCRIPTION,
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data || !subscriptionData.data.channelDeleted) return prev;
        const deletedChannel: Channel = subscriptionData.data.channelDeleted;
        
        return {
          ...prev,
          channels: prev.channels.filter((channel: Channel) => channel.id !== deletedChannel.id),
        }
      }
    });
  }, [subscribeToMore]);

  React.useEffect(() => {
    subScribeToChannels();
  }, [subScribeToChannels]);

  const hideCreateModalDialog = React.useCallback(() => {
    setOpenCreateChannelDialog(false);
  }, []);

  const MemoizedCreateChannel = React.useMemo(() => {
    return <CreateChannel onClose={hideCreateModalDialog} />
  }, [hideCreateModalDialog]);

  return (
    <StyledChannelsLayout>
      <input type="text" value={test} onChange={(e) => setTest(e.target.value)} />
      <Modal
        open={openCreateChannelDialog}
        onClose={hideCreateModalDialog}
        children={<CreateChannel onClose={hideCreateModalDialog} />}
      />
      <StyledChannelsTopLayout>
        <StyledText
          fontWeight="bold"
          fontSize={18}
        >
          Channels
        </StyledText>
        <StyledText
          fontSize={14}
          style={{cursor: "pointer"}}
          onClick={() => setOpenCreateChannelDialog(true)}
        >
          + New Channel
        </StyledText>
      </StyledChannelsTopLayout>
      {
        loading ? 
          <p>Waiting Channels...</p>
        :
        error ?
          <p>Something went wrong when fetching channels</p>
        :
        <RenderChannels channels={data?.channels || []} />
      }
    </StyledChannelsLayout>
  )
};
