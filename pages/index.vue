<template>
  <div class="content" >
    <b-container class="container">
        <h1 class="title1">Gestión de evaluación</h1>
        <h2 class="subtitle text-center">Plataforma para todo lo referente a la evaluación de nuevas propuestas de publicación</h2>
    </b-container>
  </div>
</template>

<script>

export default {
  beforeMount(){
    localStorage.clear()
  }

};
</script>

<style>
    .container {
      margin: 0 auto;
      min-height: 50vh;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 100px 75px;
    }

    .title1 {
      font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      display: block;
      font-weight: 300;
      font-size: 100px;
      color: #651519;
      letter-spacing: 1px;
      border: black;
    }

    
    
    .subtitle {
      font-weight: 300;
      font-size: 42px;
      color: #920424;
      word-spacing: 5px;
      padding-bottom: 15px;
    }

    .links {
      padding-top: 15px;
    }
</style>
