<template>
  <div>
    <h1 class="text-h1">Calendar</h1>
    <!-- <p>events:</p> -->
    <!-- <p>{{ events }}</p> -->
    <!-- <v-list >
      <v-list-item v-for="event in events" :key="event.id">
        {{ event.name }}
      </v-list-item>
    </v-list> -->
    <v-btn type="submit" @click="fetchEvents()">fetchEvents</v-btn>
    <v-sheet height="100vh">
      <v-calendar
        :events="events"
        @change="fetchEvents"
        v-model="value"
      ></v-calendar>
    </v-sheet>
    <!-- <CalendarDetails /> -->
  </div>
</template>

<script>
// import CalendarDetails from "./CalendarDetails";
// import axios from "axios";
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Calendar",
  data: () => ({
    // events: [],
    value: new Date('2021/07/01'),  // 表示する月を指定
  }),
  computed: {
    ...mapGetters('events', ['events']),
  },
  components: {
    // CalendarDetails,
  },
  methods: {
    // fetchEvents() {
    //   // GETリクエストを送信し、取得データをevents変数に代入する
    //   axios
    //     .get("http://localhost:3000/events")
    //     .then((response) => {
    //       this.events = response.data;
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },
    ...mapActions('events', ['fetchEvents'])
  },
};
</script>
