<template>
  <v-app>
    <Module
      v-model="programDocStub"
      :student-doc="studentDoc"
      :db="db"
      :user-doc="userDoc"
      :license-program="licenseProgram"
      :user-type="userType"
      :mongo-user="mongoUser"
      @inputStudentDoc="studentDoc = $event"
    />
  </v-app>
</template>

<script lang="ts">
import { ref, Ref } from '@vue/composition-api';
import { ObjectId } from 'bson';
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
        participants: [new ObjectId(1)],
        adks: [
          {
            name: 'rfp'
          }
        ]
      },
      update: async () => null
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
    const db = {};
    const userDoc = {
      data: {
        _id: new ObjectId(1)
      }
    };
    const userType = ref('organizer');
    const licenseProgram = () => {};
    const mongoUser = {};
    return {
      programDocStub,
      studentDoc,
      userDoc,
      db,
      licenseProgram,
      userType,
      mongoUser
    };
  }
});
</script>
