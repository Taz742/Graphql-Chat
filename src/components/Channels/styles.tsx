import styled from 'styled-components';

interface ChannelRectangleProps {
  borderColor?: string;
}

export const StyledChannelsLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const StyledChannelsTopLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledChannelRectangle = styled.div`
  width: 100%;
  background-color: #ffffff;
  max-height: 45px;
  min-height: 45px;
  border-radius: 5px;
  border: solid 1px #e8e9eb;
  border-left: ${(props: ChannelRectangleProps) => `5px solid ${props.borderColor || 'red'}`};
`;
