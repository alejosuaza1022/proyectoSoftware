<template>
  <div>
    <div>
      <b-card
        img-src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 25rem;"
        class="mb-2 card-pdf"
      >
        <b-card-text>
          por favor adjunte su pdf correción aquí
        </b-card-text>

        <b-form-file
          accept=".pdf"
          class="upload-file"
          v-model="archivo"
          :state="Boolean(archivo)"
          placeholder="Seleccione su archivo..."
          drop-placeholder="Drop file here..."
          @input="validar"
        ></b-form-file>

        <b-button
          variant="outline-danger"
          @click="actualizarFoto"
          class="upload-file margin"
          >Cargar Documento</b-button
        >
      </b-card>
    </div>
    <div id="oelo"></div>
  </div>
</template>
<style>
.upload-file {
  border-radius: 10px;
  padding: 10px;
}
.card-pdf {
  margin: 20px;
}
.margin {
  margin-top: 5px;
}
</style>
<script>
import Axios from "axios";

export default {


  data() {
    return {
      archivo: null,
      tmppath:'',
      b:false
    };
  },
  methods: {
    actualizarFoto() {
    
      let url = "http://localhost:4000/api/publicacion_rev/";
      let data = this.archivo
      let formData = new FormData();
      formData.append("archivo", data);
      formData.set("idpublicacion",4);
      formData.set("idevaluador","1001");
      formData.set("fechasubida","05/24/2020")
      Axios.post(url, formData)
        .then(respuesta => {
          console.log(respuesta.data);
        })
        .catch(error => {});
    },
    validar(){
      this.tmppath = URL.createObjectURL(this.archivo);
    }

    /*if(!this.archivo.name.includes(".pdf")){
          alert.show("solo pdf")
      }*/
  }
};
</script>
