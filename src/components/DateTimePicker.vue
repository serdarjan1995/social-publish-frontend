<template>

  <v-menu
        v-model="display"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="250px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
            :value="formattedDatetime"
            readonly
            v-on="on"
            :rules="[v => !!v || requiredMessage || !required]"
            dense
            :error="formattedDatetime.length <= 0 && required ? true: false"
            style="font-size: small"
      >
        <template v-slot:label>
          <v-icon small>mdi-calendar</v-icon>{{label}}
        </template>
      </v-text-field>
    </template>

    <v-card>

      <v-card-text style="padding:5px">

        <v-tabs fixed-tabs v-model="activeTab" height="33">
          <v-tab key="calendar" >
              <v-icon medium>mdi-calendar</v-icon>
          </v-tab>
          <v-tab key="timer" :disabled="dateSelected">
              <v-icon medium>mdi-clock-outline</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <v-tab-item key="calendar">
            <v-date-picker
                  v-model="date"
                  no-title
                  width="240"
                  v-bind="datePickerProps"
                  @input="showTimePicker"
            ></v-date-picker>
          </v-tab-item>
          <v-tab-item key="timer">
            <v-time-picker
                  ref="timer"
                  no-title
                  format="24hr"
                  v-model="time"
                  v-bind="timePickerProps"
                  full-width
            ></v-time-picker>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-card-actions style="padding: 5px">
        <v-spacer></v-spacer>
        <slot name="actions" :parent="this">
          <v-btn small color="grey lighten-1" text @click.native="clearHandler">{{ clearText }}</v-btn>
          <v-btn small color="green darken-1" text @click="okHandler">{{ okText }}</v-btn>
        </slot>
      </v-card-actions>

    </v-card>
  </v-menu>

</template>

<script>
    import { format, parse } from 'date-fns'

    const DEFAULT_DATE = ''
    const DEFAULT_TIME = '00:00:00'
    const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd'
    const DEFAULT_TIME_FORMAT = 'HH:mm:ss'
    const DEFAULT_CLEAR_TEXT = 'CLEAR'
    const DEFAULT_OK_TEXT = 'OK'

    export default {
        name: 'DateTimePicker',
        model: {
            prop: 'datetime',
            event: 'input'
        },
        props: {
            datetime: {
                type: [Date, String],
                default: null
            },
            label: {
                type: String,
                default: ''
            },
            dateFormat: {
                type: String,
                default: DEFAULT_DATE_FORMAT
            },
            timeFormat: {
                type: String,
                default: 'HH:mm'
            },
            clearText: {
                type: String,
                default: DEFAULT_CLEAR_TEXT
            },
            okText: {
                type: String,
                default: DEFAULT_OK_TEXT
            },
            datePickerProps: {
                type: Object
            },
            timePickerProps: {
                type: Object
            },
            required:{
                type: Boolean,
                default: false
            },
            requiredMessage:{
                type: String,
                default: ""
            },
        },
        data() {
            return {
                display: false,
                activeTab: 0,
                date: DEFAULT_DATE,
                time: DEFAULT_TIME,
            }
        },
        mounted() {
            this.init()
        },
        computed: {
            dateTimeFormat() {
                return this.dateFormat + ' ' + this.timeFormat
            },
            defaultDateTimeFormat() {
                return DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT
            },
            formattedDatetime() {
                return this.selectedDatetime ? format(this.selectedDatetime, this.dateTimeFormat) : ''
            },
            selectedDatetime() {
                if (this.date && this.time) {
                    let datetimeString = this.date + ' ' + this.time
                    if (this.time.length === 5) {
                        datetimeString += ':00'
                    }
                    return parse(datetimeString, this.defaultDateTimeFormat, new Date())
                } else {
                    return null
                }
            },
            dateSelected() {
                return !this.date
            },

        },
        methods: {
            init() {
                if (!this.datetime) {
                    return
                }

                let initDateTime
                if (this.datetime instanceof Date) {
                    initDateTime = this.datetime
                } else if (typeof this.datetime === 'string' || this.datetime instanceof String) {
                    initDateTime = parse(this.datetime, this.dateTimeFormat, new Date())
                }

                this.date = format(initDateTime, DEFAULT_DATE_FORMAT)
                this.time = format(initDateTime, DEFAULT_TIME_FORMAT)
            },
            okHandler() {
                this.resetPicker()
                this.$emit('input', this.selectedDatetime)
            },
            clearHandler() {
                this.resetPicker()
                this.date = DEFAULT_DATE
                this.time = DEFAULT_TIME
                this.$emit('input', null)
            },
            resetPicker() {
                this.display = false
                this.activeTab = 0
                if (this.$refs.timer) {
                    this.$refs.timer.selectingHour = true
                }
            },
            showTimePicker() {
                this.activeTab = 1
            },
        },
        watch: {
            datetime: function() {
                this.init()
            }
        }
    }
</script>
