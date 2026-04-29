# Módulo de Entregas — Interface do Entregador

## Visão Geral

Módulo separado do fluxo principal do cliente. O entregador acessa a aplicação via link enviado por WhatsApp, sem tela de login. A autenticação é feita por JWT embutido na URL.

---

## Arquitetura

O sistema possui três camadas que **não se comunicam entre si diretamente**:

```
Sistema Delphi  ──►  API Node.js  ──►  Firebase Firestore
App React       ──────────────────────►  Firebase Firestore
```

O app React **não chama a API Node.js**. Ele lê e grava diretamente no Firestore usando o Firebase SDK. A API já terá gravado os pedidos antes do entregador abrir o link.

---

## Fluxo em 4 Fases

### Fase 1 — Cadastro prévio
O Delphi grava via API o restaurante e o pedido (com `status: "pendente"`) no Firestore antes de qualquer entrega.

### Fase 2 — Despacho
O Delphi chama `POST /entregas/enviar-link`. A API:
- Gera um JWT com validade de 8 horas contendo `{ idProvider, entregador_code, entregador_name }`
- Monta o link: `https://<FRONTEND_URL>/entregas?token=<jwt>`
- Envia o link via Twilio ao celular do entregador por WhatsApp

### Fase 3 — Entregador acessa o app
O entregador toca no link. O React:
- Extrai o token de `?token=` na URL
- Decodifica o payload JWT (sem verificar assinatura — a segurança é garantida pelas Firestore Security Rules)
- Verifica o campo `exp` — se expirado, exibe tela de sessão expirada
- Abre um `onSnapshot` direto no Firestore e exibe os pedidos ativos em tempo real
- **Não faz nenhuma chamada à API**

### Fase 4 — Atualização de status
O entregador toca em "Saí para entrega" ou "Confirmar entrega". O React:
- Grava o novo status diretamente no Firestore
- O `onSnapshot` detecta a mudança instantaneamente
- Quando o status vira `"entregue"`, o cartão some da lista sozinho — o pedido deixa de satisfazer o filtro da consulta

---

## Rota

| Rota | Componente | Descrição |
|---|---|---|
| `/entregas?token=<jwt>` | `EntregasPage` | Interface do entregador |

---

## Estrutura de Dados no Firestore

```
restaurantes/{idProvider}
  - nome: string

restaurantes/{idProvider}/pedidos/{pedidoId}
  - numero: string
  - entregador_code: string
  - cliente_nome: string
  - cliente_fone: string          (ex: "5565991112222")
  - endereco: string
  - bairro: string
  - distancia_km: number
  - status: "pendente" | "em_rota" | "entregue"
  - hora_saida: string            (ex: "19:30")
  - criado_em: Timestamp
  - atualizado_em: Timestamp
```

---

## Fluxo de Status

```
pendente  ──►  em_rota  ──►  entregue
                                (some da lista automaticamente via onSnapshot)
```

A transição é sempre para frente. Um pedido `em_rota` não volta para `pendente`.

---

## Payload do JWT

```ts
interface JwtPayload {
  idProvider: string;
  entregador_code: string;
  entregador_name: string;
  exp: number;
}
```

---

## Estrutura de Arquivos

```
src/
  types/
    entregas.types.ts         ← JwtPayload, Pedido
  services/
    entregasService.ts        ← getRestaurante(), escutarPedidos(), atualizarStatus()
  pages/
    Entregas/
      index.tsx               ← lê token, decodifica JWT, orquestra estados
      styles.ts
      Header/                 ← nome do entregador + restaurante + contador
      ListaPedidos/           ← lista de cartões
      CartaoPedido/           ← card individual com botão de ação e fade-out
      StatusBadge/            ← badge colorido por status
      LoadingSpinner/         ← spinner de carregamento inicial
      ErroSessao/             ← telas de erro (link inválido, expirado, Firestore)
```

---

## Índice Composto Necessário no Firestore

A consulta de pedidos usa `==` + `!=` + dois `orderBy`, exigindo um índice composto.
**Sem este índice o `onSnapshot` falha.**

Criar na coleção `pedidos` (dentro de `restaurantes/{idProvider}`) com os campos nesta ordem:

| Campo | Ordem |
|---|---|
| `entregador_code` | Crescente |
| `status` | Crescente |
| `criado_em` | Crescente |

> Ao rodar o app sem o índice, o Firestore loga um erro no console com um link direto para criá-lo no Firebase Console.

---

## Telas e Estados

### Link inválido
Exibida quando o token está ausente ou malformado na URL.

### Sessão expirada
Exibida quando o campo `exp` do JWT já passou. Orienta o entregador a solicitar novo link.

### Carregando
Spinner exibido enquanto o `onSnapshot` aguarda o primeiro resultado do Firestore.

### Lista de pedidos
Exibe todos os pedidos com `status != "entregue"` do entregador. Atualiza em tempo real.

### Erro Firestore
Exibida se o `onSnapshot` retornar erro (sem conexão, regras de segurança, etc.).

---

## Comportamentos Importantes

- O token **não é salvo em localStorage** — mantido em estado React apenas durante a sessão.
- Novos pedidos atribuídos pelo Delphi aparecem na tela automaticamente, sem recarregar a página.
- Ao confirmar entrega, o cartão inicia animação de fade-out; o `onSnapshot` remove o documento da lista em seguida.
- Erros no `updateDoc` exibem toast sem travar a UI — o botão volta ao estado normal para nova tentativa.
