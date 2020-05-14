<template>
  <b-container class="container">
    <h1>Evaluaciones Pendientes</h1>
    <b-table class="border border-danger text-center" responsive hover :items="lista_propuestas" :fields="fields"  head-variant="dark">
     <template v-slot:cell(archivo)="row2">
       <b-link  @click="descargar(row2)" class="hover">Descargar</b-link>
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
      url: "http://localhost:4000/api/evaluador/",
      pdf:'',
      byteCharacters:[],
      fields:[
        
         {
          key:'titulo',
          label:'Título',
        },
        'area',
        'facultad',
         {
          key:'tipo_publicacion',
          label:'Tipo publicación'
          
        },
          'archivo',
          {key:'acciones',
          class:'center'
          
          }
          ]
    };
  },
  methods: {
    evaluar_propuesta({ item }) {
      this.$router.push({
        path: "registroEvaluaciones",
        query: { idpub: item.idpub, eval: true, idrev: item.id }
      });
    },
    cargar_propuestas() {
      let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
      let token = evaluador.token;
      let ideval = evaluador.idevaluador;
      let pdf = "";
    

      Axios.get(
        `http://localhost:4000/api/evaluador/espera-evaluar/${ideval}`,
        { headers: { token } }
      )
        .then(res => {
          console.log(res.data)
          this.lista_propuestas = res.data.publicaciones.map(x => {
            var o = Object.assign({}, x); // asignar el campo acciones a todos los valores de la BD
            o.acciones = null;
            pdf = o.archivo;
            o.archivo = "laksdjasd"
            
            return o;
          });
          this.byteCharacters.push(this.base64ToArrayBuffer(pdf));

          
        
        })
        .catch(erro => {
          console.log(erro);
        });
    },
    corregir_propuesta({ item }) {
      this.$router.push({
        path: "registroEvaluaciones",
        query: { id: item.id, eval: false }
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
      var blob = new Blob([this.byteCharacters[row2.index]], { type: "application/pdf" }),//
      url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = "Correción"; //
      a.click();
    }
  }
};
</script>

<style></style>
