import styled from 'styled-components';

export const StyledMessagesLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledRenderMessagesLayout = styled.div`
  flex-grow: 1;
  display: flex;
  overflow-y: auto;
  flex-direction: column-reverse;
`;

export const StyledMessageRectangle = styled.div`
  width: 100%;
  border-radius: 6px;
  border: solid 1px #e8e9eb;
  background-color: rgba(244, 245, 249, 0.52);
`;
