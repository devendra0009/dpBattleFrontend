import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { selectTheme } from "../../features/theme/themeSlice";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, children, title }) => {
  const navigate = useNavigate();
  const currentTheme = useSelector(selectTheme);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay currentTheme={currentTheme} onClick={handleBackdropClick}>
      <ModalContainer
        currentTheme={currentTheme}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader currentTheme={currentTheme}>
          {title && (
            <ModalTitle currentTheme={currentTheme}>{title}</ModalTitle>
          )}
          <CloseButton currentTheme={currentTheme} onClick={onClose}>
            <IoMdClose size={24} />
          </CloseButton>
        </ModalHeader>
        <ModalContent currentTheme={currentTheme}>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg};
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
  position: relative;

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 750px) {
    max-width: 95%;
    border-radius: 15px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme[props.currentTheme].border};
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme[props.currentTheme].bg};
  z-index: 10;
  border-radius: 20px 20px 0 0;

  @media (max-width: 750px) {
    padding: 1rem;
  }
`;

const ModalTitle = styled.h2`
  color: ${(props) => props.theme[props.currentTheme].text};
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 750px) {
    font-size: 1.2rem;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme[props.currentTheme].text};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    background-color: ${(props) => props.theme[props.currentTheme].bg2};
    transform: rotate(90deg);
  }

  &:active {
    transform: rotate(90deg) scale(0.95);
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
  color: ${(props) => props.theme[props.currentTheme].text};

  @media (max-width: 750px) {
    padding: 1rem;
  }
`;

export default Modal;
