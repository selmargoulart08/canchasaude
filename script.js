const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".item");
const maxItems = items.length;
const myObserver = new IntersectionObserver((entries) => {
  entries.forEach( (entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('.show')
    }
  })
})

const elements = document.querySelectorAll('.hidden')

elements.forEach((element) => myObserver.observe(element))

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    isLeft = e.target.classList.contains("arrow-left");

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    items[currentItem].scrollIntoView({
      behavior: "smooth",
      inline: "center"
    });

    items[currentItem].classList.add("current-item");
  });
});
// Função para preencher a tabela com os horários e descrição dos jogos
function popularCalendario() {
  const tabelaCalendario = document.querySelector('.calendario table tbody');

  // Loop para os horários das 16h às 2h da manhã (24 horas)
  for (let hora = 16; hora <= 26; hora++) {
    const row = tabelaCalendario.insertRow();

    // Célula do horário
    const horaCell = row.insertCell();
    horaCell.textContent = hora % 24 + ':00'; // Exibe no formato 00:00

    // Loop para os dias da semana (7 dias)
    for (let dia = 1; dia <= 7; dia++) {
      const jogo = obterJogo(hora % 24, dia); // Função para obter o jogo se houver para esse horário e dia

      // Célula do jogo
      const jogoCell = row.insertCell();
      if (jogo) {
        jogoCell.textContent = jogo.descricao;

        // Adiciona um atributo de título para exibir o horário completo e a descrição ao passar o mouse
        jogoCell.setAttribute('title', `Horário: ${hora % 24}:00\nDescrição: ${jogo.descricao}`);
      } else {
        // Célula vazia (horário vago) - adicione a classe 'horario-vago' para estilização
        jogoCell.classList.add('horario-vago');
      }
    }
  }
}

// Função fictícia para obter o jogo com base no horário (0-23) e dia da semana (1-7)
function obterJogo(hora, dia) {
  // Aqui você pode implementar a lógica para obter os jogos com base em dados reais ou dados fornecidos
  // Neste exemplo, a função retorna um objeto com a descrição do jogo se houver, ou null para horários vagos
  const jogos = [
    { hora: 16, dia: 2, descricao: 'Jogo de Futsal' },
    { hora: 18, dia: 4, descricao: 'Jogo de Futvôlei' },
    // Adicione mais entradas conforme necessário
  ];
  return jogos.find((jogo) => jogo.hora === hora && jogo.dia === dia) || null;
}

// Chama a função para preencher a tabela do calendário ao carregar a página
popularCalendario();
