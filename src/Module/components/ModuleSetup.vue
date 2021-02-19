<template>
  <v-container class="module-edit">
    <validation-observer v-slot="{ invalid }" class="module-edit__container">
      <div>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-text-field
            v-model="programDoc.data.programName"
            rounded
            :error-messages="errors"
            class="mt-5 mb-5"
            prepend-icon="mdi-music-accidental-sharp"
            outlined
            hint="Psst... This will be your public display name"
            label="Employer Name"
            placeholder="Enter your organization name"
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-textarea
            v-model="programDoc.data.programDesc"
            rounded
            :error-messages="errors"
            class="mt-5 mb-5"
            outlined
            three-line
            counter="280"
            label="What's your project scope?"
            prepend-icon="mdi-text-subject"
            placeholder="In a tweet or less, what are you asking students to do?"
            hint="This will be displayed when students explore programs"
          ></v-textarea>
        </validation-provider>
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

        <!-- LOCATION / CITY OF RESIDENCE -->

        <validation-provider v-slot="{ errors }" rules="required" slim>
          <v-combobox
            v-model="programDoc.data.rewards"
            rounded
            :items="rewardOptions"
            :search-input="rewardSearch"
            :error-messages="errors"
            prepend-icon="mdi-trophy"
            hide-selected
            label="Reward for winning students"
            multiple
            small-chips
            hide-details
            outlined
            class="module-setup__combobox mt-5 mb-5"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Press <kbd>enter</kbd> to add reward
                    <!-- <strong>{{ rewardSearch }}</strong
                    >". -->
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
        </validation-provider>

        <validation-provider v-slot="{ errors }" rules="required" slim>
          <v-combobox
            v-model="programDoc.data.pathways"
            rounded
            :items="pathwayOptions"
            :search-input="pathwaySearch"
            :error-messages="errors"
            prepend-icon="mdi-sign-direction"
            hide-selected
            label="What are the career pathways of this project & program?"
            multiple
            small-chips
            hide-details
            outlined
            class="module-setup__combobox mt-5 mb-5"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Press <kbd>enter</kbd> to add reward
                    <!-- <strong>{{ rewardSearch }}</strong
                    >". -->
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
        </validation-provider>
        <!--
        <v-file-input
          hide-details
          :rules="employerImage"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
          label="Upload your logo or avatar"
          outlined
          rounded
        ></v-file-input> -->

        <div class="headline d-flex justify-center mt-12 font-weight-bold">Add-ons</div>

        <!-- <v-img
          class="pl-auto ml-auto module-setup__map-selected mb-5"
          :aspect-ratio="16 / 9"
          width="94%"
          src="https://f.hubspotusercontent00.net/hubfs/2480959/Screen%20Shot%202020-11-25%20at%2010.42.51%20PM.png"
        ></v-img> -->

        <!-- Required Skills -->

        <validation-provider v-slot="{ errors }" slim>
          <v-combobox
            v-model="programDoc.data.requiredSkills"
            rounded
            :error-messages="errors"
            :items="requiredSkillOptions"
            :search-input="skillSearch"
            prepend-icon="mdi-head-snowflake-outline"
            hide-selected
            label="Any pre-existing knowledge, tech or tools required?"
            multiple
            hint="hi"
            small-chips
            hide-details
            outlined
            class="module-setup__combobox mt-12 mb-12"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> Press <kbd>enter</kbd> to add item </v-list-item-title>

                  <!-- <v-list-item-title>
                    Press <kbd>enter</kbd> to add the skill "<strong>{{ skillSearch }}</strong
                    >".
                  </v-list-item-title> -->
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
        </validation-provider>

        <!-- Technology -->
        <!-- <validation-provider v-slot="{ errors }" rules="required" slim>
          <v-combobox
            v-model="programDoc.data.requiredTech"
            rounded
            :items="requiredTechOptions"
            :search-input="techSearch"
            :error-messages="errors"
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
        </validation-provider> -->

        <!-- LOCATION / CITY OF RESIDENCE -->

        <validation-provider v-slot="{ errors }" slim>
          <v-combobox
            v-model="programDoc.data.requiredResidency"
            rounded
            :error-messages="errors"
            :items="requiredResidencyOptions"
            :search-input.sync="residencySearch"
            prepend-icon="mdi-map-check"
            hide-selected
            label="Which city or county residents are prioritized for rewards?"
            multiple
            small-chips
            hide-details
            outlined
            placeholder="Example: San Leandro, CA"
            class="module-setup__combobox mt-5 mb-5"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Press <kbd>enter</kbd> to add the residency "<strong>{{
                      residencySearch
                    }}</strong
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
        </validation-provider>

        <div class="module-setup__question-title mt-12">
          What age range do you prefer for student participants?
        </div>

        <v-range-slider
          v-model="programDoc.data.ageRange"
          :tick-labels="ages"
          label="Age"
          min="12"
          max="22"
          ticks="always"
          tick-size="1"
          class="mt-10 mb-10"
        >
          <template v-slot:thumb-label>
            <v-icon dark> </v-icon>
          </template>
        </v-range-slider>
      </div>
      <div class="module-setup__license-button mt-12">
        <!-- LINK LICENSE PROGRAM TO STRIPE WITH DISCOUNT CODE -->
        <v-btn class="mr-2" x-large outlined depressed :loading="saveLoading" @click="saveProgram"
          >Save</v-btn
        >
        <v-btn
          class="ml-2"
          x-large
          :dark="!invalid"
          depressed
          :disabled="invalid"
          :loading="licenseLoading"
          @click="licenseFun"
          >License Program</v-btn
        >
        <v-alert
          v-if="status.length"
          class="mt-3"
          :type="status.includes('Saved') ? 'success' : 'error'"
          >{{ status }}</v-alert
        >
      </div>
    </validation-observer>
  </v-container>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, computed, ref, PropType } from '@vue/composition-api';
// import gql from 'graphql-tag';
import { range } from 'lodash';

export default defineComponent({
  name: 'ModuleSetup',
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
    }
  },
  setup(props, ctx) {
    // Default Options
    const options = reactive({
      reward: [
        { text: 'Paid Internship', color: 'grey darken-2' },
        { text: 'Unpaid Internship', color: 'grey darken-2' }
      ],
      pathway: [
        { text: 'Agriculture & Natural Resources', color: 'grey darken-2' },
        { text: 'Arts, Media & Entertainment', color: 'grey darken-2' },
        { text: 'Building & Construction Trades', color: 'grey darken-2' },
        { text: 'Business & Finance', color: 'grey darken-2' },
        { text: 'Education, Childhood Development & Family Services', color: 'grey darken-2' },
        { text: 'Energy, Environment & Utilities', color: 'grey darken-2' },
        { text: 'Engineering & Architecture', color: 'grey darken-2' },
        { text: 'Fashion & Interior Design', color: 'grey darken-2' },
        { text: 'Health Science & Medical Technology', color: 'grey darken-2' },
        { text: 'Hospitality, Tourism & Recreation', color: 'grey darken-2' },
        { text: 'Information & Communication Technologies', color: 'grey darken-2' },
        { text: 'Manufacturing & Product Design', color: 'grey darken-2' },
        { text: 'Marketing, Sales & Service', color: 'grey darken-2' },
        { text: 'Public Services', color: 'grey darken-2' },
        { text: 'Transportation', color: 'grey darken-2' }
      ],

      requiredResidencyOptions: [
        'Alameda County, CA',
        'Alameda, CA',
        'Albany, CA',
        'Berkeley, CA',
        'Contra Costa County, CA',
        'East Palo Alto, CA',
        'Emeryville, CA',
        'Hayward, CA',
        'Marin County, CA',
        'Oakland, CA',
        'Piedmont, CA',
        'San Leandro, CA',
        'San Lorenzo, CA',
        'San Mateo County, CA',
        'Santa Clara County, CA'
      ],
      requiredTechOptions: [],
      requiredSkillOptions: [],
      rewardOptions: ['Paid Internship', 'Unpaid Internship'],
      rewardPresets: ['Paid Internship', 'Unpaid Internship'],
      pathwayOptions: [
        'Agriculture & Natural Resources',
        'Arts, Media & Entertainment',
        'Building & Construction Trades',
        'Business & Finance',
        'Education, Childhood Development & Family Services',
        'Energy, Environment & Utilities',
        'Engineering & Architecture',
        'Fashion & Interior Design',
        'Health Science & Medical Technology',
        'Hospitality, Tourism & Recreation',
        'Information & Communication Technologies',
        'Manufacturing & Product Design',
        'Marketing, Sales & Service',
        'Public Services',
        'Transportation'
      ],
      ages: range(12, 23),
      residencySearch: null,
      skillSearch: null,
      techSearch: null,
      rewardSearch: null,
      pathwaySearch: null,
      employerImage: [
        (value: any) => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ]
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
      'rewards',
      'pathways'
    ];
    const writeFields = dataProperties.map(prop => {
      if (!programDoc.value.data[prop]) {
        if (prop === 'programName' || prop === 'programDesc') return { [prop]: '' };
        if (prop === 'ageRange') return { [prop]: [12, 22] };

        return { [prop]: [] };
      }
      return {};
    });
    programDoc.value = {
      ...programDoc.value,
      data: {
        ...Object.assign({}, ...writeFields),
        ...programDoc.value.data
      }
    };
    // Save Function Handling
    const status = ref('');
    const saveData = reactive({
      saveLoading: false
    });
    async function saveProgram() {
      saveData.saveLoading = true;
      try {
        await programDoc.value.update();
        status.value = 'Saved Successfully';
      } catch (err) {
        console.log(err);
        status.value = `${'Something went wrong, try again later\n'}${err}`;
      }
      saveData.saveLoading = false;
    }
    // Checkout Function Handling
    const licenseData = reactive({
      licenseLoading: false
    });
    async function licenseFun() {
      licenseData.licenseLoading = true;
      try {
        await props.licenseProgram();
        status.value = 'Saved Successfully, redirecting to checkout';
      } catch (err) {
        status.value = `Something went wrong, try again later\n ${err}`;
      }
      licenseData.licenseLoading = false;
    }
    return {
      ...toRefs(options),
      programDoc,
      ...toRefs(saveData),
      saveProgram,
      ...toRefs(licenseData),
      licenseFun,
      status
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
    // display: flex;
    // flex-direction: column;
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
