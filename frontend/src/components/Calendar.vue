<template>
  <div>
    <!-- <h1>Calendar</h1>
    <p>events:</p> -->
    <!-- <p>{{ events }}</p> -->
    <ul id="example-1">
      <li v-for="event in events" :key="event.id">
        {{ event.name }}
      </li>
    </ul>
    <button type="submit" @click="fetchEvents()">fetchEvents</button>
    <CalendarDetails />
  </div>
</template>

<script>
import CalendarDetails from './CalendarDetails'
import axios from "axios"

export default {
  name: 'Calendar',
  data: () => ({
    events: []
  }),
  components: {
    CalendarDetails,
  },
  methods: {
    fetchEvents() {
      // GETリクエストを送信し、取得データをevents変数に代入する
      axios
        .get('http://localhost:3000/events')
        .then(response => {
          this.events = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
