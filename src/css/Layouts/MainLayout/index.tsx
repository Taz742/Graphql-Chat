import styled from "styled-components";
  // display: flex;
  // width: 100%;
  // height: 100%;
  // position: absolute;
  // background-color: black;
  // margin: 0;
  // padding: 0;
export const StyledMainLayout = styled.div`
  height: 100%;
  width: 100%;
`;
  // min-width: 350px;
  // background-color: #f4f5f8;
  // border-right: 1px solid #e8e9eb;
  // overflowY: auto;
  // margin: 0;
  // padding: 0;
export const StyledSidebarLayout = styled.div`
  height: 100%;
  width: 350px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #f4f5f8;
  border-right: 1px solid #e8e9eb;
  overflow-x: hidden;
`;

export const StyledMessagesLayout = styled.div`
  margin: 0;
  margin-left: 350px;
  height: 100%;
`;
