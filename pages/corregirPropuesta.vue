<template>
  <div>
    <b-modal
      id="modal-2"
      :header-bg-variant="model_header_color"
      :body-text-variant="model_tbody_color"
      header-class="text-center"
      body-class="text-center"
      title="Udem dice"
      ok-only
    >
      <h4>
        {{ message }}
      </h4>
      <template v-slot:modal-footer>
        <b-button
          variant="outline-success"
          size="sm"
          class="float-right"
          @click="aceptar1"
        >
          Aceptar
        </b-button>
      </template>
    </b-modal>
    <b-modal
      id="modal-1"
      header-bg-variant="danger"
      body-text-variant="danger"
      header-class="text-center"
      body-class="text-center"
      title="¡ADVERTENCIA!"
    >
      <h4>
        ¿Seguro que desea cargar este documento?, Recuerde que si desea
        cambiarlo, deberá hablar con el administrador
      </h4>

      <p class="my-4"></p>
      <template v-slot:modal-footer>
        <div class="w-200">
          <b-button
            variant="outline-danger"
            size="sm"
            class="float-right"
            @click="aceptar"
          >
            Aceptar
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            class="float-md-right"
            @click="cancelar"
          >
            Cancelar
          </b-button>
        </div>
      </template>
    </b-modal>
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
          Por favor adjunte su pdf correción aquí
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
          @click="mostrar"
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
      b: false,
      model_header_color: "",
      model_tbody_color: "",
      message: "",
      eval_correo: "",
      eval_nombre: ""
    };
  },
  mounted() {
    let idEval = this.$route.query.id_e
    let url = `http://localhost:4000/api/evaluador/${idEval}`
    let autor = JSON.parse(localStorage.getItem("Autor"))
    let token = autor.token
    Axios.get(url, {headers: {token}})
    .then(res =>{
      this.eval_correo = res.data.evaluador.correo
      this.eval_nombre = res.data.evaluador.nombre
    }).catch(error =>{
      console.log(error)
    })

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
      let id_pub = this.$route.query.id_pub;
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
          this.retroalimentacion = null;
          this.message = " Retroalimentación agregada con exito ";
          this.model_header_color = "success";
          this.model_tbody_color = "dark";
          this.$bvModal.show("modal-2");
          console.log(respuesta.data);
        })
        .catch(error => {
          console.log(error)
          this.message =
            " Se ha producido un error, por favor intente más tarde. Revise la fecha limite " ;
          this.model_header_color = "danger";
          this.model_tbody_color = "danger  ";
          this.$bvModal.show("modal-2");
        });

        let notificación = {
                template: "correccionAutor",
                publicacion: this.$route.query.titulo,
                to: this.eval_correo,
                nombre: this.eval_nombre,
                subject: "Corrección de una propuesta"
            }
        Axios.post("http://localhost:4000/api/mail", notificación)
            .then(res =>{
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    },
    validar() {
      this.tmppath = URL.createObjectURL(this.archivo);
    },
    aceptar1() {
      this.$bvModal.hide("modal-2");
      this.$router.push({
        path: "publicacionesAutor"
      });
    },
    aceptar() {
      this.$bvModal.hide("modal-1");
      this.actualizar_correcion();
    },
    mostrar() {
      this.$bvModal.show("modal-1");
    },

    cancelar() {
      this.$bvModal.hide("modal-1");
    }

    /*if(!this.archivo.name.includes(".pdf")){
          alert.show("solo pdf")
      }*/
  }
};
</script>
