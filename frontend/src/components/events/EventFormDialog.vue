<template>
  <v-card class="pb-12">
    <!-- justify: 左右, align: 上下  -->
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="closeDialog()">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <DialogRow icon="mdi-square" :color="event.color" :append="$v.name.$error && (!$v.name.required || !$v.name.minLength)">
        <v-text-field v-model="name" label="Title" :class="{ 'red lighten-4 rounded' : $v.name.$error && (!$v.name.required || !$v.name.minLength)}" @input="$v.name.$touch()"></v-text-field>
        <template v-slot:append>
          <p class="red--text" v-show="!$v.name.required">Title is required</p>
          <p class="red--text" v-show="!$v.name.minLength">Minimum length is 4</p>
        </template>
      </DialogRow>
      <!-- <DialogRow>
        <div v-if="!$v.name.required">Field is required</div>
      </DialogRow>
      <DialogRow>
        <div v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
      </DialogRow> -->

      <DialogRow icon="mdi-clock-outline" :append="isInvalidDatetime">
        <!-- start -->
        <DatePicker v-model="startDate"/>
        <div v-show="!allDay">
          <TimePicker v-model="startTime" />
        </div>
        <span class="px-2">–</span>
        <!-- end -->
        <DatePicker v-model="endDate" :isError="isInvalidDatetime" />
        <div v-show="!allDay">
          <TimePicker v-model="endTime" :isError="isInvalidDatetime" />
        </div>
        <template v-slot:append>
          <p class="red--text">Invalid date</p>
        </template>
      </DialogRow>
      <DialogRow>
        <CheckBox v-model="allDay" :label="'All Day'" class="ma-0 pa-0"/>
      </DialogRow>
      <DialogRow icon="mdi-card-text-outline">
        <TextInput v-model="description"/>
      </DialogRow>
      <DialogRow icon="mdi-calendar">
        <!-- @inputは子のemitに反応して発火するイベント -->
        <CalendarSelect :value="calendar" @input="changeCalendar($event)" />
      </DialogRow>
      <DialogRow icon="mdi-palette">
        Choose Color
        <ColorPicker v-model="color"/>
      </DialogRow>
      <div class="d-flex justify-center">
        <v-btn @click="create()" :disabled="isInvalid">
          Submit
        </v-btn>
        <v-btn @click="cancel()" >
          Cancel
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DialogRow from "../layouts/DialogRow.vue"
import DatePicker from "../forms/DatePicker.vue"
import TimePicker from "../forms/TimePicker.vue"
import TextInput from "../forms/TextInput.vue"
import ColorPicker from "../forms/ColorPicker.vue"
import CheckBox from "../forms/CheckBox.vue"
import CalendarSelect from "../forms/CalendarSelect"
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { isEndGreaterThanStart } from '../../functions/dateTime';
// named impport
// import { format } from 'date-fns';

export default {
  name: "EventFormDialog",
  mixins: [validationMixin],
  data: () => ({
    name: '',
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    description: '',
    color: '',
    allDay: false,
    calendar: null,
  }),
  components: {
    DialogRow,
    DatePicker,
    TimePicker,
    TextInput,
    ColorPicker,
    CheckBox,
    CalendarSelect,
  },
  computed: {
    isInvalidDatetime(){
      return !isEndGreaterThanStart(this.startDate, this.startTime, this.endDate, this.endTime);
    },
    isInvalid(){
      console.log(this.$v.$invalid)
      return this.$v.$invalid || this.isInvalidDatetime
    },
    // eventsモジュールのeventsステーート
    ...mapGetters('events', ['events', 'event', 'isEditMode']),
  },
  created() {
    this.startDate = this.event.startDate
    this.name = this.event.name
    this.description = this.event.description
    this.endDate = this.event.endDate
    this.startTime = this.event.startTime
    this.endTime = this.event.endTime
    this.allDay = !this.event.timed
    this.calendar = this.event.calendar
  },
  methods: {
    closeDialog() {
      this.setEvent(null);
      this.setEditMode(false)
    },
     create() {
       console.log(this.startTime)
      if (this.isInvalid) {
        return
      }
      let start = new Date(this.startDate + "/" + this.startTime)
      let end = new Date(this.endDate + "/" + this.endTime)
      let param = {
        ...this.event,
        name: this.name,
        start,
        end,
        description: this.description,
        color: this.color,
        timed: !this.allDay,
        calendar_id: this.calendar.id,
      }
      if (param.id) {
        this.updateEvent(param);
      } else {
        this.createEvent(param);
      }
      this.closeDialog()
    },
    cancel() {
      this.setEditMode(false);
      if (!this.event.id) {
        this.setEvent(null);
      }
    },
    changeCalendar(calendar) {
      this.color = calendar.color;
      this.calendar = calendar;
    },
    ...mapActions('events', ['fetchEvents', 'setEvent', 'setEditMode', 'createEvent', 'updateEvent']),
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    startDate: {
      required,
    },
    endDate: {
      required,
    },
    calendar: { required },

  }
}
</script>
