<template>
  <div>
    <b-navbar toggleable type="light" variant="faded">
      <b-img
        src="https://redunete.net/wp-content/uploads/2019/02/logo-blanco-Udem-700x300.jpg"
        fluid
        alt="Fluid image"
        width="200px"
      ></b-img>

      <div class="title">
        Gestion de evaluacion de propuestas
      </div>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <a href="/" class="link">
          Cerrar Sesion
        </a>
      </b-navbar-toggle>
    </b-navbar>
    <div>
      <b-navbar toggleable="md" type="dark" variant="danger">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'autorPrincipa' }" class="margin"
              ><b><i>Principal</i></b></b-nav-item
            >
            <b-nav-item :to="{ name: 'publicacionesAutor' }" class="margin"
              ><b><i>Ver publicaciones</i></b></b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <nuxt />
  </div>
</template>

<script>
import Axios from "axios";
const axios = require("axios");
export default {
  beforeMount() {
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("id");
    if (token && id) {
      this.loadPage2(token);
      console.log("lkajsdkljs");
    } else this.loadPage();
  },
  data() {
    return {};
  },
  methods: {
    loadPage() {
      let url = "http://localhost:4000/api/evaluador/verificar";
      let evaluador = JSON.parse(localStorage.getItem("Autor"));

      if (evaluador === null)
        window.location.replace("http://localhost:3000/forbbiden");
      let token = evaluador.token;
      axios
        .get(url, { headers: { token, modulo: "autor" } })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          window.location.replace("http://localhost:3000/forbbiden");
          this.$router.push("../pages/forbidden");
        });
    },
    loadPage2(token) {
      console.log(token);
      let url = "http://localhost:4000/api/autor/verificar";
      axios
        .get(url, { headers: { token } })
        .then(res => {
          console.log(res);
          if (res.data.info.rol !== 6)
             window.location.replace("http://localhost:3000/forbbiden");
            //   localStorage.clear()
            this.agregarInfoLS({
              idautor: res.data.info.id,
              token: token,
              nombre: res.data.info.nombre
            });
       
        })
        .catch(err => {
          window.location.replace("http://localhost:3000/forbbiden");
        });
    },
    agregarInfoLS(item) {
      localStorage.setItem("Autor", JSON.stringify(item));
      
    
      return true;
    }
  }
};
</script>

<style>
.dropdown-item:active {
  background: #dc3546;
}
body {
  background-image: url("../images/background-01.png");
  background-repeat: no-repeat;
  background-size: cover;
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.a :hover {
  background: #dc3546;
}
.title {
  font-family: "Oswald", sans-serif;
  margin: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #ed0034;
}
.link {
  color: #ed0034;
}
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

.link:hover {
  text-decoration: none;
  color: #ed0034;
}
.margin {
  margin-right: 20px;
}
</style>
