<template>
  <v-card class="py-12">
    <v-card-text>
      <DialogRow icon="mdi-square" :color= "color">
        <v-text-field v-model="name" label="カレンダー名">
        </v-text-field>
      </DialogRow>
      <DialogRow icon="mdi-palette">
        <ColorPicker v-model="color" />
      </DialogRow>
      <v-card-actions class="d-flex justify-end">
        <v-btn @click="close">キャンセル</v-btn>
        <!-- $v.$invalidはvuelidateのバリデ結果？ -->
        <v-btn @click="submit" :disabled="$v.$invalid">保存</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { validationMixin } from 'vuelidate';
  import { required } from 'vuelidate/lib/validators';
  import DialogRow from '../layouts/DialogRow';
  import ColorPicker from '../forms/ColorPicker';

  export default {
    name: 'CalendarFormDialog',
    mixins: [validationMixin],
    components: { DialogRow, ColorPicker },
    data: () => ({
      name: 'dadsadsa',
      color: null,
    }),
    validations: {
      name: { required },
    },
    computed: {
      ...mapGetters('calendars', ['calendar']),
    },
    created() {
      this.name = this.calendar.name;
      this.color = this.calendar.color;
    },
    methods: {
      ...mapActions('calendars', ['createCalendar', 'updateCalendar', 'setCalendar']),
      close() {
        this.setCalendar(null)
      },
      submit() {
        if(this.$v.$invalid) {
          return;
        }
        const params = {
          ...this.calendar,
          name: this.name,
          color: this.color,
        };
        if (params.id) {
          this.updateCalendar(params);
        } else {
          this.createCalendar(params);
        }
        this.close();
      },
    },
  };
</script>
