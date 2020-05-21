<template>
  <div>
    <h1 class="text-center">
      <b>
        <i> Bienvenido {{ nombre }}</i></b
      >
    </h1>
    <b-card
      img-src="../images/Search-amico.png"
      img-width="500"
      img-height="600"
      img-alt="Card image"
      img-right
      bg-variant="transparent"
      class="transparencia"
    >
      <b-card-text class="size">
        Recuerde que toda la información contenida y que será proporcionada aquí
        es privada, lo cual quiere decir que la unica persona con acceso a los
        documentos que los autores publican es usted, todas estan sometidas a
        derechos de autor, el caso omiso a estas observación tendra
        implicaciones .
        <br />
        A continuación podrá descargar los dos diferentes formatos de
        evaluación:
      </b-card-text>
      <b-card-group :columns="bool" class="group">
        <b-card
          no-body
          :bg-variant="bgcard2"
          img-src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
          img-alt="Image"
          img-bottom
          style="max-width: 7rem;"
          class="margen2 transparencia"
          @click="descargar(1)"
          v-b-hover="callback1"
        >
          <b-card-text class="text-center">
            <b>Primer formato</b>
          </b-card-text>
        </b-card>
        <b-card
          no-body
          :bg-variant="bgcard"
          img-src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
          img-alt="Image"
          img-bottom
          style="max-width: 7rem;"
          class="margen2 transparencia"
          @click="descargar(2)"
          v-b-hover="callback"
        >
          <b-card-text class="text-center">
            <b> Segundo formato</b>
          </b-card-text>
        </b-card>
        <!-- <b-card-img  @click="app" style="max-width: 10rem;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"  >
          <b-card-text >
      </b-card-text>
      </b-card-img>
      <b-card-img  @click="app" style="max-width: 10rem;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"  ></b-card-img>-->
      </b-card-group>
    </b-card>
  </div>
</template>

<script>
import pdf from "../assets/archivos";
export default {
  layout: "evaluador",
  data() {
    return {
      nombre: "",
      bool: true,
      bgcard: "transparent",
      bgcard2: "transparent"
    };
  },
  methods: {
    assignar() {
      if (JSON.parse(localStorage.getItem("Evaluador"))) {
        this.nombre = ":" + JSON.parse(localStorage.getItem("Evaluador")).nombre;
      }
    },
    callback(isHovered) {
      this.bgcard = isHovered ? "white" : "transparent";
    },
    callback1(isHovered) {
      this.bgcard2 = isHovered ? "white" : "transparent";
    },
    descargar(numero) {
      var a = document.createElement("a");
      a.id = "miLink";
      a.download = "archivo";
      a.href = "data:application/pdf;base64," + pdf.pdf(numero);
      document.body.appendChild(a);
      document.getElementById("miLink").click();
    },
    app() {
      console.log("overflow-auto");
    }
  },
  beforeMount() {
    localStorage.removeItem("Pub_eval");
  },
  mounted() {
    this.assignar();
  }
};
</script>

<style>
.size {
  font-size: 30px;
}
.group {
  padding: 10px;
  padding-left: 10px;
  font-size: 10px;
}
.margen2 {
  margin-right: 10px;
}
.transparencia {
  border-color: transparent !important;
}
</style>
