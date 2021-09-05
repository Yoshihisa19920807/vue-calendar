<template>
    <v-card class="pb-12">
      <!-- justify: 左右, align: 上下  -->
      <v-card-actions class="d-flex justify-end pa-2">
        <v-btn icon @click="_editEvent()">
          <v-icon size="20px">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="_deleteEvent()">
          <v-icon size="20px">mdi-trash-can-outline</v-icon>
        </v-btn>
        <v-btn icon @click="closeDialog()">
          <v-icon size="20px">mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-title class="px-15">
        <DialogRow icon="mdi-square" :color="event.color">
          <div class="ms-8">
          {{ event.name }}
          </div>
        </DialogRow>
      </v-card-title>
      <v-card-text>
        <DialogRow icon="mdi-clock-time-three-outline">
          {{ event.startDate }}&nbsp;{{ event.timed ? event.startTime : '' }} ~ {{ event.endDate }}&nbsp;{{ event.timed ? event.endTime : '' }}
        </DialogRow>
        <DialogRow icon="mdi-card-text-outline">
          {{ event.description || 'no description' }}
        </DialogRow>
      </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DialogRow from "./DialogRow.vue"
// named impport
// import { format } from 'date-fns';

export default {
  name: "CalendarDetailDialog",
  components: {
    DialogRow,
  },
  computed: {
    // eventsモジュールのeventsステーート
    ...mapGetters('events', ['events', 'event', 'isEditMode']),
  },
  methods: {
    closeDialog() {
      this.setEvent(null);
      this.setEditMode(false)
    },
    _deleteEvent(){
      console.log("deleteEvent")
      console.log(this.event)
      this.deleteEvent(this.event.id)
      // this.closeDialog()
    },
    _editEvent() {
      this.setEditMode(true)
    },
    ...mapActions('events', ['fetchEvents', 'setEvent', 'setEditMode', 'deleteEvent']),
  }
}
</script>
