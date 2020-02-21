<template>
  <div>
    <div class="row">
      <div class="col-sm-10">
        <h1 class="font-weight-light">Lista de Tarefas</h1>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-primary float-right"
          @click="exibirFormCriar">
          <i class="fa fa-plus mr-2"></i>
          <span>Criar</span>
        </button>
      </div>
    </div>

    <h3 class="font-weight-light mt-4">A Fazer ({{ tarefasAFazer.length }})</h3>
    <ul class="list-group" v-if="tarefasAFazer.length > 0">
      <TarefasListaItem
        v-for="tarefa in tarefasAFazer"
        :key="tarefa.id"
        :tarefa="tarefa"
        @editar="selecionarEdicao"
        @concluir="concluirTarefa({ tarefa: $event })"
        @deletar="confirmarRemocaoTarefa"/>
    </ul>

    <p v-else>Nenhuma tarefa a fazer.</p>

    <h3 class="font-weight-light mt-4">Concluídas ({{ totalConcluidas }})</h3>
    <ul class="list-group" v-if="totalConcluidas > 0">
      <TarefasListaItem
        v-for="tarefa in tarefasConcluidas"
        :key="tarefa.id"
        :tarefa="tarefa"
        @editar="selecionarEdicao"
        @concluir="concluirTarefa({ tarefa: $event })"
        @deletar="confirmarRemocaoTarefa"/>
    </ul>

    <p v-else>Nenhuma tarefa concluída.</p>

    <TarefaSalvar v-if="exibirFormulario"
      @salvar="salvarTarefa"/>
    
    <div class="alert alert-danger" v-if="erro">
      {{ erro.message }}
    </div>
  </div>
</template>

<script>
import Register from '../_store/_register';
import TarefaSalvar from './TarefaSalvar';
import TarefasListaItem from './TarefasListaItem';
import { createNamespacedHelpers } from 'vuex';
import {
  LISTAR_TAREFAS,
  CONCLUIR_TAREFA,
  DELETAR_TAREFA,
  RESETAR_TAREFA,
  SELECIONAR_TAREFA,
  CRIAR_TAREFA,
  EDITAR_TAREFA 
} from '../_store/_action-types';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('tarefas');

export default {
  components: {
    TarefaSalvar,
    TarefasListaItem
  },
  data() {
    return {
      exibirFormulario: false
    }
  },
  computed: {
    ...mapState([
      'tarefaSelecionada',
      'erro'
    ]),
    ...mapGetters([
      'tarefasAFazer',
      'tarefasConcluidas',
      'totalConcluidas'
    ])
  },
  created() {
    Register(this.$store);
    this.listarTarefas();
  },
  methods: {
    ...mapActions([
      LISTAR_TAREFAS,
      CONCLUIR_TAREFA,
      DELETAR_TAREFA,
      SELECIONAR_TAREFA,
      RESETAR_TAREFA,
      CRIAR_TAREFA,
      EDITAR_TAREFA
    ]),
    exibirFormCriar() {
      if(this.tarefaSelecionada) {
        this[RESETAR_TAREFA]();
        return;
      }

      this.exibirFormulario = !this.exibirFormulario;
    },
    selecionarEdicao(tarefa) {
      this.exibirFormulario = true;
      this[SELECIONAR_TAREFA]({ tarefa });
    },
    resetar() {
      this.exibirFormulario = false;
      this[RESETAR_TAREFA]();
    },
    confirmarRemocaoTarefa(tarefa) {
      const confirm = window.confirm(`Deseja deletar a tarefa "${tarefa.titulo}"?`);
      if(confirm) {
        this[DELETAR_TAREFA]({ tarefa });
      }
    },
    async salvarTarefa({ operation, tarefa }) {
      await this[operation]({ tarefa });
      this.resetar();
    }
  }
}
</script>