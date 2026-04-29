import { RequestStatus } from './RequestStatusEnum';

export interface RequestModel {
  id: string;
  idCustomer: string;
  idProvider: string;
  cellPhone: string;
  dateRequest: number;
  totalProducts: number;
  feeDelivery: number;
  totalRequest: number;
  status: RequestStatus;
  addressDifferent: boolean;
  comeGet: boolean;
  address: string;
  number: string;
  neigh: string;
  complement: string;
  formPayment: string;
  comments?: string;
  latitude?: number;
  longitude?: number;
  change?: number;
}
