<template>
  <b-container class="container">
    <h1>Evaluaciones Pendientes</h1>
    <b-table striped hover :items="lista_propuestas">
      <template v-slot:cell(acciones)="row">
        <b-button
          variant="outline-danger"
          size="sm"
          @click="evaluar_propuesta(row)"
          class="mr-2 acciones"
          >Evaluar</b-button
        >
      </template>
    </b-table>
  </b-container>
</template>

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
      url: "http://localhost:4000/api/evaluador/"
    };
  },
  methods: {
    evaluar_propuesta({ item }) {
       this.$router.push({ path: "registroEvaluaciones", query: { idpubr: item.idpublicacionrevision,idput: item.id} });
    },
    cargar_propuestas() {
      let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
      let token = evaluador.token;
      let ideval = evaluador.idevaluador;
      Axios.get(
        `http://localhost:4000/api/evaluador/obtener_en_espera_evaluar/${ideval}`,
        { headers: { token } }
      )
        .then(res => {
          this.lista_propuestas = res.data.publicaciones.map(x => {
            var o = Object.assign({}, x); // asignar el campo acciones a todos los valores de la BD
            o.acciones = null;
            return o;
          });
        })
        .catch(erro => {
          console.log(erro);
        });
    }
  }
};
</script>

<style></style>
