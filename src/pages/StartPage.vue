<template>
  <filters
      v-model:sort-type="sortType"
      v-model:search-name="searchName"
      v-model:type-film-card="typeFilmCard"
  />
  <films
      :per-page="perPage"
      :props-array="getFilm"
      :typeFilmCard="typeFilmCard"
  />
</template>

<script>
import {useFilmsStore} from "../stores/films.js";
import {sortedBy, sortTypes} from "../helpers/sort.js";
import Films from "../layouts/StartPage/Films.vue"
import Filters from "../layouts/StartPage/Filters.vue";
export default {
  name: "StartPage",
  components:{
    Filters,
    Films,
  },
  setup(){
    let fs = useFilmsStore()
    return {fs}
  },
  data(){
    return{
      perPage: 12,
      typeFilmCard: true,
      sortType: sortTypes[0],
      searchName:'',
      page: 1,
    }
  },
  created() {
    if (localStorage.getItem('sortType') !== null) {
      this.sortType = localStorage.getItem('sortType')
    }
    if (localStorage.getItem('searchName') !== null) {
      this.searchName = localStorage.getItem('searchName')
    }
  },
  computed:{
    getFilm(){
      if(this.sortType === '' && this.searchName === ''){
        return this.fs.films
      }
      else{
        let res = []
        this.fs.films.forEach((item)=>{
          item.name.toLowerCase().includes(this.searchName.toLowerCase()) ? res.push(item) : false
        })
        res = sortedBy(this.sortType, res)
        return res
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
