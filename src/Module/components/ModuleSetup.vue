<template>
  <v-container class="module-edit">
    <div class="module-edit__container">
      <!-- NO SETUP NECESSARY / COMMENT OUT IF SETUP IS NECESSARY -->
      <!-- <div class="module-setup__none">No setup necessary</div> -->
      <!-- ENTER CONTENT HERE -->
      <!-- <div class="module-setup__section-title">Step 1</div>
      <div class="module-setup__section-title">Step 2</div>
      <div class="module-setup__section-title">Step 3</div> -->
      <div>
        <v-text-field
          prepend-icon="mdi-music-accidental-sharp"
          outlined
          label="Enter your program name"
          placeholder="Lawrence Berkeley National Laboratory"
        ></v-text-field>
        <v-textarea
          outlined
          three-line
          label="Enter your program description"
          prepend-icon="mdi-text-subject"
          placeholder="Build projects for us, win internships with us"
        ></v-textarea>
        <!-- <v-file-input label="Upload cover photo" outlined></v-file-input> -->
        <v-file-input
          v-model="files"
          color="grey"
          label="Cover Image"
          placeholder="Upload your program cover photo"
          prepend-icon="mdi-paperclip"
          outlined
          :show-size="1000"
        >
          <template v-slot:selection="{ index, text }">
            <v-chip v-if="index < 2" color="grey" dark label small>
              {{ text }}
            </v-chip>

            <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </v-file-input>
      </div>
      <div class="module-setup__license-button">
        <!-- LINK LICENSE PROGRAM TO STRIPE WITH DISCOUNT CODE -->
        <v-btn x-large outlined depressed>License Program</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api';
// import gql from 'graphql-tag';

export default {
  name: 'ModuleSetup',
  data: () => ({
    files: []
  }),
  setup() {
    const setup = reactive({});
    return {
      ...toRefs(setup)
    };
  }
};
</script>

<style lang="scss">
.module-setup {
  &__none {
    border-radius: 5px;
    // border: 1px solid #dedede;
    height: 100px;
    text-align: center;
    background-color: #dedede;
    font-weight: 700;
    color: #ffffff;
    font-size: 18px;
    padding-top: 35px;
  }

  &__license-button {
    text-align: center;
  }

  &__section-title {
    color: #000000;
    font-size: 25px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 40px;
  }
}
</style>
