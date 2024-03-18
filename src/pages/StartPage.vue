<template>
  <Wrapper>
    <v-text-field label="Введите название" clearable/>
    <v-select
        clearable
        v-model="searchType"
        :items="namesSearchTypes()"
        density="compact"
        label="Сортировка"
    />
    <films
        :per-page="perPage"
        :length-pagination="lengthPagination"
        :props-array="getFilm"
        :typePage="1"
    />
  </Wrapper>

</template>

<script>
import axios from "axios";
import {useFilmsStore} from "../stores/films.js";
import {enumTypeSort, enumSortBy, sortedBy, searchTypes} from "../helpers/sort.js";
import Films from "../components/Films.vue";
import {storeToRefs} from "pinia";
import Wrapper from "../helpers/Wrapper.vue";
export default {
  name: "StartPage",
  setup(){
    const fs = useFilmsStore()
    const {searchFilm} = storeToRefs(fs)
    return {fs, searchFilm}
  },
  components:{
    Wrapper,
    Films,
  },
  data(){
    return{
      perPage: 12,
      searchType: ' ',
      page: 1,
      films: []
    }
  },
  watch:{
    searchFilm(value){
      if(!value){
        this.fs.typeSort = enumTypeSort.nothing
        this.fs.sortBy = enumSortBy.nothing
        this.searchFilm = ''
        localStorage.removeItem('searchFilm')
      }
      localStorage.setItem('searchFilm', value)
    },
    searchType(value){
      if(!value){
        this.fs.typeSort = enumTypeSort.nothing
        this.fs.sortBy = enumSortBy.nothing
        localStorage.removeItem('searchType')
      }
      else {
        searchTypes.forEach((item) => {
          if (item.name === value) {
            this.fs.typeSort = item.typeSort
            this.fs.sortBy = item.sortBy
          }
        })
        localStorage.setItem('searchType', this.searchType)
      }
    },
  },
  methods: {
    namesSearchTypes() {
      return searchTypes.map((item) => item.name)
    }
  },
  mounted: function () {
    if (localStorage.getItem('searchType') !== "null") {
      this.searchType = localStorage.getItem('searchType')
    }
    if (localStorage.getItem('searchFilm') !== "null") {
      this.searchFilm = localStorage.getItem('searchFilm')
    }
  },
  computed:{
    getFilm(){
      let res = []
      this.fs.films.forEach((item)=>{
        item.name.toLowerCase().includes(this.searchFilm.toLowerCase()) ? res.push(item) : false
      })
      res = sortedBy(this.fs.typeSort, this.fs.sortBy, res)
      return res
    },
    lengthPagination(){
      return Math.ceil(this.getFilm.length / this.perPage)
    },
  },
  async created(key, value) {
    try {
      const data = await axios.get('')
      this.fs.films = data.data
    }
    catch (e){
      console.log(e.name)
    }
  }
}
</script>

<style scoped>

</style>
