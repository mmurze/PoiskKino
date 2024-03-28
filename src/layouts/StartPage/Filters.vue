<template>
  <wrapper>
    <search-name
        :search-name="searchName"
        @update:searchName="onInputName($event)"
    />
    <div class="down">
      <sorting
          :sort-type="sortType"
          @update:sortType="onInputType($event)"
      />
      <div class="buttons">
        расположение фильмов:
        <button
            class="combine"
            :style="{'background-color': typeFilmCard ?'#7DD3FC': '#212121'}"
            @click="typeFilmCard = !typeFilmCard"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2C0 0.89543 0.89543 0 2 0H4C5.10457 0 6 0.89543 6 2V4C6 5.10457 5.10457 6 4 6H2C0.89543 6 0 5.10457 0 4V2ZM0 10C0 8.8954 0.89543 8 2 8H4C5.10457 8 6 8.8954 6 10V12C6 13.1046 5.10457 14 4 14H2C0.89543 14 0 13.1046 0 12V10ZM8 2C8 0.89543 8.8954 0 10 0H12C13.1046 0 14 0.89543 14 2V4C14 5.10457 13.1046 6 12 6H10C8.8954 6 8 5.10457 8 4V2ZM10 8C8.8954 8 8 8.8954 8 10V12C8 13.1046 8.8954 14 10 14H12C13.1046 14 14 13.1046 14 12V10C14 8.8954 13.1046 8 12 8H10Z" fill="#475569"/>
          </svg>
        </button>
        <button
            class="horizontal"
            :style="{'background-color': !typeFilmCard ?'#7DD3FC': '#212121'}"
            @click="typeFilmCard = !typeFilmCard"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8571 0C15.4883 0 16 0.44772 16 1V3C16 3.55228 15.4883 4 14.8571 4H1.14286C0.511657 4 0 3.55228 0 3V1C0 0.44772 0.511657 0 1.14286 0H14.8571ZM14.8571 6C15.4883 6 16 6.44772 16 7V9C16 9.5523 15.4883 10 14.8571 10H1.14286C0.511657 10 0 9.5523 0 9V7C0 6.44772 0.511657 6 1.14286 6H14.8571ZM14.8571 12C15.4883 12 16 12.4477 16 13V15C16 15.5523 15.4883 16 14.8571 16H1.14286C0.511657 16 0 15.5523 0 15V13C0 12.4477 0.511657 12 1.14286 12H14.8571Z" fill="#475569"/>
          </svg>
        </button>
      </div>
    </div>
  </wrapper>
</template>

<script>
import Wrapper from "../../helpers/Wrapper.vue";
import Sorting from "../../components/Sorting.vue";
import SearchName from "../../components/SearchName.vue";
import {sortTypes} from "../../helpers/sort.js";

export default {
  name: "Filters",
  props:{
    sortType: String,
    searchName: String,
    typeFilmCard: Boolean
  },
  emits:  ['update:sortType', 'update:searchName', 'update:typeFilmCard'],
  components: {SearchName, Sorting, Wrapper},
  watch:{
    typeFilmCard(value){
      this.$emit('update:typeFilmCard', value)
    }
  },
  methods: {
    onInputName(value){
      if(value === null){
        localStorage.removeItem('searchName')
        value = ""
      }
      else{
        localStorage.setItem('searchName', value)
      }
      this.$emit('update:searchName', value)
    },
    onInputType(value){
      if(value === null){
        console.log("input")
        localStorage.removeItem('sortType')
        value = sortTypes[0]
      }
      else{
        localStorage.setItem('sortType', value)
      }
      this.$emit('update:sortType', value)
    }
  },
}
</script>

<style scoped>
.wrapper{
  margin-top: 80px;
  max-width: 600px;
  width: 100%;
}
.down{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.buttons{
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: flex-end
}
button{
  width: 27px;
  height: 27px;
  padding: 3px;
  border-radius: 5px;
}
@media (max-width: 520px) {
  .down{
    justify-content: right;
  }
}
</style>
