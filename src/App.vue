<template>
  <v-app>
    <Module
      v-model="programDocStub"
      :student-doc="studentDoc"
      @inputStudentDoc="studentDoc = $event"
    />
  </v-app>
</template>

<script lang="ts">
import { ref, Ref } from '@vue/composition-api';
import Vue from 'vue';
// import ApolloExample from './components/ApolloExample.vue';
import Module from './Module/Module.vue';
import MongoDoc from './Module/types';

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
    const studentDoc: Ref<MongoDoc> = ref({
      data: {
        adks: []
      },
      update: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('REJECTED'));
          }, 3000);
        });
      },
      changeStream: {}
    });
    return {
      programDocStub,
      studentDoc
    };
  }
});
</script>
