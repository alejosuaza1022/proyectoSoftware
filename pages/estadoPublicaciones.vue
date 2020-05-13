.<template>
  <b-container>
    <h1>Estado de la publicacion</h1>
    <b-table
      class="border border-danger text-center"
      responsive
      hover
      head-variant="dark"
      :items="publicacion_revisiones"
    >
      <template v-slot:cell(retroalimentacion)="row2">
        <b-link @click="descargar(row2)" class="hover">Descargar</b-link>
      </template>

      <template v-slot:cell(acciones)="row">
        <div>
          <b-button
            variant="outline-danger"
            size="sm"
            v-if="registrar_revision"
            @click="registrar_rev(row)"
            class="mr-2 acciones"
            >corregir</b-button
          >
          <b-button
            variant="outline-danger"
            size="sm"
            @click="ver_evalacuacion(row)"
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
<style>
a:link {
  color: red;
}
</style>
<script>
import Axios from "axios";
export default {
  layout: "autor",
  beforeMount() {
    this.cargar_estado();
  },
  data() {
    return {
      ver_eval: false,
      sin_revisar: false,
      registrar_revision: false,
      byteCharacters: [],
      retroalimentacion: null,
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
          let aux = res.data.publicacion[0];
          let publicacion_revision = {};
          publicacion_revision.estado = aux.estado;
          publicacion_revision.titulo = aux.titulo;

          if (aux.est === 1) {
            this.registrar_revision = true;
            publicacion_revision.plazo_maximo = aux.plazo_maximo;
            console.log(aux.retroalimentacion);
            this.byteCharacters.push(
              this.base64ToArrayBuffer(aux.retroalimentacion)
            );
            publicacion_revision.retroalimentacion = null;
          } else if (aux.est === 2) {
            this.ver_eval = true;
            publicacion_revision.fecha_subida = aux.fecha_subida;
          } else {
            this.sin_revisar = true;
            publicacion_revision.fecha_subida = aux.fecha_subida;
          }
          publicacion_revision.acciones = null;
          this.publicacion_revisiones.push(publicacion_revision);
        })
        .catch(erro => {
          console.log(erro);
        });
    },
    ver_evalacuacion({ item }) {},
    registrar_rev({ item }) {
      this.$router.push("corregirPropuesta");
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
