<template>
<b-container fluid>
  <div>
    <h1 class="text-center"> <b> <i> Bienvenido {{nombre}}</i></b></h1>

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
        es privada, lo cual quiere decir que las unica personas con acceso a los
        documentos que usted como autor publica, serán, 
        el evaluador al cuál sea asignado la evalución y el comite que es responsable del seguimiento.
        <br>
        Aquí en esta página podrá revisar el estado de sus propuetas publicadas y en caso de que se requiera 
        una correción podrá hacer la respectiva. 
      
      </b-card-text>
      <!-- <b-card-img  @click="app" style="max-width: 10rem;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"  >
          <b-card-text >
      </b-card-text>
      </b-card-img>
      <b-card-img  @click="app" style="max-width: 10rem;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"  ></b-card-img>-->
    </b-card>
  </div>
  </b-container>
</template>

<script>
import config from "../assets/config"

export default {
  layout: "autor",
  data() {
    return {
      nombre: ""
    };
  },
  methods: {
    assignar() {
    if(JSON.parse(localStorage.getItem("Autor")))
       this.nombre = ":" + JSON.parse(localStorage.getItem("Autor")).nombre;
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
