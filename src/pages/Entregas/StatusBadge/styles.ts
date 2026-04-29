import styled, { css } from 'styled-components';
import { RequestStatus } from '../../../models/RequestStatusEnum';

const colorMap: Record<RequestStatus, { bg: string; color: string }> = {
  [RequestStatus.Open]:      { bg: '#fff3cd', color: '#856404' },
  [RequestStatus.Produced]:  { bg: '#fff3cd', color: '#856404' },
  [RequestStatus.Sent]:      { bg: '#cfe2ff', color: '#084298' },
  [RequestStatus.Delivered]: { bg: '#d1e7dd', color: '#0a3622' },
  [RequestStatus.Canceled]:  { bg: '#f8d7da', color: '#842029' },
};

export const Badge = styled.span<{ status: RequestStatus }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;

  ${({ status }) => css`
    background: ${colorMap[status].bg};
    color: ${colorMap[status].color};
  `}
`;
