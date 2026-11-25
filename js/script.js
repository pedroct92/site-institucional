let dadosEmpresa = null;

document.addEventListener("DOMContentLoaded", async function () {
  configurarEventosNavegacao();
  configurarEventosFormulario();
  configurarBotaoVoltarTopo();

  try {
    dadosEmpresa = await buscarDadosEmpresa();
    carregarDadosDaEmpresa();
    montarCarrossel();
    montarFiltrosDeServicos();
    renderizarServicos("Todos");
  } catch (erro) {
    exibirErroCarregamentoDados(erro);
  }
});

async function buscarDadosEmpresa() {
  const resposta = await fetch("dados/dados-empresa.json");
  if (!resposta.ok) {
    throw new Error(`Não foi possível carregar o JSON (status ${resposta.status}).`);
  }
  return resposta.json();
}

function exibirErroCarregamentoDados(erro) {
  console.error("Erro ao carregar dados da empresa:", erro);
  const aviso = document.getElementById("aviso-erro-json");
  if (!aviso) {
    return;
  }

  aviso.className = "container mt-3 alert alert-warning";
  aviso.innerHTML = `
    <strong>Atenção:</strong> Não foi possível carregar o arquivo <code>dados/dados-empresa.json</code>.
    Para abrir o site corretamente com JSON, utilize um servidor local (como a extensão <strong>Live Server</strong> do VS Code).
  `;
}

function carregarDadosDaEmpresa() {
  document.title = dadosEmpresa.tituloPagina;

  // Cabeçalho e Home
  if (dadosEmpresa.logo) {
    const logoNav = document.getElementById("nav-logo-empresa");
    const logoRodape = document.getElementById("rodape-logo-empresa");
    logoNav.src = dadosEmpresa.logo;
    logoNav.alt = `Logomarca ${dadosEmpresa.nome}`;
    logoRodape.src = dadosEmpresa.logo;
    logoRodape.alt = `Logomarca ${dadosEmpresa.nome}`;
  }
  document.getElementById("nav-nome-empresa").textContent = dadosEmpresa.nomeCurto;
  document.getElementById("home-titulo").textContent = dadosEmpresa.tituloBoasVindas;
  document.getElementById("home-boas-vindas").textContent = dadosEmpresa.mensagemBoasVindas;

  // Seção Sobre Nós
  document.getElementById("sobre-titulo").textContent = dadosEmpresa.sobre.titulo;
  document.getElementById("sobre-imagem").src = dadosEmpresa.sobre.imagem;
  document.getElementById("sobre-historia").textContent = dadosEmpresa.sobre.historia;
  document.getElementById("sobre-complemento").textContent = dadosEmpresa.sobre.complemento;
  document.getElementById("sobre-missao").textContent = dadosEmpresa.sobre.missao;
  document.getElementById("sobre-visao").textContent = dadosEmpresa.sobre.visao;

  const listaValores = document.getElementById("sobre-valores");
  listaValores.innerHTML = "";
  dadosEmpresa.sobre.valores.forEach(function (valor) {
    const item = document.createElement("li");
    item.textContent = valor;
    listaValores.appendChild(item);
  });

  // Seção Contato
  document.getElementById("contato-endereco").textContent = dadosEmpresa.contato.endereco;
  document.getElementById("contato-telefone").textContent = dadosEmpresa.contato.telefone;
  document.getElementById("contato-email").textContent = dadosEmpresa.contato.email;
  document.getElementById("contato-horario").textContent = dadosEmpresa.contato.horario;

  // Rodapé
  document.getElementById("rodape-nome-empresa").textContent = dadosEmpresa.nome;
  document.getElementById("rodape-info-legal").textContent =
    `CNPJ: ${dadosEmpresa.contato.cnpj} | ${dadosEmpresa.contato.endereco}`;
  document.getElementById("rodape-ano").textContent = new Date().getFullYear();
  document.getElementById("rodape-copyright-nome").textContent = dadosEmpresa.nome;

  const containerRedes = document.getElementById("rodape-redes");
  containerRedes.innerHTML = "";
  dadosEmpresa.redesSociais.forEach(function (rede) {
    const link = document.createElement("a");
    link.href = rede.url;
    link.target = "_blank";
    link.className = "link-rodape";
    link.setAttribute("aria-label", rede.nome);
    link.innerHTML = `<i class="bi ${rede.icone}"></i>`;
    containerRedes.appendChild(link);
  });
}

function montarCarrossel() {
  const indicadores = document.getElementById("carrossel-indicadores");
  const slides = document.getElementById("carrossel-slides");

  indicadores.innerHTML = "";
  slides.innerHTML = "";

  dadosEmpresa.carrossel.forEach(function (item, indice) {
    const ativo = indice === 0 ? "active" : "";

    // Botão indicador
    const botao = document.createElement("button");
    botao.type = "button";
    botao.setAttribute("data-bs-target", "#carrosselEmpresa");
    botao.setAttribute("data-bs-slide-to", String(indice));
    botao.setAttribute("aria-label", `Slide ${indice + 1}`);
    if (indice === 0) {
      botao.className = "active";
      botao.setAttribute("aria-current", "true");
    }
    indicadores.appendChild(botao);

    // Conteúdo do slide
    const slide = document.createElement("div");
    slide.className = `carousel-item ${ativo}`.trim();
    slide.innerHTML = `
      <img src="${item.imagem}" class="d-block w-100" alt="${item.textoAlternativo}">
      <div class="carousel-caption">
        <h2>${item.titulo}</h2>
        <p>${item.subtitulo}</p>
      </div>
    `;

    slides.appendChild(slide);
  });
}

function montarFiltrosDeServicos() {
  const containerFiltros = document.getElementById("filtros-servicos");
  const categorias = ["Todos"];

  // Coleta as categorias existentes no JSON sem repetir
  dadosEmpresa.servicos.forEach(function (servico) {
    if (!categorias.includes(servico.categoria)) {
      categorias.push(servico.categoria);
    }
  });

  containerFiltros.innerHTML = "";

  categorias.forEach(function (categoria) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = categoria === "Todos" ? "btn btn-filtro ativo" : "btn btn-filtro";
    botao.textContent = categoria;

    // Evento de clique para filtrar serviços
    botao.addEventListener("click", function () {
      const todosBotoes = containerFiltros.querySelectorAll(".btn-filtro");
      todosBotoes.forEach(function (b) {
        b.classList.remove("ativo");
      });
      botao.classList.add("ativo");

      renderizarServicos(categoria);
    });

    containerFiltros.appendChild(botao);
  });
}

function renderizarServicos(categoriaSelecionada) {
  const containerCards = document.getElementById("lista-servicos");
  const contador = document.getElementById("contador-servicos");

  let servicosFiltrados;
  if (categoriaSelecionada === "Todos") {
    servicosFiltrados = dadosEmpresa.servicos;
  } else {
    servicosFiltrados = dadosEmpresa.servicos.filter(function (servico) {
      return servico.categoria === categoriaSelecionada;
    });
  }

  // Atualiza texto dinâmico do contador
  if (servicosFiltrados.length === 1) {
    contador.textContent = "Exibindo 1 solução na categoria selecionada.";
  } else {
    contador.textContent = `Exibindo ${servicosFiltrados.length} soluções disponíveis.`;
  }

  containerCards.innerHTML = "";

  servicosFiltrados.forEach(function (servico) {
    const coluna = document.createElement("div");
    coluna.className = "col-12 col-md-6 col-lg-4";

    coluna.innerHTML = `
      <article class="card h-100 card-servico">
        <div class="caixa-imagem-card">
          <img src="${servico.imagem}" class="card-img-top" alt="${servico.titulo}">
        </div>
        <div class="card-body d-flex flex-column">
          <div class="mb-2">
            <span class="badge badge-categoria">${servico.categoria}</span>
          </div>
          <h3 class="h5 card-title fw-bold">${servico.titulo}</h3>
          <p class="card-text text-muted flex-grow-1">${servico.resumo}</p>
          <button type="button" class="btn btn-principal mt-2 btn-ver-detalhes" data-id="${servico.id}">
            Ver Detalhes
          </button>
        </div>
      </article>
    `;

    containerCards.appendChild(coluna);
  });

  // Adiciona evento click em cada botão "Ver Detalhes" para abrir o Modal
  const botoesDetalhes = containerCards.querySelectorAll(".btn-ver-detalhes");
  botoesDetalhes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const id = Number(botao.getAttribute("data-id"));
      abrirModalServico(id);
    });
  });
}

function abrirModalServico(idServico) {
  const servico = dadosEmpresa.servicos.find(function (item) {
    return item.id === idServico;
  });

  if (!servico) {
    return;
  }

  document.getElementById("modalServicoTitulo").textContent = servico.titulo;
  document.getElementById("modalServicoImagem").src = servico.imagem;
  document.getElementById("modalServicoImagem").alt = servico.titulo;
  document.getElementById("modalServicoCategoria").textContent = servico.categoria;
  document.getElementById("modalServicoDescricao").textContent = servico.descricaoCompleta;

  const listaBeneficios = document.getElementById("modalServicoBeneficios");
  listaBeneficios.innerHTML = "";
  servico.beneficios.forEach(function (beneficio) {
    const li = document.createElement("li");
    li.textContent = beneficio;
    listaBeneficios.appendChild(li);
  });

  const modalElemento = document.getElementById("modalServico");
  const modalBootstrap = bootstrap.Modal.getOrCreateInstance(modalElemento);
  modalBootstrap.show();

  // Botão dentro do modal que leva ao formulário já preenchendo o assunto
  const botaoOrcamento = document.getElementById("btn-modal-orcamento");
  botaoOrcamento.onclick = function () {
    modalBootstrap.hide();
    const campoAssunto = document.getElementById("assunto");

    if (servico.categoria === "Consultoria" || servico.categoria === "Tecnologia" || servico.categoria === "Treinamento") {
      campoAssunto.value = servico.categoria;
      campoAssunto.dispatchEvent(new Event("change"));
    } else {
      campoAssunto.value = "Orçamento";
      campoAssunto.dispatchEvent(new Event("change"));
    }

    document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
  };
}

function configurarEventosNavegacao() {
  const linksMenu = document.querySelectorAll(".navbar-nav .nav-link");
  const menuCollapse = document.getElementById("menuNavegacao");

  linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
      linksMenu.forEach(function (item) {
        item.classList.remove("active");
      });
      link.classList.add("active");

      // Fecha o menu mobile automaticamente ao clicar em um link
      if (menuCollapse.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menuCollapse).hide();
      }
    });
  });
}

function configurarBotaoVoltarTopo() {
  const botaoTopo = document.getElementById("btn-voltar-topo");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      botaoTopo.classList.remove("d-none");
    } else {
      botaoTopo.classList.add("d-none");
    }
  });

  botaoTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function configurarEventosFormulario() {
  const formulario = document.getElementById("formulario-contato");
  const campoNome = document.getElementById("nome");
  const campoEmail = document.getElementById("email");
  const campoTelefone = document.getElementById("telefone");
  const campoAssunto = document.getElementById("assunto");
  const campoMensagem = document.getElementById("mensagem");
  const campoTermos = document.getElementById("aceite-termos");
  const alertaFormulario = document.getElementById("alerta-formulario");

  // Evento "change": mostra uma dica dinâmica de acordo com o assunto escolhido
  campoAssunto.addEventListener("change", function () {
    const caixaDica = document.getElementById("caixa-dica-assunto");
    const textoDica = document.getElementById("texto-dica-assunto");
    const valor = campoAssunto.value;

    if (valor === "") {
      caixaDica.classList.add("d-none");
      return;
    }

    let mensagemDica = "";
    if (valor === "Orçamento") {
      mensagemDica = "Dica: informe o porte da sua empresa e o prazo desejado para agilizar a proposta.";
    } else if (valor === "Consultoria") {
      mensagemDica = "Dica: conte qual área da empresa precisa de melhoria (processos, vendas ou gestão).";
    } else if (valor === "Tecnologia") {
      mensagemDica = "Dica: descreva se precisa de um site institucional, sistema web ou integração.";
    } else if (valor === "Treinamento") {
      mensagemDica = "Dica: informe a quantidade aproximada de participantes da sua equipe.";
    } else {
      mensagemDica = "Ficaremos felizes em ouvir sua solicitação e responder o mais breve possível.";
    }

    textoDica.textContent = mensagemDica;
    caixaDica.classList.remove("d-none");
  });

  // Evento "input": formata o telefone automaticamente enquanto o usuário digita
  campoTelefone.addEventListener("input", function () {
    let numeros = campoTelefone.value.replace(/\D/g, "");
    if (numeros.length > 11) {
      numeros = numeros.slice(0, 11);
    }

    if (numeros.length > 6) {
      campoTelefone.value = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    } else if (numeros.length > 2) {
      campoTelefone.value = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    } else {
      campoTelefone.value = numeros;
    }
  });

  // Evento "submit": valida todos os campos antes de concluir o envio
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nomeValido = validarCampo(campoNome, campoNome.value.trim().length >= 3);
    const emailValido = validarCampo(campoEmail, validarFormatoEmail(campoEmail.value.trim()));
    const apenasNumerosTelefone = campoTelefone.value.replace(/\D/g, "");
    const telefoneValido = validarCampo(campoTelefone, apenasNumerosTelefone.length >= 10);
    const assuntoValido = validarCampo(campoAssunto, campoAssunto.value !== "");
    const mensagemValida = validarCampo(campoMensagem, campoMensagem.value.trim().length >= 10);
    const termosValido = validarCampo(campoTermos, campoTermos.checked);

    if (nomeValido && emailValido && telefoneValido && assuntoValido && mensagemValida && termosValido) {
      alertaFormulario.className = "alert alert-success mb-3";
      alertaFormulario.innerHTML = `
        <strong>Mensagem enviada com sucesso!</strong> Obrigado, ${campoNome.value.trim()}.
        Recebemos seu contato sobre <em>${campoAssunto.value}</em> e responderemos para
        <strong>${campoEmail.value.trim()}</strong>.
      `;

      formulario.reset();
      limparClassesValidacao(formulario);
      document.getElementById("caixa-dica-assunto").classList.add("d-none");
    } else {
      alertaFormulario.className = "alert alert-danger mb-3";
      alertaFormulario.textContent = "Por favor, corrija os campos destacados em vermelho antes de enviar.";
    }
  });

  // Limpa estados visuais quando o usuário clicar em "Limpar Campos"
  document.getElementById("btn-limpar-formulario").addEventListener("click", function () {
    limparClassesValidacao(formulario);
    alertaFormulario.className = "d-none mb-3";
    document.getElementById("caixa-dica-assunto").classList.add("d-none");
  });
}

function validarCampo(elemento, condicaoValida) {
  if (condicaoValida) {
    elemento.classList.remove("is-invalid");
    elemento.classList.add("is-valid");
    return true;
  }

  elemento.classList.remove("is-valid");
  elemento.classList.add("is-invalid");
  return false;
}

function validarFormatoEmail(email) {
  const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return padraoEmail.test(email);
}

function limparClassesValidacao(formulario) {
  const campos = formulario.querySelectorAll(".form-control, .form-select, .form-check-input");
  campos.forEach(function (campo) {
    campo.classList.remove("is-valid", "is-invalid");
  });
}
