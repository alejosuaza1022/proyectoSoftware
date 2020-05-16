<template>
  <div>
    <h1>Bienvenido : {{ nombre }}</h1>


   
  </div>
</template>

<script>
export default {
  layout: "autor",
  data() {
    return {
      nombre: ""
    };
  },
  methods: {
    assignar() {
      this.nombre = this.$route.query.nombre;
    },
    vmodal() {
      this.$bvModal.show("modal-1");
    },
    cerrar() {
      this.$bvModal.hide("modal-1");
    }
  },
  mounted() {
    this.assignar();
  }
};
</script>

<style></style>
