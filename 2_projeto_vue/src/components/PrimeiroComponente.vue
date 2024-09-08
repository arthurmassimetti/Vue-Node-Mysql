<template>
    <div>
        <h1>Olá Vue!</h1>
        <p>Meu nome é {{ nome }},e trabalho como: {{ profissao }}</p>
    </div>

</template>

<script> 
    import PrimeiroComponente from './PrimeiroComponente.vue'


    export default {
        name: "PrimeiroComponente",
        data() {
            return {
                nome:"Arthur",
                profissao: "programador"
            }
        },
        components: {PrimeiroComponente}
    }

</script>
