<template>
  <v-card class="pb-12">
    <!-- justify: 左右, align: 上下  -->
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="closeDialog()">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <DialogRow icon="mdi-square" :color="event.color">
        <v-text-field v-model="name" label="Title" ></v-text-field>
      </DialogRow>
      <!-- <DialogRow>
        <div v-if="!$v.name.required">Field is required</div>
      </DialogRow>
      <DialogRow>
        <div v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
      </DialogRow> -->

      <DialogRow icon="mdi-clock-outline">
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
      </DialogRow>
      <DialogRow>
        <CheckBox v-model="allDay" :label="'All Day'" class="ma-0 pa-0"/>
      </DialogRow>
      <DialogRow icon="mdi-card-text-outline">
        <TextForm v-model="description"/>
      </DialogRow>
      <DialogRow icon="mdi-palette">
        Choose Color
        <ColorPicker v-model="color"/>
      </DialogRow>
      <div class="d-flex justify-center">
        <v-btn @click="create()" :disabled="isInvalid">
          Submit
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DialogRow from "./DialogRow.vue"
import DatePicker from "./DatePicker.vue"
import TimePicker from "./TimePicker.vue"
import TextForm from "./TextForm.vue"
import ColorPicker from "./ColorPicker.vue"
import CheckBox from "./CheckBox.vue"
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
 import { isEndGreaterThanStart } from '../functions/dateTime';
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
  }),
  components: {
    DialogRow,
    DatePicker,
    TimePicker,
    TextForm,
    ColorPicker,
    CheckBox,
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
    this.endDate = this.event.endDate
    this.startTime = this.event.startTime
    this.endTime = this.event.endTime
    this.allDay = !this.event.timed
  },
  methods: {
    closeDialog() {
      this.setEvent(null);
      this.setEditMode(false)
    },
    create() {
      if (this.isInvalid) {
        return
      }
      let start = new Date(this.startDate + "/" + this.startTime)
      let end = new Date(this.endDate + "/" + this.endTime)
      let param = {
        name: this.name,
        start,
        end,
        description: this.description,
        color: this.color,
        timed: !this.allDay,
      }
      this.createEvent(param);
      this.closeDialog()
    },
    ...mapActions('events', ['fetchEvents', 'setEvent', 'setEditMode', 'createEvent']),
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
    }

  }
}
</script>
