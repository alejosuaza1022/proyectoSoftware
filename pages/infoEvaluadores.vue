<template>
  <div>
    <b-container>
      <!-- Content here -->

      <h1>Gestión de estudiantes</h1>
      <br />

      <b-form action="javascript:void(0)" >
        <b-form-group label="Nombre" label-for="nombre">
          <b-form-input
            class="form-control"
            type="text"
            v-model="evaluador.nombre"
            placeholder="Ingrese su nombre"
            id="nombre"
          />
        </b-form-group>
        <b-form-group label="Apellido" label-for="apellido">
          <b-form-input
            class="form-control"
            v-model="evaluador.apellido"
            placeholder="Ingrese su apellido"
            id="apellido"
          />
        </b-form-group>
        <b-form-group label="Email" label-for="email">
          <b-form-input
            class="form-control"
            type="email"
            v-model="evaluador.email"
            placeholder="Ingrese su email"
            id="email"
          />
        </b-form-group>

        <b-form-group label="Dirección" label-for="direccion">
          <b-form-input
            class="form-control"
            type="text"
            v-model="evaluador.direccion"
            id="direccion"
            placeholder="Ingrese su dirección"
          />
        </b-form-group>

        <b-form-group label="Afiliación institucional" label-for="afiliacion">
          <b-form-input
            class="form-control"
            type="text"
            v-model="evaluador.afiliacion"
            id="afiliacion"
            placeholder="Ingrese su afiliación institucional"
          />
        </b-form-group>

        <b-form-group label="Cargo" label-for="cargo">
          <b-form-input
            class="form-control"
            type="text"
            v-model="evaluador.cargo"
            id="cargo"
            placeholder="Ingrese su cargo"
          />
        </b-form-group>

        <b-form-group label="Publicaciones previas" label-for="publicaciones">
          <b-form-textarea
            class="form-control"
            type="textbox"
            v-model="evaluador.publicaciones"
            id="publicaciones"
            placeholder="Ingrese sus publicaciones anteriores"
          ></b-form-textarea>
        </b-form-group>

        <b-button @click="crearEstudiante()" variant="primary" v-if="!enEdicion">Crear evaluador</b-button>
        <b-button @click="actualizarEstudiante()" variant="primary" v-else>Actualizar evaluador</b-button>
      </b-form>

      <b-table striped hover :items="lista_evaluadores">
        <template v-slot:cell(acciones)="row">
          <b-button size="sm" @click="cargarEstudiante(row)" class="mr-2">Modificar</b-button>
          <b-button size="sm" @click="eliminarEstudiante(row)" class="mr-2">Eliminar</b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script src="@/assets/infoEvaluadores.js"/>