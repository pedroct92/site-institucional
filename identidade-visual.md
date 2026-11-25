# Planejamento e Identidade Visual do Site Institucional

Este documento reúne a definição institucional, a logomarca e a identidade visual aplicadas no projeto **Horizonte Soluções**.

---

## 1.1. Definição da empresa

- **Nome da empresa:** Horizonte Soluções
- **Ramo de atuação:** Consultoria Empresarial, Tecnologia Web e Capacitação Corporativa.
- **Produtos ou serviços oferecidos:**
  1. **Consultoria Estratégica** (*Consultoria*): diagnóstico completo dos processos internos, mapeamento de gargalos e plano de ação com indicadores de desempenho para reduzir custos e aumentar a produtividade.
  2. **Soluções Digitais e Web** (*Tecnologia*): desenvolvimento de sites institucionais, portais e sistemas web responsivos sob medida, com integração a formulários e suporte contínuo.
  3. **Capacitação e Suporte** (*Treinamento*): oficinas presenciais ou on-line para equipes, material didático de apoio e canal de atendimento dedicado.
- **Público-alvo:** Micro, pequenas e médias empresas (PMEs), empreendedores e gestores que buscam organizar processos internos, modernizar sua presença digital e capacitar colaboradores de forma prática.
- **Breve descrição da empresa:** Fundada em 2018, a **Horizonte Soluções** é uma empresa especializada em unir gestão estratégica, tecnologia acessível e atendimento próximo para ajudar negócios em crescimento a alcançarem resultados consistentes e sustentáveis.

---

## 1.2. Criação da logomarca

- **Arquivo da logomarca:** [`img/logo.svg`](img/logo.svg)
- **Conceito e identidade:** A logo original foi desenvolvida em formato vetorial (SVG) com base nas cores oficiais da empresa e representa os três pilares da marca:
  - **Base em verde-petróleo (`#0d9488`)** com cantos arredondados: transmite modernidade, tecnologia e equilíbrio.
  - **Sol nascente em âmbar (`#f59e0b`) sobre a linha branca do horizonte**: remete diretamente ao nome *Horizonte* e à ideia de novos caminhos, clareza e visão de futuro.
  - **Seta ascendente e traço contínuo em branco (`#ffffff`)**: simbolizam estratégia, evolução contínua e crescimento dos resultados dos clientes.
- **Aplicação no site:** A logomarca está integrada no site em três pontos:
  1. **Menu de navegação (Navbar)** no cabeçalho (`#nav-logo-empresa`).
  2. **Rodapé** junto ao nome institucional (`#rodape-logo-empresa`).
  3. **Favicon** na aba do navegador (`<link rel="icon" href="img/logo.svg">`).

---

## 1.3. Definição da identidade visual

### Paleta de cores

A identidade visual utiliza uma paleta principal com três cores institucionais complementadas por tons neutros de apoio (definidas como variáveis CSS no `:root` do arquivo [`css/estilo.css`](css/estilo.css)):

| Papel | Cor | Código Hexadecimal | Aplicação no site |
| :--- | :--- | :--- | :--- |
| **Cor Principal** | Azul Marinho Institucional | `#0f2a44` (variação escura `#091b2c`) | Fundo da Navbar, títulos, painel de contato, cabeçalho do Modal, botões principais e rodapé. |
| **Cor Secundária** | Verde-Petróleo | `#0d9488` | Base da logomarca, etiquetas de seção, borda superior dos cards, ícones institucionais, filtros ativos e foco de formulários. |
| **Cor de Destaque** | Âmbar / Dourado | `#f59e0b` (hover `#d97706`) | Botões de ação (*Solicitar Orçamento* e *Voltar ao Topo*), detalhe ativo do menu, indicadores do carrossel e ícones de contato. |
| **Apoio (Fundo Claro)** | Cinza Azulado Suave | `#f4f7fa` | Fundo alternado das seções de Serviços, Contato e caixa de boas-vindas. |
| **Apoio (Texto)** | Cinza Ardósia Escuro | `#1e293b` | Cor padrão de leitura dos parágrafos e formulários. |

### Tipografia

Foram escolhidas duas fontes do **Google Fonts** para criar contraste e boa legibilidade:

1. **`Poppins`** *(pesos 500, 600 e 700)* — utilizada em **títulos (`h1` a `h6`)** e na **marca da Navbar (`.navbar-brand`)**, conferindo aparência moderna e estruturada.
2. **`Open Sans`** *(pesos 400, 600 e 700)* — utilizada no **corpo de texto (`body`)**, parágrafos, listas, descrições de cards e campos de formulário, garantindo leitura confortável em telas de celulares, tablets e computadores.

### Padrões de botões, títulos e elementos visuais

- **Botões:**
  - **Botão Principal (`.btn-principal`)**: fundo `#0f2a44`, texto branco, peso `600`, bordas arredondadas (`8px`) e leve elevação (`translateY(-2px)`) ao passar o mouse.
  - **Botão de Destaque (`.btn-destaque`)**: fundo `#f59e0b`, texto escuro (`#0f172a`), peso `700`, bordas arredondadas (`8px`), usado para chamadas à ação prioritárias.
  - **Botão Contorno (`.btn-contorno`)**: borda de `2px` na cor `#0f2a44` com preenchimento no hover.
  - **Botões de Filtro (`.btn-filtro`)**: formato em pílula (`border-radius: 50px`), com estado ativo preenchido em verde-petróleo (`#0d9488`).
- **Títulos e Etiquetas:**
  - Títulos das seções sempre acompanhados de uma **etiqueta em pílula (`.etiqueta-secao`)** em caixa alta com fundo translúcido em verde-petróleo.
  - Subtítulos centralizados com largura máxima de `650px` para melhor escaneabilidade.
- **Elementos Visuais e Componentes:**
  - **Navbar fixa no topo (`.navbar-personalizada`)** com sombra suave e barra de destaque âmbar no link ativo.
  - **Carrossel (`.carousel-item`)** com altura responsiva (`460px` no desktop e `320px` no mobile) e gradiente escuro sobre a imagem para garantir contraste do texto.
  - **Cards de Serviços (`.card-servico`)** com cantos arredondados (`14px`), borda superior colorida (`4px solid #0d9488`), sombra suave e efeito sutil de zoom na imagem no hover.
  - **Formulários e Modal:** campos com cantos arredondados (`8px`), borda de foco em verde-petróleo (`#0d9488`) e janela modal com cabeçalho azul marinho.
