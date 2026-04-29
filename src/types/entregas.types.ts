import { RequestStatus } from '../models/RequestStatusEnum';

export interface PedidoItem {
  id: string;
  amount: number;
  description: string;
  combined: string;
  flavors?: Array<{ description: string }>;
}

export interface Pedido {
  id: string;
  numero: string;
  entregador_code: string;
  cliente_nome: string;
  cliente_fone: string;
  endereco: string;
  bairro: string;
  distancia_km: number;
  status: RequestStatus; // 'pendente' | 'em_rota' | 'entregue';
  hora_saida: string;
  criado_em: { seconds: number; nanoseconds: number };
  atualizado_em: { seconds: number; nanoseconds: number };
  items: PedidoItem[];
}
