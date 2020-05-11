<template>
  <div>
    <input type="file" ref="archivo" name="archivo" />
    <b-button color="success" @click="actualizarFoto">Actualizar foto</b-button>
  </div>
</template>
<script>
import Axios from 'axios';
export default {
  data() {
    return {
      file: ""
    };
  },
  methods: {
    actualizarFoto() {
      let url = "http://localhost:4000/api/autor/";
      let data = this.$refs.archivo.files[0];
      let formData = new FormData();
      formData.append("archivo", data);
      Axios
        .post(url, formData)
        .then(respuesta => {
          console.log(respuesta.data);
        })
        .catch(error => {});
    }
  }
};
</script>
