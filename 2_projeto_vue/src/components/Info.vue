<template>
    <div>
        <p v-if="esta_trabalhando">Estou trabalhando no momento.</p>
        <p v-else>Estou em busca de novas oportunidades</p>
        <p>Utilizo as seguintes tecnologias:</p>
        <ul>
            <li>Python</li>
            <li>Node.js</li>
            <li>Vue.js</li>
            <li>MySQL</li>
        </ul>
        <div>
            <button @click="showEmail">Mostrar e-mail</button>
        </div>
        <p v-show="mostrar_email">Mande uma mensagem para: {{ Email }}</p>
        <p>Para acesasr meu portifolio, <a v-bind:href="meu_link" target="_blank">basta clicar aqui</a></p>
        <Picture/>
    </div>
</template>
<script>
import Picture from './Picture.vue'


export default {
    name: "Info",
    components: {
        Picture
    },
    data() {
        return {
            esta_trabalhando: true,
            mostrar_email: false,
            Email: "arthursartori27@gmail.com",
            meu_link: "https://www.linkedin.com/in/arthurmassimetti/"
        }
    },
    methods: {
        showEmail() {
            console.log("testando método")
        }
    },
}
</script>
