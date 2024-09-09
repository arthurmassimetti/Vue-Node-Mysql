<template>
    <form action="" @submit="enviarForumulario($event)">
        <div>
            <InputText/>
        </div>
        <div>
            <InputText/>
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
    methods: {
        enviarForumulario(e){

            e.preventDefault();
            
            console.log('enviarForumulario');
        }
    },
}
</script>


