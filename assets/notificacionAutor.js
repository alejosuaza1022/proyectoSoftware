export default {
    data() {
        return {
            lista_propuestasautor: [],
            lista_correciones: [{pepe:"asd"}],
            prop: {
                id_autor: null
            }

        };

    },
    mounted() {
        this.created()
    }
    ,
    methods: {
        created() {
            let datosLS = JSON.parse(localStorage.getItem('registroEvDB'));
            if (!datosLS)
                this.lista_correciones = [];
            else
                this.lista_correciones = datosLS;
        }
        ,
        mostrarData() {
            this.lista_propuestasautor.length = 0;
            this.lista_correciones.forEach(element => {
                if(element.id_autor === this.prop.id_autor+""){
                    var aux = {
                        "id_prop":element.id,
                        "estilo":element.estilo,
                        "organizacion_contenido":element.organizacion_contenido,
                        "aportes_de_obra":element.aportes_de_obra,
                        "temporalidad":element.temporalidad,
                        "resultado_final":element.resultado_final,
                        "fecha_vecimiento":element.fecha_vencimiento
                    }

                    this.lista_propuestasautor.push(aux)
                
                }
            });
      
      
         }
    }


};