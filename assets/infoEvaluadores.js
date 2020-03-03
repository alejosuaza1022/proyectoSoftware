export default {
    data() {
      return {
        mensaje: "Administración de estudiantes",
        enEdicion: false,
        estudiante: {
          id: "",
          nombre: "",
          edad: 0,
          correo: "",
          carrera: null,
          acciones: true
        },
        lista_estudiantes: [
          {
            id: "0001",
            nombre: "santiago",
            edad: 0,
            correo: "santiago",
            carrera: "001",
            acciones: true
          }
        ],
        opciones_carrera: [
          { value: null, text: "Seleccione una carrera", disabled: true },
          { value: "001", text: "Ingeniería de sistemas" },
          { value: "002", text: "Derecho" },
          { value: "003", text: "Comunicación" }
        ]
      };
    },
    methods: {
      crearEstudiante() {
        this.lista_estudiantes.push(this.estudiante);
        this.estudiante = {
          id: "",
          nombre: "",
          edad: 0,
          correo: "",
          carrera: null,
          acciones: true
        };
      },
      eliminarEstudiante({ item }) {
        let posicion = this.lista_estudiantes.findIndex(
          estudiante => estudiante.id == item.id
        );
        this.lista_estudiantes.splice(posicion, 1);
      },
      cargarEstudiante({ item }) {
        let estu = this.lista_estudiantes.find(
          estudiante => estudiante.id == item.id
        );
        this.enEdicion = true;
        this.estudiante = Object.assign({}, estu);
      },
      actualizarEstudiante() {
        let posicion = this.lista_estudiantes.findIndex(
          estudiante => estudiante.id == this.estudiante.id
        );
        this.lista_estudiantes.splice(posicion, 1, this.estudiante);
        this.estudiante = {
          id: "",
          nombre: "",
          edad: 0,
          correo: "",
          carrera: null,
          acciones: true
        };
 
      }
    }
  };