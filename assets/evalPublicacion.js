export default {
    data() {
        return {
            lista_propuestasEval: [],
            lista_correciones: [],
            prop: {
                id_propuesta: null
            }

        };

    },

    mounted() {
        this.created()
    },
    methods: {
        // bajar información del local storage, verificar que si haya información
        created() {
            let datosLS = JSON.parse(localStorage.getItem('registroEvDB'));
            if (!datosLS)
                this.lista_correciones = [];
            else
                this.lista_correciones = datosLS;
        },

        // metodo que busca en el local storage de las publicaciones las propuestas que hayan según la
        // propuesta que el usuario quiera buscar
        mostrarData() {
            console.log("aksdja")
            this.lista_propuestasEval.length = 0;
            this.lista_correciones.forEach(element => {
                if (element.id_propuesta === this.prop.id_propuesta + "") {
                    var aux = {
                        "estado": "calificado",
                        "fechaRevision": element.fecha,
                        "fecha_vecimiento": element.fecha_vencimiento,
                        "estilo": element.estilo,
                        "organizacion_contenido": element.organizacion_contenido,
                        "aportes_de_obra": element.aportes_de_obra,
                        "temporalidad": element.temporalidad,
                        "resultado_final": element.resultado_final,
                        "comentario": element.comentario,

                    }

                    this.lista_propuestasEval.push(aux)

                }
            });


        }
    }


};