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
    <v-sheet height="6vh" class="d-flex align-center" color="grey lighten-3">
      <!-- <v-btn icon>
        <v-icon @click="hoge()" >he</v-icon>
      </v-btn> -->
      <v-btn icon>
        <v-icon @click="$refs.calendar.prev()" >mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn outlined small @click="setToday()">
        今日
      </v-btn>
      <v-btn icon>
        <v-icon @click="$refs.calendar.next()">mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-sheet>
    <v-sheet height="94vh" class="d-flex">
      <v-sheet width="200px">
        <CalendarList/>
      </v-sheet>
      <!-- v-modelで読み込む月を指定 -->
      <!-- ref="calendar"でv-calnedarコンポーネントのメソッドを使用可能に -->
      <v-sheet class="flex">
        <v-calendar
          ref="calendar"
          :events="events"
          @change="fetchEvents"
          v-model="value"
          locale="ja-jp"
          :day-format="(timestamp) => new Date(timestamp.date).getDate()"
          :month-format="(timestamp) => (new Date(timestamp.date).getMonth() + 1) + ' /'"
          @click:event="showEvent"
          @click:day="clickDay"
        ></v-calendar>
      </v-sheet>
    </v-sheet>
    <v-dialog
      width="600"
      @click:outside="closeDialog"
      :value="event !== null"
    >
      <EventDetailDialog
        v-if="event !== null && !isEditMode"
      />
      <!-- ここでv-ifを指定しないと表示されてなくても読み込みは行われてしまう -->
      <EventFormDialog
        v-if="event !== null && isEditMode"
      />
    </v-dialog>
  </div>
</template>

<script>
// import CalendarDetails from "./CalendarDetails";
import EventDetailDialog from "../events/EventDetailDialog.vue";
import EventFormDialog from "../events/EventFormDialog.vue"
import CalendarList from "../calendars/CalendarList.vue"
// import axios from "axios";
import { mapGetters, mapActions } from 'vuex';
// named impport
import { format } from 'date-fns';
// // default import
// import axios from 'axios';
import { getDefaultStartAndEnd } from "../../functions/dateTime"

export default {
  name: "Calendar",
  data: () => ({
    // events: [],
    value: new Date('2021/07/01'),  // 表示する月を指定 v-model="value"と繋がっている
    // event: null,
  }),
  computed: {
    title() {
      return format(new Date(this.value), 'yyyy年 M月');
    },
    // eventsモジュールのeventsステーート
    ...mapGetters('events', ['events', 'event', 'isEditMode']),
  },
  components: {
    // CalendarDetails,
    EventDetailDialog,
    EventFormDialog,
    CalendarList,
  },
  methods: {
    // hoge() {
    //   const apiUrl = 'http://localhost:3000';
    //   axios.post(`${apiUrl}/events`, {event: { name: "created from button", start: new Date(), end: new Date()}})
    //     .then(function (response) {
    //       console.log(response.data);
    //     })
    // },


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
    ...mapActions('events', ['fetchEvents', 'setEvent', 'setEditMode']),
    setToday() {
      console.log("set_today")
      this.value = new Date()
    },
    showEvent({ nativeEvent, event }) {
      this.setEvent(event)
      // this.setEditMode(false)
      // prevent rendering editform
      nativeEvent.stopPropagation();
    },
    // ({date}) = (date.date)
    clickDay({date}) {
      console.log("clickDay")
      date = date.replace(/-/g, '/');

      let start_end = getDefaultStartAndEnd(date)
      const _event = {
        name: "",
        start: new Date(start_end[0]),
        end: new Date(start_end[1]),
        timed: true,
        color: "blue"
      }
      this.setEvent(_event)
      this.setEditMode(true)
    },
    closeDialog() {
      this.setEvent(null);
      this.setEditMode(false)
    },
  },
};
</script>
