export enum RequestStatus {
  /** Pedido aberto — criado pelo cliente, aguardando confirmação */
  Open = 'O',
  /** Pedido confirmado e em preparo */
  Produced = 'P',
  /** Pedido enviado / saiu para entrega */
  Sent = 'S',
  /** Pedido entregue ao cliente */
  Delivered = 'D',
  /** Pedido cancelado */
  Canceled = 'C',
}
