<template>
  <!--  TODO: make the inputs into actual components -->
  <v-container class="module">
    <div class="module__navbar">
      <v-btn
        v-if="currentPage != 'preview'"
        class="module__navbar-button"
        dark
        x-small
        depressed
        color="purple"
        @click="currentPage = 'preview'"
        >Employer View</v-btn
      >

      <v-btn
        v-if="currentPage == 'preview'"
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
          <input :value="moduleName" type="text" readonly disabled class="module__header-text" />
          <v-chip-group class="module__header-chips"
            ><v-chip disabled dark small color="white">Preset Tags</v-chip>
          </v-chip-group>
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
          <keep-alive>
            <component
              :is="getComponent"
              v-model="programDoc"
              :student-doc="studentDoc"
              :license-program="licenseProgram"
              :db="db"
              :user-doc="userDoc"
              @inputStudentDoc="studentDoc = $event"
            />
          </keep-alive>
        </div>
      </div>
    </div>
    <!-- TIMELINE START -->

    <!-- <template>
      <v-container v-if="currentPage == 'preview'" style="max-width: 675px">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" small :color="selectedColor" dark depressed v-on="on"
              ><v-icon left>mdi-message-reply-text</v-icon>Chat with all</v-btn
            >
          </template>
          <v-card class="module__menu">
            <v-btn
              small
              color="white"
              class="module__chat-menu-button v-btn__content"
              tile
              depressed
            >
              <v-icon left color="#404142">mdi-account-group</v-icon>Stakeholders Only</v-btn
            >
            <v-divider></v-divider>
            <v-btn
              small
              color="white"
              class="module__chat-menu-button v-btn__content"
              tile
              depressed
            >
              <v-icon left color="#404142">mdi-account-cog</v-icon>Organizers Only</v-btn
            >
            <v-divider></v-divider>
            <v-btn
              small
              color="white"
              class="module__chat-menu-button v-btn__content"
              tile
              depressed
            >
              <v-icon left color="#404142">mdi-account-multiple</v-icon>Team Only</v-btn
            >

            <v-divider></v-divider>
            <v-btn
              small
              color="white"
              class="module__chat-menu-button v-btn__content"
              tile
              depressed
            >
              <v-icon left color="#404142">mdi-bullhorn</v-icon>All</v-btn
            >
          </v-card>
        </v-menu>
        <v-timeline dense clipped>
          <v-timeline-item fill-dot class="white--text mb-12" color="pink" large>
            <template v-slot:icon>
              <v-avatar
                ><img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
              /></v-avatar>
            </template>
            <v-text-field
              v-model="input"
              hide-details
              flat
              label="Leave a comment..."
              solo
              @keydown.enter="comment"
            >
              <template v-slot:append>
                <v-btn class="mx-0" outlined depressed @click="comment"> Post </v-btn>
              </template>
            </v-text-field>
          </v-timeline-item>

          <v-slide-x-transition group>
            <v-timeline-item
              v-for="event in timeline"
              :key="event.id"
              class="mb-3"
              color="pink"
              fill-dot
            >
              <template v-slot:icon>
                <v-avatar size="34"
                  ><img
                    src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
                /></v-avatar>
              </template>
              <v-row justify="space-between">
                <v-col cols="7" v-text="event.text"></v-col>
                <v-col class="text-right" cols="3" v-text="event.time"></v-col>
                <v-col class="text-right" cols="2">
                  <v-btn small class="module__trash" icon
                    ><v-icon small color="grey" class="module__trash"
                      >mdi-trash-can-outline</v-icon
                    ></v-btn
                  >
                  <v-btn small class="module__trash" icon
                    ><v-icon small color="grey" class="module__trash">mdi-flag</v-icon></v-btn
                  ></v-col
                >
              </v-row>

              <v-btn class="" icon><v-icon color="grey lighten-2">mdi-thumb-up</v-icon></v-btn>

              <v-btn class="" icon><v-icon color="grey lighten-2">mdi-thumb-down</v-icon></v-btn>
            </v-timeline-item>
          </v-slide-x-transition>
        </v-timeline>
      </v-container>
    </template> -->
  </v-container>
</template>

<script lang="ts">
import { computed, reactive, ref, toRefs, defineComponent, PropType } from '@vue/composition-api';
import '../styles/module.scss';
import { getModMongoDoc } from 'pcv4lib/src';
// import { Collection } from 'mongodb';
import { Db } from 'mongodb';
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
      type: Object as PropType<MongoDoc>,
      default: () => {}
    },
    db: {
      required: true,
      type: Object as () => Db
    },
    userDoc: {
      required: true,
      type: Object as () => MongoDoc
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
