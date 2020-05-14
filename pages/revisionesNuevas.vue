<template>
  <b-container class="container">
    <h1>revisiones nuevas</h1>
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
        <b-button
          variant="outline-danger"
          size="sm"
          @click="asignar_propuesta(row)"
          class="mr-2 acciones"
          >Elegir evaluacion</b-button
        >
      </template>
    </b-table>
  </b-container>
</template>
.<style>
a:link{
color: red;
}
</style>
<script>
import Axios from "axios";
export default {
  layout: "evaluador",
  beforeMount() {
    this.cargar_propuestas();
  },
  data() {
    return {
      lista_propuestas: null,
      byteCharacters: new Map(),
      url: "http://localhost:4000/api/evaluador/",
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
    asignar_propuesta({ item }) {
      console.log(item);
      let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
      let token = evaluador.token;
      let ideval = evaluador.idevaluador;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + "/" + dd + "/" + yyyy;

      let data = this.archivo
      let formData = new FormData();

      formData.append("archivo", this.byteCharacters.get(item.id_publicacion));
     // body 
      
      formData.set("idevaluador","1001");
      formData.set("fechasubida",today),
      formData.set("idevaluador",ideval),
      formData.set("idpublicacion",item.id_publicacion),
      formData.set("estado",0),

      console.log(item);
      /*let propuesta = {
        fechasubida: today,
        idevaluador: ideval,
        idpublicacion: item.id,
        archivo: "algo por ahora", // item.archivo,
        estado: 0,
        archivo:this.byteCharacters[item.index]
      };*/
       Axios.post("http://localhost:4000/api/publicacion_rev", formData, {
        headers: { token }
      })
        .then(res => {
          console.log(res);
          /*let posicion = this.lista_bookmark.findIndex(
            prop => prop.id == item.id
          );
          this.lista_propuestas.splice(posicion, 1);*/
        })
        .catch(error => {
          console.log(error);
        });
    },
    cargar_propuestas() {
      let token = JSON.parse(localStorage.getItem("Evaluador")).token;
      Axios.get(this.url + "propuestas-nuevas", { headers: { token } })
        .then(res => {
          this.lista_propuestas = res.data.publicaciones.map(x => {
            var o = Object.assign({}, x); // asignar el campo acciones a todos los valores de la BD
            o.acciones = null;
           this.byteCharacters.set(x.id_publicacion,this.base64ToArrayBuffer(o.archivo));
          console.log(o.archivo )  
            return o;
          });
          console.log(this.lista_propuestas, "pro")
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
      var blob = new Blob([this.byteCharacters[row2.index]], {
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
