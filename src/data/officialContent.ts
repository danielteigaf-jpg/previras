import {
  HandHygieneStep,
  FiveMoment,
  ClinicalScenario,
  GloveStatement,
  SimulationObject,
  RiskSituation,
  QuizQuestion,
  RiskHotspot,
  TransmissionChainLink,
  PatientChallenge,
} from '../types/previras';

export const HAND_HYGIENE_STEPS: HandHygieneStep[] = [
  {
    id: 1,
    title: '1. Palma com palma',
    subtitle: 'Fricção das palmas das mãos',
    description: 'Aplique preparação alcoólica suficiente para cobrir todas as superfícies das mãos ou, na higiene com água e sabonete, aplique sabonete líquido/espuma. Friccione as palmas das mãos entre si.',
    recommendation: 'Garante a distribuição homogênea do antisséptico na maior área de contato inicial.',
    durationAlcohol: '20 a 30 segundos no total',
    durationSoap: '40 a 60 segundos no total',
    highlightZone: 'palms',
    officialReference: 'Anvisa (2026): Segurança do Paciente em Serviços de Saúde — Higiene das Mãos'
  },
  {
    id: 2,
    title: '2. Palma sobre dorso oposto',
    subtitle: 'Dedos entrelaçados em ambos os dorsos',
    description: 'Friccione a palma da mão direita contra o dorso da mão esquerda, entrelaçando os dedos. Em seguida, repita o movimento com a palma esquerda sobre o dorso da mão direita.',
    recommendation: 'Alcança o dorso da mão e as comissuras laterais dos dedos, frequentemente negligenciadas.',
    durationAlcohol: '20 a 30 segundos no total',
    durationSoap: '40 a 60 segundos no total',
    highlightZone: 'dorsum',
    officialReference: 'Anvisa (2026): Segurança do Paciente em Serviços de Saúde — Higiene das Mãos'
  },
  {
    id: 3,
    title: '3. Entre os dedos (Interdigital)',
    subtitle: 'Palma com palma com dedos entrelaçados',
    description: 'Friccione as palmas das mãos entre si, mantendo os dedos entrelaçados para friccionar profundamente os espaços interdigitais.',
    recommendation: 'Os espaços interdigitais acumulam umidade e flora microbiana transitória.',
    durationAlcohol: '20 a 30 segundos no total',
    durationSoap: '40 a 60 segundos no total',
    highlightZone: 'interdigital',
    officialReference: 'Anvisa (2026): Segurança do Paciente em Serviços de Saúde — Higiene das Mãos'
  },
  {
    id: 4,
    title: '4. Dorso dos dedos nas palmas opostas',
    subtitle: 'Dedos engatados e movimentos laterais',
    description: 'Engate o dorso dos dedos de uma mão contra a palma da mão oposta, segurando os dedos e realizando movimentos de vaivém.',
    recommendation: 'Higieniza as articulações interfalângicas e as dobras articulares dorsais dos dedos.',
    durationAlcohol: '20 a 30 segundos no total',
    durationSoap: '40 a 60 segundos no total',
    highlightZone: 'backs_fingers',
    officialReference: 'Anvisa (2026): Segurança do Paciente em Serviços de Saúde — Higiene das Mãos'
  },
  {
    id: 5,
    title: '5. Polegares em movimento rotativo',
    subtitle: 'Fricção rotativa de ambos os polegares',
    description: 'Envolva o polegar esquerdo com a palma da mão direita e faça uma fricção rotativa completa. Repita o procedimento com o polegar direito envolvido pela mão esquerda.',
    recommendation: 'Os polegares podem ser esquecidos durante a higiene; por isso, devem receber fricção cuidadosa em ambos os lados.',
    durationAlcohol: '20 a 30 segundos no total',
    durationSoap: '40 a 60 segundos no total',
    highlightZone: 'thumbs',
    officialReference: 'Anvisa (2026): Segurança do Paciente em Serviços de Saúde — Higiene das Mãos'
  },
  {
    id: 6,
    title: '6. Pontas dos dedos e unhas',
    subtitle: 'Polpas digitais e leito ungueal contra a palma',
    description: 'Friccione as polpas digitais e as unhas da mão direita fazendo movimentos circulares para frente e para trás contra a palma da mão esquerda. Repita com a mão oposta.',
    recommendation: 'As pontas dos dedos e a região das unhas podem ser esquecidas; inclua-as na fricção.',
    durationAlcohol: '20 a 30 segundos no total',
    durationSoap: '40 a 60 segundos no total',
    highlightZone: 'fingertips',
    officialReference: 'Anvisa (2026): Segurança do Paciente em Serviços de Saúde — Higiene das Mãos'
  },
];

export const FIVE_MOMENTS: FiveMoment[] = [
  {
    id: 1,
    number: '1',
    title: 'Antes de contato com o paciente',
    when: 'Imediatamente antes de tocar o paciente ao se aproximar dele.',
    why: 'Para proteger o paciente da colonização ou infecção por microrganismos nocivos presentes nas mãos do profissional.',
    examples: [
      'Apertar a mão do paciente ou tocar seu ombro ao acolhê-lo.',
      'Ajudar o paciente a se movimentar ou trocar de posição no leito.',
      'Realizar exame clínico, aferir pulso, pressão arterial ou palpação abdominal.'
    ],
    zoneType: 'before_patient'
  },
  {
    id: 2,
    number: '2',
    title: 'Antes de procedimento limpo / asséptico',
    when: 'Imediatamente antes de qualquer procedimento que envolva acesso a sítios vulneráveis.',
    why: 'Para proteger o paciente contra a entrada de microrganismos patogênicos no seu próprio organismo.',
    examples: [
      'Administração de medicação em via endovenosa ou injeção IM.',
      'Realização de curativo, inserção ou manipulação de cateter vascular.',
      'Aspiração de vias aéreas ou cateterismo vesical.'
    ],
    zoneType: 'aseptic'
  },
  {
    id: 3,
    number: '3',
    title: 'Após risco de exposição a fluidos corporais',
    when: 'Imediatamente após a conclusão de tarefa com contato ou risco de contato com fluidos orgânicos (e após retirar as luvas!).',
    why: 'Para proteger o profissional e o ambiente de assistência contra a colonização e transmissão de patógenos.',
    examples: [
      'Coleta de sangue, aspiração de secreções ou troca de fraldas.',
      'Esvaziamento de bolsas coletoras de urina ou drenos cirúrgicos.',
      'Contato com mucosas, pele não íntegra ou vômito.'
    ],
    zoneType: 'after_fluids'
  },
  {
    id: 4,
    number: '4',
    title: 'Após contato com o paciente',
    when: 'Imediatamente após tocar o paciente e antes de tocar qualquer superfície fora da zona do paciente.',
    why: 'Para proteger o profissional e os próximos pacientes da transmissão cruzada.',
    examples: [
      'Ao se despedir do paciente após consulta ou aferição de sinais.',
      'Após ajudar o paciente a se levantar ou banho no leito.',
      'Após palpação, ausculta ou fisioterapia motora.'
    ],
    zoneType: 'after_patient'
  },
  {
    id: 5,
    number: '5',
    title: 'Após contato com áreas próximas ao paciente',
    when: 'Após tocar qualquer objeto, mobília ou equipamento no entorno imediato do paciente, mesmo sem ter tocado o paciente diretamente.',
    why: 'Objetos e superfícies próximos ao paciente podem ser contaminados durante o cuidado e transferir microrganismos para as mãos.',
    examples: [
      'Ajustar a grade do leito ou mesa de cabeceira.',
      'Desligar o alarme da bomba de infusão ou monitor multiparamétrico.',
      'Ajustar o suporte de soro ou trocar a roupa de cama do paciente.'
    ],
    zoneType: 'after_surroundings'
  }
];

export const CLINICAL_SCENARIOS: ClinicalScenario[] = [
  {
    id: 1,
    scenario: 'Você entra no quarto 204 para aferir a pressão arterial do paciente Sr. José. Você não tocou nele ainda.',
    context: 'Início da visita de enfermagem.',
    requiresHygiene: true,
    correctMomentId: 1,
    explanation: 'Correto! Momento 1 da OMS: "Antes de contato com o paciente". A higienização previne levar microrganismos da assistência ou de outros pacientes para o Sr. José.',
    officialRef: 'OMS / Anvisa - Momento 1'
  },
  {
    id: 2,
    scenario: 'Você vai administrar um antibiótico através do injetor lateral (torneirinha) do acesso venoso periférico do paciente.',
    context: 'Medicação endovenosa prescrita.',
    requiresHygiene: true,
    correctMomentId: 2,
    explanation: 'Exato! Momento 2 da OMS: "Antes de procedimento limpo/asséptico". O acesso venoso é uma porta de entrada direta para a corrente sanguínea, com alto risco de bacteremia.',
    officialRef: 'OMS / Anvisa - Momento 2'
  },
  {
    id: 3,
    scenario: 'Você utilizou luvas de procedimento para esvaziar a bolsa coletora de urina de um sistema fechado de sonda vesical.',
    context: 'Manipulação de diurese com luvas.',
    requiresHygiene: true,
    correctMomentId: 3,
    explanation: 'Perfeito! Momento 3 da OMS: "Após risco de exposição a fluidos corporais". É obrigatório retirar as luvas e higienizar as mãos imediatamente após o procedimento!',
    officialRef: 'OMS / Anvisa - Momento 3'
  },
  {
    id: 4,
    scenario: 'Você apenas tocou na grade do leito para abaixá-la e desligou o bipe da bomba de infusão. Não tocou na pele do paciente.',
    context: 'Apenas contato com mobília e equipamento.',
    requiresHygiene: true,
    correctMomentId: 5,
    explanation: 'Correto! Momento 5 da OMS: "Após contato com áreas próximas ao paciente". As superfícies e equipamentos no entorno do paciente abrigam patógenos viáveis por horas.',
    officialRef: 'OMS / Anvisa - Momento 5'
  },
  {
    id: 5,
    scenario: 'Você acabou de conversar com a paciente, segurou a mão dela para consolá-la e está saindo da enfermaria em direção ao posto.',
    context: 'Finalização do acolhimento ao paciente.',
    requiresHygiene: true,
    correctMomentId: 4,
    explanation: 'Exato! Momento 4 da OMS: "Após contato com o paciente". Garante que patógenos da pele do paciente não sejam levados para maçanetas, prontuários ou o próximo paciente.',
    officialRef: 'OMS / Anvisa - Momento 4'
  },
  {
    id: 6,
    scenario: 'Você já realizou a higiene das mãos com preparação alcoólica, pegou uma caneta limpa e vai escrever no prontuário no posto de enfermagem, sem ter tocado em superfícies contaminadas.',
    context: 'Atividade burocrática em área administrativa limpa.',
    requiresHygiene: false,
    explanation: 'Neste momento específico, suas mãos já estão higienizadas e você está operando em superfície limpa. Não há indicação para higienizar novamente antes de encostar a caneta no papel.',
    officialRef: 'OMS - Fluxo de trabalho racional e prevenção de dermatites'
  }
];

export const GLOVES_STATEMENTS: GloveStatement[] = [
  {
    id: 1,
    statement: 'O uso de luvas de procedimento substitui a necessidade de higienizar as mãos antes e após o atendimento.',
    isTrue: false,
    explanation: 'Mito perigoso! Luvas não substituem a higiene das mãos. As mãos devem ser higienizadas antes de calçá-las e imediatamente após retirá-las, pois pode ocorrer contaminação durante o uso ou a retirada.',
    technicalRule: 'Higienize as mãos antes de calçar as luvas e imediatamente após sua retirada.',
    officialSource: 'Anvisa / OMS: Manual para Luvas em Serviços de Saúde'
  },
  {
    id: 2,
    statement: 'As mãos devem ser higienizadas imediatamente após a retirada das luvas, utilizando o método indicado para a situação.',
    isTrue: true,
    explanation: 'Verdadeiro! A retirada das luvas pode contaminar as mãos; por isso, a higiene das mãos deve ser realizada imediatamente após a remoção.',
    technicalRule: 'Descarte as luvas conforme a classificação do resíduo e o PGRSS da instituição; em seguida, higienize as mãos.',
    officialSource: 'Nota Técnica Anvisa GVIMS/GGTES'
  },
  {
    id: 3,
    statement: 'Para agilizar o plantão, é recomendado aplicar preparação alcoólica sobre luvas descartáveis para reutilizá-las no próximo paciente.',
    isTrue: false,
    explanation: 'Falso. Luvas descartáveis de uso único não devem ser desinfetadas para reutilização nem usadas entre pacientes. Retire-as, descarte-as conforme o PGRSS e higienize as mãos.',
    technicalRule: 'Não desinfete nem reutilize luvas descartáveis. Troque-as entre pacientes e entre tarefas/sítios quando indicado; higienize as mãos antes e depois do uso.',
    officialSource: 'Anvisa / CDC / OMS'
  },
  {
    id: 4,
    statement: 'É permitido caminhar pelos corredores da unidade calçando as mesmas luvas usadas no quarto do paciente para buscar insumos.',
    isTrue: false,
    explanation: 'Mito inaceitável! Caminhar com luvas fora do quarto contamina maçanetas, corrimãos, botões de elevador e dissemina microrganismos multirresistentes pela unidade de saúde.',
    technicalRule: 'Retire as luvas ao terminar a tarefa e antes de tocar superfícies limpas ou sair da zona de cuidado; descarte-as conforme o PGRSS e higienize as mãos.',
    officialSource: 'Precauções padrão e protocolo institucional de uso de luvas'
  },
  {
    id: 5,
    statement: 'No mesmo paciente, ao passar de um sítio corporal contaminado (ex: curativo com exsudato) para um sítio limpo (ex: cateter venoso), deve-se trocar de luvas e higienizar as mãos.',
    isTrue: true,
    explanation: 'Verdadeiro! Esse procedimento evita a autoinoculação e a contaminação cruzada interna no próprio paciente.',
    technicalRule: 'Ao passar de uma área contaminada para uma área limpa, retire as luvas, higienize as mãos e coloque um novo par se a próxima tarefa exigir luvas.',
    officialSource: 'OMS / Protocolo de Segurança do Paciente (MS/Fiocruz)'
  },
  {
    id: 6,
    statement: 'Não se deve digitar no teclado do computador, atender telefone celular ou manusear prontuários utilizando luvas de assistência.',
    isTrue: true,
    explanation: 'Verdadeiro! Telefones celulares, computadores e prontuários podem ser contaminados quando tocados com luvas usadas na assistência e favorecer a transmissão cruzada.',
    technicalRule: 'Reserve o uso de luvas estritamente para o contato com o paciente/procedimento indicado.',
    officialSource: 'NR-32 / Ministério do Trabalho e Emprego & Anvisa'
  }
];

export const SIMULATION_OBJECTS: SimulationObject[] = [
  {
    id: 'paciente',
    name: 'Paciente no Leito',
    category: 'patient',
    icon: 'user',
    description: 'Pele, secreções e flora microbiológica do paciente.',
    cleanActionName: 'Higienizar Mãos',
    cleanActionDesc: 'Antes de tocar o paciente (Momento 1) e antes de procedimentos (Momento 2).'
  },
  {
    id: 'grade_leito',
    name: 'Grade do Leito',
    category: 'surface',
    icon: 'bed',
    description: 'Superfície de alto toque que pode ser contaminada durante a assistência.',
    cleanActionName: 'Desinfetar Superfície',
    cleanActionDesc: 'Limpar e, quando indicado, desinfetar com produto regularizado e compatível com a superfície, respeitando rótulo, tempo de contato e protocolo institucional.'
  },
  {
    id: 'celular',
    name: 'Smartphone do Profissional',
    category: 'personal',
    icon: 'smartphone',
    description: 'Dispositivo pessoal de alto toque que pode transportar microrganismos se for manuseado durante a assistência.',
    cleanActionName: 'Higienizar conforme orientação do fabricante',
    cleanActionDesc: 'Evitar manusear o celular durante procedimentos. Para higienizá-lo, seguir as instruções do fabricante e a política institucional; não aplicar produtos incompatíveis.'
  },
  {
    id: 'computador',
    name: 'Teclado do Computador',
    category: 'surface',
    icon: 'monitor',
    description: 'Estação de enfermagem e prescrição tocada por múltiplos profissionais.',
    cleanActionName: 'Limpar Teclado e Mouse',
    cleanActionDesc: 'Limpar/desinfetar conforme rotina institucional e compatibilidade do equipamento; higienizar as mãos nos momentos indicados.'
  },
  {
    id: 'caneta',
    name: 'Caneta de Bolso',
    category: 'personal',
    icon: 'pen-tool',
    description: 'Compartilhada frequentemente entre colegas e apoiada em bancadas diversas.',
    cleanActionName: 'Desinfetar Caneta',
    cleanActionDesc: 'Higienizar conforme orientação do fabricante e protocolo institucional; não levar à boca.'
  },
  {
    id: 'prontuario',
    name: 'Pasta do Prontuário',
    category: 'surface',
    icon: 'file-text',
    description: 'Transita entre leito, posto médico, farmácia e recepção.',
    cleanActionName: 'Manipular Apenas com Mãos Limpas',
    cleanActionDesc: 'Nunca levar prontuário para cima da cama do paciente.'
  },
  {
    id: 'bomba_infusao',
    name: 'Bomba de Infusão / Equipamento',
    category: 'device',
    icon: 'activity',
    description: 'Equipamento eletromédico vital que fica ao lado do leito.',
    cleanActionName: 'Desinfecção do Equipamento',
    cleanActionDesc: 'Limpeza e desinfecção conforme orientação do fabricante do equipamento, produto regularizado compatível e protocolo institucional.'
  },
  {
    id: 'macaneta',
    name: 'Maçaneta da Porta',
    category: 'surface',
    icon: 'door-closed',
    description: 'Ponto crítico tocado por profissionais, visitantes e pacientes.',
    cleanActionName: 'Mãos Limpas ao Tocar',
    cleanActionDesc: 'Higienizar as mãos antes de sair do quarto (Momento 4 e 5).'
  },
  {
    id: 'dispensador',
    name: 'Dispensador de preparação alcoólica',
    category: 'sanitizer',
    icon: 'sparkles',
    description: 'Disponível no ponto de assistência (beira-leito), conforme indicação e protocolo do serviço.',
    cleanActionName: 'Fricção Antisséptica por 20 a 30s',
    cleanActionDesc: 'Quando as mãos não estiverem visivelmente sujas, a preparação alcoólica é indicada para a fricção antisséptica.'
  }
];

export const RISK_SITUATIONS: RiskSituation[] = [
  {
    id: 1,
    title: 'O Celular no Posto de Assistência',
    setting: 'Posto de enfermagem / Beira do leito',
    description: 'Durante a administração de uma antibioticoterapia, o smartphone do profissional vibra no bolso. O profissional atende a ligação rapidamente com a luva calçada e prossegue na punção.',
    options: [
      {
        id: 'a',
        text: 'Conduta adequada, pois o profissional utilizava luvas e não tocou na tela diretamente com a pele.',
        isCorrect: false,
        feedback: 'Incorreto! A luva estava no campo de assistência e transferiu bactérias para o aparelho. Além disso, o celular contamina a luva que depois toca o sítio do paciente!'
      },
      {
        id: 'b',
        text: 'Risco de contaminação cruzada. Não interrompa uma tarefa assistencial ou asséptica para manusear o celular; se precisar utilizá-lo, retire as luvas, higienize as mãos e siga a política de limpeza do aparelho.',
        isCorrect: true,
        feedback: 'Correto! O manuseio do celular durante a assistência pode transferir microrganismos entre o aparelho, as mãos, as luvas e o ambiente. A higiene do aparelho deve seguir as instruções do fabricante e a política do serviço.'
      },
      {
        id: 'c',
        text: 'Não há risco desde que o celular seja novo.',
        isCorrect: false,
        feedback: 'Incorreto! Mesmo aparelhos novos podem ser contaminados pelo uso; a limpeza deve seguir orientação do fabricante e rotina institucional.'
      }
    ],
    regulatoryContext: 'Nota Técnica GVIMS/GGTES Anvisa & Manual de Segurança do Paciente'
  },
  {
    id: 2,
    title: 'Uso de Adornos e Relógio na Assistência',
    setting: 'Enfermaria clínica',
    description: 'Um profissional atende os pacientes utilizando aliança de ouro, relógio de pulso inteligente (smartwatch) e anéis nos dedos, afirmando que retira apenas na hora do almoço.',
    options: [
      {
        id: 'a',
        text: 'Permitido, desde que o relógio seja à prova d\'água e higienizado com álcool.',
        isCorrect: false,
        feedback: 'Incorreto! A NR-32 determina que o empregador vede o uso de adornos nos postos de trabalho; a regra não depende de o relógio ser resistente à água.'
      },
      {
        id: 'b',
        text: 'Descumprimento da NR-32: o empregador deve vedar o uso de adornos nos postos de trabalho.',
        isCorrect: true,
        feedback: 'Correto! O item 32.2.4.5, alínea b, da NR-32 determina que o empregador vede o uso de adornos nos postos de trabalho. A instituição deve orientar quais itens são abrangidos pela regra.'
      },
      {
        id: 'c',
        text: 'Somente anéis com pedras são proibidos; aliança lisa e relógio de pulso são liberados.',
        isCorrect: false,
        feedback: 'Incorreto! A proibição do uso de adornos nos postos de trabalho não depende do material ou valor do objeto.'
      }
    ],
    regulatoryContext: 'NR-32 (MTE) e Protocolos de Controle de IRAS da Anvisa'
  },
  {
    id: 3,
    title: 'O Jaleco Fora da Instituição',
    setting: 'Restaurante / Transporte público',
    description: 'Após o turno da manhã, o estudante ou profissional sai para almoçar no restaurante em frente ao hospital vestindo o mesmo jaleco utilizado nos leitos.',
    options: [
      {
        id: 'a',
        text: 'Comportamento de risco que expõe a comunidade a microrganismos hospitalares e viola as normas de biossegurança.',
        isCorrect: true,
        feedback: 'Excelente! Correto! A NR-32, item 32.2.4.6.2, determina que trabalhadores não deixem o local de trabalho com os EPIs e as vestimentas utilizadas nas atividades. O serviço deve definir o fluxo de troca e higienização.'
      },
      {
        id: 'b',
        text: 'Aceitável caso o profissional não tenha atendido pacientes em isolamento.',
        isCorrect: false,
        feedback: 'Incorreto! A regra sobre não levar vestimentas e EPIs utilizados para fora do local de trabalho não depende de o paciente estar em isolamento.'
      },
      {
        id: 'c',
        text: 'Permitido desde que o jaleco seja fechado até a gola.',
        isCorrect: false,
        feedback: 'Incorreto! Fechar o jaleco não substitui o cumprimento das regras institucionais de troca, guarda e higienização das vestimentas.'
      }
    ],
    regulatoryContext: 'Norma Regulamentadora NR-32 e Código de Ética dos Profissionais de Enfermagem'
  },
  {
    id: 4,
    title: 'Desinfecção de Instrumentos Compartilhados (Estetoscópio)',
    setting: 'Aferição de sinais vitais entre leitos',
    description: 'O técnico de enfermagem afere a pressão e ausculta o pulmão do paciente do leito 3 e caminha diretamente para o leito 4 com o estetoscópio pendurado no pescoço, sem limpar a campânula.',
    options: [
      {
        id: 'a',
        text: 'Correto, pois o estetoscópio só encosta em pele íntegra e não transmite infecção.',
        isCorrect: false,
        feedback: 'Incorreto! O diafragma do estetoscópio abriga patógenos como Staphylococcus aureus resistente (MRSA) e Enterococcus (VRE).'
      },
      {
        id: 'b',
        text: 'Risco de contaminação cruzada. O estetoscópio deve ser limpo e desinfetado entre pacientes, com produto compatível e conforme as instruções do fabricante e o protocolo institucional.',
        isCorrect: true,
        feedback: 'Correto! Equipamentos compartilhados podem transferir microrganismos. A limpeza e a desinfecção entre pacientes devem seguir o fabricante, o produto regularizado indicado e o protocolo institucional.'
      },
      {
        id: 'c',
        text: 'Só precisa ser desinfetado uma vez ao dia no final do plantão.',
        isCorrect: false,
        feedback: 'Incorreto! O contato sucessivo com múltiplos pacientes transforma o equipamento em vetor de contaminação cruzada.'
      }
    ],
    regulatoryContext: 'Manual de Segurança do Paciente e Limpeza de Superfícies (Anvisa)'
  }
];

export const FINAL_CHALLENGE_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual é a duração recomendada pela Anvisa para a fricção antisséptica das mãos com preparação alcoólica para higiene das mãos?',
    options: [
      { id: 'a', text: '5 a 10 segundos', isCorrect: false },
      { id: 'b', text: '20 a 30 segundos (até as mãos secarem)', isCorrect: true },
      { id: 'c', text: '60 a 90 segundos', isCorrect: false },
      { id: 'd', text: 'Exatamente 2 minutos', isCorrect: false }
    ],
    explanation: 'A fricção antisséptica com preparação alcoólica deve durar de 20 a 30 segundos, cobrindo todas as superfícies até a completa secagem. A concentração final deve ser de 60% a 80% para preparações líquidas e mínima de 70% para gel, espuma e outras apresentações.',
    keyTakeaway: '20 a 30 segundos é o tempo total recomendado para a fricção antisséptica das mãos com preparação alcoólica.',
    officialSource: 'Anvisa / OMS: Diretrizes de Higiene das Mãos'
  },
  {
    id: 2,
    question: 'Em qual das seguintes situações deve-se optar pela higiene das mãos com ÁGUA E SABONETE em vez da preparação alcoólica?',
    options: [
      { id: 'a', text: 'Quando as mãos estiverem visivelmente sujas, após usar o banheiro ou quando houver suspeita/exposição a microrganismos formadores de esporos', isCorrect: true },
      { id: 'b', text: 'Sempre antes de aferir a temperatura axilar', isCorrect: false },
      { id: 'c', text: 'Apenas quando o dispensador de álcool estiver quente', isCorrect: false },
      { id: 'd', text: 'Nunca, a preparação alcoólica sempre tem preferência, mesmo com sujidade visível', isCorrect: false }
    ],
    explanation: 'Use água e sabonete quando as mãos estiverem visivelmente sujas, após usar o banheiro e nas situações indicadas para suspeita ou exposição a microrganismos formadores de esporos, como Clostridioides difficile. Siga também o protocolo institucional.',
    keyTakeaway: 'Água e sabonete: 40 a 60 segundos. Preparação alcoólica: 20 a 30 segundos; escolha conforme a indicação clínica e o protocolo.',
    officialSource: 'Protocolo de Higiene das Mãos Anvisa / Ministério da Saúde'
  },
  {
    id: 3,
    question: 'Sobre o Momento 2 da OMS ("Antes da realização de procedimento limpo/asséptico"), assinale a alternativa que descreve sua finalidade principal:',
    options: [
      { id: 'a', text: 'Proteger o próprio profissional de pegar gripe do paciente', isCorrect: false },
      { id: 'b', text: 'Evitar a inoculação de microrganismos nocivos no organismo do paciente em sítios vulneráveis', isCorrect: true },
      { id: 'c', text: 'Reduzir custos institucionais de lavanderia', isCorrect: false },
      { id: 'd', text: 'Substituir a necessidade de esterilização dos materiais', isCorrect: false }
    ],
    explanation: 'O Momento 2 visa proteger o paciente contra seus próprios patógenos e patógenos externos que poderiam penetrar por barreiras rompidas (como cateteres intravenosos, feridas e cateter vesical).',
    keyTakeaway: 'Momento 2 protege a integridade e as portas de entrada estéreis do paciente.',
    officialSource: 'OMS: Five Moments for Hand Hygiene'
  },
  {
    id: 4,
    question: 'Qual é a regra correta em relação à higienização das mãos e ao uso de luvas de procedimento?',
    options: [
      { id: 'a', text: 'As luvas dispensam a lavagem das mãos se estiverem intactas', isCorrect: false },
      { id: 'b', text: 'As mãos devem ser higienizadas antes de calçar as luvas e imediatamente após sua retirada', isCorrect: true },
      { id: 'c', text: 'Basta higienizar as mãos uma vez no início do plantão se usar luvas em todos os pacientes', isCorrect: false },
      { id: 'd', text: 'Pode-se lavar as luvas na torneira para reutilizá-las no mesmo quarto', isCorrect: false }
    ],
    explanation: 'O uso de luvas nunca substitui a higiene das mãos. A higiene antes e depois do uso reduz o risco de transmissão. Durante o uso ou a retirada das luvas, as mãos podem ser contaminadas; por isso, a higiene após removê-las é indispensável.',
    keyTakeaway: 'Calçar com mãos limpas, retirar e higienizar imediatamente!',
    officialSource: 'Nota Técnica GVIMS/GGTES Anvisa'
  },
  {
    id: 5,
    question: 'Segundo a NR-32, item 32.2.4.5, qual medida o empregador deve adotar em relação aos adornos nos postos de trabalho?',
    options: [
      { id: 'a', text: 'O empregador deve vedar o uso de adornos nos postos de trabalho', isCorrect: true },
      { id: 'b', text: 'Permitido o uso de aliança simples e relógio desde que não toquem o paciente', isCorrect: false },
      { id: 'c', text: 'Permitido o uso caso os adornos sejam de ouro ou prata pura', isCorrect: false },
      { id: 'd', text: 'Apenas brincos são proibidos; anéis podem ser usados com luvas', isCorrect: false }
    ],
    explanation: 'A NR-32 determina que o empregador vede o uso de adornos nos postos de trabalho (item 32.2.4.5, alínea b). A norma também exige higiene das mãos antes e depois do uso de luvas (item 32.2.4.3.2).',
    keyTakeaway: 'Adorno zero: segurança para quem cuida e para quem é cuidado.',
    officialSource: 'Ministério do Trabalho e Emprego - NR-32'
  },
  {
    id: 6,
    question: 'O que define "Contaminação Cruzada" em um ambiente hospitalar?',
    options: [
      { id: 'a', text: 'Quando dois medicamentos de cores diferentes são misturados no mesmo frasco', isCorrect: false },
      { id: 'b', text: 'A transferência direta ou indireta de microrganismos patogênicos de um paciente, objeto ou superfície para outro indivíduo', isCorrect: true },
      { id: 'c', text: 'A infecção que surge espontaneamente no ar condicionado da farmácia', isCorrect: false },
      { id: 'd', text: 'A troca acidental de roupas de cama limpas na lavanderia', isCorrect: false }
    ],
    explanation: 'Contaminação cruzada é o transporte de agentes infecciosos entre pessoas, objetos (fômites) ou superfícies de assistência, frequentemente mediado pelas mãos não higienizadas dos profissionais de saúde.',
    keyTakeaway: 'As mãos dos profissionais são uma via importante de transmissão cruzada e devem ser higienizadas nos momentos indicados.',
    officialSource: 'Anvisa / Ministério da Saúde: Glossário de Controle de Infecções'
  },
  {
    id: 7,
    question: 'Na Cadeia de Transmissão de microrganismos, qual ação de enfermagem é capaz de quebrar o elo da "Via de Transmissão"?',
    options: [
      { id: 'a', text: 'Higienização rigorosa das mãos e precauções de contato (uso correto de avental e luvas)', isCorrect: true },
      { id: 'b', text: 'Apenas abrir as janelas do quarto', isCorrect: false },
      { id: 'c', text: 'Reduzir a hidratação oral do paciente', isCorrect: false },
      { id: 'd', text: 'Aumentar a dose do antibiótico sem prescrição', isCorrect: false }
    ],
    explanation: 'A higienização das mãos é a medida isolada mais eficaz para interromper a via de transmissão por contato. Juntamente com a limpeza terminal/concorrente e as precauções específicas, bloqueia a passagem do agente do reservatório para o hospedeiro suscetível.',
    keyTakeaway: 'Uma atitude pode interromper uma cadeia de transmissão!',
    officialSource: 'OMS / Programa Nacional de Prevenção e Controle de IRAS (MS)'
  },
  {
    id: 8,
    question: 'Durante a secagem das mãos após a lavagem com água e sabão líquido, qual é a técnica correta recomendada pela Anvisa?',
    options: [
      { id: 'a', text: 'Secar com o próprio jaleco ou uniforme', isCorrect: false },
      { id: 'b', text: 'Secar com papel toalha descartável e usar o mesmo papel para fechar a torneira (se não for automática)', isCorrect: true },
      { id: 'c', text: 'Agitar as mãos vigorosamente no ar até secarem sozinhas', isCorrect: false },
      { id: 'd', text: 'Compartilhar toalha de tecido entre a equipe do plantão', isCorrect: false }
    ],
    explanation: 'As mãos devem ser secas com papel toalha descartável de boa qualidade. Caso a torneira tenha fechamento manual, utilize o papel toalha usado para fechá-la, evitando tocar na torneira contaminada com as mãos recém-lavadas.',
    keyTakeaway: 'Nunca feche a torneira manual com a mão limpa diretamente.',
    officialSource: 'Anvisa: Protocolo de Higiene das Mãos'
  }
];

export const RISK_HOTSPOTS: RiskHotspot[] = [
  {
    id: 'gloves_discard',
    title: 'Luvas usadas esquecidas sobre a mesa de cabeceira',
    xPercent: 72,
    yPercent: 58,
    hazardDescription: 'Luvas de procedimento com resíduos foram deixadas sobre a mesa onde o paciente apoia refeições e pertences pessoais.',
    correctionAction: 'Retire as luvas ao terminar a tarefa e descarte-as conforme a classificação do resíduo e o PGRSS. A RDC 222/2018 inclui no Grupo D luvas de procedimento que não tiveram contato com sangue ou líquidos corpóreos; materiais com contaminação devem ser classificados conforme a norma.',
    normReference: 'RDC Anvisa nº 222/2018 (Gerenciamento de Resíduos de Serviços de Saúde)'
  },
  {
    id: 'phone_tray',
    title: 'Celular pessoal sobre a bandeja de medicação',
    xPercent: 32,
    yPercent: 64,
    hazardDescription: 'Aparelho celular repousando sobre a bandeja limpa destinada ao preparo e transporte de medicamentos parenterais.',
    correctionAction: 'Objetos pessoais nunca devem compartilhar espaço com insumos estéreis ou bandejas assistenciais. Mantenha o celular guardado no armário/bolso.',
    normReference: 'Manual de Segurança do Paciente no Preparo de Medicamentos (Anvisa)'
  },
  {
    id: 'labcoat_rack',
    title: 'Jaleco pendurado no suporte de soro',
    xPercent: 18,
    yPercent: 30,
    hazardDescription: 'Jaleco do profissional suspenso no mesmo suporte que sustenta o frasco de infusão venosa e a linha de equipo.',
    correctionAction: 'Jalecos e uniformes devem permanecer em cabides próprios ou armários do vestiário, nunca em suportes ou áreas de assistência invasiva.',
    normReference: 'Norma Regulamentadora NR-32 (MTE) e Protocolos de Controle de IRAS'
  },
  {
    id: 'wrist_rings',
    title: 'Profissional com relógio de pulso e anéis',
    xPercent: 52,
    yPercent: 44,
    hazardDescription: 'O técnico de enfermagem está prestando cuidados utilizando anéis e smartwatch.',
    correctionAction: 'Cumprir a NR-32 e a regra institucional: não utilizar adornos nos postos de trabalho.',
    normReference: 'NR-32, item 32.2.4.5, alínea b (adornos nos postos de trabalho)'
  },
  {
    id: 'dispenser_blocked',
    title: 'Dispensador de álcool vazio ou obstruído',
    xPercent: 88,
    yPercent: 35,
    hazardDescription: 'O dispensador de preparação alcoólica para higiene das mãos está vazio ou obstruído, impedindo a higiene no ponto de assistência.',
    correctionAction: 'Garantir o ponto de assistência suprido e desobstruído. Comunicar imediatamente a equipe de suprimentos/CCIH para abastecimento.',
    normReference: 'RDC Anvisa nº 42/2010 (Obrigatoriedade de Dispensadores de Álcool)'
  },
  {
    id: 'stethoscope_neck',
    title: 'Estetoscópio pendurado sem desinfecção prévia',
    xPercent: 42,
    yPercent: 25,
    hazardDescription: 'Estetoscópio utilizado em um paciente e levado ao próximo sem limpeza e desinfecção entre atendimentos.',
    correctionAction: 'Realizar limpeza e desinfecção das partes utilizadas entre pacientes, com produto compatível e conforme as instruções do fabricante e o protocolo institucional.',
    normReference: 'Guia de Limpeza e Desinfecção de Fômites Hospitalares (Anvisa)'
  }
];

export const TRANSMISSION_CHAIN_LINKS: TransmissionChainLink[] = [
  {
    id: 'agente',
    order: 1,
    name: '1. Agente Infeccioso',
    definition: 'O microrganismo patogênico capaz de causar infecção (bactérias, vírus, fungos, parasitas ou esporos).',
    clinicalExamples: [
      'Staphylococcus aureus resistente à oxacilina (MRSA)',
      'Klebsiella pneumoniae produtora de carbapenemase (KPC)',
      'Vírus respiratórios (Influenza, SARS-CoV-2, VSR)',
      'Clostridioides difficile'
    ],
    interruptionAction: 'Como interromper este elo:',
    nursingPractice: 'Uso racional de antimicrobianos, testes microbiológicos rápidos, desinfecção de alto nível e esterilização de artigos médico-hospitalares.'
  },
  {
    id: 'reservatorio',
    order: 2,
    name: '2. Reservatório',
    definition: 'O habitat natural onde o microrganismo vive, cresce e se multiplica (seres humanos, animais, superfícies inanimadas, água ou soluções).',
    clinicalExamples: [
      'Pele, trato respiratório ou trato gastrointestinal do paciente e profissionais',
      'Superfícies de alto toque (grades do leito, maçanetas, bancadas)',
      'Equipamentos biomédicos (bombas de infusão, monitores, respiradores)',
      'Água contaminada ou sabonetes em barra reutilizados'
    ],
    interruptionAction: 'Como interromper este elo:',
    nursingPractice: 'Limpeza e desinfecção concorrente e terminal de superfícies com produtos saneantes aprovados pela Anvisa, isolamento de contato e descarte adequado de fômites.'
  },
  {
    id: 'porta_saida',
    order: 3,
    name: '3. Porta de Saída',
    definition: 'O local ou via pela qual o microrganismo deixa o reservatório para alcançar um novo hospedeiro.',
    clinicalExamples: [
      'Gotículas expelidas ao falar, tossir ou espirrar',
      'Exsudato de feridas, urina em drenagens, fezes e diarreia',
      'Sangue e fluidos corporais durante punções ou procedimentos cirúrgicos',
      'Descamação cutânea'
    ],
    interruptionAction: 'Como interromper este elo:',
    nursingPractice: 'Etiqueta respiratória (cobrir tosse com antebraço), curativos oclusivos em lesões drenantes, uso de máscaras cirúrgicas adequadas e luvas de procedimento para manipular fluidos.'
  },
  {
    id: 'via_transmissao',
    order: 4,
    name: '4. Via de Transmissão',
    definition: 'O mecanismo pelo qual o patógeno se desloca da porta de saída até a porta de entrada. É o elo MAIS vulnerável à intervenção da equipe de saúde!',
    clinicalExamples: [
      'Contato Direto (pele a pele)',
      'Contato Indireto através das mãos do profissional de saúde',
      'Contato Indireto através de objetos contaminados (fômites: celulares, canetas, termômetros)',
      'Gotículas respiratórias e aerossóis: diferem em tamanho, comportamento no ar e medidas de precaução; a avaliação depende do agente e do procedimento.'
    ],
    interruptionAction: 'Como interromper este elo (O elo de ouro!):',
    nursingPractice: 'HIGIENIZAÇÃO DAS MÃOS nos 5 momentos da OMS, precauções padrão e específicas (contato, gotículas, aerossóis), uso de EPI adequado e desinfecção de equipamentos entre pacientes.'
  },
  {
    id: 'porta_entrada',
    order: 5,
    name: '5. Porta de Entrada',
    definition: 'O sítio pelo qual o patógeno consegue penetrar no organismo de um hospedeiro suscetível.',
    clinicalExamples: [
      'Quebra da barreira cutânea (incisões cirúrgicas, queimaduras, punções venosas)',
      'Mucosas respiratórias, oculares ou orais',
      'Dispositivos invasivos (cateter venoso central, tubo orotraqueal, sonda vesical)'
    ],
    interruptionAction: 'Como interromper este elo:',
    nursingPractice: 'Técnica asséptica rigorosa na inserção e manipulação de cateteres, antissepsia da pele com clorexidina alcoólica, cuidados com o cuff do tubo endotraqueal e curativos esterilizados.'
  },
  {
    id: 'hospedeiro',
    order: 6,
    name: '6. Hospedeiro Suscetível',
    definition: 'A pessoa que não possui imunidade suficiente contra determinado patógeno para resistir à infecção.',
    clinicalExamples: [
      'Pacientes idosos ou recém-nascidos prematuros',
      'Pacientes imunodeprimidos, em quimioterapia ou em pós-operatório extenso',
      'Pacientes internados em UTI com múltiplos dispositivos invasivos',
      'Pessoas com desnutrição ou comorbidades descompensadas (diabetes, insuficiência renal)'
    ],
    interruptionAction: 'Como proteger este elo:',
    nursingPractice: 'Vacinação em dia de pacientes e profissionais, suporte nutricional, controle glicêmico, remoção precoce de dispositivos invasivos desnecessários e vigilância ativa de infecções pela CCIH.'
  }
];

export const PATIENT_CHALLENGES: PatientChallenge[] = [
  {
    id: 1,
    situation: 'Você está no quarto do hospital e um profissional entra para verificar sua medicação na veia. Você percebe que ele ainda não higienizou as mãos antes do cuidado.',
    question: 'Qual é a melhor atitude para a sua segurança?',
    options: [
      {
        id: 'a',
        text: 'Ficar em silêncio por vergonha de incomodar o profissional.',
        isCorrect: false,
        explanation: 'Você tem todo o direito de ser protegido! Os profissionais de saúde apreciam e incentivam que pacientes e familiares lembrem sobre a higiene das mãos.'
      },
      {
        id: 'b',
        text: 'Perguntar educadamente: "Com licença, você já conseguiu higienizar as mãos hoje para me atender?"',
        isCorrect: true,
        explanation: 'Excelente! A Organização Mundial da Saúde estimula que pacientes e familiares façam essa pergunta gentil. Prevenir é um esforço conjunto e salva vidas!'
      },
      {
        id: 'c',
        text: 'Tentar desencaixar o soro você mesmo para não ser tocado.',
        isCorrect: false,
        explanation: 'Nunca mexa em soros ou cateteres! Isso pode causar lesões graves ou introduzir bactérias diretamente no seu sangue.'
      }
    ]
  },
  {
    id: 2,
    situation: 'O alarme do aparelho de soro (bomba de infusão) começou a apitar continuamente ao lado do seu leito.',
    question: 'O que o acompanhante ou o paciente deve fazer?',
    options: [
      {
        id: 'a',
        text: 'Apertar os botões do aparelho para tentar silenciar ou desligar o bipe.',
        isCorrect: false,
        explanation: 'Nunca aperte botões de aparelhos médicos! Desprogramar a taxa de infusão pode injetar medicação rápida demais ou interromper um medicamento vital.'
      },
      {
        id: 'b',
        text: 'Acionar a campainha de chamada da enfermagem e aguardar o técnico responsável chegar.',
        isCorrect: true,
        explanation: 'Perfeito! Somente a equipe de enfermagem tem o treinamento técnico para avaliar a causa do alarme (ex: ar na linha, término da infusão) e reprogramar com segurança.'
      },
      {
        id: 'c',
        text: 'Puxar o cabo de energia da tomada para parar o barulho.',
        isCorrect: false,
        explanation: 'Isso desliga o suporte de infusão do paciente e pode comprometer a medicação prescrita.'
      }
    ]
  },
  {
    id: 3,
    situation: 'Você sente vontade de tossir ou espirrar enquanto está sentado na poltrona do quarto hospitalar.',
    question: 'Qual é a etiqueta respiratória correta?',
    options: [
      {
        id: 'a',
        text: 'Cobrir a boca com as duas palmas das mãos desprotegidas.',
        isCorrect: false,
        explanation: 'Se você tossir nas mãos, as bactérias e vírus ficarão nelas e serão passados para tudo o que você tocar (grade da cama, controle, maçaneta).'
      },
      {
        id: 'b',
        text: 'Cobrir o nariz e a boca com a dobra interna do cotovelo/antebraço ou lenço descartável, e higienizar as mãos em seguida.',
        isCorrect: true,
        explanation: 'Corretíssimo! A etiqueta respiratória reduz a dispersão de secreções respiratórias e ajuda a evitar que as mãos sejam contaminadas.'
      },
      {
        id: 'c',
        text: 'Tossir livremente em direção ao chão.',
        isCorrect: false,
        explanation: 'A tosse e o espirro podem lançar secreções respiratórias no ambiente; por isso, cubra nariz e boca com lenço descartável ou a dobra do cotovelo e higienize as mãos em seguida.'
      }
    ]
  },
  {
    id: 4,
    situation: 'Você percebeu que o curativo na pele onde entra o cateter de soro do paciente começou a descolar e a pele está um pouco avermelhada.',
    question: 'Como agir nessa situação?',
    options: [
      {
        id: 'a',
        text: 'Passar uma pomada própria de casa que você trouxe na bolsa.',
        isCorrect: false,
        explanation: 'Nunca aplique remédios ou pomadas de fora do hospital sem a prescrição médica da equipe assistencial.'
      },
      {
        id: 'b',
        text: 'Colocar um esparadrapo comum trazido na bolsa sem higienizar as mãos.',
        isCorrect: false,
        explanation: 'Espadrapos não estéreis podem introduzir bactérias perigosas no orifício do cateter venoso.'
      },
      {
        id: 'c',
        text: 'Avisar imediatamente a equipe de enfermagem para que eles façam a avaliação e o novo curativo estéril.',
        isCorrect: true,
        explanation: 'Muito bem! A comunicação precoce de alterações na pele ou nos curativos permite agir rapidamente contra qualquer início de infecção.'
      }
    ]
  }
];

export const OFFICIAL_REFERENCES = [
  {
    institution: 'ANVISA',
    title: 'Segurança do Paciente em Serviços de Saúde: Higiene das Mãos (2026) — Volume 12',
    description: 'Manual oficial da Anvisa com orientações atualizadas sobre higiene simples, antisséptica, fricção com preparação alcoólica, punhos em unidades neonatais/pediátricas e monitoramento da prática.',
    url: 'https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/servicosdesaude/manuais/seguranadopacientecaderno12higienedasmos.pdf'
  },
  {
    institution: 'ANVISA',
    title: 'RDC nº 42, de 25 de outubro de 2010',
    description: 'Dispõe sobre a obrigatoriedade de disponibilização de preparação alcoólica para fricção antisséptica das mãos pelos serviços de saúde do país.',
    url: 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2010/res0042_25_10_2010.html'
  },
  {
    institution: 'ANVISA',
    title: 'RDC nº 222, de 28 de março de 2018',
    description: 'Regulamenta as boas práticas de gerenciamento dos resíduos de serviços de saúde, incluindo a classificação dos resíduos e a segregação conforme o PGRSS.',
    url: 'https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=9434&cod_modulo=310&link=S&numeroAto=00000222&orgao=RDC%2FDC%2FANVISA%2FMS&seqAto=000&tipo=RDC&valorAno=2018'
  },
  {
    institution: 'ANVISA / MINISTÉRIO DA SAÚDE',
    title: 'Protocolo para a Prática de Higiene das Mãos em Serviços de Saúde',
    description: 'Protocolo de referência para a implantação da higiene das mãos nos serviços de saúde.',
    url: 'https://www.gov.br/saude/pt-br/composicao/saes/seguranca-do-paciente/protocolos-de-seguranca-do-paciente/protocolo-higiene-das-maos.pdf/view'
  },
  {
    institution: 'ANVISA',
    title: 'Segurança do Paciente em Serviços de Saúde: Limpeza e Desinfecção de Superfícies',
    description: 'Referência para limpeza e desinfecção de superfícies e equipamentos, seleção de produtos e prevenção da transmissão cruzada.',
    url: 'https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/servicosdesaude/publicacoes/manual-de-limpeza-e-desinfeccao-de-superficies.pdf'
  },
  {
    institution: 'ANVISA / MINISTÉRIO DA SAÚDE',
    title: 'Nota Técnica Conjunta nº 01/2024 — Micobactérias não tuberculosas',
    description: 'Reforça a necessidade de saneantes regularizados e do cumprimento das instruções do fabricante, incluindo modo de uso e tempo de contato.',
    url: 'https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/servicosdesaude/notas-tecnicas/notas-tecnicas-vigentes/nota-tecnica-conjunta-anvisa_ms-mnt_mcr-dez-2024.pdf/%40%40download/file'
  },
  {
    institution: 'MINISTÉRIO DO TRABALHO E EMPREGO',
    title: 'Norma Regulamentadora NR-32',
    description: 'Item 32.2.4.3.2: luvas não substituem a higiene das mãos. Item 32.2.4.5, alínea b: vedação de adornos nos postos de trabalho. Itens 32.2.4.6 e seguintes: vestimentas de trabalho.',
    url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-paritaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-32-nr-32'
  },
  {
    institution: 'ORGANIZAÇÃO MUNDIAL DA SAÚDE (OMS / WHO)',
    title: 'WHO Guidelines on Hand Hygiene in Health Care',
    description: 'Diretrizes mundiais de referência sobre os cinco momentos para a higiene das mãos e técnicas de fricção antisséptica.',
    url: 'https://www.who.int/publications/i/item/9789241597906'
  },
  {
    institution: 'COFEN',
    title: 'Código de Ética dos Profissionais de Enfermagem',
    description: 'Referência ética para a prestação de assistência segura e livre de danos evitáveis.',
    url: undefined
  }
];
