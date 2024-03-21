<template>
  <Filters
      v-model:search-type="searchType"
      v-model:search-name="searchName"
  />
  <Films
      :per-page="perPage"
      :props-array="getFilm"
      :typePage="1"
  />
</template>

<script>
import axios from "axios";
import {useFilmsStore} from "../stores/films.js";
import {sortedBy} from "../helpers/sort.js";
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
      searchType:'',
      searchName:'',
      page: 1,
    }
  },
  computed:{
    getFilm(){
      if(this.searchType === '' && this.searchName === ''){
        return this.fs.films
      }
      else{
        let res = []
        this.fs.films.forEach((item)=>{
          item.name.toLowerCase().includes(this.searchName.toLowerCase()) ? res.push(item) : false
        })
        res = sortedBy(this.searchType, res)
        return res
      }
    },
  },
  async created() {
    try {
      const data = await axios.get('')
      this.fs.films = data.data
    }
    catch(e){
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
