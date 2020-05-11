.<template>
  <b-container>
    <h1>Estado de la publicacion</h1>
    <b-table striped hover :items="publicacion_revisiones">
      <template v-slot:cell(acciones)="row">
        <div>
          <b-button
            variant="outline-danger"
            size="sm"
            v-if="registrar_revision"
            @click="ver_estado(row)"
            class="mr-2 acciones"
            >corregir</b-button
          >
          <b-button
            variant="outline-danger"
            size="sm"
            @click="corregir_propuesta(row)"
            class="mr-2 acciones"
            v-if="ver_eval"
            >Ver evaluación</b-button
          >
        </div>
      </template>
    </b-table>
    <h2 v-if="sin_revisar">sea paciente con su revision</h2>
  </b-container>
</template>

<script>
import Axios from "axios";
export default {
  layout: "autor",
  beforeMount(){
      this.cargar_estado()
  },
  data() {
    return {
      ver_eval: false,
      sin_revisar: false,
      registrar_revision: false,
      publicacion_revisiones: [],
      url: "http://localhost:4000/api/autor/"
    };
  },
  methods: {
    cargar_estado() {
      let evaluador = JSON.parse(localStorage.getItem("Autor"));
      let token = evaluador.token;
      let ideval = evaluador.idautor;
      let id_pub = this.$route.query.id_pub;
      Axios.get(this.url + `estado-obra/${id_pub}/${ideval}`, {
        headers: { token }
      })
        .then(res => {
          console.log(res);
          let aux = res.data.publicacion[0];
          let publicacion_revision = {};
          console.log(aux)
          publicacion_revision.estado = aux.estado;
          publicacion_revision.titulo = aux.titulo;
          
            
          if (aux.est === 1) {
            this.registrar_revision = true;
            publicacion_revision.plazo_maximo = aux.plazo_maximo;
            publicacion_revision.retroalimentacion = aux.retroalimentacion;
          } else if (aux.est === 2) {
            this.ver_eval = true;
            publicacion_revision.fecha_subida = aux.fecha_subida;
          } else {
            this.sin_revisar = true;
            publicacion_revision.fecha_subida = aux.fecha_subida;
          }
          publicacion_revision.acciones = null
          this.publicacion_revisiones.push(publicacion_revision);
          
        })
        .catch(erro => {
          console.log(erro);
        });
    }
  }
};
</script>

<style></style>
