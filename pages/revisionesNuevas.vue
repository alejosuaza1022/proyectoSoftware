<template>
  <div>
    <div>
      <b-container class="container">
        <h1>Publicaciones Nuevas</h1>
        <b-table
          class="border border-dark text-center "
          responsive
          hover
          :items="lista_propuestas"
          :fields="fields"
          head-variant="dark"
        >
          <template v-slot:cell(archivo)="row2">
            <b-link @click="descargar(row2)" class="hover">Descargar</b-link>
          </template>
          <template v-slot:cell(acciones)="row">
            <b-button
              variant="outline-danger"
              size="sm"
              @click="abrir_model(row)"
              class="mr-2 acciones"
              >Elegir evaluación</b-button
            >
          </template>
        </b-table>
      </b-container>
    </div>
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
        ¿Está seguro que desea continuar?, recuerde que una vez elegida una
        publicación, deberá hablar con los administradores para poder hacer el
        respectivo cambio
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
  </div>
</template>
.<style>
a:link {
  color: red;
}
</style>
<script>
import Axios from "axios";
import config from "../assets/config"
export default {
  layout: "evaluador",
  beforeMount() {
    this.cargar_propuestas();
  },
  data() {
    return {
      lista_propuestas: null,
      byteCharacters: new Map(),
      aux_item: null,
      model_header_color: "",
      model_tbody_color: "",
      message: "",
      url: `${config.url_api}/evaluador/`,
      fields: [
        {
          key: "titulo",
          label: "Título"
        },
        "Area",
        "Facultad",
        {
          key: "tipo_publicacion",
          label: "Tipo publicación"
        },
        "archivo",
        { key: "acciones", class: "center" }
      ]
    };
  },
  methods: {
    asignar_propuesta(item) {
      console.log(item);
      let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
      let token = evaluador.token;
      let ideval = evaluador.idevaluador;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + "/" + dd + "/" + yyyy;
      var blob = new Blob([this.byteCharacters.get(item.id_publicacion)], {
        type: "application/pdf"
      });
      let data = this.archivo;
      let formData = new FormData();

      formData.append("archivo", blob);
      formData.set("fechasubida", today),
        formData.set("idevaluador", ideval),
        formData.set("idpublicacion", item.id_publicacion),
        formData.set("estado", 0),
        Axios.post(config.url_api+"/publicacion_rev", formData, {
          headers: { token }
        })
          .then(res => {
            this.message = " Publicación asignada correctamente ";
            this.$bvModal.show("modal-2");
            this.model_header_color = "success";
            this.model_tbody_color = "dark";
            this.lista_propuestas.splice(item.index, 1);
          })
          .catch(error => {
            this.message =
              " Se ha producido un error, por favor intente más tarde";
            this.model_header_color = "danger";
            this.model_tbody_color = "danger  ";
            this.$bvModal.show("modal-2");
            console.log(error);
          });
    },
    aceptar() {
      this.asignar_propuesta(this.aux_item);
      this.$bvModal.hide("modal-1");
    },
    cancelar() {
      this.aux_item = null;
      this.$bvModal.hide("modal-1");
    },
    abrir_model({ item }) {
      this.aux_item = item;
      this.$bvModal.show("modal-1");
    },
    cargar_propuestas() {
      let token = JSON.parse(localStorage.getItem("Evaluador")).token;
      Axios.get(this.url + "propuestas-nuevas", { headers: { token } })
        .then(res => {
          this.lista_propuestas = res.data.publicaciones.map(x => {
            var o = Object.assign({}, x); // asignar el campo acciones a todos los valores de la BD
            o.acciones = null;

            this.byteCharacters.set(
              x.id_publicacion,
              this.base64ToArrayBuffer(o.archivo)
            );

            return o;
          });
          console.log(this.lista_propuestas, "pro");
        })
        .catch(erro => {
          console.log(erro);
        });
    },
    base64ToArrayBuffer: function(base64) {
      var binaryString = window.atob(base64);
      var binaryLen = binaryString.length;
      var bytes = new Uint8Array(binaryLen);
      for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes;
    },
    descargar: function(row2) {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      var blob = new Blob([this.byteCharacters.get(row2.item.id_publicacion)], {
          type: "application/pdf"
        }), //
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = "Correción"; //
      a.click();
    }
  }
};
</script>

<style></style>
