<template>
  <div>
    <b-modal
      id="modal-2"
      :header-bg-variant="model_header_color"
      :body-text-variant="model_tbody_color"
      header-class="text-center"
      :footer-bg-variant="danger"
      body-class="text-center"
      title="Udem dice"
      ok-only
    >
      <h4>
        {{ message }}
      </h4>
    </b-modal>
        <b-modal
      id="modal-3"
      :header-bg-variant="model_header_color"
      :body-text-variant="model_tbody_color"
      header-class="text-center"
      body-class="text-center"
      title="Udem dice"
      ok-only
    >
      <h4>
        {{ message }}
      </h4>
       <template v-slot:modal-footer>
        <b-button
          variant="outline-success"
            size="sm"
            class="float-right"
            @click="aceptar1"
          >
            Aceptar
          </b-button>
         
   </template>
   
    </b-modal>

    <b-modal
      id="modal-1"
      header-bg-variant="danger"
      body-text-variant="danger"
      header-class="text-center"
      body-class="text-center"
      title="¡ADVERTENCIA!"
    >
      <h4>
        {{message}}
      </h4>

      <p class="my-4"></p>
      <template v-slot:modal-footer>
        <div class="w-200">
          <b-button
            variant="outline-danger"
            size="sm"
            class="float-right"
            @click="aceptar"
          >
            Aceptar
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            class="float-md-right"
            @click="cancelar"
          >
            Cancelar
          </b-button>
        </div>
      </template>
    </b-modal>

    <b-container v-if="eval">
      <!-- Content here -->
      <b-card class="bcard">
      <h1>Gestión de correción de propuestas</h1>
      <br />

      <b-form action="javascript:void(0)" @submit="abrir_model_evl">
        <b-form-group
          label="Organización de contenido"
          label-for="organizacion_contenido"
          description="Ingrese valor númerico"
          class="text-left"
        >
          <b-form-input
            class="form-control"
            type="number"
            step="0.1"
            min="0"
            max="5"
            v-bind:required="true"
            v-model="correcion.organizacion"
            id="organizacion_contenido"
            placeholder="Ingrese organizacion contenido"
          />
        </b-form-group>

        <b-form-group
          label="Estilo"
          label-for="Estilo"
          description="Ingrese valor númerico"
             class="text-left"
        >
          <b-form-input
            class="form-control"
            type="number"
            step="0.1"
            min="0"
            max="5"
            v-model="correcion.estilo"
            id="estilo"
            v-bind:required="true"
            placeholder="Ingrese estilo"
          />
        </b-form-group>

        <b-form-group
          label="Aportes de obra"
          label-for="Aportes_de_obra"
          description="Ingrese valor númerico"
             class="text-left"
        >
          <b-form-input
            class="form-control"
            type="number"
            step="0.1"
            min="0"
            max="5"
            v-bind:required="true"
            v-model="correcion.aportes_obras"
            id="aportes_de_obra"
            placeholder="Ingrese aportes de obra"
          />
        </b-form-group>

        <b-form-group
          label="Temporalidad"
          label-for="Temporalidad"
          description="Ingrese valor númerico"
             class="text-left"
        >
          <b-form-input
            class="form-control"
            type="number"
            v-model="correcion.temporalidad"
            id="temporalidad"
            step="0.1"
            min="0"
            max="5"
            v-bind:required="true"
            placeholder="Ingrese temporalidad"
          ></b-form-input>
        </b-form-group>
    
        <b-form-group label="Comentarios " label-for="Comentarios"    class="text-left">
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
          >Evaluar correción</b-button
        >

    
      </b-form>
      </b-card>
    </b-container>
    <b-container fluid v-else>
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
            bg-variant="transparent"
          >
            <b-card-text>
              Por favor adjunte su pdf correción aquí
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
              @click="abrir_model_retro"
              class="upload-file margin"
              >Cargar Documento</b-button
            >
          </b-card>
        </div>
      </div>
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
