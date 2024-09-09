<template>
  <div>
    <Header />
    <primeiro-componente/>
    <p class="paragrafo-pai">O dado de app é: {{ testando }}</p>
    <life-cycle/>
    <pessoa/>
    <Info/>
  </div>

</template>

<script>
import Header from './components/Header.vue';
import PrimeiroComponente from './components/PrimeiroComponente.vue';
import LifeCycle from './components/LifeCycle.vue';
import Pessoa from './components/Pessoa.vue';


  export default{
    name:"App",
    components: {
      PrimeiroComponente,
      LifeCycle,
      Pessoa,
      Header
    },
    data() {
      return {
        testando: "teste"
      }
    }
  }

</script>

<style>
body{
  background-color: #333;
  color: #fff
}

a{
  color: #1f1;
}

.teste{
  background-color: #000
}
</style>