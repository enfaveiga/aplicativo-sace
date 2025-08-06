const equipes = {
  "Equipe Florence": {
    enfermeiros: ["Enf 1"],
    tecnicos: ["Téc 1", "Téc 2", "Téc 3"]
  },
  "Equipe Horta": {
    enfermeiros: ["Enf 2"],
    tecnicos: ["Téc 4", "Téc 5", "Téc 6"]
  },
  "Equipe Nery": {
    enfermeiros: ["Enf 3"],
    tecnicos: ["Téc 7", "Téc 8", "Téc 9"]
  },
  "Equipe Peplau": {
    enfermeiros: ["Enf 4"],
    tecnicos: ["Téc 10", "Téc 11", "Téc 12"]
  }
};

let equipeResponsavel = ""; // variável global

function atualizarEquipe() {
  const equipeSelecionada = document.getElementById("selectEquipe").value;
  equipeResponsavel = equipeSelecionada; // ✅ agora armazenando o valor

  const enfSelect = document.getElementById("enfermeiroResponsavel");
  const tecSelect = document.getElementById("tecnicosResponsaveis");

  // Limpa os campos
  enfSelect.innerHTML = '<option value="">Selecione...</option>';
  tecSelect.innerHTML = '';

  if (!equipeSelecionada || !equipes[equipeSelecionada]) return;

  // Preenche enfermeiros
  equipes[equipeSelecionada].enfermeiros.forEach(enf => {
    const option = document.createElement("option");
    option.value = enf;
    option.textContent = enf;
    enfSelect.appendChild(option);
  });

  // Preenche técnicos
  equipes[equipeSelecionada].tecnicos.forEach(tec => {
    const option = document.createElement("option");
    option.value = tec;
    option.textContent = tec;
    tecSelect.appendChild(option);
  });
}

const matriculas = {
  // Gestor
  "0000": { perfil: "gestor" },

  // Assistencialistas (Enfermeiros)
  "1111": { perfil: "assistencialista", equipe: "Equipe Florence" },
  "1112": { perfil: "assistencialista", equipe: "Equipe Horta" },
  "1113": { perfil: "assistencialista", equipe: "Equipe Nery" },
  "1114": { perfil: "assistencialista", equipe: "Equipe Peplau" },

  // Técnicos - Florence
  "2221": { perfil: "tecnico", equipe: "Equipe Florence" },
  "2222": { perfil: "tecnico", equipe: "Equipe Florence" },
  "2223": { perfil: "tecnico", equipe: "Equipe Florence" },

  // Técnicos - Horta
  "2231": { perfil: "tecnico", equipe: "Equipe Horta" },
  "2232": { perfil: "tecnico", equipe: "Equipe Horta" },
  "2233": { perfil: "tecnico", equipe: "Equipe Horta" },

  // Técnicos - Nery
  "2241": { perfil: "tecnico", equipe: "Equipe Nery" },
  "2242": { perfil: "tecnico", equipe: "Equipe Nery" },
  "2243": { perfil: "tecnico", equipe: "Equipe Nery" },

  // Técnicos - Peplau 
  "2251": { perfil: "tecnico", equipe: "Equipe Peplau" },
  "2252": { perfil: "tecnico", equipe: "Equipe Peplau" },
  "2253": { perfil: "tecnico", equipe: "Equipe Peplau" }
};


const menus = {
  gestor: [
    { text: "Identificação - RT", func: "abrirCard('orientacaoCard')" },
    { text: "Cadastro", func: "abrirCard('cardCadastro')" },
    { text: "Registro de intercorrências", func: "abrirCard('intercorrenciaCard')" }
  ],
  assistencialista: [
    { text: "Identificação - RT", func: "abrirCard('orientacaoCard')" },
    { text: "Admissão de Enfermagem para Atenção Domiciliar - Enfermeiro", func: "abrirCard('admissaoCard')" },
    { text: "Consulta de Enfermagem - Enfermeiro", func: "abrirCard('consultaCard')" },
    { text: "Diagnósticos e Intervenções de Enfermagem - Enfermeiro", func: "abrirCard('cardDiagnostico')" },
    { text: "Encerramento do Cuidado de Enfermagem – Atenção Domiciliar", func: "abrirCard('altaCard')" },
    { text: "Registro de intercorrências", func: "abrirCard('intercorrenciaCard')" }
  ],
  tecnico: [
    { text: "Identificação - RT", func: "abrirCard('orientacaoCard')" },
    { text: "Anotação de Enfermagem - Técnico em Enfermagem", func: "abrirCard('anotacaoCard')" },
    { text: "Registro de intercorrências", func: "abrirCard('intercorrenciaCard')" }
  ]
};

 function validarMatricula() {
  const matricula = document.getElementById("matricula").value.trim();
  const dadosMatricula = matriculas[matricula];

  if (!dadosMatricula) {
    alert("Matrícula inválida!");
    return;
  }

  const perfil = dadosMatricula.perfil;
  const menu = menus[perfil];

  if (menu) {
    sessionStorage.setItem("perfil", perfil);

    if (dadosMatricula.equipe) {
      sessionStorage.setItem("equipeResponsavel", dadosMatricula.equipe);
    }

    // Mostra tela principal
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainScreen').style.display = 'flex';

    // Monta e mostra o menu correto
    montarMenu(perfil);

    // Abre card de boas-vindas
    abrirCard('bemvindoCard');
  } else {
    alert("Perfil sem permissões definidas.");
  }
}

    function montarMenu(perfil) {
    const sidebar = document.getElementById('sidebar');

    // Cria os botões do menu de acordo com o perfil
    menus[perfil].forEach(item => {
    const btn = document.createElement('button');
    btn.innerText = item.text;
    btn.setAttribute('onclick', item.func);
    sidebar.appendChild(btn);
    });

    // Cria o botão de logout no final do menu
    const btnLogout = document.createElement('button');
    btnLogout.innerText = "Sair";
    btnLogout.onclick = logout;
    sidebar.appendChild(btnLogout);
    }

function logout() {
  // Esconde tela principal e menu
  document.getElementById('mainScreen').style.display = 'none';

  // Esconde qualquer card aberto
  const cards = document.querySelectorAll('.card');
  cards.forEach(c => c.style.display = 'none');

  // Limpa menu lateral
  document.getElementById('sidebar').innerHTML = '<h2>Menu</h2>';

  // Limpa campo matrícula
  document.getElementById('matricula').value = '';

  // Retorna para tela login
  document.getElementById('loginScreen').style.display = 'flex';
}

function logout() {
  const confirmLogout = confirm("Deseja realmente sair?");
  if (!confirmLogout) return;

  document.getElementById('mainScreen').style.display = 'none';
  const cards = document.querySelectorAll('.card');
  cards.forEach(c => c.style.display = 'none');
  document.getElementById('sidebar').innerHTML = '<h2>Menu</h2>';
  document.getElementById('matricula').value = '';
  document.getElementById('loginScreen').style.display = 'flex';
}

  function updateSondaStatus(sondaId) {
  const select = document.getElementById(sondaId);
  const statusField = document.getElementById(`${sondaId}_STATUS`);
  
  if (select.value === "Presente") {
    statusField.disabled = false;
    statusField.placeholder = "Descreva a situação: funcional, obstruída, etc.";
  } else {
    statusField.value = ""; // limpa o campo
    statusField.disabled = true;
    statusField.placeholder = "Ex.: Funcional, obstruída...";
  }
}

    // Função envio Admissão
    function enviarAdmissao() {
      const form = document.getElementById("formAdmissao");
      const dados = Object.fromEntries(new FormData(form));

      google.script.run
        .withSuccessHandler(() => {
          document.getElementById("msgAdmissao").innerText = "Dados enviados com sucesso!";
          document.getElementById("msgAdmissao").className = "success";
          form.reset();
        })
        .withFailureHandler(() => {
          document.getElementById("msgAdmissao").innerText = "Erro ao enviar!";
          document.getElementById("msgAdmissao").className = "error";
        })
        .salvarDadosAdmissao(dados);
    }

  function salvarDadosAdmissao(dados) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Admissao');
  sheet.appendRow([
    new Date(), 
    dados.nomePaciente,
    dados.nomeId,
    dados.dataNascimento,
    dados.sexo,
    dados.equipe,
    dados.dataHora,
    dados.statusAtendimento,
    dados.procedencia,
    dados.condicoesChegada,
    dados.nivelConsciencia,
    dados.acompanhante,
    dados.higiene,
    dados.lesoes,
    dados.deficiencias,
    dados.protese,
    dados.queixas,
    dados.procedimentos,
    dados.orientacoes,
    dados.percepcaoSensorial,  // Campo Braden
    dados.umidade,
    dados.atividade,
    dados.mobilidade,
    dados.nutricao,
    dados.friccao,
    dados.pontuacaoBraden,
    dados.interpretacaoBraden, // NOVO
    dados.historicoQueda,      // Campo Morse
    dados.diagnosticoSecundario,
    dados.auxilioDeambulacao,
    dados.terapiaIV,
    dados.marcha,
    dados.estadoMental,
    dados.pontuacaoMorse,
    dados.interpretacaoMorse,  // NOVO
    dados.responsavel
  ]);
}

    // Função envio Anotação de Técnico em Enfermagem
    function enviarAnotacao() {
      const form = document.getElementById("formAnotacao");
      const dados = Object.fromEntries(new FormData(form));

      google.script.run
        .withSuccessHandler(() => {
          document.getElementById("msgAnotacao").innerText = "Anotação de Enfermagem enviada!";
          document.getElementById("msgAnotacao").className = "success";
          form.reset();
        })
        .withFailureHandler(() => {
          document.getElementById("msgAnotacao").innerText = "Erro!";
          document.getElementById("msgAnotacao").className = "error";
        })
        .salvarDadosAnotacao(dados);
    }

    // Função envio Alta
    function enviarAlta() {
      const form = document.getElementById("formAlta");
      const dados = Object.fromEntries(new FormData(form));

      google.script.run
        .withSuccessHandler(() => {
          document.getElementById("msgAlta").innerText = "Encerramento do plano de cuidado!";
          document.getElementById("msgAlta").className = "success";
          form.reset();
        })
        .withFailureHandler(() => {
          document.getElementById("msgAlta").innerText = "Erro!";
          document.getElementById("msgAlta").className = "error";
        })
        .salvarDadosAlta(dados);
    }

    // Função envio Consulta de Enfermagem
    function enviarConsulta() {
      const form = document.getElementById("formConsulta");
      const dados = Object.fromEntries(new FormData(form));

      google.script.run
        .withSuccessHandler(() => {
          document.getElementById("msgConsulta").innerText = "Consulta de Enfermagem registrada!";
          document.getElementById("msgConsulta").className = "success";
          form.reset();
        })
        .withFailureHandler(() => {
          document.getElementById("msgConsulta").innerText = "Erro!";
          document.getElementById("msgConsulta").className = "error";
        })
        .salvarDadosConsulta(dados);
    }

    // Função envio Intercorrências Clínicas
    function enviarIntercorrencia() {
      const form = document.getElementById("formIntercorrencia");
      const dados = Object.fromEntries(new FormData(form));

      google.script.run
        .withSuccessHandler(() => {
          document.getElementById("msgIntercorrencia").innerText = "Intercorrência registrada!";
          document.getElementById("msgIntercorrencia").className = "success";
          form.reset();
        })
        .withFailureHandler(() => {
          document.getElementById("msgIntercorrencia").innerText = "Erro!";
          document.getElementById("msgIntercorrencia").className = "error";
        })
        .salvarDadosIntercorrencia(dados);
    }

function toggleOutroCategoria(select) {
const campoOutro = document.getElementById('campoOutroCategoria');
campoOutro.style.display = select.value === 'Outro' ? 'block' : 'none';
  }

function toggleNotificacaoDetalhada(select) {
const campo = document.getElementById('campoDetalheNotificacao');
campo.style.display = select.value === 'Sim' ? 'block' : 'none';
  }


    function calcularBraden() {
  const sensorial = parseInt(document.querySelector('[name="percepcaoSensorial"]').value) || 0;
  const umidade = parseInt(document.querySelector('[name="umidade"]').value) || 0;
  const atividade = parseInt(document.querySelector('[name="atividade"]').value) || 0;
  const mobilidade = parseInt(document.querySelector('[name="mobilidade"]').value) || 0;
  const nutricao = parseInt(document.querySelector('[name="nutricao"]').value) || 0;
  const friccao = parseInt(document.querySelector('[name="friccao"]').value) || 0;

  const total = sensorial + umidade + atividade + mobilidade + nutricao + friccao;
  document.getElementById('pontuacaoBraden').value = total;

  let interpretacao = "";
  if (total >= 19) {
    interpretacao = "Baixo Risco";
  } else if (total >= 15) {
    interpretacao = "Risco Moderado";
  } else if (total >= 13) {
    interpretacao = "Risco Alto";
  } else {
    interpretacao = "Risco Muito Alto";
  }

  // Exibe na tela
  document.getElementById('interpretacaoBraden').innerText = "Classificação: " + interpretacao;

  // Atualiza o campo oculto para salvar no formulário
  document.getElementById('interpretacaoBradenInput').value = interpretacao;
}

function calcularMorse() {
  const queda = parseInt(document.querySelector('[name="historicoQueda"]').value) || 0;
  const diagnostico = parseInt(document.querySelector('[name="diagnosticoSecundario"]').value) || 0;
  const auxilio = parseInt(document.querySelector('[name="auxilioDeambulacao"]').value) || 0;
  const terapia = parseInt(document.querySelector('[name="terapiaIV"]').value) || 0;
  const marcha = parseInt(document.querySelector('[name="marcha"]').value) || 0;
  const mental = parseInt(document.querySelector('[name="estadoMental"]').value) || 0;

  const total = queda + diagnostico + auxilio + terapia + marcha + mental;
  document.getElementById('pontuacaoMorse').value = total;

  let interpretacao = "";
  if (total >= 45) {
    interpretacao = "Alto Risco de Queda";
  } else if (total >= 25) {
    interpretacao = "Risco Moderado de Queda";
  } else {
    interpretacao = "Baixo Risco de Queda";
  }

  // Exibe na tela
  document.getElementById('interpretacaoMorse').innerText = "Classificação: " + interpretacao;

  // Atualiza o campo oculto para salvar no formulário
  document.getElementById('interpretacaoMorseInput').value = interpretacao;
}


// Função envio Cadastro de Cliente
    function enviarCadastro() {
      const form = document.getElementById("formCadastro");
      const dados = Object.fromEntries(new FormData(form));

      google.script.run
        .withSuccessHandler(() => {
          document.getElementById("msgCadastro").innerText = "Cadastro de cliente registrado!";
          document.getElementById("msgCadastro").className = "success";
          form.reset();
        })
        .withFailureHandler(() => {
          document.getElementById("msgCadastro").innerText = "Erro!";
          document.getElementById("msgCadastro").className = "error";
        })
        .salvarDadosCadastro(dados);
    }

function gerarIdentificador() {
  google.script.run
    .withSuccessHandler(function (idGerado) {
      document.getElementById('nomeId').value = idGerado;
    })
    .gerarIdUnico(); 
}

function gerarIdUnico() {
  const data = new Date();
  const timestamp = Utilities.formatDate(data, "GMT-3", "yyyyMMddHHmmss");
  return "PRON-" + timestamp;
}

function selecionarEquipe(botao) {
    // Desmarca todos
    document.querySelectorAll('.equipe-btn').forEach(btn => {
      btn.classList.remove('selecionado');
      btn.previousElementSibling.checked = false;
    });

    // Marca o clicado
    botao.classList.add('selecionado');
    botao.previousElementSibling.checked = true;
  }

const classesPorDominio = { "1": ["Conscientização para a saúde", "Gestão da saúde"],
	"2": ["Ingestão", "Digestão", "Absorção", "Metabolismo", "Hidratação"],
	"3": ["Função Urinária", "Função Gastrointestinal", "Função Tegumentar", "Função Respiratória"],
	"4": ["Sono/repouso", "Atividade", "Balança de energia", "Respostas cardiovasculares / pulmonares", "Autocuidado"],
	"5": ["Atenção", "Aula de orientação", "Sensação/percepção", "Cognição", "Comunicação"],
	"6": ["Autoconceito", "Aula de autoestima", "Imagem corporal"],
	"7": ["Função de cuidado", "Relações familiares", "Desempenho da função"],
	"8": ["Identidade sexual", "Função sexual", "Classe de reprodução"],
	"9": ["Respostas pós-traumáticas", "Respostas de Enfrentamento", "Estresse neurocomportamental"],
	"10": ["Valores", "Classe de crença", "Congruência de valor/crença/ação"],
	"11": ["Infecção", "Lesão física", "Violência", "Riscos ambientais", "Processos defensivos", "Termoregulação"],
	"12": ["Conforto físico", "Conforto ambiental", "Conforto social"],
	"13": ["Classe de crescimento", "Classe de desenvolvimento"],
 };
const diagnosticosPorClasse = { "Conscientização para a saúde": ["Diminuição do envolvimento de atividades diversivas", "Prontidão para melhorar a alfabetização em saúde", "Estilo de vida sedentário"],
  "Gestão da saúde": ["Risco de tentativa de fuga", "Síndrome do idoso frágil", "Risco para síndrome de idoso frágil", "Prontidão para engajamento de exercício aprimorado", "Saúde comunitária deficiente", "Comportamento de saúde sujeito a risco", "Comportamentos de manutenção eficaz da saúde", "Autogestão eficaz da saúde", "Prontidão para autogestão aprimorada da saúde", "Autogestão eficaz da saúde da família", "Comportamentos ineficazes de manutenção doméstica", "Risco de comportamentos ineficazes de manutenção doméstica", "Prontidão para manutenção doméstica aprimorada comportamentos", "Proteção ineficaz"],

  "Ingestão": ["Nutrição desequilibrada: menos do que os requisitos corporais", "Prontidão para nutrição aprimorada", "Produção insuficiente de leite materno", "Amamentação ineficaz", "Amamentação interrompida", "Prontidão para amamentação aprimorada", "Dinâmica alimentar ineficaz de adolescentes", "Dinâmica alimentar infantil ineficaz", "Dinâmica de alimentação infantil ineficaz", "Obesidade", "Excesso de peso", "Risco de excesso de peso", "Resposta ineficaz de sucção e deglutição do bebê", "Deglutição prejudicada"],
  "Digestão": ["A classe não possui diagnósticos"],
  "Absorção": ["A classe não possui diagnósticos"],
  "Metabolismo": ["Risco de nível de glicose no sangue instável", "Hiperbilirrubinemia neonatal", "Risco de hiperbilirrubinemia neonatal", "Risco de insuficiência hepática", "Risco para síndrome metabólica"],
  "Hidratação": ["Risco de desequilíbrio eletrolítico", "Risco de volume de fluido desequilibrado", "Volume de fluido deficiente", "Risco de volume de fluido deficiente", "Excesso de volume de fluido"],

  "Função Urinária": ["Incontinência urinária associada a deficiência", "Eliminação urinária prejudicada", "Incontinência urinária mista", "Incontinência urinária de esforço", "Incontinência urinária de urgência", "Risco de incontinência urinária de urgência", "Retenção urinária", "Risco de retenção urinária"],
  "Função Gastrointestinal": ["Constipação", "Risco de constipação", "Constipação percebida", "Constipação funcional crônica", "Risco de constipação funcional crônica", "Continência intestinal prejudicada", "Diarreia", "Motilidade gastrointestinal disfuncional", "Risco de motilidade gastrointestinal disfuncional"],
  "Função Tegumentar": ["A classe não possui diagnósticos"],
  "Função Respiratória": ["Troca de gases prejudicada"],

  "Sono/repouso": ["Insônia", "Privação de sono", "Prontidão para sono melhor", "Padrão de sono perturbado"],
  "Atividade": ["Tolerância de atividade diminuída","Risco de diminuição da tolerância à atividade", "Risco de síndrome de desuso", "Mobilidade na cama prejudicada", "Mobilidade física prejudicada", "Mobilidade em cadeira de rodas prejudicada", "Sessão prejudicada", "Posição prejudicada", "Capacidade de transferência prejudicada", "Caminhada prejudicada"],
  "Balança de energia":["Campo de energia desequilibrado", "Fadiga", "Errante"],
  "Respostas cardiovasculares / pulmonares": ["Padrão de respiração ineficaz", "Diminuição do débito cardíaco", "Risco de diminuição do débito cardíaco", "Risco de função cardiovascular prejudicada", "Autogestão de linfedema ineficaz", "Risco de autogerenciamento de linfedema ineficaz", "Ventilação espontânea prejudicada", "Risco de pressão arterial instável", "Risco de trombose", "Risco de diminuição da perfusão do tecido cardíaco", "Risco de perfusão de tecido cerebral ineficaz", "Perfusão tecidual periférica ineficaz", "Risco de perfusão tecidual periférica ineficaz", "Resposta disfuncional ao desmame ventilatório", "Resposta disfuncional ao desmame ventilatório de adulto"],
  "Autocuidado": ["Déficit de autocuidado no banho", "Déficit de autocuidado de vestir", "Déficit de autocuidado alimentar", "Déficit de autocuidado sanitário", "Prontidão para autocuidado aprimorado", "Abandono"],

  "Atenção": ["Negligência unilateral"],
  "Aula de orientação": ["A classe não possui diagnósticos"],
  "Sensação/percepção": ["A classe não possui diagnósticos"],
  "Cognição": ["Confusão aguda", "Risco de confusão aguda", "Confusão crônica", "Controle emocional instável", "Controle de impulso ineficaz", "Conhecimento deficiente", "Prontidão para conhecimento aprimorado", "Memória prejudicada", "Processo de pensamento perturbado"],
  "Comunicação": ["Prontidão para comunicação aprimorada", "Comunicação verbal prejudicada"],

  "Autoconceito": ["Desesperança", "Prontidão para esperança aumentada", "Risco de comprometimento da dignidade humana", "Identidade pessoal perturbada", "Risco de identidade pessoal perturbada", "Prontidão para autoconceito aprimorado "],
  "Aula de autoestima": ["Baixa autoestima crônica", "Risco de baixa autoestima crônica", "Baixa autoestima situacional", "Risco de baixa autoestima situacional"],
  "Imagem corporal": ["Imagem corporal perturbada"],

  "Função de cuidado": ["Paternidade prejudicada", "Risco para paternidade prejudicada", "Prontidão para paternidade aprimorada", "Cepa de função de cuidador", "Risco para tensão de função de cuidador"],
  "Relações familiares": ["Risco para anexo prejudicado", "Síndrome de identidade familiar perturbada", "Risco para síndrome de identidade familiar perturbada", "Processos familiares disfuncionais", "Processos familiares interrompidos", "Prontidão para processos familiares aprimorados"],
  "Desempenho da função": ["Relacionamento ineficaz", "Risco de relacionamento ineficaz", "Prontidão para relacionamento aprimorado", "Conflito de papel parental", "Desempenho de função ineficaz", "Interação social prejudicada"],

  "Identidade sexual": ["A classe não possui diagnósticos"],
  "Função sexual": ["Disfunção sexual", "Padrão de sexualidade ineficaz"],
  "Classe de reprodução": ["Processo de procriação ineficaz", "Risco de processo de procriação ineficaz", "Prontidão para um processo reprodutivo aprimorado", "Risco de díade materno-fetal perturbada"],

  "Respostas pós-traumáticas": ["Risco de transição de imigração complicada", "Síndrome pós-trauma", "Risco para síndrome pós-trauma", "Síndrome de estupro-trauma", "Síndrome de estresse de realocação", "Risco para síndrome de estresse de realocação"],
  "Respostas de Enfrentamento": ["Planejamento de atividades ineficazes", "Risco de planejamento ineficaz de atividades", "Ansiedade", "Coping defensivo", "Enfrentamento ineficaz", "Prontidão para enfrentamento aprimorado", "Enfrentamento ineficaz da comunidade", "Prontidão para lidar melhor com a comunidade", "Enfrentamento familiar comprometido", "Enfrentamento familiar com deficiência", "Prontidão para enfrentamento familiar aprimorado", "Ansiedade da morte", "Negação ineficaz", "Temer", "Luto desadaptativo", "Risco de luto não adaptativo", "Prontidão para luto intensificado", "Regulação do humor prejudicada", "Impotência", "Risco de impotência", "Prontidão para maior potência", "Resiliência prejudicada", "Risco de resiliência prejudicada", "Prontidão para maior resiliência", "Tristeza crônica", "Sobrecarga de estresse"],
  "Estresse neurocomportamental": ["Síndrome de abstinência aguda de substância", "Risco de síndrome de abstinência aguda de substância", "Disreflexia autonômica", "Risco de disreflexia autonômica", "Síndrome de abstinência neonatal", "Comportamento infantil desorganizado", "Risco de comportamento infantil desorganizado", "Prontidão para um comportamento infantil organizado aprimorado"],

  "Valores": ["A classe não possui diagnósticos"],
  "Classe de crença": ["Prontidão para um bem-estar espiritual aprimorado"],
  "Congruência de valor/crença/ação": ["Prontidão para tomada de decisão aprimorada", "Conflito de decisão", "Tomada de decisão emancipada prejudicada", "Risco para tomada de decisão emancipada prejudicada", "Prontidão para tomada de decisão emancipada aprimorada", "Angústia moral", "Religiosidade prejudicada", "Risco de religiosidade prejudicada", "Prontidão para religiosidade aprimorada", "Angústia espiritual", "Risco de angústia espiritual"],

  "Infecção": ["Risco de infecção", "Risco de infecção de sítio cirúrgico"],
  "Lesão física": ["Desobstrução ineficaz das vias aéreas", "Risco de aspiração", "Risco de sangramento", "Dentição prejudicada", "Risco de olho seco", "Autogestão ineficaz de olho seco", "Risco de boca seca", "Risco de quedas em adultos", "Risco de queda de criança", "Risco de lesão", "Risco de lesão da córnea", "Lesão do complexo areolopapilar", "Risco de lesão do complexo areolopapilar", "Risco de lesão do trato urinário", "Risco de lesão de posicionamento perioperatória", "Risco de lesão térmica", "Integridade da membrana mucosa oral prejudicada", "Risco de integridade da membrana mucosa oral prejudicada", "Risco de disfunção neurovascular periférica", "Risco de trauma físico", "Risco de trauma vascular", "Lesão de pressão em adulto", "Risco de lesão por pressão em adulto", "Lesão infantil por pressão", "Risco de lesão por pressão infantil", "Lesão por pressão neonatal", "Risco de lesão por pressão neonatal", "Risco de choque", "Integridade da pele prejudicada", "Risco de integridade da pele prejudicada", "Risco de morte súbita infantil", "Risco de sufocação", "Recuperação cirúrgica retardada", "Risco de recuperação cirúrgica retardada", "Integridade do tecido prejudicada", "Risco de integridade do tecido prejudicada"],
  "Violência": ["Risco de mutilação genital feminina", "Risco de violência dirigida por outros", "Risco de violência autodirigida", "Auto-mutilação", "Risco de automutilação", "Risco de comportamento suicida"],
  "Riscos ambientais": ["Contaminação", "Risco de contaminação", "Risco de lesão ocupacional", "Risco de envenenamento"],
  "Processos defensivos": ["Risco de reação adversa ao meio de contraste iodado", "Risco de reação alérgica", "Risco de reação alérgica ao látex"],
  "Termoregulação": ["Hipertermia", "Hipotermia", "Risco de hipotermia", "Hipotermia neonatal", "Risco de hipotermia neonatal", "Risco de hipotermia perioperatória", "Termorregulação ineficaz", "Risco de termorregulação ineficaz"],

  "Conforto físico": ["Conforto prejudicado", "Prontidão para maior conforto", "Náusea", "Dor aguda", "Dor crônica", "Síndrome de dor crônica", "Dor de parto"],
  "Conforto ambiental": ["Conforto prejudicado", "Prontidão para maior conforto"],
  "Conforto social": ["Conforto prejudicado", "Prontidão para maior conforto", "Risco de solidão", "Isolamento social"],

  "Classe de crescimento": ["A classe não possui diagnósticos"],
  "Classe de desenvolvimento": ["Desenvolvimento infantil retardado", "Risco de atraso no desenvolvimento infantil", "Atraso no desenvolvimento motor infantil", "Risco de atraso no desenvolvimento motor infantil"],
 };

function atualizarClasses() {
  const dominio = document.getElementById("dominioSelect").value;
  const classeSelect = document.getElementById("classeSelect");
  classeSelect.innerHTML = '<option value="" disabled selected>Selecione...</option>';

  if (classesPorDominio[dominio]) {
    classesPorDominio[dominio].forEach(classe => {
      const opt = document.createElement("option");
      opt.value = classe;
      opt.textContent = classe;
      classeSelect.appendChild(opt);
    });
    document.getElementById("classeBox").style.display = "block";
  }
}

const listaDiagnosticos = [];

function adicionarDiagnostico() {
  const diagnostico = document.getElementById("diagnosticoSelect").value;
  if (!diagnostico) return alert("Selecione um diagnóstico.");

  // Verifica se já foi adicionado
  const jaExiste = listaDiagnosticos.find(item => item.diagnostico === diagnostico);
  if (jaExiste) return alert("Este diagnóstico já foi adicionado.");

  const index = listaDiagnosticos.length;
  const idUnico = `diag-${Date.now()}-${index}`; // id único por segurança

  listaDiagnosticos.push({
    id: idUnico,
    diagnostico,
    prescricao: "",
    intervencao: ""
  });

  const container = document.getElementById("listaDiagnosticos");
  const box = document.createElement("div");
  box.className = "diagnostico-item";
  box.id = idUnico;
  box.innerHTML = `
    <p><strong>🩺 Diagnóstico:</strong> ${diagnostico}</p>
    <label>📋 Prescrição de Enfermagem:</label>
    <textarea rows="2" placeholder="Ex: Realizar curativo..." onchange="atualizarPrescricao('${idUnico}', this.value)"></textarea>
    <label>🛠️ Intervenções de Enfermagem:</label>
    <textarea rows="2" placeholder="Ex: Avaliar ferida diariamente..." onchange="atualizarIntervencao('${idUnico}', this.value)"></textarea>
    <button type="button" onclick="removerDiagnostico('${idUnico}')">❌ Remover</button>
    <hr>
  `;
  container.appendChild(box);
  document.getElementById("diagnosticosSalvosBox").style.display = "block";
}

function atualizarPrescricao(id, valor) {
  const item = listaDiagnosticos.find(el => el.id === id);
  if (item) item.prescricao = valor;
}

function atualizarIntervencao(id, valor) {
  const item = listaDiagnosticos.find(el => el.id === id);
  if (item) item.intervencao = valor;
}

function removerDiagnostico(id) {
  // Remove da lista
  const index = listaDiagnosticos.findIndex(el => el.id === id);
  if (index !== -1) listaDiagnosticos.splice(index, 1);

  // Remove do DOM
  const elemento = document.getElementById(id);
  if (elemento) elemento.remove();

  // Esconde o quadro se não houver mais nada
  if (listaDiagnosticos.length === 0) {
    document.getElementById("diagnosticosSalvosBox").style.display = "none";
  }
}

function enviarDiagnosticos() {
  const form = document.getElementById("formDiagnostico");
  const dadosForm = new FormData(form);

  const data = dadosForm.get("data");
  const nomePaciente = dadosForm.get("nomePaciente");
  const nomeId = dadosForm.get("nomeId");
  const responsavel = document.getElementById("responsavelDiagnostico").value;

  if (!responsavel) return alert("Informe o nome do responsável.");
  if (listaDiagnosticos.length === 0) return alert("Adicione ao menos um diagnóstico.");

  const dados = {
    data,
    nomePaciente,
    nomeId,
    responsavel,
    diagnosticos: listaDiagnosticos
  };

  google.script.run
    .withSuccessHandler(() => {
      document.getElementById("msgDiagnostico").textContent = "Diagnósticos enviados com sucesso!";
      document.getElementById("msgDiagnostico").className = "success";
      form.reset();
      listaDiagnosticos.length = 0;
      document.getElementById("listaDiagnosticos").innerHTML = "";
      document.getElementById("diagnosticosSalvosBox").style.display = "none";
    })
    .withFailureHandler(() => {
      document.getElementById("msgDiagnostico").textContent = "Erro ao enviar.";
      document.getElementById("msgDiagnostico").className = "error";
    })
    .salvarDadosDiagnosticos(dados);
}

function atualizarTitulos() {
  const classe = document.getElementById("classeSelect").value;
  console.log("Classe selecionada:", classe); // ← VERIFICAÇÃO

  const diagnosticoSelect = document.getElementById("diagnosticoSelect");
  diagnosticoSelect.innerHTML = '<option value="" disabled selected>Selecione...</option>';

  if (diagnosticosPorClasse[classe]) {
    diagnosticosPorClasse[classe].forEach(diagnostico => {
      const opt = document.createElement("option");
      opt.value = diagnostico;
      opt.textContent = diagnostico;
      diagnosticoSelect.appendChild(opt);
    });
    document.getElementById("diagnosticoBox").style.display = "block";
  } else {
    console.log("❌ Classe não encontrada no objeto diagnosticosPorClasse");
  }
}

// Carregar Domínios ao iniciar a página
function carregarDominios() {
  const dominioSelect = document.getElementById("dominioSelect");
  dominioSelect.innerHTML = '<option value="" disabled selected>Selecione...</option>';
  
  for (let id in classesPorDominio) {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = getNomeDominioPorId(id);
    dominioSelect.appendChild(opt);
  }
}

// Mapeia os nomes dos Domínios conforme os valores usados no select original
function getNomeDominioPorId(id) {
  const nomes = {
    "1": "Promoção da Saúde",
    "2": "Nutrição",
    "3": "Eliminação e Troca",
    "4": "Atividade/Repouso",
    "5": "Percepção/Cognição",
    "6": "Autopercepção",
    "7": "Relação de função",
    "8": "Sexualidade",
    "9": "Enfrentamento/Tolerância ao estresse",
    "10": "Princípios de vida",
    "11": "Segurança/proteção",
    "12": "Conforto",
    "13": "Crescimento/desenvolvimento"
  };
  return nomes[id] || `Domínio ${id}`;
}

// Chamada no carregamento da página
window.onload = carregarDominios;


 //Preenche a lista suspensa ao abrir o card
 function carregarPacientesAdmissao() {
  const select = document.getElementById("listaPacientes");
 select.innerHTML = '<option value="">Selecione...</option>';

 pacientes.forEach(p => {
   const option = document.createElement("option");
    option.value = p.nomeId;
   option.textContent = p.nomePaciente;
   select.appendChild(option);
  });
 }

let pacientes = [
  { nomePaciente: "Benedita Souza Pereira", nomeId: "75514", dataNascimento: "1942-03-12", sexo: "Feminino", equipe: "Equipe Florence", status: "Ativo" },
  { nomePaciente: "Carlos Henrique Lima", nomeId: "82059", dataNascimento: "1987-06-25", sexo: "Masculino", equipe: "Equipe Horta", status: "Ativo" },
  { nomePaciente: "Ana Luísa Fernandes Batista", nomeId: "82553", dataNascimento: "2018-11-14", sexo: "Feminino", equipe: "Equipe Peplau", status: "Ativo" },
  { nomePaciente: "João Batista de Moura", nomeId: "82816", dataNascimento: "1958-01-07", sexo: "Masculino", equipe: "Equpe Nery", status: "Ativo" },
  { nomePaciente: "Hélio César Miranda Lopes", nomeId: "55317", dataNascimento: "1965-09-28", sexo: "Masculino", equipe: "Equipe Florence", status: "Ativo" },
  { nomePaciente: "Lourdes Ferreira da Costa", nomeId: "97091", dataNascimento: "1936-04-03", sexo: "Feminino", equipe: "Equipe Horta", status: "Ativo" },
  { nomePaciente: "Rafael Teixeira Gomes", nomeId: "48569", dataNascimento: "2008-05-18", sexo: "Masculino", equipe: "Equipe Peplau", status: "Ativo" },
  { nomePaciente: "Sebastião Alves de Andrade", nomeId: "12213", dataNascimento: "1947-02-01", sexo: "Masculino", equipe: "Equpe Nery", status: "Ativo" },
  { nomePaciente: "Antônio Carlos Vieira Lopes", nomeId: "53430", dataNascimento: "1955-12-19", sexo: "Masculino", equipe: "Equipe Florence", status: "Ativo" },
  { nomePaciente: "Maria José da Conceição", nomeId: "23148", dataNascimento: "1949-10-22", sexo: "Feminino", equipe: "Equipe Horta", status: "Ativo" },
  { nomePaciente: "Geraldo José Pacheco", nomeId: "23149", dataNascimento: "1943-03-15", sexo: "Masculino", equipe: "Equipe Peplau", status: "Ativo" },
  { nomePaciente: "Neusa Almeida Figueiredo", nomeId: "20024", dataNascimento: "1940-07-10", sexo: "Feminino", equipe: "Equpe Nery", status: "Ativo" },
  { nomePaciente: "Bruno César Fernandes", nomeId: "39970", dataNascimento: "1994-09-23", sexo: "Masculino", equipe: "Equipe Florence", status: "Ativo" },
  { nomePaciente: "Sebastiana Nogueira Ramos", nomeId: "39920", dataNascimento: "1933-01-29", sexo: "Feminino", equipe: "Equipe Horta", status: "Ativo" },
  { nomePaciente: "Isadora Lima de Assis", nomeId: "45688", dataNascimento: "2015-10-30", sexo: "Feminino", equipe: "Equipe Peplau", status: "Ativo" },
  { nomePaciente: "Adriana Pereira dos Santos", nomeId: "73157", dataNascimento: "1973-11-05", sexo: "Feminino", equipe: "Equpe Nery", status: "Ativo" },
  { nomePaciente: "Domingos Ribeiro de Souza", nomeId: "54665", dataNascimento: "1950-08-17", sexo: "Masculino", equipe: "Equipe Florence", status: "Ativo" },
  { nomePaciente: "Carolina Nunes Ferreira", nomeId: "81038", dataNascimento: "1989-04-09", sexo: "Feminino", equipe: "Equipe Horta", status: "Ativo" },
  { nomePaciente: "Alcides Oliveira Ramos", nomeId: "92105", dataNascimento: "1945-02-02", sexo: "Masculino", equipe: "Equipe Peplau", status: "Ativo" },
  { nomePaciente: "Rosa Maria Tavares Lima", nomeId: "71150", dataNascimento: "1956-05-12", sexo: "Feminino", equipe: "Equpe Nery", status: "Ativo" },
  { nomePaciente: "Rosa Maria Tavares Lima", nomeId: "71150", dataNascimento: "1956-05-12", sexo: "Feminino", equipe: "Equpe Nery" },
{ nomePaciente: "José Alberto de Lima", nomeId: "10457", dataNascimento: "1994-01-10", sexo: "Feminino", equipe: "Equipe Nery" },
{ nomePaciente: "Maria Clara Sanches", nomeId: "23984", dataNascimento: "2005-11-02", sexo: "Feminino", equipe: "Equipe Horta" },
{ nomePaciente: "Luana Beatriz Rocha", nomeId: "34712", dataNascimento: "1986-01-23", sexo: "Masculino", equipe: "Equipe Horta" },
{ nomePaciente: "Pedro Henrique Soares", nomeId: "45896", dataNascimento: "1950-03-24", sexo: "Masculino", equipe: "Equipe Florence" },
{ nomePaciente: "Joana Ribeiro da Costa", nomeId: "56231", dataNascimento: "2011-03-09", sexo: "Feminino", equipe: "Equipe Florence" },
{ nomePaciente: "Carlos Eduardo Neves", nomeId: "67320", dataNascimento: "2017-01-24", sexo: "Feminino", equipe: "Equipe Horta" },
{ nomePaciente: "Aline Ferreira Dutra", nomeId: "78154", dataNascimento: "1956-07-22", sexo: "Masculino", equipe: "Equipe Peplau" },
{ nomePaciente: "Mateus Oliveira Silva", nomeId: "89631", dataNascimento: "1959-12-19", sexo: "Masculino", equipe: "Equipe Florence" },
{ nomePaciente: "Sônia Maria Fernandes", nomeId: "90528", dataNascimento: "2014-06-13", sexo: "Masculino", equipe: "Equipe Florence" },
{ nomePaciente: "Gustavo Lima Bastos", nomeId: "31467", dataNascimento: "1978-05-19", sexo: "Feminino", equipe: "Equipe Horta" },
{ nomePaciente: "Antônio José de Almeida", nomeId: "42689", dataNascimento: "1977-11-14", sexo: "Masculino", equipe: "Equipe Nery" },
{ nomePaciente: "Rosângela Maria da Luz", nomeId: "53701", dataNascimento: "1958-05-23", sexo: "Masculino", equipe: "Equipe Florence" },
{ nomePaciente: "João Pedro Lima Marques", nomeId: "64938", dataNascimento: "1958-12-05", sexo: "Feminino", equipe: "Equipe Peplau" },
{ nomePaciente: "Ana Beatriz Ferreira", nomeId: "75210", dataNascimento: "1981-04-03", sexo: "Feminino", equipe: "Equipe Nery" },
{ nomePaciente: "Carlos Henrique Faria", nomeId: "84329", dataNascimento: "1992-12-07", sexo: "Masculino", equipe: "Equipe Peplau" },
{ nomePaciente: "Gabriela Duarte dos Santos", nomeId: "91672", dataNascimento: "1959-10-26", sexo: "Masculino", equipe: "Equipe Nery" },
{ nomePaciente: "Valdir Aparecido Silva", nomeId: "28790", dataNascimento: "2006-01-19", sexo: "Masculino", equipe: "Equipe Nery" },
{ nomePaciente: "Marta Helena Cunha", nomeId: "36142", dataNascimento: "1944-07-30", sexo: "Feminino", equipe: "Equipe Florence" },
{ nomePaciente: "Fábio Leandro Rocha", nomeId: "47850", dataNascimento: "2004-12-08", sexo: "Masculino", equipe: "Equipe Nery" },
{ nomePaciente: "Camila Torres de Melo", nomeId: "58921", dataNascimento: "1984-08-20", sexo: "Feminino", equipe: "Equipe Nery" },
{ nomePaciente: "Rafael Augusto Paiva", nomeId: "69347", dataNascimento: "1944-04-12", sexo: "Masculino", equipe: "Equipe Horta" },
{ nomePaciente: "Helena Cristina Braga", nomeId: "70415", dataNascimento: "1972-02-22", sexo: "Masculino", equipe: "Equipe Peplau" },
{ nomePaciente: "Luiz Fernando Camargo", nomeId: "81596", dataNascimento: "1957-08-16", sexo: "Masculino", equipe: "Equipe Horta" },
{ nomePaciente: "Sílvia Regina Pires", nomeId: "92180", dataNascimento: "1944-08-08", sexo: "Feminino", equipe: "Equipe Horta" },
{ nomePaciente: "Eduardo Tavares Filho", nomeId: "63841", dataNascimento: "1952-09-10", sexo: "Feminino", equipe: "Equipe Florence" },
{ nomePaciente: "Lívia Moura Batista", nomeId: "50783", dataNascimento: "1968-11-11", sexo: "Feminino", equipe: "Equipe Florence" },
{ nomePaciente: "Ricardo Lima da Rocha", nomeId: "43892", dataNascimento: "2006-11-06", sexo: "Masculino", equipe: "Equipe Peplau" },
{ nomePaciente: "Tatiane Ribeiro Lopes", nomeId: "39486", dataNascimento: "1969-10-13", sexo: "Feminino", equipe: "Equipe Peplau" },
{ nomePaciente: "Bruno César Andrade", nomeId: "14237", dataNascimento: "1983-10-13", sexo: "Masculino", equipe: "Equipe Horta" },
{ nomePaciente: "Débora Nunes Ferreira", nomeId: "26830", dataNascimento: "1952-11-07", sexo: "Feminino", equipe: "Equipe Peplau" }
];

  // Preenche os campos ao selecionar um paciente
  function preencherCamposAdmissao() {
    const select = document.getElementById("listaPacientes");
    const valorSelecionado = select.value;
    const pacienteSelecionado = pacientes.find(p => p.nomeId === valorSelecionado);

    if (pacienteSelecionado) {
     // Exibição
document.getElementById("exibeNomeId").value = pacienteSelecionado.nomeId;
document.getElementById("exibeDataNascimento").value = pacienteSelecionado.dataNascimento;
document.getElementById("exibeSexo").value = pacienteSelecionado.sexo;
document.getElementById("exibeEquipe").value = pacienteSelecionado.equipe;

// Envio
document.getElementById("campoNomeIdAdmissao").value = pacienteSelecionado.nomeId;
document.getElementById("campoNomePaciente").value = pacienteSelecionado.nomePaciente;
document.getElementById("campoNascimento").value = pacienteSelecionado.dataNascimento;
document.getElementById("campoSexo").value = pacienteSelecionado.sexo;
document.getElementById("campoEquipe").value = pacienteSelecionado.equipe;


      document.getElementById("dadosPacienteAdmissao").style.display = "block";
    } else {
      document.getElementById("dadosPacienteAdmissao").style.display = "none";
    }
  }

// Chamada ao abrir um card específico
function abrirCard(idCard) {
  // Oculta todos os cards
  document.querySelectorAll('.card').forEach(card => card.style.display = 'none');

  // Exibe o card selecionado
  const cardSelecionado = document.getElementById(idCard);
  if (cardSelecionado) {
    cardSelecionado.style.display = 'block';

    // Se for o card de Admissão, carrega a lista de pacientes
    if (idCard === 'admissaoCard') {
      carregarPacientesAdmissao();
    }
  }
}

function preencherCamposPaciente(selectElement) {
  const nomeIdSelecionado = selectElement.value;
  const paciente = pacientes.find(p => p.nomeId === nomeIdSelecionado);
  const form = selectElement.closest("form");

  if (paciente) {
    form.querySelector(".campoNomeId").value = paciente.nomeId;
    form.querySelector(".campoNomePaciente").value = paciente.nomePaciente;
    form.querySelector(".campoNascimento").value = paciente.dataNascimento;
    form.querySelector(".campoSexo").value = paciente.sexo;
    form.querySelector(".campoEquipe").value = paciente.equipe;

    form.querySelector(".exibeNomeId").value = paciente.nomeId;
    form.querySelector(".exibeDataNascimento").value = paciente.dataNascimento;
    form.querySelector(".exibeSexo").value = paciente.sexo;
    form.querySelector(".exibeEquipe").value = paciente.equipe;

    form.querySelector(".dadosPaciente").style.display = "block";
  } else {
    form.querySelector(".dadosPaciente").style.display = "none";
  }
}

function formatarData(data) {
  const d = new Date(data);
  if (isNaN(d)) return data;
  return d.toLocaleDateString('pt-BR');
}

function carregarBotoesPacientes() {
  const container = document.getElementById("botoesPacientes");
  container.innerHTML = '';

  const equipes = {};
  pacientes.forEach(p => {
    if (!equipes[p.equipe]) equipes[p.equipe] = [];
    equipes[p.equipe].push(p);
  });

  for (const equipe in equipes) {
    const titulo = document.createElement("h3");
    titulo.textContent = equipe;
    container.appendChild(titulo);

    const grupo = document.createElement("div");
    grupo.className = "grupo-botoes";

    equipes[equipe].forEach(p => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = p.nomePaciente;
      btn.onclick = () => selecionarPaciente(p);
      grupo.appendChild(btn);
    });

    container.appendChild(grupo);
  }
}

function formatarDataExcelParaISO(serialExcel) {
  // Convertendo número serial do Excel para data no formato YYYY-MM-DD
  const baseDate = new Date(1899, 11, 30); // base para o Excel
  baseDate.setDate(baseDate.getDate() + parseInt(serialExcel));
  return baseDate.toISOString().split('T')[0]; // Retorna "YYYY-MM-DD"
}

function carregarPacientesNoSelect(selectId, campos) {
  const select = document.getElementById(selectId);
  select.innerHTML = `<option value="">-- Selecione um paciente --</option>`; // Garante que não repete opções

  pacientes.forEach((paciente, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${paciente.nomePaciente} - ${paciente.nomeId} - ${paciente.equipe}`;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const selectedIndex = select.value;
    if (selectedIndex !== "") {
      const paciente = pacientes[selectedIndex];
      const nascimentoFormatado = formatarDataExcelParaISO(paciente.dataNascimento);

      // Preenche os campos definidos no objeto "campos"
      document.getElementById(campos.nomeId).value = paciente.nomeId;
      document.getElementById(campos.nome).value = paciente.nomePaciente;
      document.getElementById(campos.nascimento).value = nascimentoFormatado;

      // Se houver campos visíveis
      if (campos.exibeNome) document.getElementById(campos.exibeNome).value = paciente.nomePaciente;
      if (campos.exibeId) document.getElementById(campos.exibeId).value = paciente.nomeId;
      if (campos.exibeNascimento) document.getElementById(campos.exibeNascimento).value = nascimentoFormatado;

      document.getElementById(campos.divConfirmacao).style.display = "block";
    } else {
      document.getElementById(campos.divConfirmacao).style.display = "none";
    }
  });
}

carregarPacientesNoSelect("selectPaciente", {
  nomeId: "campoNomeIdAnotacao",
  nome: "campoNomePaciente",
  nascimento: "campoNascimento",
  exibeNome: "exibeNomePaciente",
  exibeId: "exibeNomeId",
  exibeNascimento: "exibeDataNascimento",
  divConfirmacao: "dadosPacienteAnotacao"
});

carregarPacientesNoSelect("selectPacienteConsulta", {
  nomeId: "campoNomeIdConsulta",
  nome: "campoNomePacienteConsulta",
  nascimento: "campoNascimentoConsulta",
  exibeNome: "exibeNomePacienteConsulta",
  exibeId: "exibeNomeIdConsulta",
  exibeNascimento: "exibeDataNascimentoConsulta",
  divConfirmacao: "dadosPacienteConsulta"
});

carregarPacientesNoSelect("selectPacienteDiagnostico", {
  nomeId: "campoNomeIdDiagnostico",
  nome: "campoNomePacienteDiagnostico",
  nascimento: "campoNascimentoDiagnostico",
  exibeNome: "exibeNomePacienteDiagnostico",
  exibeId: "exibeNomeIdDiagnostico", // você pode exibir mais se quiser
  exibeNascimento: "exibeDataNascimentoDiagnostico",
  divConfirmacao: "dadosPacienteDiagnostico"
});

carregarPacientesNoSelect("selectPacienteAlta", {
  nomeId: "campoNomeIdAlta",
  nome: "campoNomePacienteAlta",
  nascimento: "campoNascimentoAlta",
  exibeNome: "exibeNomePacienteAlta",
  exibeId: "exibeNomeIdAlta", //
  exibeNascimento: "exibeDataNascimentoAlta",
  divConfirmacao: "dadosPacienteAlta"
});

carregarPacientesNoSelect("selectPacienteIntercorrencia", {
  nomeId: "campoNomeIdIntercorrencia",
  nome: "campoNomePacienteIntercorrencia",
  nascimento: "campoNascimentoIntercorrencia",
  exibeNome: "exibeNomePacienteIntercorrencia",
  exibeId: "exibeNomeIdIntercorrencia", //
  exibeNascimento: "exibeDataNascimentoIntercorrencia",
  divConfirmacao: "dadosPacienteIntercorrencia"
});

const scriptURL = "https://script.google.com/macros/s/AKfycbxXJqNgb9sa00i4uAZpBwGW0kGoOqZlE8Ej6nw0oiEDzXQoaX3xPNNE7H5nm0ROiwT4yA/exec";

// Função genérica de envio
function handleFormSubmit(formId, aba) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("aba", aba); // nome da aba como parâmetro extra

    fetch(scriptURL, {
      method: "POST",
      body: formData
    })
      .then(response => {
        if (response.ok) {
          showMessage("Dados enviados com sucesso!", "success");
          form.reset();
        } else {
          throw new Error("Erro na resposta do servidor");
        }
      })
      .catch(error => {
        console.error("Erro:", error);
        showMessage("Erro ao enviar os dados. Tente novamente.", "error");
      });
  });
}

// Função para mostrar mensagem visual
function showMessage(text, type) {
  const message = document.createElement("div");
  message.textContent = text;
  message.className = `alert ${type}`;
  document.body.appendChild(message);
  setTimeout(() => {
    message.remove();
  }, 4000);
}

// Aplica a função a todos os formulários
document.addEventListener("DOMContentLoaded", function () {
  handleFormSubmit("formCadastro", "CADASTRO");
  handleFormSubmit("formAdmissao", "ADMISSAO");
  handleFormSubmit("formAnotacao", "ANOTACAO");
  handleFormSubmit("formConsulta", "CONSULTA");
  handleFormSubmit("formDiagnostico", "DIAGNOSTICO");
  handleFormSubmit("formIntercorrencia", "INTERCORRENCIA");
  handleFormSubmit("formAlta", "ALTA");
});

