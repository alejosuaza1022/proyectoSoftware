export default {
    data() {
        return {
            lista_propuestasautor: [],
            lista_correciones: [],
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
        // bajar información del local storage, verificar que si haya información

        created() {
            let datosLS = JSON.parse(localStorage.getItem('registroEvDB'));
            if (!datosLS)
                this.lista_correciones = [];
            else
                this.lista_correciones = datosLS;
        }
        ,
          // metodo que busca en el local storage de las publicaciones las propuestas que hayan según el
        //  id del  usuario quiera buscar
        mostrarData() {
            this.lista_propuestasautor.length = 0;
            this.lista_correciones.forEach(element => {
                if(element.id_autor === this.prop.id_autor+""){
                    var aux = {
                        "id_prop":element.id,
                        "estado":"calificado",
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