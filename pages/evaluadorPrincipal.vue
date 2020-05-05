<template>
   <h1>Bienvenido : {{nombre}}</h1>
   
</template>

<script>
export default {
    layout:"evaluador",
     data(){
         return{
             nombre:''
         }
    },
    methods:{
        assignar(){
            this.nombre = this.$route.query.nombre
        }

    },
    mounted(){
        this.assignar();
    }
    
    
}
</script>

<style>

</style>