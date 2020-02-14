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
        @editar="selecionarEdicao"/>
    </ul>

    <p v-else>Nenhuma tarefa a fazer.</p>

    <h3 class="font-weight-light mt-4">Concluídas ({{ totalConcluidas }})</h3>
    <ul class="list-group" v-if="totalConcluidas > 0">
      <TarefasListaItem
        v-for="tarefa in tarefasConcluidas"
        :key="tarefa.id"
        :tarefa="tarefa"
        @editar="selecionarEdicao"/>
    </ul>

    <p v-else>Nenhuma tarefa concluída.</p>

    <TarefaSalvar v-if="exibirFormulario"
      :tarefa="tarefaSelecionada"/>
  </div>
</template>

<script>
import Register from '../_store/_register';
import TarefaSalvar from './TarefaSalvar';
import TarefasListaItem from './TarefasListaItem';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('tarefas');

export default {
  components: {
    TarefaSalvar,
    TarefasListaItem
  },
  data() {
    return {
      exibirFormulario: false,
      tarefaSelecionada: undefined
    }
  },
  computed: {
    ...mapState(['tarefas']),
    ...mapGetters([
      'tarefasAFazer',
      'tarefasConcluidas',
      'totalConcluidas'
    ])
  },
  created() {
    Register(this.$store);
    setTimeout(async () => await this.listarTarefas(), 1000);
  },
  methods: {
    ...mapActions(['listarTarefas']),
    exibirFormCriar() {
      if(this.tarefaSelecionada) {
        this.tarefaSelecionada = undefined;
        return;
      }

      this.exibirFormulario = !this.exibirFormulario;
    },
    selecionarEdicao(tarefa) {
      this.exibirFormulario = true;
      this.tarefaSelecionada = tarefa;
    },
    resetar() {
      this.exibirFormulario = false;
      this.tarefaSelecionada = undefined;
    }
  }
}
</script>