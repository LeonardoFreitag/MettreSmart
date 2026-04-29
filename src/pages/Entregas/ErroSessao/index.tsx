import React from 'react';
import { Wrapper, Icone, Titulo, Descricao } from './styles';

export type TipoErro = 'LINK_INVALIDO' | 'ERRO_FIRESTORE';

interface Props {
  tipo: TipoErro;
}

const conteudo: Record<TipoErro, { icone: string; titulo: string; descricao: string }> = {
  LINK_INVALIDO: {
    icone: '🔗',
    titulo: 'Link inválido',
    descricao:
      'Este link não contém os dados de acesso necessários. Verifique se você abriu o link correto enviado pelo WhatsApp.',
  },
  ERRO_FIRESTORE: {
    icone: '⚠️',
    titulo: 'Erro ao carregar pedidos',
    descricao:
      'Não foi possível conectar ao banco de dados. Verifique sua conexão e recarregue a página.',
  },
};

const ErroSessao: React.FC<Props> = ({ tipo }) => {
  const { icone, titulo, descricao } = conteudo[tipo];
  return (
    <Wrapper>
      <Icone>{icone}</Icone>
      <Titulo>{titulo}</Titulo>
      <Descricao>{descricao}</Descricao>
    </Wrapper>
  );
};

export default ErroSessao;
