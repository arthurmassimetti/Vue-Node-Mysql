<template>
    <div>
        <h2>Está é a descrição do: {{ nome }}</h2>
        <info />
        <Form />
    </div>
</template>

<script>
import Info from './Info.vue';
import Form from './Form.vue';

export default {
    name: "Pessoa",
    components: {
        Info,
        Form
    },
    data() {
        return {
            nome: "Arthur"
            }
        }
    }
</script>
