<template>
  <div>
    <h2 class="font-weight-light">Contador: {{ contador }}</h2>
    <h4 class="font-weight-light">ContadorAlias: {{ contadorAlias }}</h4>
    <h4 class="font-weight-light">ContadorMultiplicado: {{ contadorMultiplicado }}</h4>
    <button class="btn btn-lg btn-danger mr-1" @click="decrementar">-</button>
    <button class="btn btn-lg btn-success" @click="incrementar">+</button>
  </div>
</template>

<script>
import Register from '../_store/_register';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      contadorLocal: 2
    }
  },
  created() {
    Register(this.$store);
  },
  computed: { 
    ...mapState('contador', {
      contador: state => state.contador,
      contadorAlias: state => state.contador,
      contadorMultiplicado(state) {
        return state.contador * this.contadorLocal;
      }
    }),
  },
  methods: {
    decrementar() {
      this.$store.state.contador.contador--;
    },
    incrementar() {
      this.$store.state.contador.contador++;
    }
  }
}
</script>