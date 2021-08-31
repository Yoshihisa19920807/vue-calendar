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
      <!-- <DialogRow icon="mdi-square" :color="event.color || 'blue'">
        タイトル
      </DialogRow> -->
    </v-card-title>
    <v-card-text>
      <DialogRow icon="mdi-square" :color="event.color || 'blue'">
        <v-text-field v-model="name" label="Title"></v-text-field>
      </DialogRow>
    </v-card-text>
    <!-- <v-card-text>
      <v-text-field>
      </v-text-field>
    </v-card-text> -->
    <v-card-text>
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

export default {
  name: "EventFormDialog",
  data: () => ({
    name: '',
  }),
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
    create() {
      let param = {
        name: this.name,
        start: new Date(this.event.start),
        end: new Date(this.event.end),
      }
      this.createEvent(param);
      this.setEvent(null)
      this.setEditMode(false)
    },
    ...mapActions('events', ['fetchEvents', 'setEvent', 'setEditMode', 'createEvent']),
  }
}
</script>
