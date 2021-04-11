<template>
  <ValidationObserver>
    <v-container class="module-default pa-0 align-center">
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
        class="mt-3"
        color="#dedede"
        height="2"
        value="100"
        buffer-value="100"
        stream
      />
      <v-form v-model="checkoutFormCompleted" class="mt-12">
        <span class="module-default__question-title mt-12">
          Are you open to winning unpaid or paid work experiences?
        </span>
        <v-radio-group
          v-model="studentDocument.data.rewards"
          hide-details
          :rules="[rules.required]"
        >
          <v-radio
            v-if="programDoc.data.rewards.length === 0 || programDoc.data.rewards.length === 2"
            label="Yes"
            value="yes"
          ></v-radio>
          <v-radio
            v-if="
              programDoc.data.rewards[0] === 'Paid Work Experience' &&
              programDoc.data.rewards.length === 1
            "
            label="Yes"
            value="yes"
          ></v-radio>

          <v-radio
            v-if="
              programDoc.data.rewards[0] === 'Unpaid Work Experience' &&
              programDoc.data.rewards.length === 1
            "
            value="yes"
          >
            <template v-slot:label>
              <div>
                Yes
                <strong class="module-default__required ml-2"> REQUIRED</strong>
              </div>
            </template></v-radio
          >
          <v-radio
            v-if="
              programDoc.data.rewards[0] === 'Paid Work Experience' &&
              programDoc.data.rewards.length === 1
            "
            value="paid only"
          >
            <template v-slot:label>
              <div>
                Paid Only
                <strong class="module-default__required ml-2"></strong>
              </div>
            </template>
          </v-radio>
          <v-radio
            v-else-if="
              programDoc.data.rewards[0] === 'Unpaid Work Experience' &&
              programDoc.data.rewards.length === 1
            "
            label="Paid Only"
            value="paid only"
            disabled
          >
          </v-radio>
          <v-radio v-else value="paid only">
            <template v-slot:label>
              <div>Paid Only</div>
            </template>
          </v-radio>
        </v-radio-group>
        <!-- </div> -->

        <br />
        <br />

        <!-- SKILLS REQUIRED TITLE -->
        <div v-if="programDoc.data.requiredSkills.length !== 0">
          <span class="module-default__question-title"
            >Do you know, can learn or have access to the following items?
          </span>
          <!-- SKILLS REQUIRED 1 -->
          <div
            v-for="(requiredSkills, itemIndex) in programDoc.data.requiredSkills"
            :key="itemIndex"
          >
            <validation-provider v-slot="{ errors }" rules="required">
              <v-checkbox
                v-model="accessSkills"
                multiple
                :value="requiredSkills"
                :label="requiredSkills"
                :error-messages="errors"
                :rules="[rules.allSkillsSelected]"
                required
              >
                {{ requiredSkills }}
              </v-checkbox>
            </validation-provider>
          </div>

          <br />
          <br />
        </div>

        <!-- SKILLS REQUIRED TITLE -->
        <div v-if="programDoc.data.requiredResidency.length !== 0">
          <span class="module-default__question-title"
            >Do you live or work in any of the priority jurisdictions?
          </span>
          <v-radio-group
            v-model="studentDocument.data.studentLocation"
            hide-details
            :rules="[rules.required]"
            ><v-radio
              v-for="(requiredResidency, itemIndex) in programDoc.data.requiredResidency"
              :key="itemIndex"
              :label="requiredResidency"
              :value="requiredResidency"
            ></v-radio
            ><v-radio label="None of the above"></v-radio
          ></v-radio-group>
          <br />
          <br />
          <br />
          <br />
        </div>

        <v-menu
          ref="menu"
          v-model="birthdayMenu"
          :value="false"
          transition="scale-transition"
          :close-on-content-click="false"
          offset-y
          min-width="290px"
          class="mt-12 mb-5"
        >
          <template v-slot:activator="{ on, attrs }">
            <validation-provider v-slot="{ errors }" rules="required">
              <v-text-field
                v-model="birthdate"
                rounded
                prepend-icon="mdi-cake-variant"
                :error-messages="errors"
                label="Confirm your birthdate"
                outlined
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </validation-provider>
          </template>
          <v-date-picker
            ref="picker"
            v-model="birthdate"
            max="2008-01-01"
            min="1992-01-01"
            @input="
              birthdayMenu = false;
              saveBirthday($event);
            "
            @change="save"
          ></v-date-picker>
        </v-menu>

        <div class="d-flex flex-row mt-5 mb-5">
          <!-- MOBILE PHONE NUMBER VERIFICATION -->
          <validation-provider v-slot="{ errors }" slim rules="required">
            <v-text-field
              v-model="phoneNumber"
              v-mask="'(###) ###-####'"
              prepend-icon="mdi-cellphone-iphone"
              outlined
              rounded
              prefix="+1 "
              :error-messages="errors"
              label="Confirm mobile phone number"
            ></v-text-field>
          </validation-provider>

          <v-dialog v-model="verifyNumberDialog" persistent max-width="375px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                rounded
                class="ml-3"
                v-bind="attrs"
                outlined
                x-large
                depressed
                :disabled="phoneNumber.length !== 14"
                v-on="on"
                @click="sendVerification"
                ><v-icon v-if="phoneVerified" color="green" left>mdi-check-bold</v-icon
                >Verify</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="d-flex flex-column">
                <div class="d-flex justify-center">
                  <v-tooltip top color="black">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn class="" v-bind="attrs" icon v-on="on" @click="sendVerification"
                        ><v-icon>mdi-refresh</v-icon></v-btn
                      >
                    </template>
                    <span>Resend Code</span>
                    <!-- <span>Expand</span> -->
                  </v-tooltip>
                </div>

                <div class="overline font-weight-bold">Enter text verification code sent</div>
              </v-card-title>

              <v-divider></v-divider>

              <v-container class="d-flex justify-center">
                <div class="d-flex flex-column justify-center align-center">
                  <v-text-field
                    v-model="verificationCode"
                    class="justify-center module-default__sms-verification ma-2"
                    x-large
                    rounded
                    outlined
                    hide-details
                  ></v-text-field>
                  <v-btn
                    class="ma-2"
                    x-large
                    dark
                    rounded
                    depressed
                    @click="verifyPhoneNumber.process()"
                    >Verify</v-btn
                  >
                  <v-progress-circular
                    v-if="verifyPhoneNumber.loading.value"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                  <v-alert
                    v-if="verifyPhoneNumber.success.value || verifyPhoneNumber.error.value"
                    class="mt-3"
                    :type="verifyPhoneNumber.success.value ? 'success' : 'error'"
                    >{{ verifyPhoneNumber.message.value }}</v-alert
                  >

                  <div class="d-flex justify-center">
                    <v-btn icon @click="verifyNumberDialog = false"
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </div>
                </div>
              </v-container>
            </v-card>
          </v-dialog>
        </div>
      </v-form>
      <div class="module-default__license-button mt-12">
        <!-- <v-btn v-if="studentDoc._id" class="mr-2" x-large outlined depressed @click="process()"
          >Save</v-btn
        > -->

        <v-dialog v-model="dialog" persistent max-width="400px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="ml-2 font-weight-bold"
              x-large
              rounded
              :dark="enableProgramCheckout && !studentDoc._id"
              depressed
              :disabled="!enableProgramCheckout || studentDoc._id"
              v-on="on"
              >Program Checkout</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <div class="overline font-weight-black">Program Checkout</div>

              <div class="ml-auto">
                <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-container>
              <div class="d-flex justify-center flex-column">
                <!-- <strong class="mx-autowd">
                  <v-progress-circular v-if="getTokens.loading.value" />
                  {{ getTokens.message.value }} TOKENS AVAILABLE</strong
                > -->
                <div class="justify-center d-flex"></div>
                <v-dialog v-model="dialog2" persistent max-width="425px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mt-2 mb-2 font-weight-black"
                      x-large
                      rounded
                      :dark="getTokens.message.value > 0"
                      depressed
                      :disabled="getTokens.message.value === 0"
                      v-bind="attrs"
                      @click="dialog2 = true"
                      v-on="on"
                      ><v-icon left>mdi-set-right</v-icon>Use 1 Token</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <div class="overline font-weight-bold">
                        Are you sure you want to use a token?
                      </div>

                      <div class="ml-auto">
                        <v-btn icon @click="dialog2 = false"><v-icon>mdi-close</v-icon></v-btn>
                      </div>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-container>
                      <div class="d-flex justify-center flex-row align-center">
                        <v-btn
                          class="ma-2"
                          color="red"
                          x-large
                          rounded
                          depressed
                          dark
                          @click="dialog2 = false"
                          >No</v-btn
                        >
                        <v-btn
                          class="ma-2"
                          color="green"
                          rounded
                          x-large
                          dark
                          depressed
                          @click="studentUseToken.process"
                          >Yes</v-btn
                        >
                        <v-progress-circular
                          v-if="studentUseToken.loading.value"
                          indeterminate
                          color="primary"
                        ></v-progress-circular>
                      </div>
                      <v-progress-circular
                        v-if="studentUseToken.loading.value"
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                      <v-alert
                        v-if="studentUseToken.success.value || studentUseToken.error.value"
                        class="mt-3"
                        :type="success ? 'success' : 'error'"
                        >{{ studentUseToken.message.value }}</v-alert
                      >
                    </v-container>
                  </v-card>
                </v-dialog>

                <v-btn
                  color="blue"
                  class="mt-2 mb-2"
                  outlined
                  x-large
                  rounded
                  depressed
                  @click="$router.push({ name: 'portfolio', params: { tab: 'payment' } })"
                  ><v-icon left>mdi-cash-usd</v-icon>Buy 1 Token</v-btn
                >

                <v-dialog v-model="dialog3" persistent max-width="475px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mt-2 mb-2"
                      x-large
                      color="green"
                      rounded
                      outlined
                      depressed
                      v-bind="attrs"
                      @click="dialog3 = true"
                      v-on="on"
                      ><v-icon left>mdi-vector-link</v-icon>Enter Code</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <div class="overline font-weight-bold">Enter Sponsorship Code</div>

                      <div class="ml-auto">
                        <v-btn icon @click="dialog3 = false"><v-icon>mdi-close</v-icon></v-btn>
                      </div>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-container>
                      <div class="d-flex justify-center flex-column">
                        <v-text-field
                          v-model="sponsorshipLink"
                          class="ma-4"
                          rounded
                          hide-details
                          outlined
                          placeholder="https://www.pilotcity.com/sponsor/entercode"
                        ></v-text-field>
                        <v-btn
                          color="green"
                          x-large
                          rounded
                          :dark="sponsorshipLink.length > 0"
                          depressed
                          class="ma-4"
                          :disabled="!sponsorshipLink.length"
                          :loading="useClaimLink.loading.value"
                          @click="useClaimLink.process"
                          >Start Program</v-btn
                        >
                        <v-alert
                          v-if="useClaimLink.success.value || useClaimLink.error.value"
                          class="ma-4"
                          dense
                          :type="useClaimLink.success.value ? 'success' : 'error'"
                          >{{ useClaimLink.message.value }}</v-alert
                        >
                      </div>
                    </v-container>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialog6" persistent max-width="450px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mt-2 mb-2"
                      x-large
                      color="red"
                      rounded
                      outlined
                      depressed
                      v-bind="attrs"
                      @click="dialog6 = true"
                      v-on="on"
                      ><v-icon left>mdi-trophy</v-icon>Get Sponsored</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title><v-icon x-large color="red">mdi-trophy</v-icon></v-card-title>
                    <v-card-title>
                      <div class="headline font-weight-bold">Get Sponsored</div>

                      <div class="ml-auto">
                        <v-btn icon @click="dialog6 = false"><v-icon>mdi-close</v-icon></v-btn>
                      </div>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-container>
                      <div class="d-flex justify-center flex-column">
                        <v-form v-model="applyForSponsorshipValid">
                          <v-text-field
                            v-model="studentDocument.data.studentResidence"
                            :rules="[rules.required]"
                            prepend-icon="mdi-map-marker-radius"
                            class="ma-2"
                            rounded
                            label="City of Residence"
                            hide-details
                            outlined
                          ></v-text-field>
                          <!-- <v-text-field
                        class="ma-2"
                        rounded
                        label="County"
                        hide-details
                        outlined
                      ></v-text-field>
                      <v-text-field
                        class="ma-2"
                        rounded
                        label="Country"
                        hide-details
                        outlined
                      ></v-text-field> -->
                          <v-text-field
                            v-model="studentDocument.data.studentSchool"
                            :rules="[rules.required]"
                            prepend-icon="mdi-notebook"
                            class="ma-2"
                            rounded
                            label="School"
                            hide-details
                            outlined
                          ></v-text-field>

                          <validation-provider v-slot="{ errors }" slim rules="required">
                            <v-combobox
                              v-model="studentDocument.data.studentEthnicity"
                              rounded
                              :items="ethnicityCulture"
                              :error-messages="errors"
                              prepend-icon="mdi-account-group"
                              label="Ethnicity & Culture"
                              multiple
                              small-chips
                              hide-details
                              outlined
                              class="ma-2"
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
                                  <span class="">
                                    {{ item }}
                                  </span>
                                  <v-icon small> mdi-close </v-icon>
                                </v-chip>
                              </template>
                            </v-combobox>
                          </validation-provider>

                          <validation-provider v-slot="{ errors }" slim>
                            <v-combobox
                              v-model="studentDocument.data.studentFollowingOptions"
                              rounded
                              :items="eligibilityOptions"
                              :search-input="eligibilitySearch"
                              :error-messages="errors"
                              prepend-icon="mdi-check-box-multiple-outline"
                              label="Do you have any of the following?"
                              multiple
                              small-chips
                              hide-details
                              outlined
                              class="ma-2"
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
                                  <span class="">
                                    {{ item }}
                                  </span>
                                  <v-icon small> mdi-close </v-icon>
                                </v-chip>
                              </template>
                            </v-combobox>
                          </validation-provider>

                          <v-text-field
                            v-model="studentDocument.data.learntPilotcity"
                            :rules="[rules.required]"
                            prepend-icon="mdi-telegram"
                            class="ma-2"
                            rounded
                            label="How did you hear about PilotCity?"
                            hide-details
                            outlined
                          ></v-text-field>
                          <v-btn
                            class="mx-auto"
                            style="width: 100%"
                            color="red"
                            x-large
                            rounded
                            :dark="applyForSponsorshipValid"
                            depressed
                            :disabled="!applyForSponsorshipValid"
                            @click="applyForSponsorship"
                            >Apply</v-btn
                          >
                        </v-form>
                        <v-dialog v-model="dialogApply" persistent max-width="500px">
                          <v-card>
                            <v-card-title>
                              <v-container class="d-flex flex-column justify-center">
                                <div class="overline font-weight-bold justify-center">
                                  Thank you!
                                </div>
                                <div class="headline font-weight-bold justify-center">
                                  We'll be finding you a sponsor
                                </div>
                              </v-container>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-container>
                              <div class="justify-center flex-column d-flex mt-3 mb-3">
                                <v-btn
                                  x-large
                                  rounded
                                  dark
                                  depressed
                                  class="ma-3"
                                  @click="$router.push({ name: 'portfolio' })"
                                >
                                  Go to My Programs
                                </v-btn>
                                <v-btn
                                  x-large
                                  rounded
                                  outlined
                                  depressed
                                  class="ma-3"
                                  @click="$router.push({ name: 'explore' })"
                                >
                                  Explore more programs
                                </v-btn>
                              </div>
                            </v-container>
                          </v-card>
                        </v-dialog>
                      </div>
                    </v-container>
                  </v-card>
                </v-dialog>
              </div>
            </v-container>

            <v-divider></v-divider>

            <div class="d-flex justify-center">
              <v-btn
                class="explore-card__button font-weight-bold ml-1 mr-1 mt-6 mb-6"
                rounded
                small
                disabled
                depressed
                :ripple="false"
                ><v-icon left> mdi-set-none </v-icon> Balance:
                {{ getTokens.message.value }} Tokens</v-btn
              >
            </div>
          </v-card>
        </v-dialog>
      </div>
      <v-alert v-if="success || error" class="mt-3" :type="success ? 'success' : 'error'">{{
        message
      }}</v-alert>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import axios from 'axios';
import { getModMongoDoc, loading } from 'pcv4lib/src';
import { ValidationObserver, ValidationProvider } from '@/validation';
import { Db } from 'mongodb';
import { User } from 'realm-web';
import Instruct from './ModuleInstruct.vue';
import MongoDoc from '../types';

export default defineComponent({
  name: 'ModuleDefault',
  components: {
    ValidationProvider,
    ValidationObserver
    // Instruct
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
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    },
    studentDoc: {
      required: true,
      type: Object as () => MongoDoc
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
    const programDoc = getModMongoDoc(props, ctx.emit);

    const initSetupprogram = {
      accessSkills: [],
      rewards: [],
      studentLocation: [],
      studentResidence: '',
      studentSchool: '',
      studentEthnicity: [],
      studentFollowingOptions: [],
      learntPilotcity: ''
    };

    const studentDocument = getModMongoDoc(
      props,
      ctx.emit,
      {
        data: {
          ...initSetupprogram
        }
      },
      'studentDoc',
      'inputStudentDoc'
    );
    const birthdate = ref('');
    if (props.db.collection)
      props.db
        .collection('StudentPortfolio')
        .findOne({ _id: props.userDoc.data._id })
        .then(doc => {
          birthdate.value = doc.date;
          studentDocument.value.data.studentResidence = doc.home.city;
          studentDocument.value.data.studentSchool = doc.school.name;
          studentDocument.value.data.studentEthnicity = doc.ethnicity;
        });

    const phoneNumber = ref(props.userDoc.data.phoneNumber);
    const phoneVerified = ref(!!props.userDoc.data.phoneVerified);
    const verifyNumberDialog = ref(false);
    function sendVerification() {
      props.mongoUser.callFunction('twilioSend', phoneNumber.value);
    }
    const verificationCode = ref('');
    async function verifyPhoneNumber() {
      const resp = await props.mongoUser.callFunction(
        'twilioVerify',
        phoneNumber.value,
        verificationCode.value,
        props.userDoc.data._id.toString()
      );
      if (resp.status === 'error') throw new Error('Verification failed. Please try again.');
      else {
        verifyNumberDialog.value = false;
        phoneVerified.value = true;
        props.db
          .collection('User')
          .findOneAndUpdate(
            { _id: props.userDoc.data._id },
            { $set: { phoneNumber: phoneNumber.value } }
          );
        return true;
      }
    }

    programDoc.value.data.requiredSkills.forEach((skill: string) => {
      studentDocument.value.data[skill] = false;
    });
    const getTokens = {
      ...loading(async () =>
        props.db
          .collection('Tokens')
          .aggregate([
            {
              $match: {
                newOwner_id: props.userDoc.data._id
              }
            },
            { $group: { _id: null, n: { $sum: 1 } } }
          ])
          .then(val => (val[0] ? val[0].n : 0))
      )
    };
    getTokens.process();
    const studentUseToken = async () => {
      await props.mongoUser.callFunction('useToken', {
        participantId: props.userDoc.data._id,
        programId: programDoc.value.data._id
      });
      ctx.emit('usedToken');
      ctx.emit('nextPage');
    };
    const sponsorshipLink = ref('');
    const useClaimLink = async () => {
      const resp = await props.mongoUser.callFunction(
        'claimLink',
        props.userDoc.data._id,
        sponsorshipLink.value.split('/').pop(),
        programDoc.value.data._id.toString()
      );
      if (resp.status === 'error')
        throw new Error(`This code is out of sponsorships, talk to sponsor (${resp.errorCode})`);
      ctx.emit('usedToken');
      ctx.emit('nextPage');
    };
    const saveBirthday = (birthday: string) => {
      props.db
        .collection('StudentPortfolio')
        .findOneAndUpdate({ _id: props.userDoc.data._id }, { $set: { date: birthday } });
    };
    const accessSkills = ref(studentDocument.value.data.accessSkills || []);
    const dialogApply = ref(false);
    const applyForSponsorship = async () => {
      const data = {
        participant_id: props.userDoc.data._id,
        firstName: props.userDoc.data.firstName,
        lastName: props.userDoc.data.lastName,
        program_id: programDoc.value.data._id,
        city: studentDocument.value.data.studentResidence,
        school: studentDocument.value.data.studentSchool,
        ethnicityCulture: studentDocument.value.data.studentEthnicity,
        qualifications: studentDocument.value.data.studentFollowingOptions,
        referredBy: studentDocument.value.data.learntPilotcity,
        phoneNumber: phoneNumber.value,
        birthday: birthdate.value,
        rewards: studentDocument.value.data.rewards,
        accessSkills: accessSkills.value,
        studentLocation: studentDocument.value.data.studentLocation,
        status: 'pending'
      };
      await props.db.collection('SponsorRequest').insertOne(data);
      dialogApply.value = true;
    };
    const rules = ref({
      required: value => !!value || 'Required.',
      allSkillsSelected: value =>
        (value && value.length === programDoc.value.data.requiredSkills.length) || 'Required.'
    });
    const checkoutFormCompleted = ref(false);
    const enableProgramCheckout = computed(
      () => checkoutFormCompleted.value && phoneVerified.value
    );
    return {
      checkoutFormCompleted,
      enableProgramCheckout,
      rules,
      applyForSponsorship,
      applyForSponsorshipValid: false,
      accessSkills,
      phoneNumber,
      phoneVerified,
      birthdate,
      programDoc,
      saveBirthday,
      verifyNumberDialog,
      sendVerification,
      verifyPhoneNumber: { ...loading(verifyPhoneNumber, 'Verified') },
      ...loading(async () => {
        studentDocument.value.data.accessSkills = accessSkills.value;
        await studentDocument.value.update();
      }, 'Saved'),
      studentUseToken: {
        ...loading(async () => {
          await studentUseToken();
          studentDocument.value.data.accessSkills = accessSkills.value;
          console.log(accessSkills.value);
          await studentDocument.value.update();
        }, "You've been added to this program!")
      },
      studentDocument,
      verificationCode,
      sponsorshipLink,
      useClaimLink: {
        ...loading(useClaimLink, 'Successfully retrieved token from link')
      },
      getTokens,
      birthdayMenu: false,
      setupInstructions: ref({
        description: '',
        instructions: ['', '', '']
      }),
      showInstructions: ref(true),
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog5: false,
      dialog6: false,
      dialogApply,
      eligibilityOptions: [
        'I receive Free or Reduced School Lunch',
        'I live without my parents',
        'My family receives food stamps or CalWORKS',
        'I have an IEP or long-term 504 Plan',
        'I am a foster child',
        'I am homeless',
        'I am a parent',
        'I am on probation',
        'I am a first generation US resident',
        'I am the first generation college student'
      ],
      eligibilityPresets: null,
      eligibilitySearch: null,
      ethnicityCulture: [
        'American Indian or Alaska Native',
        'Asian',
        'Black or African American',
        'Hispanic',
        'White / Caucasian',
        'Pacific Islander or Native Hawaiian'
      ]
    };
  },
  watch: {
    birthdayMenu() {
      this.$refs.picker.activePicker = 'YEAR';
    }
  },
  methods: {
    save(studentBirthday) {
      this.$refs.birthdayMenu.save(studentBirthday);
    }
  }
});
</script>

<style lang="scss">
.module-default {
  &__required {
    color: #404142;
    font-family: 'Raleway';
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 1px;
  }
  &__sms-verification {
    font-size: 30px;
    letter-spacing: 3px !important;
    width: 150px;
  }
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
    // margin-bottom: 75px;
    // margin-bottom: none !important;
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
