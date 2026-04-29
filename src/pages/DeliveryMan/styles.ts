import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  padding-bottom: 40px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0 8px;
  gap: 12px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-family: 'Roboto Regular';
  color: #333;
`;

export const Subtitle = styled.p`
  font-size: 13px;
  font-family: 'Roboto Regular';
  color: #888;
  margin-bottom: 20px;
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
`;

export const StyledInput = styled.input`
  width: 100%;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  padding: 0 14px;
  font-size: 15px;
  font-family: 'Roboto Regular';
  color: #333;
  background: #fff;
  height: 48px;
  transition: border-color 0.15s;

  &:focus {
    border-color: #2b70a8;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
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

export const SectionTitle = styled.p`
  font-size: 13px;
  font-family: 'Roboto Regular';
  font-weight: 600;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 20px 0 10px;
`;

export const DeliveryCard = styled.div`
  background: #fff;
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 12px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const CardOrderId = styled.span`
  font-size: 13px;
  font-family: 'Roboto Regular';
  font-weight: 600;
  color: #2b70a8;
`;

interface StatusBadgeProps {
  delivered: boolean;
}

export const StatusBadge = styled.span<StatusBadgeProps>`
  font-size: 11px;
  font-family: 'Roboto Regular';
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
  background: ${({ delivered }) => (delivered ? '#d4edda' : '#fff3cd')};
  color: ${({ delivered }) => (delivered ? '#155724' : '#856404')};
`;

export const CardDivider = styled.div`
  height: 1px;
  background: #f0f0f0;
  margin: 8px 0;
`;

export const CardRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 5px;
  align-items: baseline;
`;

export const CardLabel = styled.span`
  font-size: 12px;
  font-family: 'Roboto Regular';
  color: #888;
  min-width: 64px;
  flex-shrink: 0;
`;

export const CardValue = styled.span`
  font-size: 13px;
  font-family: 'Roboto Regular';
  color: #333;
  word-break: break-word;
  line-height: 1.4;
`;

export const CardValueBold = styled(CardValue)`
  font-weight: 600;
`;

export const CardPhoneLink = styled.a`
  font-size: 13px;
  font-family: 'Roboto Regular';
  color: #2b70a8;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ItemsList = styled.ul`
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
`;

export const ItemRow = styled.li`
  font-size: 12px;
  font-family: 'Roboto Regular';
  color: #555;
  line-height: 1.6;

  &::before {
    content: '• ';
    color: #2b70a8;
  }
`;

export const ConfirmButton = styled.button`
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #28a745;
  color: #fff;
  font-size: 14px;
  font-family: 'Roboto Regular';
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: opacity 0.15s;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  &:active:not(:disabled) {
    opacity: 0.85;
  }
`;

export const DeliveredBadge = styled.div`
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  border-radius: 8px;
  background: #d4edda;
  color: #155724;
  font-size: 13px;
  font-family: 'Roboto Regular';
  font-weight: 600;
  text-align: center;
`;

export const EmptyText = styled.p`
  font-size: 14px;
  font-family: 'Roboto Regular';
  color: #888;
  text-align: center;
  margin-top: 32px;
`;

export const CodeBadge = styled.div`
  background: #eaf1fb;
  border: 1px solid #d0e4f7;
  border-radius: 8px;
  padding: 8px 14px;
  margin-bottom: 4px;
  font-size: 13px;
  font-family: 'Roboto Regular';
  color: #2b70a8;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ChangeCodeButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  font-family: 'Roboto Regular';
  color: #2b70a8;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
`;

export const CodeBadgeActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const RefreshButton = styled.button`
  background: none;
  border: none;
  color: #2b70a8;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;
