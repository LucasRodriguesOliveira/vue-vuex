export default {
  buscarTarefas: () => {
    const tarefas = [
      { id: 1, titulo: 'Aprender Vue', concluido: true },
      { id: 2, titulo: 'Aprender Vue Router', concluido: true },
      { id: 3, titulo: 'Aprender Vuex', concluido: false }
    ];
    return new Promise(res => {
      setTimeout(() => {
        res(tarefas);
      }, 2000);
    });
  },
  listarTarefas: async ({ commit, dispatch }) => {
    const tarefas = await dispatch('buscarTarefas');
    commit('listarTarefas', { tarefas });
    dispatch('logar', 'Lucas Oliveira', { root: true });
  }
}