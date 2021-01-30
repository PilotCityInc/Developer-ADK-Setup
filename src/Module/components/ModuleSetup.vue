<template>
  <v-container class="module-edit">
    <div class="module-edit__container">
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
        <!-- <v-file-input
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
        </v-file-input> -->

        <div class="module-setup__question-title">
          What age range will you accept as student participants?
        </div>

        <v-range-slider
          v-model="programDoc.ageRange"
          :tick-labels="ages"
          label="Age"
          min="0"
          max="10"
          ticks="always"
          tick-size="4"
          class="mt-10 mb-10"
        >
          <template v-slot:thumb-label="props">
            <v-icon dark> </v-icon>
          </template>
        </v-range-slider>

        <!-- LOCATION / CITY OF RESIDENCE -->

        <v-combobox
          v-model="programDoc.requiredResidency"
          :items="requiredResidencyOptions"
          :search-input.sync="residencySearch"
          prepend-icon="mdi-map-check"
          hide-selected
          label="Set required city or county of participant residence"
          multiple
          small-chips
          hide-details
          solo
          outlined
          class="module-setup__combobox mt-5 mb-5"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Press <kbd>enter</kbd> to add the residency "<strong>{{ residencySearch }}</strong
                  >".
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              label
              small
              @click="parent.selectItem(item)"
            >
              <span class="pr-2">
                {{ item }}
              </span>
              <v-icon small> mdi-close </v-icon>
            </v-chip>
          </template>
        </v-combobox>
        <!-- <v-img
          class="pl-auto ml-auto module-setup__map-selected mb-5"
          :aspect-ratio="16 / 9"
          width="94%"
          src="https://f.hubspotusercontent00.net/hubfs/2480959/Screen%20Shot%202020-11-25%20at%2010.42.51%20PM.png"
        ></v-img> -->

        <!-- Required Skills -->

        <v-combobox
          v-model="programDoc.requiredSkills"
          :items="requiredSkillOptions"
          :search-input="skillSearch"
          prepend-icon="mdi-head-snowflake-outline"
          hide-selected
          label="List any skills required"
          multiple
          small-chips
          hide-details
          solo
          outlined
          class="module-setup__combobox mt-12 mb-12"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Press <kbd>enter</kbd> to add the skill "<strong>{{ skillSearch }}</strong
                  >".
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              label
              small
              @click="parent.selectItem(item)"
            >
              <span class="pr-2">
                {{ item }}
              </span>
              <v-icon small> mdi-close </v-icon>
            </v-chip>
          </template>
        </v-combobox>
        <!-- Technology -->
        <v-combobox
          v-model="programDoc.requiredTech"
          :items="requiredTechOptions"
          :search-input="techSearch"
          prepend-icon="mdi-monitor-cellphone"
          hide-selected
          label="List any technology or tools required"
          multiple
          small-chips
          hide-details
          solo
          outlined
          class="module-setup__combobox mt-12 mb-12"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Press <kbd>enter</kbd> to add "<strong>{{ techSearch }}</strong
                  >" as required technology.
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              label
              small
              @click="parent.selectItem(item)"
            >
              <span class="pr-2">
                {{ item }}
              </span>
              <v-icon small> mdi-close </v-icon>
            </v-chip>
          </template>
        </v-combobox>

        <!-- LOCATION / CITY OF RESIDENCE -->

        <v-combobox
          v-model="programDoc.rewards"
          :items="rewardOptions"
          :search-input="rewardSearch"
          prepend-icon="mdi-trophy"
          hide-selected
          label="Reward for winning students"
          multiple
          small-chips
          hide-details
          solo
          outlined
          class="module-setup__combobox mt-12 mb-12"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Press <kbd>enter</kbd> to add the reward "<strong>{{ rewardSearch }}</strong
                  >".
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              label
              small
              @click="parent.selectItem(item)"
            >
              <span class="pr-2">
                {{ item }}
              </span>
              <v-icon small> mdi-close </v-icon>
            </v-chip>
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
import { reactive, toRefs, defineComponent, computed, onMounted } from '@vue/composition-api';
// import gql from 'graphql-tag';
import { range } from 'lodash';

export default defineComponent({
  name: 'ModuleSetup',
  props: {
    value: {
      required: true,
      type: Object
    }
  },
  setup(props, ctx) {
    // Default Options
    const options = reactive({
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
      requiredResidencyOptions: [
        'San Leandro, CA',
        'San Lorenzo, CA',
        'San Francisco, CA',
        'San Diego, CA',
        'San Jose, CA',
        'San Luis Obispo, CA'
      ],
      requiredTechOptions: [],
      requiredSkillOptions: [],
      rewardOptions: [],
      ages: range(12, 23),
      residencySearch: null,
      skillSearch: null,
      techSearch: null,
      rewardSearch: null
    });
    // data binding
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });
    const dataProperties = [
      'programName',
      'programDesc',
      'ageRange',
      'requiredResidency',
      'requiredSkills',
      'requiredTech',
      'rewards'
    ];
    const writeFields = dataProperties.map(prop => {
      if (!programDoc.value[prop]) {
        if (prop === 'programName' || prop === 'programDesc') return { [prop]: '' };
        if (prop === 'ageRange') return { [prop]: [0, 10] };

        return { [prop]: [] };
      }
      return {};
    });
    programDoc.value = Object.assign({}, ...writeFields, programDoc.value);
    return {
      ...toRefs(options),
      programDoc
    };
  }
});
</script>

<style lang="scss">
.module-setup {
  &__question-title {
    font-family: Raleway;
    font-size: 18px;
    font-weight: 700;
    line-height: 30px;
    text-align: center;
    // margin-top: 25px;
  }
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
