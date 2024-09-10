<template>
    <form action="" @submit="enviarForumulario($event)">
        <div>
            <input type="text" v-model="name">
        </div>
        <div>
            <input type="text" v-model="email">
        </div>
        <div>
            <Submit/>
        </div>
    </form>
</template>

<script>
import InputText from './form/InputText.vue';
import Submit from './form/Submit.vue';
export default {
    name: 'Form',
    components: {
        InputText,
        Submit
    },
    data(){
        return {
            name: "Arthur",
            email: "arthursartori27@gmail.com"
        }
    },
    methods: {
        enviarForumulario(e){

            e.preventDefault();
            console.log('enviarForumulario');
        }
    },
}
</script>


