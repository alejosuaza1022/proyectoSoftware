<template>
  <div>
    <b-container v-if="eval">
      <!-- Content here -->
      <h1>Gestión de correción de propuestas</h1>
      <br />

      <b-form action="javascript:void(0)" @submit="crear_evalua">
        <b-form-group
          label="organización de contenido"
          label-for="organizacion_contenido"
          description="ingrese valor númerico"
        >
          <b-form-input
            class="form-control"
            type="number"
            v-bind:required="true"
            v-model="correcion.organizacion"
            id="organizacion_contenido"
            placeholder="ingrese organizacion contenido"
          />
        </b-form-group>

        <b-form-group
          label="estilo"
          label-for="estilo"
          description="ingrese valor númerico"
        >
          <b-form-input
            class="form-control"
            type="number"
            v-model="correcion.estilo"
            id="estilo"
            v-bind:required="true"
            placeholder="Ingrese estilo"
          />
        </b-form-group>

        <b-form-group
          label="aportes de obra"
          label-for="aportes_de_obra"
          description="ingrese valor númerico"
        >
          <b-form-input
            class="form-control"
            type="number"
            v-bind:required="true"
            v-model="correcion.aportes_obras"
            id="aportes_de_obra"
            placeholder="Ingrese aportes de obra"
          />
        </b-form-group>

        <b-form-group
          label="temporalidad"
          label-for="temporalidad"
          description="ingrese valor númerico"
        >
          <b-form-input
            class="form-control"
            type="number"
            v-model="correcion.temporalidad"
            id="temporalidad"
            v-bind:required="true"
            placeholder="Ingrese temporalidad"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="concepto"
          label-for="concepto"
          description="ingrese valor númerico"
        >
          <b-form-input
            class="form-control"
            type="number"
            v-model="correcion.concepto"
            id="temporalidad"
            v-bind:required="true"
            placeholder="Ingrese concepto"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="comentarios " label-for="comentarios">
          <b-form-textarea
            class="form-control"
            type="textbox"
            v-model="correcion.comentarios"
            id="comentarios"
            placeholder="Ingrese comentarios"
          ></b-form-textarea>
        </b-form-group>

        <b-button
          type="submit"
          variant="danger"
          class="submit-button"
          v-if="!enEdicion"
          >Evaluar correcion</b-button
        >

        <b-button
          @click="actualizar_correcion()"
          variant="danger"
          class="submit-button"
          v-else
          >Actualizar Correcion</b-button
        >
      </b-form>

      <b-table striped hover :items="lista_correciones">
        <template v-slot:cell(acciones)="row" v-if="!mostrar">
          <b-button
            size="sm"
            @click="cargar_correcion(row)"
            class="mr-2 acciones"
            >Modificar</b-button
          >
          <b-button
            size="sm"
            @click="eliminar_correcion(row)"
            class="mr-2 acciones"
            >Eliminar</b-button
          >
        </template>
      </b-table>
    </b-container>
    <b-container v-else>
    
        <h1>Gestión de correción de propuestas</h1>
        <div>
          <div>
            <b-card
              img-src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2 card-pdf"
            >
              <b-card-text>
                por favor adjunte su pdf correción aquí
              </b-card-text>

              <b-form-file
                accept=".pdf"
                class="upload-file"
                v-model="archivo"
                :state="Boolean(archivo)"
                placeholder="Seleccione su archivo..."
                drop-placeholder="Drop file here..."
              ></b-form-file>

              <b-button
                variant="outline-danger"
                @click="actualizar_retro"
                class="upload-file margin"
                >Cargar Documento</b-button
              >
            </b-card>
          </div>
        </div>
        <br />

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
<script src="../assets/registroEvaluaciones.js" />
