<template>
    <v-card class="pb-12">
      <!-- justify: 左右, align: 上下  -->
      <v-card-actions class="d-flex justify-end pa-2">
        <v-btn icon @click="closeDialog()">
          <v-icon size="20px">mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-title>
        <!-- <v-row>
          <v-col cols="2" class="d-flex justify-center align-center">
            <v-icon size="20px">mdi-square</v-icon>
          </v-col>
          <v-col class="d-flex align-center">
            {{ event.name }}
          </v-col>
        </v-row> -->
        <DialogRow icon="mdi-square" :color="event.color">
          {{ event.name }}
        </DialogRow>
      </v-card-title>
      <v-card-text>
        <!-- <v-row>
          <v-col cols="2" class="d-flex justify-center align-center">
            <v-icon size="20px">mdi-clock-time-three-outline</v-icon>
          </v-col>
          <v-col class="d-flex align-center">
            {{ event.start.toLocaleString() }} ~ {{ event.end.toLocaleString() }}
          </v-col>
        </v-row> -->
        <DialogRow icon="mdi-clock-time-three-outline">
          {{ event.start.toLocaleString() }} ~ {{ event.end.toLocaleString() }}
        </DialogRow>
      </v-card-text>
      <v-card-text>
        <!-- <v-row>
          <v-col cols="2" class="d-flex justify-center align-center">
            <v-icon size="20px">mdi-card-text-outline</v-icon>
          </v-col>
          <v-col class="d-flex align-center">
            {{ event.description || 'no description' }}
          </v-col>
        </v-row> -->
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
    ...mapActions('events', ['fetchEvents', 'setEvent', 'setEditMode']),
  }
}
</script>
