<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" :class="{ 'red lighten-4 rounded' : isError}">{{ value || '時間を選択' }}</v-btn>
    </template>
    <v-list height="300px" class="overflow-y-auto">
      <v-list-item v-for="(time, i) in times" :key="i" @click="$emit('input', time)">
        {{ time }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { getTimeIntervalList } from "../../functions/dateTime"

export default {
  name: 'TimePicker',
  props: ['value', 'isError'],
  // data: () => ({
  //   times: getTimeIntervalList(),
  // }),
  // ↑↓同じ
  computed: {
    times() {
      return getTimeIntervalList()
    }
  }
}
</script>
