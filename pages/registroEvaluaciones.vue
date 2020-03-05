<template>
  <div>
    <b-container>
      <!-- Content here -->

      <h1>Gestión de correción de propuestas</h1>
      <br />

      <b-form action="javascript:void(0)" @submit="crearCorrecion">
        <b-form-group label="id evaluador" label-for="id_autor">
          <b-form-input
            class="form-control"
            type="number"
            v-bind:required="true"
            v-model="correcion.id_evaluador"
            placeholder="Ingrese su id"
            id="id_autor"
          />
        </b-form-group>
        <b-form-group label="id autor" label-for="id_autor">
          <b-form-input
            class="form-control"
            type="number"
            v-model="correcion.id_autor"
            id="id_autor"
            v-bind:required="true"
            placeholder="Ingrese el id autor"
          />
        </b-form-group>
          <b-form-group label="id propuesta" label-for="id_propuesta">
          <b-form-input
            class="form-control"
            type="number"
            v-model="correcion.id_propuesta"
            id="id_propuesta"
            v-bind:required="true"
            placeholder="Ingrese el id de la propuesta"
          />
        </b-form-group>
        <b-form-group label="fecha de realización" label-for="fecha">
          <b-form-input
            class="form-control"
            v-model="correcion.fecha"
            type="date"
            v-bind:required="true"
            placeholder="Ingrese la fecha de realización"
            id="fecha"
          />
        </b-form-group>
        <b-form-group label="documento guía">
          <b-form-select v-model="correcion.documento_guia" :options="opciones_carrera"></b-form-select>
        </b-form-group>

        <b-form-group label="ingrese valores númericos para calificar" label-for="labelInfo">
          <b-form-group label="organización de contenido" label-for="organizacion_contenido">
            <b-form-input
              class="form-control"
              type="number"
              v-bind:required="true"
              v-model="correcion.organizacion_contenido"
              id="organizacion_contenido"
              placeholder="ingrese organizacion contenido"
            />
          </b-form-group>

          <b-form-group label="estilo" label-for="estilo">
            <b-form-input
              class="form-control"
              type="number"
              v-model="correcion.estilo"
              id="estilo"
              v-bind:required="true"
              placeholder="Ingrese estilo"
            />
          </b-form-group>

          <b-form-group label="aportes de obra" label-for="aportes_de_obra">
            <b-form-input
              class="form-control"
              type="number"
              v-bind:required="true"
              v-model="correcion.aportes_de_obra"
              id="aportes_de_obra"
              placeholder="Ingrese aportes de obra"
            />
          </b-form-group>

          <b-form-group label="temporalidad" label-for="temporalidad">
            <b-form-input
              class="form-control"
              type="number"
              v-model="correcion.temporalidad"
              id="temporalidad"
              v-bind:required="true"
              placeholder="Ingrese temporalidad"
            ></b-form-input>
          </b-form-group>
           <b-form-group label="comentarios " label-for="comentarios">
          <b-form-textarea
            class="form-control"
            type="textbox"
            v-model="correcion.comentario"
            id="comentarios"
            placeholder="Ingrese sus publicaciones anteriores"
          ></b-form-textarea>
        </b-form-group>

        </b-form-group>
        <b-button
          type="submit"
          variant="danger"
          class="submit-button"
          v-if="!enEdicion"
        >Crear correcion</b-button>

        <b-button
          @click="actualizar_correcion()"
          variant="danger"
          class="submit-button"
          v-else
        >Actualizar Correcion</b-button>
      </b-form>

      <b-table striped hover :items="lista_correciones">
        <template v-slot:cell(acciones)="row">
          <b-button size="sm" @click="cargar_correcion(row)" class="mr-2 acciones">Modificar</b-button>
          <b-button size="sm" @click="eliminar_correcion(row)" class="mr-2 acciones">Eliminar</b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>
<style>
@import "../assets/sizes.css";
input:focus,
select:focus,
option:focus {
  border: 2px solid rgb(238, 36, 36) !important;
  box-shadow: 0 0 0px !important;
}
.buttonM {
  margin-left: 100px;
}
</style>
<script src="@/assets/registroEvaluaciones.js"/>