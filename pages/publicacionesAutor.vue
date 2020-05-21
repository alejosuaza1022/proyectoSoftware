<template>
  <div>
    <b-container class="container">
      <h1>Publicaciones aceptadas por el comité</h1>
      <b-table class="border border-dark text-center" responsive hover  head-variant="dark" :fields="fields" :items="lista_propuestas">
        <template v-slot:cell(acciones)="row">
          <div>
            <b-button
              variant="outline-danger"
              size="sm"
              @click="ver_estado(row)"
              class="mr-2 acciones"
              >Ver estado</b-button
            >
          </div>
        </template>
      </b-table>
    </b-container>
    
  </div>
</template>

<script>
import Axios from "axios";
import config from "../assets/config"

export default {
  layout: "autor",
  beforeMount() {
    this.cargar_propuestas()
  },
  data() {
    return {
      lista_propuestas: null,
      url: `${config.url_api}/autor/`,
       fields:[
         {
          key:'id_publicacion',
          label:'Id publicación',
          variant:'dark'
         },
         {
          key:'titulo',
          label:'Título',
        },
        'facultad',
         {
          key:'tipo_publicacion',
          label:'Tipo publicación'
          
        },
        'area',
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
      let evaluador = JSON.parse(localStorage.getItem("Autor"));
      let token = evaluador.token;
      let ideval = evaluador.idautor;
      Axios.get(this.url + `obras-autor/${ideval}`, { headers: { token } })
        .then(res => {
          console.log(res);
          this.lista_propuestas = res.data.publicacion.map(x => {
            var o = Object.assign({}, x); // asignar el campo acciones a todos los valores de la BD
            o.acciones = null;
            return o;
          });
        })
        .catch(erro => {
          console.log(erro);
        });

    },
    ver_estado({ item }) {
      this.$router.push({
        path: "estadoPublicaciones",
        query: { id_pub: item.id_publicacion}
      });
    },
  }
};
</script>

<style></style>
