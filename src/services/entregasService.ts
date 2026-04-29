import firebase from './firebaseConfig';
import { Pedido } from '../types/entregas.types';
import { RequestStatus } from '../models/RequestStatusEnum';

const db = firebase.firestore();
const auth = firebase.auth();

async function garantirAuth(): Promise<void> {
  if (auth.currentUser) return;
  const email = process.env.REACT_APP_PROVIDER_AUTH_EMAIL;
  const password = process.env.REACT_APP_PROVIDER_AUTH_PASSWORD;
  if (!email || !password) {
    throw new Error('Credenciais Firebase não configuradas no .env');
  }
  await auth.signInWithEmailAndPassword(email, password);
}

// Documento real de `requests` — campos relevantes para o entregador
interface RequestDoc {
  idProvider: string;
  dateRequest: number;
  status: string;
  address: string;
  number: string;
  neigh: string;
  complement?: string;
  formPayment: string;
  totalRequest: number;
  feeDelivery: number;
  comments?: string;
  change?: number;
  deliveryMan?: { code: string; name?: string };
  dataCustomer?: { name: string; whats: string };
  items?: Array<{ id: string; amount: number; description: string; combined: string; flavors?: Array<{ description: string }> }>;
}

function formatHora(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function mapDoc(id: string, data: RequestDoc): Pedido {
  const endereco = [data.address, data.number, data.complement]
    .filter(Boolean)
    .join(', ');

  const segundos = Math.floor((data.dateRequest ?? 0) / 1000);

  return {
    id,
    numero: id.slice(-8).toUpperCase(),
    entregador_code: data.deliveryMan?.code ?? '',
    cliente_nome: data.dataCustomer?.name ?? '',
    cliente_fone: data.dataCustomer?.whats ?? '',
    endereco,
    bairro: data.neigh ?? '',
    distancia_km: 0,
    status: data.status as RequestStatus,
    hora_saida: formatHora(data.dateRequest ?? 0),
    criado_em: { seconds: segundos, nanoseconds: 0 },
    atualizado_em: { seconds: segundos, nanoseconds: 0 },
    items: (data.items ?? []).map(item => ({
      id: item.id,
      amount: item.amount,
      description: item.description,
      combined: item.combined,
      flavors: item.flavors,
    })),
  };
}

export async function getRestaurante(idProvider: string): Promise<string> {
  await garantirAuth();
  const snap = await db
    .collection('providers')
    .where('id', '==', idProvider)
    .limit(1)
    .get();
  if (snap.empty) return '';
  return snap.docs[0].data().fantasy ?? '';
}

export function escutarPedidos(
  idProvider: string,
  entregadorCode: string,
  onDados: (pedidos: Pedido[]) => void,
  onErro: (error: Error) => void,
): () => void {
  let unsubscribe: (() => void) | null = null;
  let cancelado = false;

  garantirAuth()
    .then(() => {
      if (cancelado) return;

      unsubscribe = db
        .collection('requests')
        .where('deliveryMan.code', '==', entregadorCode)
        .where('idProvider', '==', idProvider)
        .orderBy('dateRequest', 'desc')
        .onSnapshot(snapshot => {
          const pedidos = snapshot.docs.map(doc =>
            mapDoc(doc.id, doc.data() as RequestDoc),
          );
          onDados(pedidos);
        }, onErro);
    })
    .catch(onErro);

  return () => {
    cancelado = true;
    if (unsubscribe) unsubscribe();
  };
}

export async function atualizarStatus(
  pedidoId: string,
  status: RequestStatus,
): Promise<void> {
  await garantirAuth();
  await db.collection('requests').doc(pedidoId).update({ status });
}
