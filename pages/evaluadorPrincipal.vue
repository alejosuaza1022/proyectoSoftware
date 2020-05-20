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
             this.nombre =JSON.parse(localStorage.getItem("Evaluador")).nombre 
        }

    },
    beforeMount(){
   localStorage.removeItem("Pub_eval")
    },
    mounted(){
     
        this.assignar();
    }
    
    
}
</script>

<style>

</style>