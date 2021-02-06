<template>
  <v-card class="neu-glow pa-3">
    <v-row>
      <v-col md="2">
        <v-btn
            fab
            small
            left
            @click="$refs.calendar.prev()"
        >
          <v-icon dark>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col md="8">
        <v-tabs
            class="elevation-20 rounded-corners"
            :centered="true"
            :grow="true"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab
              class="text-caption"
              v-for="i in getMyData"
              :key="i.value"
              @click="changeType(i.value)"
              hide-details
              outlined
          >
            {{ i.text }}
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col md="2">
        <v-btn
            fab
            small
            right
            style="float:right;"
            @click="$refs.calendar.next()"
        >
          <v-icon dark>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-sheet>
          <v-calendar style="min-height:300px !important; max-height:500px !important"
                      ref="calendar"
                      v-model="value"
                      :weekdays="weekday"
                      :type="type"
                      :events="filteredEvents"
                      :event-overlap-mode="mode"
                      :event-overlap-threshold="30"
                      :event-color="getEventColor"
                      @change="getEvents"
                      @click:date="clickedEvent"
                      @click:day="clickedEvent"
                      @click:time="clickedEvent"
          >
            <template v-slot:event="{ event }">
              <v-icon color="white" small>{{ event.icon }}</v-icon>
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import socialData from "@/views/SocialMedia/Social/social_data.json";
import myData from "@/views/SocialMedia/Calendar/myData.json";

export default {
  data() {
    return {
      socialDataList: socialData,
      myEventList: myData,
      myDataList: myData,
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        {text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6]},
        {text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0]},
        {text: 'Mon - Fri', value: [1, 2, 3, 4, 5]},
        {text: 'Mon, Wed, Fri', value: [1, 3, 5]},
      ],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    };
  },
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    },
    clickedEvent() {
      this.$router.push('../app/calendar');
    },
    changeType(myItem) {
      this.type = myItem;
    },
    getEvents() {
      const myEvents = this.myEventList.map((list) => {
        return {...list};
      });
      this.events = JSON.parse(JSON.stringify(myEvents));
    },
    getEventColor(event) {
      return event.color
    }
  },
  computed: {
    filteredEvents() {
      const myEventList = this.myDataList.map((list) => {
        return {...list};
      });
      return myEventList;
    },
    getMyData() {
      let typeOptions = [
        {
          "text": this.getTextEn("Analytical.month"),
          "value": "month"
        },
        {
          "text": this.getTextEn("Analytical.week"),
          "value": "week"
        },
        {
          "text": this.getTextEn("Analytical.day"),
          "value": "day"
        }
      ];
      return typeOptions;
    }
  }
};
</script>

<style>
.rounded-corners {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: blueviolet;
}

.v-event {
  width: 20px !important;
  text-align: center !important;
  float: left !important;
  margin-left: 2px !important;
}

.v-calendar-weekly__day {
}
</style>