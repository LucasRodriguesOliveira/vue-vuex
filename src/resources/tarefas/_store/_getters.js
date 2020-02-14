export default {
  tarefasConcluidas: state => state.tarefas.filter(t => t.concluido),
  tarefasAFazer: state => state.tarefas.filter(t => !t.concluido),
  totalConcluidas: (...p) => p[1].tarefasConcluidas.length,
  buscarTarefaPorId: state => id => state.tarefas.find(t => t.id === id),
  boasVindas: (...p) => p[3].mensagemBoasVindas
};