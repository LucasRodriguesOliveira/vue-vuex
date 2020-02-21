import * as TYPES from './_mutattion-types';
import * as ACTIONS from './_action-types';
import TarefasService from '../_services/tarefaService';

export default {
  [ACTIONS.LISTAR_TAREFAS]: async ({ commit }) => {
    const response = await TarefasService.getTarefas();
    commit(TYPES.LISTAR_TAREFAS, { tarefas: response.data });
  },
  [ACTIONS.CRIAR_TAREFA]: ({ commit }, { tarefa }) =>
    TarefasService.postTarefa(tarefa)
      .then(res => commit(TYPES.CRIAR_TAREFA, { tarefa: res.data }))
      .catch(err => commit(TYPES.SET_ERRO, { err })),
  [ACTIONS.EDITAR_TAREFA]: async ({ commit }, { tarefa }) => {
    try {
      const response = await TarefasService.putTarefa(tarefa);
      commit(TYPES.EDITAR_TAREFA, {
        tarefa: response.data
      });
    } catch(err) {
      commit(TYPES.SET_ERRO, { err });
    }
  },
  [ACTIONS.DELETAR_TAREFA]: async ({ commit }, { tarefa }) => {
    try {
      const response = await TarefasService.deleteTarefa(tarefa.id);
      commit(TYPES.DELETAR_TAREFA, { tarefa: response.data });
    } catch(err) {
      commit(TYPES.SET_ERRO, { err });
    }
  },
  [ACTIONS.CONCLUIR_TAREFA]: async ({ commit, dispatch }, payload) => {
    try {
      const tarefa = Object.assign({}, payload.tarefa);
      tarefa.concluido = !tarefa.concluido;
      dispatch(ACTIONS.EDITAR_TAREFA, { tarefa });
    } catch(err) {
      commit(TYPES.SET_ERRO, { err });
    }
  },
  [ACTIONS.SELECIONAR_TAREFA]: ({ commit }, payload) => {
    commit(TYPES.SELECIONAR_TAREFA, payload);
  },
  [ACTIONS.RESETAR_TAREFA]: ({ commit }) => {
    commit(TYPES.SELECIONAR_TAREFA, { tarefa: undefined });
  }
}