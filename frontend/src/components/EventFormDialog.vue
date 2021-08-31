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
    </v-card-text>
    <v-card-text>
      <DialogRow icon="mdi-clock-outline">
        <!-- <v-date-picker
          :value="value"
          @input="$emit('input', $event)"
          no-title
          locale="ja-ja"
          :day-format="startDate => new Date(startDate).getDate()"
        ></v-date-picker>
        <p>{{ startDate }}</p> -->
        <!-- v-model="startDate"
        ↓同じ
        :value="startDate"
        @input="startDate = $event.target.value"
        ※カスタムコンポーネントの場合は
        $event.target.value
        ではなく
        $event
        のみ-->
        start
        <DatePicker v-model="startDate"/>
      </DialogRow>
      <DialogRow icon="mdi-clock-outline">
        end
        <DatePicker v-model="endDate"/>
      </DialogRow>
    </v-card-text>
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
import DatePicker from "./DatePicker.vue"
// named impport
// import { format } from 'date-fns';

export default {
  name: "EventFormDialog",
  data: () => ({
    name: '',
    startDate: null,
    endDate: null,
  }),
  components: {
    DialogRow,
    DatePicker,
  },
  computed: {
    // eventsモジュールのeventsステーート
    ...mapGetters('events', ['events', 'event', 'isEditMode']),
  },
  created() {
    this.startDate = this.event.startDate
    this.endDate = this.event.endDate
  },
  methods: {
    closeDialog() {
      this.setEvent(null);
      this.setEditMode(false)
    },
    create() {
      let param = {
        name: this.name,
        start: this.startDate,
        end: this.endDate,
      }
      console.log("___param")
      console.log(param)
      this.createEvent(param);
      this.closeDialog()
    },
    ...mapActions('events', ['fetchEvents', 'setEvent', 'setEditMode', 'createEvent']),
  }
}
</script>
