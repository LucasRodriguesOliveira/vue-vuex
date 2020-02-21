import { 
  LISTAR_TAREFAS,
  CRIAR_TAREFA,
  DELETAR_TAREFA,
  EDITAR_TAREFA,
  SELECIONAR_TAREFA,
  SET_ERRO
} from './_mutattion-types';

export default {
  [LISTAR_TAREFAS]: (state, { tarefas }) => {
    state.tarefas = tarefas;
  },
  [CRIAR_TAREFA]: (state, { tarefa }) => {
    state.tarefas.push(tarefa);
  },
  [EDITAR_TAREFA]: (state, { tarefa }) => {
    const idx = state.tarefas.findIndex(t => t.id === tarefa.id);
    state.tarefas.splice(idx, 1, tarefa);
  },
  [DELETAR_TAREFA]: (state, { tarefa }) => {
    const idx = state.tarefas.findIndex(t => t.id === tarefa.id);
    state.tarefas.splice(idx, 1);
  },
  [SELECIONAR_TAREFA]: (state, { tarefa }) => {
    state.tarefaSelecionada = tarefa;
  },
  [SET_ERRO]: (state, { erro }) => {
    state.erro = erro;
  }
};