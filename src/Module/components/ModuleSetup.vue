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
          class="mt-5 mb-5"
          prepend-icon="mdi-music-accidental-sharp"
          outlined
          label="Enter your program name"
          placeholder="Lawrence Berkeley National Laboratory"
        ></v-text-field>
        <v-textarea
          class="mt-5 mb-5"
          outlined
          three-line
          label="Enter your program description"
          prepend-icon="mdi-text-subject"
          placeholder="Build projects for us, win internships with us"
        ></v-textarea>
        <!-- <v-file-input label="Upload cover photo" outlined></v-file-input> -->
        <v-file-input
          v-model="files"
          class="mt-5 mb-5"
          color="grey"
          label="Cover Image"
          placeholder="Upload your program cover photo"
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

        <v-range-slider
          :tick-labels="seasons"
          :value="[0, 10]"
          label="Age"
          min="0"
          max="10"
          ticks="always"
          tick-size="4"
          class="mt-10 mb-10"
        >
          <template v-slot:thumb-label="props">
            <v-icon dark>
              {{ season(props.value) }}
            </v-icon>
          </template>
        </v-range-slider>

        <!-- LOCATION / CITY OF RESIDENCE -->

        <v-combobox
          v-model="model2"
          prepend-icon="mdi-map-check"
          :filter="filter"
          :hide-no-data="!search"
          :items="items"
          :search-input.sync="search"
          hide-selected
          label="Set required city or county of participant residence"
          multiple
          small-chips
          hide-details
          solo
          outlined
          class="module-setup__combobox mt-5 mb-5"
        >
          <!-- <template v-slot:no-data>
                  <v-list-item>
                    <span class="subheading">Create</span>
                    <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
                      {{ search }}
                    </v-chip>
                  </v-list-item>
                </template> -->
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
              v-if="item === Object(item)"
              v-bind="attrs"
              :color="`${item.color} lighten-2`"
              :input-value="selected"
              label
              small
              dark
            >
              <span class="pr-2">
                {{ item.text }}
              </span>
              <v-icon small @click="parent.selectItem(item)"> mdi-close </v-icon>
            </v-chip>
          </template>

          <template v-slot:item="{ index, item }">
            <v-text-field
              v-if="editing === item"
              v-model="editing.text"
              autofocus
              flat
              background-color="transparent"
              hide-details
              solo
              @keyup.enter="edit(index, item)"
            ></v-text-field>
            <v-chip v-else :color="`${item.color} lighten-2`" dark label small>
              {{ item.text }}
            </v-chip>
            <v-spacer></v-spacer>
            <!-- <v-list-item-action @click.stop>
                    <v-btn icon @click.stop.prevent="edit(index, item)">
                      <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                    </v-btn>
                  </v-list-item-action> -->
          </template>
        </v-combobox>
        <v-img
          class="pl-auto ml-auto module-setup__map-selected mb-5"
          :aspect-ratio="16 / 9"
          width="94%"
          src="https://f.hubspotusercontent00.net/hubfs/2480959/Screen%20Shot%202020-11-25%20at%2010.42.51%20PM.png"
        ></v-img>

        <!-- LOCATION / CITY OF RESIDENCE -->

        <v-combobox
          v-model="model2"
          prepend-icon="mdi-head-snowflake-outline"
          :filter="filter"
          :hide-no-data="!search"
          :items="items"
          :search-input.sync="search"
          hide-selected
          label="List any skills required"
          multiple
          small-chips
          hide-details
          solo
          outlined
          class="module-setup__combobox mt-12 mb-12"
        >
          <!-- <template v-slot:no-data>
                  <v-list-item>
                    <span class="subheading">Create</span>
                    <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
                      {{ search }}
                    </v-chip>
                  </v-list-item>
                </template> -->
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
              v-if="item === Object(item)"
              v-bind="attrs"
              :color="`${item.color} lighten-2`"
              :input-value="selected"
              label
              small
              dark
            >
              <span class="pr-2">
                {{ item.text }}
              </span>
              <v-icon small @click="parent.selectItem(item)"> mdi-close </v-icon>
            </v-chip>
          </template>

          <template v-slot:item="{ index, item }">
            <v-text-field
              v-if="editing === item"
              v-model="editing.text"
              autofocus
              flat
              background-color="transparent"
              hide-details
              solo
              @keyup.enter="edit(index, item)"
            ></v-text-field>
            <v-chip v-else :color="`${item.color} lighten-2`" dark label small>
              {{ item.text }}
            </v-chip>
            <v-spacer></v-spacer>
            <!-- <v-list-item-action @click.stop>
                    <v-btn icon @click.stop.prevent="edit(index, item)">
                      <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                    </v-btn>
                  </v-list-item-action> -->
          </template>
        </v-combobox>

        <!-- LOCATION / CITY OF RESIDENCE -->

        <v-combobox
          v-model="model2"
          prepend-icon="mdi-monitor-cellphone"
          :filter="filter"
          :hide-no-data="!search"
          :items="items"
          :search-input.sync="search"
          hide-selected
          label="List any technology or tools required"
          multiple
          small-chips
          hide-details
          solo
          outlined
          class="module-setup__combobox mt-12 mb-12"
        >
          <!-- <template v-slot:no-data>
            <v-list-item>
              <span class="subheading">Create</span>
              <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
                {{ search }}
              </v-chip>
            </v-list-item>
          </template> -->
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
              v-if="item === Object(item)"
              v-bind="attrs"
              :color="`${item.color} lighten-2`"
              :input-value="selected"
              label
              small
              dark
            >
              <span class="pr-2">
                {{ item.text }}
              </span>
              <v-icon small @click="parent.selectItem(item)"> mdi-close </v-icon>
            </v-chip>
          </template>

          <template v-slot:item="{ index, item }">
            <v-text-field
              v-if="editing === item"
              v-model="editing.text"
              autofocus
              flat
              background-color="transparent"
              hide-details
              solo
              @keyup.enter="edit(index, item)"
            ></v-text-field>
            <v-chip v-else :color="`${item.color} lighten-2`" dark label small>
              {{ item.text }}
            </v-chip>
            <v-spacer></v-spacer>
            <!-- <v-list-item-action @click.stop>
                    <v-btn icon @click.stop.prevent="edit(index, item)">
                      <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                    </v-btn>
                  </v-list-item-action> -->
          </template>
        </v-combobox>

        <!-- LOCATION / CITY OF RESIDENCE -->

        <v-combobox
          v-model="model2"
          prepend-icon="mdi-trophy"
          :filter="filter"
          :hide-no-data="!search"
          :items="reward"
          :search-input.sync="search"
          hide-selected
          label="Reward for winning students"
          multiple
          small-chips
          hide-details
          solo
          outlined
          class="module-setup__combobox mt-12 mb-12"
        >
          <!-- <template v-slot:no-data>
            <v-list-item>
              <span class="subheading">Create</span>
              <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
                {{ search }}
              </v-chip>
            </v-list-item>
          </template> -->
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
              v-if="item === Object(item)"
              v-bind="attrs"
              :color="`${item.color} lighten-2`"
              :input-value="selected"
              label
              small
              dark
            >
              <span class="pr-2">
                {{ item.text }}
              </span>
              <v-icon small @click="parent.selectItem(item)"> mdi-close </v-icon>
            </v-chip>
          </template>

          <template v-slot:item="{ index, item }">
            <v-text-field
              v-if="editing === item"
              v-model="editing.text"
              autofocus
              flat
              background-color="transparent"
              hide-details
              solo
              @keyup.enter="edit(index, item)"
            ></v-text-field>
            <v-chip v-else :color="`${item.color} lighten-2`" dark label small>
              {{ item.text }}
            </v-chip>
            <v-spacer></v-spacer>
            <!-- <v-list-item-action @click.stop>
                    <v-btn icon @click.stop.prevent="edit(index, item)">
                      <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                    </v-btn>
                  </v-list-item-action> -->
          </template>
        </v-combobox>
      </div>
      <div class="module-setup__license-button mt-12">
        <!-- LINK LICENSE PROGRAM TO STRIPE WITH DISCOUNT CODE -->
        <v-btn class="mr-2" x-large outlined depressed>Save</v-btn>
        <v-btn class="ml-2" x-large dark depressed>License Program</v-btn>
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
    files: [],
    reward: [
      { text: 'Paid Internship', color: 'purple' },
      { text: 'Paid Fellowship', color: 'purple' },
      { text: 'Paid Entrepreneur-in-Residence', color: 'purple' },
      { text: 'Paid Apprenticeship', color: 'purple' },
      { text: 'Unpaid Internship', color: 'pink' },
      { text: 'Unpaid Fellowship', color: 'pink' },
      { text: 'Unpaid Entrepreneur-in-Residence', color: 'pink' },
      { text: 'Unpaid Apprenticeship', color: 'pink' }
    ],
    items: [
      // { header: 'participant residency' },
      {
        text: 'San Leandro, CA',
        color: 'blue'
      },
      {
        text: 'San Lorenzo, CA',
        color: 'blue'
      },
      {
        text: 'San Francisco, CA',
        color: 'blue'
      },
      {
        text: 'San Diego, CA',
        color: 'blue'
      },
      {
        text: 'San Jose, CA',
        color: 'blue'
      },
      {
        text: 'San Luis Obispo, CA',
        color: 'blue'
      }
    ],
    seasons: ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
    icons: [
      'mdi-snowflake',
      'mdi-leaf',
      'mdi-fire',
      'mdi-water',
      'mdi-leaf',
      'mdi-fire',
      'mdi-water'
    ],
    search: null
  }),

  methods: {
    season(val) {
      return this.icons[val];
    }
  },
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

  &__map-selected {
    // width: 95%;
    // height: 275px;
    background-color: #dedede;
    border-radius: 5px;
  }
}

.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none;
}
</style>
