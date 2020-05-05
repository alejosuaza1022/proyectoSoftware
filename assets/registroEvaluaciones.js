import Axios from "axios";
import moment from "moment";

export default {
    layout: "evaluador",
    data() {
        return {
            mensaje: "Formulario nuevos correciones",
            enEdicion: false,
            mostrar: false,
            correcion: {
                id: null,
                fechaevaluacion: "",
                organizacion: null,
                estilo: null,
                aportesobras: null,
                temporalidad: null,
                resultadofinal: null,
                concepto: null,
                comentarios: null,
                acciones: true,
            },
            lista_correciones: [],
            lista_reducida: [],
        };
    },
    beforeMount() {
        let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
        let token = evaluador.token;
        let ideval = evaluador.idevaluador;
        Axios.get(`http://localhost:4000/api/evaluador/obtener_evaluadas/${ideval}`, {
                headers: {
                    token
                }
            }).then(res => {
                this.lista_correciones = res.data.publicaciones;
            })
            .catch(erro => {
                console.log(erro);
            })


    },

    mounted() {

    },
    methods: {
        crearCorrecion() {
            let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
            let token = evaluador.token;
            this.correcion.id = this.$route.query.idput;
            this.puntajeTotal();
            this.correcion.fechaevaluacion = moment(this.correcion.fechaevaluacion).format('MM/DD/YYYY')
            let corr = Object.assign({}, this.correcion);
            corr.idpublicacionrevision = this.$route.query.idpubr;
            delete corr.acciones
            delete corr.comentarios
            console.log(corr)

            Axios.put(`http://localhost:4000/api/registro_eval/${corr.id}`, corr, {
                headers: { token }
            }).then(res => {
                console.log(res)
                this.lista_correciones.push(this.correcion);
                this.correcion = {
                    fechaevaluacion: "",
                    organizacion: null,
                    estilo: null,
                    aportesobras: null,
                    temporalidad: null,
                    resultadofinal: null,
                    concepto: null,
                    comentarios: null,
                    acciones: true,
                }
                this.agregarInfoLS();
            }).catch(error => {
                console.log(error)

            })
        },
        created() {

        },
        get_position(id) {
            return this.lista_correciones.findIndex(
                correcion => correcion.id == id
            );
        },
        eliminar_correcion({
            item
        }) {
            this.lista_correciones.splice(this.get_position(item.id), 1);
            this.agregarInfoLS();
        },
        cargar_correcion({
            item
        }) {
            let auxCorre = this.lista_correciones.find(
                correcion => correcion.id == item.id
            );
            this.enEdicion = true;
            this.correcion = Object.assign({}, auxCorre);

        },
        actualizar_correcion() {
            this.correcion.fecha_vencimiento = this.formatDate()
            this.puntajeTotal();
            this.lista_correciones.splice(this.get_position(this.correcion.id), 1, this.correcion);
            this.correcion = {
                id: null,
                id_propuesta: null,
                id_evaluador: null,
                id_autor: null,
                fecha: "",
                documento_guia: "Seleccione una guía",
                fecha_vencimiento: "",
                organizacion_contenido: null,
                estilo: null,
                aportes_de_obra: null,
                temporalidad: null,
                resultado_final: null,
                acciones: true,
            };
            this.agregarInfoLS();
            this.enEdicion = false
        },
        // sumar 15 días habiles después de la creación de la fecha 
        formatDate() {

            var date = new Date(this.correcion.fecha)
            date.setDate(date.getDate() + 16)
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        },
        agregarInfoLS() {
            localStorage.setItem('registroEvDB', JSON.stringify(this.lista_correciones));
        }


        ,
        // hacer el calculo del puntaje, con las 4 preguntas ingresadas por el usuario
        puntajeTotal() {
            var p1 = parseFloat(this.correcion.organizacion)
            var p2 = parseFloat(this.correcion.estilo)
            var p3 = parseFloat(this.correcion.aportesobras)
            var p4 = parseFloat(this.correcion.temporalidad)

            this.correcion.resultadofinal = p1 * 0.25 + p2 * 0.25 + p3 * 0.25 + p4 * 0.25
        }
    },


};