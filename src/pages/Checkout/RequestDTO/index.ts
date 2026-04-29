import { CustomerModel } from '../../../models/CustomerModel';
import { ItemModel } from '../../../models/ItemModel';
import { RequestStatus } from '../../../models/RequestStatusEnum';

export interface RequestDTO {
  id: string;
  idCustomer: string;
  idProvider: string;
  dateRequest: number;
  totalProducts: number;
  feeDelivery: number;
  totalRequest: number;
  status: RequestStatus;
  address: string;
  number: string;
  idNeigh: string;
  neigh: string;
  complement: string;
  formPayment: string;
  items: ItemModel[];
  read: boolean;
  dataCustomer: CustomerModel;
  comeGet: boolean;
  comments: string;
  latitude?: number;
  longitude?: number;
  change?: number;
}
