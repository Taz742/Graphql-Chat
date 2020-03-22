import styled from "styled-components";

export const StyledModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const StyledModalContent = styled.div`
  position: relative;
  box-sizing: border-box;
  flex-direction: column;
  width: auto;
  max-width: 100%;
  border: none;
  border-radius: 0.3125em;
  background: #fff;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  font-family: inherit;
`;
