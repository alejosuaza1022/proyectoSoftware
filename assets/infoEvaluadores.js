import Axios from "axios";
import config from "./config"
export default {
    layout: "evaluador",
    data() {
        return {
            aux: null,
            mensaje: "Formulario nuevos evaluadores",
            enEdicion: false,
            evaluador: {
                nombre: "",
                apellidos: "",
                idevaluador: "",
                correo: "",
                afiliacion: "",
                cargo: "",
                clave: ""
            },
            model_header_color: "",
            model_tbody_color: "",
            message: "",
            lista_evaluadores: [],

        };
    },
    beforeMount() {
        this.aux = this.$route.query.actu == 1 ? true : false;
        if (this.aux) {
            let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
            let token = evaluador.token;
            let ideval = evaluador.idevaluador;
            Axios.get(config.url_api + `/evaluador/${ideval}`, {
                headers: {
                    token
                }
            }).then(res => {

                this.evaluador = res.data.evaluador;
                //  this.agregarInfoLS();

            }).catch(error => {
                console.log(error)
            })

        }
    },
    mounted() {
        this.created()
    },
    methods: {

        crearEvaluador() {
            let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
            Axios.post(config.url_api + '/evaluador/', this.evaluador).then(res => {
                console.log(res)
                    //this.lista_evaluadores.push(this.evaluador);
                    //this.agregarInfoLS();
                this.evaluador = {
                        nombre: "",
                        apellidos: "",
                        idevaluador: "",
                        correo: "",
                        afiliacion: "",
                        cargo: "",
                        clave: ""
                    },
                    this.retroalimentacion = null;
                this.message = " se ha registrado exitosamente ";
                this.model_header_color = "success";
                this.model_tbody_color = "dark";
                this.$bvModal.show("modal-2");


            }).catch(error => {
                this.message =
                    " se ha producido un error, por favor intente más tarde ";
                this.model_header_color = "danger";
                this.model_tbody_color = "danger  ";
                this.$bvModal.show("modal-2");
                console.log(error)

            })


        },

        actualizarEvaluador() {
            let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
            let token = evaluador.token;
            let ideval = evaluador.idevaluador;
            Axios.put(`http://localhost:4000/api/evaluador/${ideval}`, this.evaluador, {
                headers: {
                    token
                }
            }).then(res => {
                localStorage.removeItem("Evaluador")
                this.agregarInfoLS({
                    idevaluador: ideval,
                    token: token,
                    nombre: this.evaluador.nombre
                })
                this.$bvModal.show("modal-3");

            }).catch(error => {

                console.log(error)

            })


        },
        aceptar1() {
            this.$bvModal.hide("modal-2");
            this.$router.push('loginEvaluador')
        },
        aceptar2() {
            this.$bvModal.hide("modal-3");
            this.$router.push({
                path: "evaluadorPrincipal",
                query: {
                    nombre: this.evaluador.nombre
                }
            })

            this.evaluador = {
                nombre: "",
                apellidos: "",
                idevaluador: "",
                correo: "",
                afiliacion: "",
                cargo: "",
                clave: ""
            }
        },
        aceptar() {
            this.$bvModal.hide("modal-1");
            this.crearEvaluador();
        },
        mostrar() {
            this.$bvModal.show("modal-1");
        },

        cancelar() {
            this.$bvModal.hide("modal-1");
        },

        // verificar existencia de datos o creación de intancia nueva
        created() {
            let datosLS = JSON.parse(localStorage.getItem('registroEvalu'));
            if (!datosLS)
                this.lista_evaluadores = [];
            else
                this.lista_evaluadores = datosLS;
        },
        agregarInfoLS(item) {
            console.log(item);
            localStorage.setItem('Evaluador', JSON.stringify(item));

        },

    }
}