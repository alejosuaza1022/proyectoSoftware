<template>
  <div>
    <div>
      <b-card
        img-src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
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
          @click="actualizar_correcion"
          class="upload-file margin"
          >Cargar Documento</b-button
        >
      </b-card>
    </div>
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
  layout: "autor",

  data() {
    return {
      archivo: null,
      tmppath: "",
      b: false
    };
  },
  methods: {
    actualizar_correcion() {
      let url = "http://localhost:4000/api/publicacion_rev/";
      let data = this.archivo;
      let formData = new FormData();
      formData.append("archivo", data);
      let evaluador = JSON.parse(localStorage.getItem("Autor"));
      let token = evaluador.token;
      let id_eval = this.$route.query.id_e;
      let id_pub = this.$route.query.id_pub
      // body
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + "/" + dd + "/" + yyyy;
      formData.set("idpublicacion", id_pub);
      formData.set("idevaluador", id_eval);
      formData.set("fechasubida", today);
      Axios.post(url, formData)
        .then(respuesta => {
          console.log(respuesta.data);
        })
        .catch(error => {});
    },
    validar() {
      this.tmppath = URL.createObjectURL(this.archivo);
    }

    /*if(!this.archivo.name.includes(".pdf")){
          alert.show("solo pdf")
      }*/
  }
};
</script>
