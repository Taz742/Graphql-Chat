import React from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useLazyQuery } from 'react-apollo';
import { MentionsInput, Mention } from 'react-mentions';

import {
  StyledMessagesLayout,
  StyledRenderMessagesLayout,
  StyledMessageRectangle
} from './styles';

export const GET_MESSAGES_QUERY = gql`
  query messages($channelId: ID!, $offset: Int!) {
    messages(channelId: $channelId, offset: $offset) {
      id,
      author,
      text
    }
  }
`;


export const Messages: React.FC<any> = (props) => {
  const [messages, setMessages] = React.useState<any>([]);
  const [offset, setOffset] = React.useState(0);
  const [test, setTest] = React.useState("");
  const { channelId }: any = useParams();

  const [load, { loading, error }] = useLazyQuery(GET_MESSAGES_QUERY, {
    onCompleted: ({ messages: recMessages }) => {
      setMessages([...recMessages, ...messages]);
    }
  });

  const loadMessages = React.useCallback(() => {
    load({
      variables: {
        channelId,
        offset
      }
    });
  }, [load, channelId, offset]);

  console.log(offset);

  React.useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  React.useEffect(() => {
    return () => {
      setTest("");
      setOffset(0);
      setMessages([]);
    }
  }, [channelId]);

  return (
    <StyledMessagesLayout>
    {/* <div style={{flexShrink: 0}}>header</div> */}
    <button
      onClick={() => {
        setOffset(messages.length);
        // const data = client.readQuery({
        //   query: GET_MESSAGES_QUERY,
        //   variables: {
        //     channelId,
        //     offset: 0
        //   }
        // });
        // console.log(data);
      }}
    >
      click
    </button>
      <StyledRenderMessagesLayout>
        <div style={{ padding: 20 }}> 
        {
          loading ?
            <p>Messages Fetching</p>
          :
          error ?
            <p>Something Went Wrong When Fetching Messages</p>
          :
          null
        }
        {messages.map((message: any, index: number) => (
          <StyledMessageRectangle key={index} style={{marginTop: index > 0 ? 10 : 0}}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
              <div style={{display: 'flex'}}>
                <div style={{ backgroundColor: '#acb3c5', width: 30, height: 30, borderRadius: 3}}></div>
                <div style={{margin: 0, padding: 0, marginLeft: 10}}>
                  <p style={{margin: 0, padding: 0, fontSize: 14, color: '#2d74c9'}}>{`Tazo Leladze`}</p>
                  <p style={{margin: 0, padding: 0, fontSize: 12, color: '#acb3c5'}}>{new Date().toDateString()}</p>
                </div>
              </div>
              <p style={{color: '#606060', fontSize: 14}}>
                {`${message.text}`}
              </p>
            </div>
          </StyledMessageRectangle>
        ))}
        </div>
      </StyledRenderMessagesLayout>
      <div
        style={{
          minHeight: 200,
          maxHeight: 300,
          overflowY: 'auto'
        }}
      >
        <MentionsInput style={{minHeight: 50, border: '1px solid green'}} value={test} onChange={(e: any) => setTest(e.target.value)}>
          <Mention
            trigger="@"
            data={[{id: "taz", display: "foo"}]}
            renderSuggestion={(e) => {
              console.log("display: ", e)
              return (
                <p style={{padding: 20}}>{`Mention ${e.id}`}</p>
              )
            }}
            displayTransform={(a) => {
              return `@${a}`
            }}
          />
          {/* <Mention
            trigger="#"
            data={this.requestTag}
            renderSuggestion={this.renderTagSuggestion}
          /> */}
        </MentionsInput>
      </div>
    </StyledMessagesLayout>
  )
}
