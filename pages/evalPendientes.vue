<template>
  <b-container class="container">
    <h1>Evaluaciones pendientes</h1>
    <b-table
      class="border border-dark text-center"
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
        <div>
          <b-button
            variant="outline-danger"
            size="sm"
            @click="evaluar_propuesta(row)"
            class="mr-2 acciones"
            >Evaluar</b-button
          >
          <b-button
            variant="outline-danger"
            size="sm"
            @click="corregir_propuesta(row)"
            class="mr-2 acciones"
            >Correción</b-button
          >
        </div>
      </template>
    </b-table>
  </b-container>
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
        localStorage.removeItem("Pub_eval")
  },
  data() {
    return {
      lista_propuestas: null,
      url: `${config.url_api}/evaluador/`,
      pdf: "",
      byteCharacters: [],
      pub_autor: new Map(),
      byteCharacters: new Map(),
      fields: [
        {
          key: "titulo",
          label: "Título"
        },
        "area",
        "facultad",
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
    evaluar_propuesta({ item }) {
      localStorage.setItem("Pub_eval",this.pub_autor.get(item.id));
      this.$router.push({
        path: "registroEvaluaciones",
        query: { idpub: item.idpub, eval: true, idrev: item.id, nombre: item.nombre, correo: item.correo, titulo: item.titulo }
      });
    },
    cargar_propuestas() {
      let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
      let token = evaluador.token;
      let ideval = evaluador.idevaluador;
      let pdf = "";

      Axios.get(
        `${this.url}espera-evaluar/${ideval}`,
        { headers: { token } }
      )
        .then(res => {
          console.log(res.data);
          this.lista_propuestas = res.data.publicaciones.map(x => {
            var o = Object.assign({}, x); // asignar el campo acciones a todos los valores de la BD
            o.acciones = null;
            pdf = o.archivo;
            o.archivo = "laksdjasd";
          this.byteCharacters.set(x.idpub,this.base64ToArrayBuffer(pdf));
            
            return o;
          });
        })
        .catch(erro => {
          console.log(erro);
        });
    },
    corregir_propuesta({ item }) {
      console.log(item,this.pub_autor)
      let info = {id_publicacion:item.idpub,id_autor:item.id_autor,correo:item.correo}  
      localStorage.setItem("Pub_eval",JSON.stringify(info));
      this.$router.push({
        path: "registroEvaluaciones",
        query: { id: item.id, eval: false, nombre: item.nombre, titulo: item.titulo, correo: item.correo }
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

      var blob = new Blob([this.byteCharacters.get(row2.item.idpub)], {
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

<style>
.bcard {
  margin-top: 30px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  -webkit-box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
  -moz-box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
  box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
}

</style>
