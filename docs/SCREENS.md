# Documentação de Telas — Mettre Smart

## Visão Geral

O sistema possui **14 telas** organizadas em dois fluxos principais: pedido normal e pedido combinado (produtos com múltiplos sabores/bordas, ex: pizza).

---

## Fluxo de Navegação

```
Provider (/:idProvider)
    ↓
LoadStorage (/loadStorage)  ←  carrega dados e redireciona
    ↓
Login (/)
    ↓
Groups (/groups)
    ├─→ MenuProducts (/products)               [grupo normal]
    │       ↓
    │   ProductDetail (/productDetail)
    │       ↓
    │   Request (/request) ←──────────────────────────────┐
    │       ↓                                             │
    │   PreCheckout (/precheckout)                        │
    │       ↓                                             │
    │   Neighborhood (/neighborhood)                      │
    │       ↓                                             │
    │   Checkout (/checkout)                              │
    │       ↓                                             │
    │   Success (/success)                                │
    │                                                     │
    └─→ CombinedProducts (/combinedProducts)  [fractioned = 'S']
            ↓
        CombinedOrder (/combinedOrder)
            ↓
        CombinedEdge (/combinedEdge) ─────────────────────┘
```

---

## Telas — Fluxo Normal

### 1. Provider
**Rota:** `/provider/:idProvider`

Tela de inicialização acessada via link único do estabelecimento. Não exibe conteúdo interativo ao usuário — funciona como um gateway de carregamento.

**O que faz:**
- Autentica no Firebase
- Limpa localStorage completamente
- Carrega dados do provider específico do Firestore (`providers`, `products`, `formPayment`, `neighborhood`)
- Filtra produtos por disponibilidade (dia da semana e horário)
- Redireciona para `/` após carregar

**Elementos visuais:**
- Logo genérica (`assets/order-food.png`)
- Título: "Mettre Smart"
- Subtítulo: "Carregando informações..."

---

### 2. LoadStorage
**Rota:** `/loadStorage`

Tela de carregamento que reconstrói o estado da aplicação a partir do Firebase e do localStorage. Usada quando o app já foi inicializado anteriormente.

**O que faz:**
- Exibe tela de loading enquanto recarrega todos os dados
- Carrega provider, produtos, grupos, formas de pagamento e bairros do Firestore
- Recarrega pedido anterior, itens, sabores e seleções do localStorage
- Valida disponibilidade de produtos conforme horário de funcionamento
- Navega para a página correta baseado em `callStorage.call`

**Elementos visuais:**
- Logo do estabelecimento
- Título: "Mettre Smart"
- Subtítulo: "Carregando informações..."

---

### 3. Login
**Rota:** `/`

Tela inicial de boas-vindas. Ponto de entrada do usuário após o carregamento dos dados.

**O que faz:**
- Verifica se o provider está aberto (`provider.open === 'S'`)
- Cria novo pedido vazio ao entrar
- Limpa seleções anteriores do localStorage
- Redireciona para `/loadStorage` se o provider não estiver carregado

**Elementos visuais:**
- Logo do estabelecimento
- Título: "Mettre Smart"
- Subtítulo: "Seja bem vindo!"
- Indicador de status do cardápio (verde = aberto / vermelho = fechado)
- Botão principal: "Vamos ao cardápio" → navega para `/groups`

---

### 4. Groups
**Rota:** `/groups`

Seleção de categoria/grupo de produtos.

**O que faz:**
- Lista todos os grupos disponíveis
- Ao selecionar um grupo, salva no Redux e localStorage
- Se o grupo tem `fractioned = 'S'`, navega para `/combinedProducts`
- Se não é combinado, navega para `/products`

**Elementos visuais:**
- Logo do estabelecimento
- Subtítulo: "Selecione um grupo"
- Lista de grupos clicáveis
- Botão "Meu pedido" → `/request`
- Botão "Cancelar" → `/`

---

### 5. MenuProducts
**Rota:** `/products`

Lista de produtos do grupo selecionado.

**O que faz:**
- Filtra produtos pelo grupo selecionado (`groupSelected.group`)
- Verifica se o estabelecimento está aberto antes de permitir seleção
- Ao clicar em um produto, cria `ItemModel` e navega para `/productDetail`

**Elementos visuais:**
- Logo do estabelecimento
- Subtítulo: "Selecione um produto"
- Grid de produtos com imagem, descrição e preço
- Botão "Voltar" → `/groups`

---

### 6. ProductDetail
**Rota:** `/productDetail`

Detalhes do produto selecionado — define quantidade e observações.

**O que faz:**
- Exibe nome e preço do produto
- Permite ajustar quantidade (mín. 1)
- Campo de observações/comentários
- Calcula subtotal: `quantidade × preço`
- Adiciona item ao carrinho (Redux + localStorage) e navega para `/request`

**Elementos visuais:**
- Logo do estabelecimento
- Título: nome do produto
- Input de quantidade com botões `+` (verde) e `-` (laranja)
- Input de observações
- Botão "Voltar" → `/products`
- Botão "Avançar" → `/request`

---

### 7. Request
**Rota:** `/request`

Carrinho de compras. Exibe todos os itens adicionados ao pedido.

**O que faz:**
- Lista todos os itens do pedido
- Permite remover itens individualmente
- Recalcula o total em tempo real
- Valida que o pedido não está vazio ao tentar continuar

**Elementos visuais:**
- Logo do estabelecimento
- Título: "MEU PEDIDO"
- Lista de itens com descrição, quantidade, preço unitário e subtotal
- Total do pedido em BRL
- Botão "Adicionar produto" → `/groups`
- Botão "Cancelar" → `/`
- Botão "Continuar" → `/precheckout`

---

### 8. PreCheckout
**Rota:** `/precheckout`

Coleta informações de pagamento e contato antes de finalizar o pedido.

**O que faz:**
- Carrega formas de pagamento do Firestore
- Se a forma de pagamento permite troco (`change === 'S'`), exibe campo de valor para troco
- Busca cliente no Firestore pelo número de WhatsApp; se não encontra, cria registro novo
- Valida forma de pagamento e celular obrigatórios

**Elementos visuais:**
- Logo do estabelecimento
- Título: "Finalizando o pedido"
- Select de forma de pagamento
- Input de troco (condicional, formato moeda)
- Input de celular/WhatsApp com máscara `99 9 9999-9999`
- Input de observações gerais
- Total dos produtos em BRL
- Botão "Voltar" → `/request`
- Botão "Continuar" → `/neighborhood`

---

### 9. Neighborhood
**Rota:** `/neighborhood`

Seleção do bairro de entrega.

**O que faz:**
- Lista bairros disponíveis (carregados do Firestore)
- Filtragem em tempo real conforme o usuário digita (case-insensitive)
- Ao selecionar bairro, atualiza o pedido com nome do bairro e taxa de entrega

**Elementos visuais:**
- Logo padrão (`assets/order-food.png`)
- Título: "Finalizando pedido"
- Input de busca: "Localize seu bairro"
- Lista de bairros com nome, cidade, UF e taxa de entrega
- Botão "Voltar" → `/precheckout`

---

### 10. Checkout
**Rota:** `/checkout`

Coleta o endereço de entrega e confirma o pedido final.

**O que faz:**
- Formulário de endereço (nome, rua, número, complemento)
- Toggle "Retirar no balcão" — zera a taxa de entrega quando ativo
- Exibe breakdown de valores: produtos + taxa de entrega = total
- Valida campos obrigatórios
- Salva cliente e pedido no Firestore e navega para `/success`

**Elementos visuais:**
- Logo do estabelecimento
- Título: "Finalizando o pedido"
- 4 inputs de endereço (com ícones)
- Switch "Retirar no balcão"
- Resumo financeiro: valor dos produtos, taxa de entrega, total
- Botão "Voltar" → `/precheckout`
- Botão "Enviar pedido" → `/success`

---

### 11. Success
**Rota:** `/success`

Confirmação de que o pedido foi enviado com sucesso.

**Elementos visuais:**
- Logo do estabelecimento
- Ícone de check verde (tamanho grande)
- Mensagem: "Pedido enviado com sucesso!"
- Botão "OK" → `/`

---

## Telas — Fluxo Combinado (ex: pizza com sabores)

Acionado quando o grupo selecionado tem `fractioned = 'S'`. Após a seleção de borda, o fluxo retorna para `/request` e segue o fluxo normal.

---

### 12. CombinedProducts
**Rota:** `/combinedProducts`

Seleção de sabores para um produto combinado.

**O que faz:**
- Lista produtos filtrados pelo grupo selecionado
- Verifica se o estabelecimento está aberto
- Se `provider.singleEdge === 'N'`: salva sabor e navega para `/combinedEdge`
- Se `provider.singleEdge === 'S'`: adiciona sabor, distribui preços proporcionalmente e navega para `/combinedOrder`

**Elementos visuais:**
- Logo do estabelecimento
- Subtítulo: "Selecione um produto"
- Grid de produtos
- Botão "Voltar" → `/groups`

---

### 13. CombinedOrder
**Rota:** `/combinedOrder`

Resumo dos sabores escolhidos para o produto combinado.

**O que faz:**
- Lista os sabores selecionados
- Controla o limite máximo de sabores (`groupSelected.fractions`)
- Permite remover sabores e recalcula preços proporcionalmente
- Exibe o total combinado

**Elementos visuais:**
- Logo do estabelecimento
- Título: "SABORES ESCOLHIDOS"
- Lista de sabores com subtotais
- Total em BRL
- Botão "Mais um sabor" → `/combinedProducts` (bloqueado se limite atingido)
- Botão "Pronto! Próximo passo" → `/combinedEdge`

---

### 14. CombinedEdge
**Rota:** `/combinedEdge`

Seleção de borda para o produto combinado ou envio sem borda.

**O que faz:**
- Carrega bordas disponíveis (genéricas ou específicas do grupo)
- Ao selecionar borda: distribui o preço da borda proporcionalmente entre os sabores e monta o `ItemModel` final
- Botão "Sem borda": monta o item sem acréscimo de borda
- Salva item no carrinho e navega para `/request`

**Elementos visuais:**
- Logo do estabelecimento
- Subtítulo: "Escolha borda para \[nome do grupo\]"
- Input de observações do item combinado
- Grid de bordas disponíveis
- Botão "Voltar" → `/combinedOrder`
- Botão "Sem borda" → `/request`

---

## Armazenamento de Dados

### LocalStorage

| Chave | Conteúdo |
|---|---|
| `provider` | Dados do estabelecimento (`ProviderModel`) |
| `gselected` | Grupo selecionado (`GroupModel`) |
| `request` | Pedido atual (`RequestModel`) |
| `items` | Itens do pedido (`ItemModel[]`) |
| `iselected` | Item em detalhe (`ItemModel`) |
| `flavors` | Sabores para produto combinado (`FlavorModel[]`) |
| `flavorSelected` | Sabor selecionado (`FlavorModel`) |
| `MW-CUSTOMER` | Dados do cliente (`CustomerModel`) |

### Redux Store

| Slice | Conteúdo |
|---|---|
| `provider` | Dados do estabelecimento |
| `groups` | Lista de grupos |
| `product` | Lista de produtos |
| `productFilter` | Produtos filtrados por grupo |
| `groupSelected` | Grupo selecionado |
| `request` | Pedido atual |
| `item` | Itens do pedido |
| `itemSelected` | Item em detalhe |
| `payment` | Formas de pagamento |
| `neigh` | Lista de bairros |
| `flavors` | Sabores para produto combinado |
| `flavorSelected` | Sabor selecionado |
| `edge` | Bordas disponíveis |
| `customer` | Dados do cliente |
| `callLoadStorage` | Controle de navegação ao carregar |

### Firebase (Firestore)

| Collection | Uso |
|---|---|
| `providers` | Dados dos estabelecimentos |
| `products` | Catálogo de produtos |
| `formPayment` | Formas de pagamento por provider |
| `neighborhood` | Bairros e taxas de entrega |
| `requests` | Pedidos enviados |
| `customers` | Clientes registrados |
