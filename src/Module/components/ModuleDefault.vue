<template>
  <v-container class="module-default__container">
    <!-- <div class="module-default__instructions">
      <v-expansion-panels v-model="showInstructions" class="module-default__instructions" flat>
        <v-expansion-panel>
          <v-expansion-panel-header
            v-show="showInstructions"
            hide-actions
            class="pa-0"
            @click="showInstructions = true"
          >
            <template v-slot="{ open }">
              <v-scroll-y-transition hide-on-leave>
                <div v-if="!open" class="d-flex flex-column justify-center">
                  <v-icon color="grey lighten-2" class="d-flex justify-center">
                    mdi-chevron-down
                  </v-icon>
                  <div color="grey lighten-2" class="module-default__collapse-title">
                    INSTRUCTIONS
                  </div>
                </div>
              </v-scroll-y-transition>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <Instruct readonly />
            <div @click="showInstructions = true">
              <div class="module-default__collapse-title">CLOSE</div>
              <v-icon color="grey lighten-2" class="d-flex justify-center"> mdi-chevron-up </v-icon>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div> -->

    <v-progress-linear
      class="module-default__collapse-divider"
      color="#dedede"
      height="2"
      value="100"
      buffer-value="100"
      stream
    />
    <div class="module-edit__container">
      <!-- ENTER CONTENT HERE -->
      <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
      <!-- <div class="module-default__none">Design your activity here</div> -->
      <!-- BIRTHDATE -->
      <v-menu
        ref="menu"
        :value="false"
        transition="scale-transition"
        :close-on-content-click="false"
        offset-y
        min-width="290px"
        class="mt-5 mb-5"
      >
        <template v-slot:activator="{ on, attrs }">
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="date"
              prepend-icon="mdi-calendar"
              :error-messages="errors"
              label="Birthdate"
              outlined
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </validation-provider>
        </template>
        <v-date-picker
          ref="picker"
          v-model="date"
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
      <!-- RESIDENCE -->
      <v-autocomplete
        class="mt-5 mb-5"
        outlined
        prepend-icon="mdi-google-maps"
        label="Home Address"
      ></v-autocomplete>
      <br />
      <br />
      <!-- SKILLS REQUIRED TITLE -->
      <span class="module-default__question-title mb-5"
        >Do you know any of the required skills by the employer organizer?
      </span>
      <!-- SKILLS REQUIRED 1 -->
      <v-checkbox v-model="checkbox">
        <template v-slot:label>
          <div>Operation of a drone</div>
        </template>
      </v-checkbox>
      <!-- SKILLS REQUIRED 1 -->
      <v-checkbox v-model="checkbox">
        <template v-slot:label>
          <div>JavaScript</div>
        </template>
      </v-checkbox>
      <!-- SKILLS REQUIRED 1 -->
      <v-checkbox v-model="checkbox">
        <template v-slot:label>
          <div>How to use Google Suite</div>
        </template>
      </v-checkbox>
      <br />
      <br />
      <!-- TECH REQUIRED TITLE -->
      <span class="module-default__question-title mb-5"
        >Do you have access of any of the required technology or tools?
      </span>
      <!--TECH REQUIRED 1 -->
      <v-checkbox v-model="checkbox">
        <template v-slot:label>
          <div>DJI Mavic Pro</div>
        </template>
      </v-checkbox>
      <!--TECH REQUIRED 1 -->
      <v-checkbox v-model="checkbox">
        <template v-slot:label>
          <div>Smartphone</div>
        </template>
      </v-checkbox>
      <!--TECH REQUIRED 1 -->
      <v-checkbox v-model="checkbox">
        <template v-slot:label>
          <div>DJI GO 4 App</div>
        </template>
      </v-checkbox>

      <!-- PAID OR UNPAID -->
      <br />
      <br />
      <span class="module-default__question-title">What compensation types are you open to?</span>
      <v-checkbox hide-details label="Unpaid Experience"></v-checkbox>
      <v-checkbox hide-details label="Paid"></v-checkbox>
    </div>
    <div class="module-default__license-button mt-12">
      <!-- LINK LICENSE PROGRAM TO STRIPE WITH DISCOUNT CODE -->
      <v-btn class="mr-2" x-large outlined depressed>Use</v-btn>
      <v-btn class="ml-2" x-large dark depressed>Buy</v-btn>
      <v-btn class="ml-2" x-large dark depressed>Redeem</v-btn>
      <v-btn class="ml-2" x-large dark depressed>Get Sponsored</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api';
// import Instruct from './ModuleInstruct.vue';

export default {
  name: 'ModuleDefault',
  components: {
    // Instruct
  },
  apollo: {},
  data() {
    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    const showInstructions = ref(true);
    return {
      setupInstructions,
      showInstructions
    };
  }
};
</script>

<style lang="scss">
.module-default {
  &__license-button {
    text-align: center;
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

  &__question-title {
    font-family: Raleway;
    font-size: 18px;
    font-weight: 700;
    line-height: 30px;
    // margin-top: 25px;
  }

  &__collapse-divider {
    margin-top: 15px;
    margin-bottom: 75px;
    margin-right: none;
    margin-left: none;
    padding-right: none;
    padding-left: none;
    width: 100%;
  }

  &__collapse-title {
    color: #dedede;
    text-align: center;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1px;
    font-size: 13px;
    //  text-uppercase font-weight-bold text-subtitle-2 text-center
  }

  &__container {
    // width: 100%;
    // padding: none;
    // margin: none;
    margin-top: 0px;
    padding: 0px;
  }
  &__employer-title {
    font-size: 25px;
    font-weight: 700;
  }

  &__scope {
    font-size: 22px;
    font-weight: 800;
    text-align: center;
    max-width: 95%;
    margin: auto;
  }
  &__youtube {
    height: 400px;
    width: 95%;
    border-radius: 25px;
    // margin: 0px;
    background-color: #dedede;

    // text-align: center;
    // justify-content: center;
    // align-items: center;
    // padding-top: auto;
    // padding-bottom: auto;
  }
  &__about {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq-chat {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 5%;
  }
  &__faq-chat-line {
    margin: 5px;
  }

  &__faq-avatar {
    margin: 5px;
  }

  &__faq-question {
    // text-align: left;
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 800;
    color: #404142;
  }

  &__faq-answer {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: white;
    font-style: italic;
  }

  &__faq-answer-dark {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: #404142;
    font-style: italic;
  }

  &__faq-answer-dark-highlight {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0px;
    color: #404142;
  }

  &__specs-title {
    font-weight: 800;
  }
}
</style>
