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