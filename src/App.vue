<template>
  <v-app>
    <Module v-model="programDocStub" />
  </v-app>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api';
import Vue from 'vue';
// import ApolloExample from './components/ApolloExample.vue';
import Module from './Module/Module.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Module
  },
  setup() {
    const programDocStub = ref({
      data: {
        adks: [
          {
            name: 'rfp'
          }
        ]
      },
      save: async () => null
    });
    return {
      programDocStub
    };
  }
});
</script>
