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
        <v-text-field v-model="name" label="Title"></v-text-field>
      </DialogRow>
      <DialogRow icon="mdi-clock-outline">
        start
        <DatePicker v-model="startDate"/>
        <TimePicker v-model="startTime" />
      </DialogRow>
      <DialogRow icon="mdi-clock-outline">
        end
        <DatePicker v-model="endDate"/>
        <TimePicker v-model="endTime" />
      </DialogRow>
      <DialogRow icon="mdi-text">
        <TextForm v-model="description"/>
      </DialogRow>
      <DialogRow icon="mdi-palette">
        Choose Color
        <ColorPicker v-model="color"/>
      </DialogRow>
      <div class="d-flex justify-center">
        <v-btn @click="create()">
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
// named impport
// import { format } from 'date-fns';

export default {
  name: "EventFormDialog",
  data: () => ({
    name: '',
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    description: '',
    color: '',
  }),
  components: {
    DialogRow,
    DatePicker,
    TimePicker,
    TextForm,
    ColorPicker,
  },
  computed: {
    // eventsモジュールのeventsステーート
    ...mapGetters('events', ['events', 'event', 'isEditMode']),
  },
  created() {
    this.startDate = this.event.startDate
    this.endDate = this.event.endDate
    this.startTime = this.event.startTime
    this.endTime = this.event.endTime
  },
  methods: {
    closeDialog() {
      this.setEvent(null);
      this.setEditMode(false)
    },
    create() {
      let start = new Date(this.startDate + "/" + this.startTime)
      let end = new Date(this.endDate + "/" + this.endTime)
      let param = {
        name: this.name,
        start,
        end,
        description: this.description,
        color: this.color,
      }
      this.createEvent(param);
      this.closeDialog()
    },
    ...mapActions('events', ['fetchEvents', 'setEvent', 'setEditMode', 'createEvent']),
  }
}
</script>
