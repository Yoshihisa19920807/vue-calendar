<template>
  <v-list dense>
    <v-list-item>
      <v-list-item-content>
        <v-subheader>
          マイカレンダー
        </v-subheader>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon @click="initCalendar">
          <v-icon size="16px">mdi-plus</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-list-item-group :value="selectedItem">
      <v-list-item v-for="calendar in calendars" :key="calendar.id">
        <v-list-item-content class="pa-1">
          <!-- v-checkboxにv-model="calendar.visibility"を指定しているため、チェックボックスをクリックしたらcalendar.is_visibleの値が反転します。 -->
          <v-checkbox
            dense
            v-model="calendar.is_visible"
            :color="calendar.color"
            :label="calendar.name"
            @click="toggleVisibility(calendar)"
            class="pb-2"
            hide-details="true"
          ></v-checkbox>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu transition="scale-transition" offset-y min-width="100px">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon size="12px">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="edit(calendar)">編集</v-list-item>
              <v-list-item @click="del(calendar)">削除</v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
    <v-dialog :value="calendar !== null" @click:outside="closeDialog" width="600">
      <CalendarFormDialog v-if="calendar !== null" />
    </v-dialog>
  </v-list>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import CalendarFormDialog from './CalendarFormDialog';

export default {
  name: 'CalendarList',
  components: { CalendarFormDialog },
  data: () => ({
    selectedItem: null,
  }),
  computed: {
    // call by store name and function name
    ...mapGetters('calendars', ['calendars', 'calendar'])
  },
  created() {
    this.fetchCalendars()
  },
  methods: {
    // mapActions(モジュール名, ['アクション名１', 'アクション名２'])
    ...mapActions('calendars', ['fetchCalendars', 'updateCalendar', 'deleteCalendar', 'setCalendar']),
    initCalendar() {
      this.fetchCalendars
      this.setCalendar({
        name: '',
        is_visible: true,
      });
    },
    closeDialog() {
      this.fetchCalendars
      this.setCalendar(null);
    },
    edit(calendar) {
      this.setCalendar(calendar);
    },
    del(calendar) {
      this.deleteCalendar(calendar.id);
    },
    toggleVisibility(calendar) {
      this.updateCalendar(calendar);
    },
  },
};
</script>
