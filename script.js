document.getElementById("form-agendamento").addEventListener("submit", function (e) {
  e.preventDefault();

  const templateParams = {
    nome: this.nome.value,
    telefone: this.telefone.value,
    data: this.data.value,
    hora: this.hora.value,
    servico: this.servico.value,
  };

  emailjs.send("service_at6ffvw", "template_w4es10q", templateParams)
    .then(function(response) {
      alert("Agendamento enviado com sucesso!");
      e.target.reset(); // Limpa os campos do formulário
    }, function(error) {
      alert("Erro ao enviar agendamento. Verifique os dados.");
      console.error(error);
    });
});
document.getElementById("form-agendamento").addEventListener("submit", function (e) {
  e.preventDefault();

  const dataSelecionada = new Date(this.data.value);
  const diaSemana = dataSelecionada.getDay(); // 0 = Domingo

  if (diaSemana === 0) {
    alert("Agendamentos não são permitidos aos domingos.");
    return;
  }

  const templateParams = {
    nome: this.nome.value,
    telefone: this.telefone.value,
    data: this.data.value,
    hora: this.hora.value,
    servico: this.servico.value,
  };

  emailjs.send("service_at6ffvw", "template_w4es10q", templateParams)
    .then(function(response) {
      alert("Agendamento enviado com sucesso!");
      e.target.reset();
      atualizarHorarios(); // Recarrega horários válidos
    }, function(error) {
      alert("Erro ao enviar agendamento. Verifique os dados.");
      console.error(error);
    });
});

// Bloquear domingos ao escolher a data e atualizar horários válidos
document.getElementById("data").addEventListener("input", function () {
  const dataSelecionada = new Date(this.value);
  if (dataSelecionada.getDay() === 0) {
    alert("Domingos estão indisponíveis para agendamento.");
    this.value = "";
    atualizarHorarios(); // Limpa horários
    return;
  }
  atualizarHorarios();
});

// Atualiza os horários disponíveis com base no dia da semana
function atualizarHorarios() {
  const dataInput = document.getElementById("data").value;
  const selectHora = document.getElementById("hora");

  // Limpa opções
  selectHora.innerHTML = '<option value="">Escolha um horário</option>';

  if (!dataInput) return;

  const dataSelecionada = new Date(dataInput);
  const diaSemana = dataSelecionada.getDay();

  // Segunda a sexta: 09:00 às 17:00 (exceto 12:00, 13:00)
  const horariosSemana = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  // Sábado: 09:00 às 14:00 (sem pausa)
  const horariosSabado = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

  const horariosValidos = (diaSemana === 6) ? horariosSabado : horariosSemana;

  horariosValidos.forEach(horario => {
    const option = document.createElement("option");
    option.value = horario;
    option.textContent = horario;
    selectHora.appendChild(option);
  });
}
