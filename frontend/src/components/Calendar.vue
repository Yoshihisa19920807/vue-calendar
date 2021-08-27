<template>
  <div>
    <!-- <h1 class="text-h1">Calendar</h1> -->
    <!-- <p>events:</p> -->
    <!-- <p>{{ events }}</p> -->
    <!-- <v-list >
      <v-list-item v-for="event in events" :key="event.id">
        {{ event.name }}
      </v-list-item>
    </v-list> -->
    <!-- <v-btn type="submit" @click="fetchEvents()">fetchEvents</v-btn> -->
    <v-sheet height="6vh" class="d-flex align-center">
      <v-btn icon>
        <v-icon @click="$refs.calendar.prev()" >mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn @click="setToday()">
        今日
      </v-btn>
      <v-btn icon>
        <v-icon @click="$refs.calendar.next()">mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{title()}}</v-toolbar-title>
    </v-sheet>
    <v-sheet height="100vh">
      <!-- v-modelで読み込む月を指定 -->
      <!-- ref="calendar"でv-calnedarコンポーネントのメソッドを使用可能に -->
      <v-calendar
        ref="calendar"
        :events="events"
        @change="fetchEvents"
        v-model="value"
        locale="ja-jp"
        :day-format="(timestamp) => new Date(timestamp.date).getDate()"
        :month-format="(timestamp) => (new Date(timestamp.date).getMonth() + 1) + ' /'"
        @click:event="showEvent"
      ></v-calendar>
    </v-sheet>
    <!-- value is boolean -->
    <!-- <v-dialog :value="dialogMessage !== ''">
      <h1>{{ dialogMessage }}</h1>
    </v-dialog> -->
    <!-- <v-dialog :value="event !== null">
      <div v-if="event">
        <v-card>
          <h1>イベント詳細</h1>
          <p>name: {{ event.name }}</p>
          <p>start: {{ event.start.toLocaleString() }}</p>
          <p>end: {{ event.end.toLocaleString() }}</p>
          <p>timed: {{ event.timed }}</p>
          <p>description: {{ event.description }}</p>
          <p>color: {{ event.color }}</p>
        </v-card>
      </div>
    </v-dialog> -->
    <v-dialog
      :value="event !== null"
      width="600"
      @click:outside="closeDialog">
      <div v-if="event !== null">
        <v-card class="pb-12">
          <!-- justify: 左右, align: 上下  -->
          <v-card-actions class="d-flex justify-end pa-2">
            <v-btn icon @click="closeDialog()">
              <v-icon size="20px">mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-title>
            <v-row>
              <v-col cols="2" class="d-flex justify-center align-center">
                <v-icon size="20px">mdi-square</v-icon>
              </v-col>
              <v-col class="d-flex align-center">
                {{ event.name }}
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="2" class="d-flex justify-center align-center">
                <v-icon size="20px">mdi-clock-time-three-outline</v-icon>
              </v-col>
              <v-col class="d-flex align-center">
                {{ event.start.toLocaleString() }} ~ {{ event.end.toLocaleString() }}
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col cols="2" class="d-flex justify-center align-center">
                <v-icon size="20px">mdi-card-text-outline</v-icon>
              </v-col>
              <v-col class="d-flex align-center">
                {{ event.description || 'no description' }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>
    <!-- <CalendarDetails /> -->
  </div>
</template>

<script>
// import CalendarDetails from "./CalendarDetails";
// import axios from "axios";
import { mapGetters, mapActions } from 'vuex';
import { format } from 'date-fns';

export default {
  name: "Calendar",
  data: () => ({
    // events: [],
    value: new Date('2021/07/01'),  // 表示する月を指定
    title() {
      return format(this.value, 'yyyy年 M月');
    },
    // event: null,
  }),
  computed: {
    // eventsモジュールのeventsステーート
    ...mapGetters('events', ['events', 'event']),
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

    // eventsモジュールのfetchEventsアクション
    ...mapActions('events', ['fetchEvents', 'setEvent']),
    setToday() {
      console.log("set_today")
      this.value = new Date()
    },
    showEvent({ event }) {
      console.log(event)
      // alert(event.name)
      // this.dialogMessage = event.name
      this.setEvent(event)
    },
    closeDialog() {
      this.setEvent(null);
    },
  },
};
</script>
