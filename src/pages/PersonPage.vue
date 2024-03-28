<template>
  <wrapper>
    <div class="bookmark">
      <div class="header">
        <button>
          <h2>Закладки</h2>
        </button>
        <div class="filters">
          <sorting v-model:sort-type="bookmarkSortingType"/>
        </div>
      </div>
      <ul>
        <li
            v-for="(item, index) in bookmark_films"
            :id="index"
            :key="item.id"
            @click="toFilm(item)"
        >
          <div class="pic">
            <img :src="item.poster.url" :alt="item.name"/>
            <button @click.stop="deleteBookmark(item.id)">
              <v-icon id="icon" icon="mdi-close"/>
            </button>
          </div>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <div class="rating">
      <div class="header">
        <button>
          <h2>Оцененные</h2>
        </button>
        <div class="filters">
          <sorting v-model:sort-type="ratingSortingType"/>
        </div>
      </div>
      <ul>
        <li
            v-for="(item, index) in rating_films"
            :id="index"
            :key="item.id"
            @click="toFilm(item)"
        >
          <div class="pic">
            <img :src="item.poster.url" :alt="item.name"/>
            <div class="film_rating">
              <v-icon icon="mdi-star-outline" size="17"/>
              <p>{{item.person_rating}}</p>
            </div>
          </div>
          <p>{{item.name}} {{item.person_rating}}</p>
        </li>
      </ul>
    </div>
  </wrapper>
</template>

<script>
import Wrapper from "../helpers/Wrapper.vue";
import {useFilmsStore} from "../stores/films.js";
import {sortTypes, sortedBy} from "../helpers/sort.js"
import Sorting from "../components/Sorting.vue";
export default {
  name: "PersonPage",
  components: {Sorting, Wrapper},
  setup(){
    let fs = useFilmsStore()
    return {fs}
  },
  data(){
    return{
      films: [],
      bookmark_ids: [],
      rating_ids: [],
      bookmarkSortingType: sortTypes[0],
      ratingSortingType: sortTypes[0]
    }
  },
  methods:{
    toFilm(item){
      console.log(item)
      return this.$router.push({name : 'film', params: {id: item.id}})
    },
    deleteBookmark(id){
      this.films = JSON.parse(localStorage.getItem('taggetMovies'))
      let ind = this.films.map(item => item.id).findIndex(item_id => item_id === id)
      if(ind >= 0){
        this.films[ind].bookmark = false
      }
      this.bookmark_ids.filter(item => item !== id)
      localStorage.setItem('taggetMovies', JSON.stringify(this.films))
    }
  },
  computed:{
    bookmark_films(){
      let res = []
      this.bookmark_ids.forEach(id =>{
        let founded = this.fs.films.find(film => id === film.id)
        res.push(founded)
      })
      res = sortedBy(this.bookmarkSortingType, res)
      return res
    },
    rating_films(){
      let res = []
      this.rating_ids.forEach(item =>{
        let founded = this.fs.films.find(film => item.id === film.id)
        founded['person_rating'] = item.rating
        res.push(founded)
      })
      res = sortedBy(this.ratingSortingType, res)
      return res
    }
  },
  created() {
    this.films = JSON.parse(localStorage.getItem('taggetMovies'))
    if(!this.films){
      return
    }
    this.films.map(item =>{
      if(item.bookmark > 0){
        this.bookmark_ids.push(item.id)
      }
    })
    this.films.map(item =>{
      if(item.rating > 0){
        this.rating_ids.push({id:item.id, rating: item.rating})
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  margin-top: 80px;
}
.rating{
  margin-top: 30px;
}
.header{
  display: flex;
  justify-content: space-between;
}
button{
  border-bottom: white 2px solid;
}
ul{
  margin-top: 10px;
  display: grid;
  grid-template-columns: 200px;
  grid-auto-columns: 200px;
  grid-auto-flow: column;
  gap: 10px;
  overflow: auto;
}
.pic{
  position: relative;
  #icon{
    position: absolute;
    top: 5px;
    right: 5px;
    transition: opacity 0.3s linear;
    opacity: 0.5;
    &:hover{
      opacity: 1;
    }
  }
  .film_rating{
    display: flex;
    align-items: baseline;
    wrap-option: nowrap;
    border: white 3px solid;
    border-radius: 15px;
    padding: 0 5px;
    font-size: 15px;
    position: absolute;
    top: 2px;
    right: 5px;
  }
}
@media (max-width: 720px) {
  ul{
    grid-template-columns: 180px;
    grid-auto-columns: 180px;
  }
}

@media (max-width: 540px) {
  ul{
    grid-template-columns: 160px;
    grid-auto-columns: 160px;
  }
  .pic .film_rating{
    align-items: center;
    border: white 2px solid;
    border-radius: 10px;
    padding: 0 2px;
    font-size: 12px;
    top: 2px;
    right: 2px;
  }
}
</style>
