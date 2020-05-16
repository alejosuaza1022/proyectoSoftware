import Axios from "axios";
import moment from "moment";

export default {
    layout: "evaluador",
    data() {
        return {
            mensaje: "Formulario nuevos correciones",
            enEdicion: false,
            eval: true,
            mostrar: false,
            archivo: null,
            correcion: {
                id_publicacion: null,
                fecha_evaluacion: "",
                organizacion: null,
                estilo: null,
                aportes_obras: null,
                temporalidad: null,
                resultado_final: null,
                concepto: null,
                comentarios: null,
                acciones: true,
            },
            retroalimentacion: null,
            lista_correciones: [],
            lista_reducida: [],
        };
    },
    beforeMount() {
        let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
        let token = evaluador.token;
        let ideval = evaluador.idevaluador;
        this.eval = this.$route.query.eval;
        console.log(this.eval)
        if (eval) {
            /* Axios.get(`http://localhost:4000/api/evaluador/obtener_evaluadas/${ideval}`, {
                     headers: {
                         token
                     }
                 }).then(res => {
                     this.lista_correciones = res.data.publicaciones;
                 })
                 .catch(erro => {
                     console.log(erro);
                 })*/
        }

    },
    updated() {
        let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
        let token = evaluador.token;
        let ideval = evaluador.idevaluador;
        this.eval = this.$route.query.eval;
        console.log(this.eval)
    },

    mounted() {

    },
    methods: {
        crear_evalua() {
            let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
            let token = evaluador.token;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + "/" + dd + "/" + yyyy;
            this.correcion.fecha_evaluacion = today
            this.correcion.id_publicacion = this.$route.query.idpub;
            this.puntajeTotal();
            let corr = Object.assign({}, this.correcion);
            delete corr.acciones
            corr.id_evaluador = evaluador.idevaluador;
            corr.id = this.$route.query.idrev

            Axios.post(`http://localhost:4000/api/registro_eval`, corr, {
                headers: { token }
            }).then(res => {
                console.log(res)
                    //this.lista_correciones.push(this.correcion);
                this.correcion = {
                    organizacion: null,
                    estilo: null,
                    aportes_obras: null,
                    temporalidad: null,
                    resultado_final: null,
                    concepto: null,
                    comentarios: null,
                    acciones: true,
                }
                this.$router.push({ path: "evaluadorPrincipal", query: { nombre: evaluador.nombre } })
                    // this.agregarInfoLS();
            }).catch(error => {
                console.log(error)

            });
        },
        actualizar_retro() {
            let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
            let token = evaluador.token;
            let id = this.$route.query.id;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + "/" + dd + "/" + yyyy;
            let data = this.archivo;
            let formData = new FormData();
            formData.append("archivo", data);

            formData.set("fecha_realizada", today);

            Axios.put(`http://localhost:4000/api/publicacion_rev/${id}`, formData, {
                headers: {
                    token
                }
            }).then(res => {
                this.retroalimentacion = null
                console.log(res.data)
            }).catch(error => {
                console.log(error)

            })


        },

        agregarInfoLS() {
            localStorage.setItem('registroEvDB', JSON.stringify(this.lista_correciones));
        }


        ,
        // hacer el calculo del puntaje, con las 4 preguntas ingresadas por el usuario
        puntajeTotal() {
            var p1 = parseFloat(this.correcion.organizacion)
            var p2 = parseFloat(this.correcion.estilo)
            var p3 = parseFloat(this.correcion.aportes_obras)
            var p4 = parseFloat(this.correcion.temporalidad)

            this.correcion.resultado_final = p1 * 0.25 + p2 * 0.25 + p3 * 0.25 + p4 * 0.25
        }
    },


};