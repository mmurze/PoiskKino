<template>
  <input
      placeholder="Название"
      type="text"
      id="name"
      :value="searchName"
      @input="onInput($event.target.value)"
  >
</template>

<script>
export default {
  name: "SearchName",
  props:{
    searchName: String
  },
  emits:  ['update:searchName'],
  data(){
    return{
      value: "Название"
    }
  },
  methods:{
    onInput(value){
      this.$emit('update:searchName', value)
    }
  }
}
</script>

<style lang="scss" scoped>
input{
  border-radius: 15px;
  padding: 5px 10px ;
  border: white 2px solid;
  &:focus::placeholder{
    color: #111111;
  }
  &::placeholder{
    font-family: "Oswald", sans-serif;
    color: white;
  }
}
</style>
