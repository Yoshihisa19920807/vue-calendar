
<template>
  <!-- templateにボタンとして表示したい文言
  その後ろにボタンを押した際に表示される要素-->
  <v-menu offset-y>
    <!-- ここのonはevent listeners -->
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">{{ value || '日付を選択' }}</v-btn>
    </template>

    <!-- v-modelを使わないのはpropsのvalueが不変だから値を変えずにemitで親に返す -->
    <!-- day-formatで「日」を消す -->
    <!-- v-date-pickerはyyyy-mm-ddの形式しか認識しないのでreplaceする -->
    <!--
    v-model="startDate"
    ↓同じ
    :value="startDate"
    @input="startDate = $event.target.value"
    ※カスタムコンポーネントの場合は
    $event.target.value
    ではなく
    $event
    のみ
    -->
    <v-date-picker
      :value="value.replace(/\//g, '-')"
      @input="$emit('input', $event.replace(/-/g, '/'))"
      no-title
      locale="ja-ja"
      :day-format="value => new Date(value).getDate()"
    ></v-date-picker>
    <!-- <p>{{ value }}</p> -->
  </v-menu>
</template>

<script>
export default {
  name: 'DateForm',
  props: ['value'],
}
</script>
