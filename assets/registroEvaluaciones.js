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
            model_header_color: "",
            model_tbody_color: "",
            message: "",
        };
    },
    beforeMount() {
        let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
        let token = evaluador.token;
        let ideval = evaluador.idevaluador;
        if (this.$route.query.eval !== null) {
            let tmp = this.$route.query.eval.toString()
            if (tmp === 'false')

                this.eval = false;
            else
                this.eval = true

        } else {
            this.$router.push("evalPendientes")
        }

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

    mounted() {

    },
    methods: {
        aceptar() {
            if (this.eval === false)
                this.actualizar_retro()
            else
                this.crear_evalua();
            this.$bvModal.hide("modal-1");
        },
        aceptar1() {
            let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
            this.$bvModal.hide("modal-3");
            this.$router.push({
                path: "evaluadorPrincipal",
                query: {
                    nombre: evaluador.nombre
                }
            })
        },

        cancelar() {
            this.$bvModal.hide("modal-1");
        },
        abrir_model_evl() {
            let p1 = parseFloat(this.correcion.aportes_obras)
            let p2 = parseFloat(this.correcion.estilo)
            let p3 = parseFloat(this.correcion.temporalidad)
            let p4 = parseFloat(this.correcion.organizacion)
            console.log(p1 < 5.0);

            if (p1 <= 5.0 && p1 >= 0.0 && p2 <= 5.0 && p2 >= 0.0 && p3 <= 5.0 && p3 >= 0.0 && p4 <= 5.0 && p4 >= 0.0) {
                this.message = "¿está seguro con la evaluación?, recuerde que esta evaluación es definitiva";
                this.$bvModal.show("modal-1");

            } else {
                console.log(p1, p2, p3, p4)
                this.message = "valores erroneos para las notas, recuerde entre 0 a 5";
                this.model_header_color = "danger";
                this.model_tbody_color = "danger  ";
                this.$bvModal.show("modal-2");

            }

        },
        abrir_model_retro() {
            this.message = "recuerde que podra actualizar documento simplemente volviendolo a cargar aquí mismo, acción que no será posible si carga un documento y abandona la página"
            this.$bvModal.show("modal-1");
        },
        crear_evalua() {
            console.log("laksdfjlakdfj")
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
                headers: {
                    token
                }
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
                this.retroalimentacion = null
                this.message = " evaluación registrada con exito ";
                this.model_header_color = "success";
                this.model_tbody_color = "dark";
                this.$bvModal.show("modal-3");
                localStorage.removeItem("Pub_eval")
                let notificación = {
                    template: "publicacionEvaluada",
                    nombre: this.$route.query.nombre,
                    publicacion: this.$route.query.titulo,
                    to: this.$route.query.correo,
                    subject: "Evaluación de propuesta",
                    attachments: "nuevoPdf.pdf"
                }
                Axios.post("http://localhost:4000/api/pdf", generarPDF)
                    .then(res => {
                        Axios.post("http://localhost:4000/api/mail", notificación)
                            .then(res => {
                                console.log(res)
                            })
                    }).catch(error => {
                        console.log("Nos metimos por aca jaja", error)
                    })

                // this.agregarInfoLS();
            }).catch(error => {

                this.message =
                    " se ha producido un error, por favor intente más tarde";
                this.model_header_color = "danger";
                this.model_tbody_color = "danger  ";
                this.$bvModal.show("modal-3");

            });

            //Enviar correo de notificación
            var p1 = parseFloat(this.correcion.organizacion)
            var p2 = parseFloat(this.correcion.estilo)
            var p3 = parseFloat(this.correcion.aportes_obras)
            var p4 = parseFloat(this.correcion.temporalidad)
            var p5 = parseFloat(this.correcion.concepto)
            var comentarios = this.correcion.comentarios
            if (!comentarios) {
                comentarios = "sin comentarios"
            }
            let generarPDF = {
                template: "formatoEvaluacion",
                data: {
                    publicacion: this.$route.query.titulo,
                    nota1: p1,
                    nota2: p2,
                    nota3: p3,
                    nota4: p4,
                    nota5: p5,
                    comentarios
                }
            }


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
            console.log("oelo")
            Axios.put(`http://localhost:4000/api/publicacion_rev/${id}`, formData, {
                headers: {
                    token
                }
            }).then(res => {
                this.retroalimentacion = null
                this.message = " retroalimentación agregada con exito ";
                this.model_header_color = "success";
                this.model_tbody_color = "dark";
                this.$bvModal.show("modal-3");

                localStorage.removeItem("Pub_eval")
            }).catch(error => {
                this.message =
                    " se ha producido un error, por favor intente más tarde";
                this.model_header_color = "danger";
                this.model_tbody_color = "danger  ";
                this.$bvModal.show("modal-2");


            })

            let notificación = {
                template: "publicacionRetroalimentacion",
                nombre: this.$route.query.nombre,
                publicacion: this.$route.query.titulo,
                to: this.$route.query.correo,
                subject: "Retroalimentación de propuesta",
            }

            Axios.post("http://localhost:4000/api/mail", notificación)
                .then(res => {
                    console.log(res)
                })
                .catch(error => {
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

            this.correcion.concepto = this.correcion.resultado_final >= 3.0 ? 1 : 0;
            console.log(this.correcion);


        }
    },


};