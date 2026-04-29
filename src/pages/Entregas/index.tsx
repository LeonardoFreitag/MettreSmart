import React, { useState, useEffect } from 'react';
import { Pedido } from '../../types/entregas.types';
import { RequestStatus } from '../../models/RequestStatusEnum';
import { getRestaurante, escutarPedidos } from '../../services/entregasService';
import Header from './Header';
import ListaPedidos from './ListaPedidos';
import LoadingSpinner from './LoadingSpinner';
import ErroSessao, { TipoErro } from './ErroSessao';
import { PageWrapper, Conteudo } from './styles';

function lerParams(): {
  idProvider: string | null;
  entregadorCode: string | null;
  nomeEntregador: string | null;
} {
  const params = new URLSearchParams(window.location.search);
  return {
    idProvider: params.get('token'),
    entregadorCode: params.get('entregador'),
    nomeEntregador: params.get('nomeEntregador'),
  };
}

const EntregasPage: React.FC = () => {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<TipoErro | null>(null);
  const [nomeRestaurante, setNomeRestaurante] = useState('');
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const { idProvider, entregadorCode, nomeEntregador } = lerParams();

  useEffect(() => {
    if (!idProvider || !entregadorCode) {
      setErro('LINK_INVALIDO');
      setCarregando(false);
      return;
    }

    getRestaurante(idProvider)
      .then(nome => setNomeRestaurante(nome))
      .catch(() => {
        /* nome fica vazio, não é crítico */
      });

    const unsubscribe = escutarPedidos(
      idProvider,
      entregadorCode,
      dadosPedidos => {
        setPedidos(dadosPedidos);
        setCarregando(false);
      },
      err => {
        console.error('[EntregasPage] Firestore error:', err);
        setErro('ERRO_FIRESTORE');
        setCarregando(false);
      },
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (carregando) {
    return (
      <PageWrapper>
        <Conteudo>
          <LoadingSpinner />
        </Conteudo>
      </PageWrapper>
    );
  }

  if (erro) {
    return (
      <PageWrapper>
        <Conteudo>
          <ErroSessao tipo={erro} />
        </Conteudo>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Header
        nomeEntregador={nomeEntregador ?? entregadorCode ?? ''}
        nomeRestaurante={nomeRestaurante}
        totalPedidos={pedidos.length}
        pedidosEmRota={
          pedidos.filter(p => p.status === RequestStatus.Sent).length
        }
      />
      <Conteudo>
        <ListaPedidos pedidos={pedidos} idProvider={idProvider ?? ''} />
      </Conteudo>
    </PageWrapper>
  );
};

export default EntregasPage;
