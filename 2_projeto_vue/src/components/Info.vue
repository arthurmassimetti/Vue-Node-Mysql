<template>
  <div>
    <p v-if="esta_trabalhando">Estou trabalhando no momento.</p>
    <p v-else>Estou em busca de novas oportunidades</p>
    
    <p>Utilizo as seguintes tecnologias para backend:</p>
    <ul>
      <li v-for="(technology, index) in backend_technologies" :key="index">{{ technology }}</li>
    </ul>
    
    <p>Utilizo as seguintes tecnologias para Front-End</p>
    <ul>
      <li v-for="technology in frontend_technologies" :key="technology.id">{{ technology.language }}</li>
    </ul>
    
    <div>
      <button @click="showEmail">{{ textoBotao }}</button>
    </div>
    
    <p v-show="mostrar_email">Mande uma mensagem para: {{ Email }}</p>
    
    <p class="teste">
      Para acessar meu portfólio, <a :href="meu_link" target="_blank">basta clicar aqui</a>
    </p>
    
    <Picture />
  </div>
</template>

<script>
import Picture from './Picture.vue'

export default {
  name: 'Pessoa',
  components: {
    Picture
  },
  data() {
    return {
      esta_trabalhando: true,
      backend_technologies: ['Node.js', 'Express', 'MongoDB'],
      frontend_technologies: [
        { id: 1, language: 'HTML' },
        { id: 2, language: 'CSS' },
        { id: 3, language: 'JavaScript' },
      ],
      mostrar_email: false,
      Email: 'arthur@example.com',
      meu_link: 'https://meuportifolio.com',
      textoBotao: 'Mostrar Email',
    };
  },
  methods: {
    showEmail() {
      this.mostrar_email = !this.mostrar_email;
    }
  }
};
</script>

<style scoped>
.teste {
  color: #333;
}
</style>
