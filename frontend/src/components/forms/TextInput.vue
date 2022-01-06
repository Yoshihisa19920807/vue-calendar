<template>
  <v-textarea
    filled
    rounded
    auto-grow
    :value="value"
    @input="$emit('input', $event)"
    placeholder="description"
    rows="4">
  </v-textarea>
</template>

<script>
export default {
  name: 'TextInput',
  props: ['value'],
}
</script>
