<template>
  <b-container class="container">
    <h1>Revisión correciones</h1>
    <b-table striped hover :items="lista_propuestas">
      <template v-slot:cell(acciones)="row">
        <b-button
          variant="outline-danger"
          size="sm"
          @click="asignar_propuesta(row)"
          class="mr-2 acciones "
          >Elegir evaluacion</b-button
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
    asignar_propuesta({ item }) {
      let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
      let token = evaluador.token;
      let ideval = evaluador.idevaluador;
      let propuesta = {
        fechaevaluacion: "01/01/0001",
        organizacion: 0,
        estilo: 0,
        temporalidad: 0,
        aportesobras: 0,
        resultadofinal: 0,
        concepto: 0,
        idevaluador: ideval,
        idpublicacionrevision: item.id
      };
      Axios.post("http://localhost:4000/api/registro_eval", propuesta, {
        headers: { token }
      })
        .then(res => {
          console.log(res);
          let posicion = this.lista_bookmark.findIndex(
            prop => prop.id == item.id
          );
          this.lista_propuestas.splice(posicion, 1);
        })
        .catch(error => {
          console.log(error);
        });
    },
    cargar_propuestas() {
      let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
      let token = evaluador.token;
      let ideval = evaluador.idevaluador;
      Axios.get(this.url + `propuestas_en_revision/${ideval}`, { headers: { token } })
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
