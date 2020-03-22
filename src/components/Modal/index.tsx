import React from "react";
import { StyledModalContent, StyledModalWrapper, AbsoluteCenter } from "../../css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode
};

const ModalView: React.FC<ModalProps> = ({ open, onClose, children }) => {
  console.log("modal rendered");
  
  return (
    <StyledModalWrapper style={{ textAlign: "center", display: open ? "block" : "none" }}>
      <AbsoluteCenter>
        <StyledModalContent>
          <button
            style={{
              position: "absolute",
              cursor: "pointer",
              top: -10,
              right: -10,
              width: 40,
              height: 40,
              border: 'none',
              boxShadow: '0 10px 10px 0 rgba(0, 0, 0, 0.07)',
              backgroundColor: '#ffffff',
              borderRadius: 20,
              color: '#ba3c4d',
              fontSize: 18
            }}
            onClick={onClose}
          >
            X
          </button>
          {open && children}
        </StyledModalContent>
      </AbsoluteCenter>
    </StyledModalWrapper>
  );
};

// export default ModalView;

export default React.memo(ModalView);
