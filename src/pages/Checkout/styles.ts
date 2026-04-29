import styled, { css, keyframes } from 'styled-components';
import ReactInputMask from 'react-input-mask';

const inputBase = css`
  width: 100%;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  padding: 0 14px;
  font-size: 15px;
  font-family: 'Roboto Regular';
  color: #333;
  background: #fff;
  transition: border-color 0.15s;

  &:focus {
    border-color: #dc1637;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const Container = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  padding-bottom: 32px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0 8px;
  gap: 12px;
  width: 100%;
`;

export const Logo = styled.img`
  width: 52px;
  height: 52px;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-family: 'Roboto Regular';
  color: #333;
  flex: 1;
`;

export const CartIconButton = styled.button`
  flex-shrink: 0;
  position: relative;
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #28a745;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(40, 167, 69, 0.4);
  transition: background 0.2s;
  pointer-events: all;

  svg {
    color: #fff;
    width: 20px;
    height: 20px;
    pointer-events: none;
  }

  &:hover {
    background: #218838;
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: #dc1637;
  color: #fff;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto Regular';
`;

export const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 4px 0 20px;
`;

interface StepDotProps {
  active: boolean;
  done: boolean;
}

export const StepDot = styled.div<StepDotProps>`
  width: ${({ active }) => (active ? '12px' : '8px')};
  height: ${({ active }) => (active ? '12px' : '8px')};
  border-radius: 50%;
  background-color: ${({ active, done }) =>
    done ? '#28a745' : active ? '#dc1637' : '#ccc'};
  transition: all 0.2s;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-family: 'Roboto Regular';
  color: #555;
  margin-bottom: 4px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StyledInput = styled.input`
  ${inputBase}
  height: 48px;

  &:read-only {
    background: #f5f5f5;
    color: #666;
    cursor: default;
  }
`;

export const StyledTextarea = styled.textarea`
  ${inputBase}
  height: 72px;
  padding: 10px 14px;
  resize: none;
  line-height: 1.5;
`;

export const StyledMaskInput = styled(ReactInputMask)`
  ${inputBase}
  height: 48px;
`;

export const RowGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

export const InfoText = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
  font-family: 'Roboto Regular';
`;

export const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
`;

interface CardProps {
  isSelected: boolean;
}

export const PaymentCard = styled.button<CardProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 8px;
  border-radius: 10px;
  border: 2px solid ${({ isSelected }) => (isSelected ? '#dc1637' : '#e0e0e0')};
  background: ${({ isSelected }) => (isSelected ? '#fef0f3' : '#fff')};
  cursor: pointer;
  min-height: 80px;
  transition: all 0.15s;

  svg {
    color: ${({ isSelected }) => (isSelected ? '#dc1637' : '#888')};
    margin-bottom: 6px;
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const PaymentCardLabel = styled.span<CardProps>`
  font-size: 12px;
  font-weight: ${({ isSelected }) => (isSelected ? '600' : '400')};
  color: ${({ isSelected }) => (isSelected ? '#dc1637' : '#555')};
  text-align: center;
  font-family: 'Roboto Regular';
  line-height: 1.3;
`;

export const CheckBadge = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #dc1637;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #fff;
    margin: 0;
  }
`;

export const SwitchArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
`;

export const LabelSwitch = styled.span`
  color: #fff;
  font-family: 'Roboto Regular';
  font-size: 14px;
  font-weight: 500;
`;

export const TotalArea = styled.div`
  background-color: #1a5c30;
  border-radius: 8px;
  padding: 12px 14px;
  margin: 12px 0;
`;

export const LabelTotal = styled.p`
  font-size: 14px;
  font-family: 'Roboto Regular';
  color: #fff;
  text-align: right;
  line-height: 1.8;

  &:last-child {
    font-size: 16px;
    font-weight: 600;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    padding-top: 6px;
    margin-top: 4px;
  }
`;

export const Footer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;

  > button {
    flex: 1;
  }
`;

export const AddMoreButton = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 4px;
  border: 2px solid #dc1637;
  background: transparent;
  color: #dc1637;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Roboto Regular';
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
  transition: background 0.2s, color 0.2s;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: #dc1637;
    color: #fff;
  }
`;

export const BackButton = styled.button`
  flex: 1;
  height: 48px;
  border-radius: 4px;
  border: 2px solid #aaa;
  background: transparent;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto Regular';
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: border-color 0.2s, color 0.2s;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    border-color: #888;
    color: #444;
  }
`;

export const NeighSelect = styled.select`
  ${inputBase}
  height: 48px;
  cursor: pointer;
`;

export const NeighButton = styled.button`
  ${inputBase}
  height: 48px;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  color: #333;
  gap: 8px;

  &[data-placeholder='true'] {
    color: #aaa;
  }

  svg {
    flex-shrink: 0;
    color: #888;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  padding: 0;
`;

export const ModalBox = styled.div`
  background: #fff;
  border-radius: 18px 18px 0 0;
  width: 100%;
  max-width: 500px;
  height: 75vh;
  min-height: 75vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 20px 16px 8px;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15);
`;

export const ModalTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  font-family: 'Roboto Regular';
  color: #333;
  margin: 0 0 12px;
  text-align: center;
`;

export const ModalSearch = styled.input`
  ${inputBase}
  height: 44px;
  margin-bottom: 12px;
  flex-shrink: 0;
`;

export const NeighList = styled.ul`
  flex: 1;
  min-height: 75vh;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NeighCard = styled.li`
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  padding: 12px 14px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:active {
    background: #f5f5f5;
  }

  &:hover {
    border-color: #28a745;
    background: #f0faf3;
  }
`;

export const NeighCardName = styled.span`
  font-size: 14px;
  font-family: 'Roboto Regular';
  color: #333;
  font-weight: 500;
`;

export const NeighCardMeta = styled.span`
  font-size: 12px;
  font-family: 'Roboto Regular';
  color: #888;
  margin-top: 2px;
`;

export const NeighCardInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NeighCardFee = styled.span`
  font-size: 13px;
  font-family: 'Roboto Regular';
  color: #28a745;
  font-weight: 600;
  white-space: nowrap;
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  vertical-align: middle;
  margin-left: 6px;
`;

export const SpinnerBlue = styled(Spinner)`
  border-color: rgba(43, 112, 168, 0.3);
  border-top-color: #2b70a8;
`;

export const ReturningBanner = styled.div`
  background: #eaf6ee;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 16px;
  font-size: 14px;
  font-family: 'Roboto Regular';
  color: #2d6a4f;
`;

export const CustomerCard = styled.div`
  background: #f8fafb;
  border: 1.5px solid #d0e4f7;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 16px;
`;

export const CustomerCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const CustomerCardTitle = styled.p`
  font-size: 13px;
  font-weight: 600;
  font-family: 'Roboto Regular';
  color: #2b70a8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

export const CustomerCardEditButton = styled.button`
  background: none;
  border: 1px solid #2b70a8;
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 12px;
  font-family: 'Roboto Regular';
  color: #2b70a8;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background 0.15s;

  &:hover {
    background: #eaf1fb;
  }

  &:active {
    background: #d0e4f7;
  }
`;

export const CustomerCardRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  align-items: baseline;
`;

export const CustomerCardLabel = styled.span`
  font-size: 12px;
  font-family: 'Roboto Regular';
  color: #888;
  min-width: 68px;
  flex-shrink: 0;
`;

export const CustomerCardValue = styled.span`
  font-size: 14px;
  font-family: 'Roboto Regular';
  color: #333;
  word-break: break-word;
`;
