<template>
  <div>
    <h1 class="text-center"> <b> <i> Bienvenido : {{ nombre }}</i></b></h1>

    <b-card
      img-src="../images/Upload-pana.png"
      img-width="500"
      img-height="600"
      img-alt="Card image"
      img-right
      bg-variant="transparent"
      class="transparencia"
    >
      <b-card-text class="size">
        Recuerde que toda la información contenida y que será proporcionada aquí
        es privada, lo cual quiere decir que las unica persona con acceso a los
        documentos que usted como a autor publica solo podrá ser accedido por 
        implicaciones .
        <br />
        A continuación podrá descargar los dos diferentes formatos de
        evaluación:
      </b-card-text>
      <!-- <b-card-img  @click="app" style="max-width: 10rem;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"  >
          <b-card-text >
      </b-card-text>
      </b-card-img>
      <b-card-img  @click="app" style="max-width: 10rem;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"  ></b-card-img>-->
    </b-card>
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
      this.nombre = JSON.parse(localStorage.getItem("Autor")).nombre;
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

<style>
.size {
  font-size: 30px;
}
.transparencia {
  border-color: transparent !important;
}
</style>
