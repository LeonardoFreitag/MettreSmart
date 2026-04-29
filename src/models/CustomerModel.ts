export interface CustomerModel {
  id: string;
  idProvider: string;
  name: string;
  whats: string;
  cpf?: string;
  zipcode?: string;
  address: string;
  number: string;
  neigh: string;
  feeDelivery: number;
  complement?: string;
  city?: string;
  uf?: string;
  comments?: string;
  latitude?: number;
  longitude?: number;
  read: boolean;
}
