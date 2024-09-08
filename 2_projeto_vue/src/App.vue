<template>
  <div>
    <primeiro-componente/>
    <p>O dado de app é: {{ testando }}</p>
    <life-cycle/>
    <pessoa/>
    <Info/>
  </div>

</template>

<script>
import PrimeiroComponente from './components/PrimeiroComponente.vue'
import LifeCycle from './components/LifeCycle.vue'
import Pessoa from './components/Pessoa.vue'

  export default{
    name:"App",
    components: {
      PrimeiroComponente,
      LifeCycle,
      Pessoa
    },
    data() {
      return {
        testando: "teste"
      }
    }
  }

</script>