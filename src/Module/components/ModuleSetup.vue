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
          <v-select
            v-model="rewardPresets"
            rounded
            :items="rewardOptions"
            :search-input="rewardSearch"
            :error-messages="errors"
            prepend-icon="mdi-trophy"
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
          </v-select>
        </validation-provider>

        <validation-provider v-slot="{ errors }" rules="required" slim>
          <v-select
            v-model="pathwayPresets"
            rounded
            :items="pathwayOptions"
            :search-input="pathwaySearch"
            :error-messages="errors"
            prepend-icon="mdi-sign-direction"
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
          </v-select>
        </validation-provider>

        <!-- <v-file-input
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
        { text: 'Paid Work Experience', color: 'grey darken-2' },
        { text: 'Unpaid Work Experience', color: 'grey darken-2' }
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
        'Adelanto, CA',
        'Agoura Hills, CA',
        'Alameda County, CA',
        'Alameda, CA',
        'Albany, CA',
        'Alhambra, CA',
        'Aliso Viejo, CA',
        'Alpine County, CA',
        'Alturas, CA',
        'Amador City, CA',
        'Amador County, CA',
        'American Canyon, CA',
        'Anaheim, CA',
        'Anderson, CA',
        'Angels, CA',
        'Antioch, CA',
        'Apple Valley, CA',
        'Arcadia, CA',
        'Arcata, CA',
        'Arroyo Grande, CA',
        'Artesia, CA',
        'Arvin, CA',
        'Atascadero, CA',
        'Atherton, CA',
        'Atwater, CA',
        'Auburn, CA',
        'Avalon, CA',
        'Avenal, CA',
        'Azusa, CA',
        'Bakersfield, CA',
        'Baldwin Park, CA',
        'Banning, CA',
        'Barstow, CA',
        'Beaumont, CA',
        'Bell Gardens, CA',
        'Bell, CA',
        'Bellflower, CA',
        'Belmont, CA',
        'Belvedere, CA',
        'Benicia, CA',
        'Berkeley, CA',
        'Beverly Hills, CA',
        'Big Bear Lake, CA',
        'Biggs, CA',
        'Bishop, CA',
        'Blue Lake, CA',
        'Blythe, CA',
        'Bradbury, CA',
        'Brawley, CA',
        'Brea, CA',
        'Brentwood, CA',
        'Brisbane, CA',
        'Buellton, CA',
        'Buena Park, CA',
        'Burbank, CA',
        'Burlingame, CA',
        'Butte County, CA',
        'Calabasas, CA',
        'Calaveras County, CA',
        'Calexico, CA',
        'California, CA',
        'Calimesa, CA',
        'Calipatria, CA',
        'Calistoga, CA',
        'Camarillo, CA',
        'Campbell, CA',
        'Canyon Lake, CA',
        'Capitola, CA',
        'Carlsbad, CA',
        'Carmel-by-the-Sea, CA',
        'Carpinteria, CA',
        'Carson, CA',
        'Cathedral City, CA',
        'Ceres, CA',
        'Cerritos, CA',
        'Chico, CA',
        'Chino Hills, CA',
        'Chino, CA',
        'Chowchilla, CA',
        'Chula Vista, CA',
        'Citrus Heights, CA',
        'Claremont, CA',
        'Clayton, CA',
        'Clearlake, CA',
        'Cloverdale, CA',
        'Clovis, CA',
        'Coachella, CA',
        'Coalinga, CA',
        'Colfax, CA',
        'Colma, CA',
        'Colton, CA',
        'Colusa County, CA',
        'Colusa, CA',
        'Commerce, CA',
        'Compton, CA',
        'Concord, CA',
        'Contra Costa County, CA',
        'Corcoran, CA',
        'Corning, CA',
        'Corona, CA',
        'Coronado, CA',
        'Corte Madera, CA',
        'Costa Mesa, CA',
        'Cotati, CA',
        'Covina, CA',
        'Crescent City, CA',
        'Cudahy, CA',
        'Culver City, CA',
        'Cupertino, CA',
        'Cypress, CA',
        'Daly City, CA',
        'Dana Point, CA',
        'Danville, CA',
        'Davis, CA',
        'Del Mar, CA',
        'Del Norte County, CA',
        'Del Rey Oaks, CA',
        'Delano, CA',
        'Desert Hot Springs, CA',
        'Diamond Bar, CA',
        'Dinuba, CA',
        'Dixon, CA',
        'Dorris, CA',
        'Dos Palos, CA',
        'Downey, CA',
        'Duarte, CA',
        'Dublin, CA',
        'Dunsmuir, CA',
        'East Palo Alto, CA',
        'Eastvale, CA',
        'El Cajon, CA',
        'El Centro, CA',
        'El Cerrito, CA',
        'El Dorado County, CA',
        'El Monte, CA',
        'El Segundo, CA',
        'Elk Grove, CA',
        'Emeryville, CA',
        'Encinitas, CA',
        'Escalon, CA',
        'Escondido, CA',
        'Etna, CA',
        'Eureka, CA',
        'Exeter, CA',
        'Fairfax, CA',
        'Fairfield, CA',
        'Farmersville, CA',
        'Ferndale, CA',
        'Fillmore, CA',
        'Firebaugh, CA',
        'Folsom, CA',
        'Fontana, CA',
        'Fort Bragg, CA',
        'Fort Jones, CA',
        'Fortuna, CA',
        'Foster City, CA',
        'Fountain Valley, CA',
        'Fowler, CA',
        'Fremont, CA',
        'Fresno County, CA',
        'Fresno, CA',
        'Fullerton, CA',
        'Galt, CA',
        'Garden Grove, CA',
        'Gardena, CA',
        'Gilroy, CA',
        'Glendale, CA',
        'Glendora, CA',
        'Glenn County, CA',
        'Goleta, CA',
        'Gonzales, CA',
        'Grand Terrace, CA',
        'Grass Valley, CA',
        'Greenfield, CA',
        'Gridley, CA',
        'Grover Beach, CA',
        'Guadalupe, CA',
        'Gustine, CA',
        'Half Moon Bay, CA',
        'Hanford, CA',
        'Hawaiian Gardens, CA',
        'Hawthorne, CA',
        'Hayward, CA',
        'Healdsburg, CA',
        'Hemet, CA',
        'Hercules, CA',
        'Hermosa Beach, CA',
        'Hesperia, CA',
        'Hidden Hills, CA',
        'Highland, CA',
        'Hillsborough, CA',
        'Hollister, CA',
        'Holtville, CA',
        'Hughson, CA',
        'Humboldt County, CA',
        'Huntington Beach, CA',
        'Huntington Park, CA',
        'Huron, CA',
        'Imperial Beach, CA',
        'Imperial County, CA',
        'Imperial, CA',
        'Indian Wells, CA',
        'Indio, CA',
        'Industry, CA',
        'Inglewood, CA',
        'Inyo County, CA',
        'Ione, CA',
        'Irvine, CA',
        'Irwindale, CA',
        'Isleton, CA',
        'Jackson, CA',
        'Jurupa Valley, CA',
        'Kerman, CA',
        'Kern County, CA',
        'King City, CA',
        'Kings County, CA',
        'Kingsburg, CA',
        'La Cañada Flintridge, CA',
        'La Habra Heights, CA',
        'La Habra, CA',
        'La Mesa, CA',
        'La Mirada, CA',
        'La Palma, CA',
        'La Puente, CA',
        'La Quinta, CA',
        'La Verne, CA',
        'Lafayette, CA',
        'Laguna Beach, CA',
        'Laguna Hills, CA',
        'Laguna Niguel, CA',
        'Laguna Woods, CA',
        'Lake County, CA',
        'Lake Elsinore, CA',
        'Lake Forest, CA',
        'Lakeport, CA',
        'Lakewood, CA',
        'Lancaster, CA',
        'Larkspur, CA',
        'Lassen County, CA',
        'Lathrop, CA',
        'Lawndale, CA',
        'Lemon Grove, CA',
        'Lemoore, CA',
        'Lincoln, CA',
        'Lindsay, CA',
        'Live Oak, CA',
        'Livermore, CA',
        'Livingston, CA',
        'Lodi, CA',
        'Loma Linda, CA',
        'Lomita, CA',
        'Lompoc, CA',
        'Long Beach, CA',
        'Loomis, CA',
        'Los Alamitos, CA',
        'Los Altos Hills, CA',
        'Los Altos, CA',
        'Los Angeles County, CA',
        'Los Angeles, CA',
        'Los Banos, CA',
        'Los Gatos, CA',
        'Loyalton, CA',
        'Lynwood, CA',
        'Madera County, CA',
        'Madera, CA',
        'Malibu, CA',
        'Mammoth Lakes, CA',
        'Manhattan Beach, CA',
        'Manteca, CA',
        'Maricopa, CA',
        'Marin County, CA',
        'Marina, CA',
        'Mariposa County, CA',
        'Martinez, CA',
        'Marysville, CA',
        'Maywood, CA',
        'McFarland, CA',
        'Mendocino County, CA',
        'Mendota, CA',
        'Menifee, CA',
        'Menlo Park, CA',
        'Merced County, CA',
        'Merced, CA',
        'Mill Valley, CA',
        'Millbrae, CA',
        'Milpitas, CA',
        'Mission Viejo, CA',
        'Modesto, CA',
        'Modoc County, CA',
        'Mono County, CA',
        'Monrovia, CA',
        'Montague, CA',
        'Montclair, CA',
        'Monte Sereno, CA',
        'Montebello, CA',
        'Monterey County, CA',
        'Monterey Park, CA',
        'Monterey, CA',
        'Moorpark, CA',
        'Moraga, CA',
        'Moreno Valley, CA',
        'Morgan Hill, CA',
        'Morro Bay, CA',
        'Mount Shasta, CA',
        'Mountain View, CA',
        'Murrieta, CA',
        'Napa County, CA',
        'Napa, CA',
        'National City, CA',
        'Needles, CA',
        'Nevada City, CA',
        'Nevada County, CA',
        'Newark, CA',
        'Newman, CA',
        'Newport Beach, CA',
        'Norco, CA',
        'Norwalk, CA',
        'Novato, CA',
        'Oakdale, CA',
        'Oakland, CA',
        'Oakley, CA',
        'Oceanside, CA',
        'Ojai, CA',
        'Ontario, CA',
        'Orange County, CA',
        'Orange Cove, CA',
        'Orange, CA',
        'Orinda, CA',
        'Orland, CA',
        'Oroville, CA',
        'Oxnard, CA',
        'Pacific Grove, CA',
        'Pacifica, CA',
        'Palm Desert, CA',
        'Palm Springs, CA',
        'Palmdale, CA',
        'Palo Alto, CA',
        'Palos Verdes Estates, CA',
        'Paradise, CA',
        'Paramount, CA',
        'Parlier, CA',
        'Pasadena, CA',
        'Paso Robles, CA',
        'Patterson, CA',
        'Perris, CA',
        'Petaluma, CA',
        'Pico Rivera, CA',
        'Piedmont, CA',
        'Pinole, CA',
        'Pismo Beach, CA',
        'Pittsburg, CA',
        'Placentia, CA',
        'Placer County, CA',
        'Placerville, CA',
        'Pleasant Hill, CA',
        'Pleasanton, CA',
        'Plumas County, CA',
        'Plymouth, CA',
        'Point Arena, CA',
        'Pomona, CA',
        'Port Hueneme, CA',
        'Porterville, CA',
        'Portola Valley, CA',
        'Portola, CA',
        'Poway, CA',
        'Rancho Cordova, CA',
        'Rancho Cucamonga, CA',
        'Rancho Mirage, CA',
        'Rancho Palos Verdes, CA',
        'Rancho Santa Margarita, CA',
        'Red Bluff, CA',
        'Redding, CA',
        'Redlands, CA',
        'Redondo Beach, CA',
        'Redwood City, CA',
        'Reedley, CA',
        'Rialto, CA',
        'Richmond, CA',
        'Ridgecrest, CA',
        'Rio Dell, CA',
        'Rio Vista, CA',
        'Ripon, CA',
        'Riverbank, CA',
        'Riverside County, CA',
        'Riverside, CA',
        'Rocklin, CA',
        'Rohnert Park, CA',
        'Rolling Hills Estates, CA',
        'Rolling Hills, CA',
        'Rosemead, CA',
        'Roseville, CA',
        'Ross, CA',
        'Sacramento County, CA',
        'Sacramento, CA',
        'Salinas, CA',
        'San Anselmo, CA',
        'San Benito County, CA',
        'San Bernardino County, CA',
        'San Bernardino, CA',
        'San Bruno, CA',
        'San Carlos, CA',
        'San Clemente, CA',
        'San Diego County, CA',
        'San Diego, CA',
        'San Dimas, CA',
        'San Fernando, CA',
        'San Francisco County, CA',
        'San Francisco, CA',
        'San Gabriel, CA',
        'San Jacinto, CA',
        'San Joaquin County, CA',
        'San Joaquin, CA',
        'San Jose, CA',
        'San Juan Bautista, CA',
        'San Juan Capistrano, CA',
        'San Leandro, CA',
        'San Luis Obispo County, CA',
        'San Luis Obispo, CA',
        'San Marcos, CA',
        'San Marino, CA',
        'San Mateo County, CA',
        'San Mateo, CA',
        'San Pablo, CA',
        'San Rafael, CA',
        'San Ramon, CA',
        'Sand City, CA',
        'Sanger, CA',
        'Santa Ana, CA',
        'Santa Barbara County, CA',
        'Santa Barbara, CA',
        'Santa Clara County, CA',
        'Santa Clara, CA',
        'Santa Clarita, CA',
        'Santa Cruz County, CA',
        'Santa Cruz, CA',
        'Santa Fe Springs, CA',
        'Santa Maria, CA',
        'Santa Monica, CA',
        'Santa Paula, CA',
        'Santa Rosa, CA',
        'Santee, CA',
        'Saratoga, CA',
        'Sausalito, CA',
        'Scotts Valley, CA',
        'Seal Beach, CA',
        'Seaside, CA',
        'Sebastopol, CA',
        'Selma, CA',
        'Shafter, CA',
        'Shasta County, CA',
        'Shasta Lake, CA',
        'Sierra County, CA',
        'Sierra Madre, CA',
        'Signal Hill, CA',
        'Simi Valley, CA',
        'Siskiyou County, CA',
        'Solana Beach, CA',
        'Solano County, CA',
        'Soledad, CA',
        'Solvang, CA',
        'Sonoma County, CA',
        'Sonoma, CA',
        'Sonora, CA',
        'South El Monte, CA',
        'South Gate, CA',
        'South Lake Tahoe, CA',
        'South Pasadena, CA',
        'South San Francisco, CA',
        'St. Helena, CA',
        'Stanislaus County, CA',
        'Stanton, CA',
        'Stockton, CA',
        'Suisun City, CA',
        'Sunnyvale, CA',
        'Susanville, CA',
        'Sutter County, CA',
        'Sutter Creek, CA',
        'Taft, CA',
        'Tehachapi, CA',
        'Tehama County, CA',
        'Tehama, CA',
        'Temecula, CA',
        'Temple City, CA',
        'Thousand Oaks, CA',
        'Tiburon, CA',
        'Torrance, CA',
        'Tracy, CA',
        'Trinidad, CA',
        'Trinity County, CA',
        'Truckee, CA',
        'Tulare County, CA',
        'Tulare, CA',
        'Tulelake, CA',
        'Tuolumne County, CA',
        'Turlock, CA',
        'Tustin, CA',
        'Twentynine Palms, CA',
        'Ukiah, CA',
        'Unincorporated, CA',
        'Union City, CA',
        'Upland, CA',
        'Vacaville, CA',
        'Vallejo, CA',
        'Ventura County, CA',
        'Ventura, CA',
        'Vernon, CA',
        'Victorville, CA',
        'Villa Park, CA',
        'Visalia, CA',
        'Vista, CA',
        'Walnut Creek, CA',
        'Walnut, CA',
        'Wasco, CA',
        'Waterford, CA',
        'Watsonville, CA',
        'Weed, CA',
        'West Covina, CA',
        'West Hollywood, CA',
        'West Sacramento, CA',
        'Westlake Village, CA',
        'Westminster, CA',
        'Westmorland, CA',
        'Wheatland, CA',
        'Whittier, CA',
        'Wildomar, CA',
        'Williams, CA',
        'Willits, CA',
        'Willows, CA',
        'Windsor, CA',
        'Winters, CA',
        'Woodlake, CA',
        'Woodland, CA',
        'Woodside, CA',
        'Yolo County, CA',
        'Yorba Linda, CA',
        'Yountville, CA',
        'Yreka, CA',
        'Yuba City, CA',
        'Yuba County, CA',
        'Yucaipa, CA',
        'Yucca Valley, CA'
      ],
      requiredTechOptions: [],
      requiredSkillOptions: [],
      rewardOptions: ['Paid Work Experience', 'Unpaid Work Experience'],
      rewardPresets: ['Paid Work Experience', 'Unpaid Work Experience'],
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
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
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
      'rewards'
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
