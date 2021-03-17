<template>
  <!--  TODO: make the inputs into actual components -->
  <v-container class="module">
    <div class="module__navbar d-flex">
      <v-btn v-if="currentPage == 'preview' && userType === 'organizer'" x-large icon>
        <v-icon x-large>mdi-chevron-double-left</v-icon>
      </v-btn>
    </div>
    <div class="module__navbar">
      <v-btn
        v-if="currentPage != 'preview' && userType === 'organizer'"
        class="module__navbar-button"
        dark
        x-small
        depressed
        color="purple"
        @click="currentPage = 'preview'"
        >Employer View</v-btn
      >

      <v-btn
        v-if="currentPage == 'preview' && userType === 'organizer'"
        class="module__navbar-button"
        dark
        x-small
        depressed
        color="green"
        @click="currentPage = 'setup'"
        >Student View</v-btn
      >
    </div>
    <div class="module__container" :style="{ 'border-color': getColor }">
      <div class="module__title">
        <div class="module__image rounded-circle">
          <v-icon light x-large :color="selectedColor">mdi-rocket-outline</v-icon>
        </div>
        <div class="module__header text-md-h5 text-sm-subtitle-1 d-flex align-center">
          <input disabled :value="moduleName" type="text" class="module__header-text mb-5" />
        </div>
      </div>
      <div class="module__body">
        <v-progress-linear
          v-if="currentPage != 'preview'"
          color="#dedede"
          height="2"
          value="100"
          buffer-value="100"
          stream
        />
        <div v-if="currentPage != 'preview'" class="module__pagination"></div>
        <div class="module__page">
          <component
            :is="getComponent"
            v-model="programDoc"
            :student-doc="studentDocument"
            :license-program="licenseProgram"
            :db="db"
            :user-doc="userDoc"
            :mongo-user="mongoUser"
            @inputStudentDoc="studentDocument = $event"
            @nextPage="$emit('nextPage')"
          />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { computed, reactive, ref, toRefs, defineComponent, PropType } from '@vue/composition-api';
import '../styles/module.scss';
import { getModMongoDoc } from 'pcv4lib/src';
// import { Collection } from 'mongodb';
import { Db } from 'mongodb';
import { User } from 'realm-web';
import * as Module from './components';
import MongoDoc from './types';

export default defineComponent({
  name: 'ModuleName',

  components: {
    'module-monitor': Module.Monitor,
    'module-setup': Module.Setup,
    'module-presets': Module.Presets,
    'module-preview': Module.Default
  },
  props: {
    value: {
      required: true,
      type: Object as () => {
        data: Record<string, any>; // Gives access to Document
        update: () => Promise<any>; // Gives access to update Method
        changeStream: any; // Gives access to mongodb Collection Changestream
      }
    },
    licenseProgram: {
      required: true,
      type: Function as PropType<() => any>
    },
    studentDoc: {
      required: false,
      type: Object as PropType<MongoDoc>
    },
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    },
    db: {
      required: true,
      type: Object as () => Db
    },
    userDoc: {
      required: true,
      type: Object as () => MongoDoc
    },
    mongoUser: {
      required: true,
      type: Object as () => User
    }
  },
  setup(props, ctx) {
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });
    const studentDocument = getModMongoDoc(props, ctx.emit, {}, 'studentDoc', 'inputStudentDoc');
    const page = reactive({
      currentPage: 'Setup'
    });

    if (props.userType === 'organizer') {
      page.currentPage = 'setup';
    } else {
      page.currentPage = 'preview';
    }

    const moduleName = computed(() => {
      if (page.currentPage === 'setup') return 'Setup Program';
      return 'Start Program';
    });
    const getComponent = computed(() => {
      return `module-${page.currentPage.toLowerCase()}`;
    });
    const color = reactive({
      pilotcityColors: [
        ['#6eba80', '#3c9dcd', '#ea6764'],
        ['#eda1bf', '#fec34b', '#bdbdbd'],
        ['#ae90b0', '#f79961', '#000000']
      ],
      // ENTER ACTIVITY COLOR
      selectedColor: '#dedede'
    });
    const getColor = computed(() => {
      return color.selectedColor.substring(0, 7);
    });
    const config = ref({
      description: '',
      instruct: ['']
    });
    const menu = ref(false);
    // timeline
    const timelineData = reactive({
      events: [] as {
        id: number;
        text: string;
        time: string;
      }[],
      input: '',
      nonce: 0
    });
    const timeline = computed(() => {
      return timelineData.events.slice().reverse();
    });
    function comment() {
      const time = new Date().toTimeString();
      timelineData.events.push({
        id: timelineData.nonce,
        text: timelineData.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents) => {
          return ` ${contents
            .split(' ')
            .map((v: string) => v.charAt(0))
            .join('')}`;
        })
      });
      timelineData.input = '';
    }
    return {
      ...toRefs(color),
      ...toRefs(page),
      config,
      moduleName,
      menu,
      getComponent,
      getColor,
      ...toRefs(timelineData),
      timeline,
      comment,
      programDoc,
      studentDocument
    };
  }
});
</script>
<style lang="scss">
html,
body {
  font-family: 'Raleway';
  font-size: 16px;
  width: 100%;
  height: 100%;
}

.v-timeline-item__divider {
  align-items: start !important;
}

.module {
  // FOR SETUP PROGRAM ONLY
  // &__container {
  //   max-width: 825px;
  // }

  &__trash {
    // justify-content: start;
    align-items: start;
    // align-content: start;
  }

  &__header-chips {
    padding-bottom: 15px;
  }
}

.v-btn__content.module__chat-menu-button {
  justify-content: left;
  width: 100%;
}
.module__menu {
  .v-color-picker {
    &__controls {
      display: none;
    }
  }
}
</style>
