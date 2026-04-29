import React from 'react';
import { RequestStatus } from '../../../models/RequestStatusEnum';
import { Badge } from './styles';

const labelMap: Record<RequestStatus, string> = {
  [RequestStatus.Open]:      'Pendente',
  [RequestStatus.Produced]:  'Em preparo',
  [RequestStatus.Sent]:      'Em rota',
  [RequestStatus.Delivered]: 'Entregue',
  [RequestStatus.Canceled]:  'Cancelado',
};

interface Props {
  status: RequestStatus;
}

const StatusBadge: React.FC<Props> = ({ status }) => (
  <Badge status={status}>{labelMap[status]}</Badge>
);

export default StatusBadge;
