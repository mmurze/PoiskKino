<template>
  <wrapper>
    <div class="main_container">
      <div class="pic">
        <img :src="film.poster.url" :alt="this.film.name"/>
      </div>
      <div class="text">
        <h1>{{film.name}}</h1>
        <div class="description">{{film.description}}</div>
        <div class="container">
          <div class="ratings" v-if="flag">
            <div class="bordered">kp: {{film.rating.kp}}</div>
            <div class="bordered">imdb: {{film.rating.imdb}}</div>
            <div class="bordered">critics: {{film.rating.filmCritics}}</div>
          </div>
          <v-rating v-else
                    v-model="rating"
                    length="10"
                    @click="flag=!flag"
          ></v-rating>
          <button class="bordered">
            <v-icon icon="mdi-dots-horizontal"/>
            <v-menu activator="parent">
              <v-list>
                <v-list-item
                    v-for="(item, index) in actions"
                    :key="index"
                    :value="index"
                >
                  <v-list-item-title
                      class="d-flex justify-space-between align-center ga-5"
                      @click="changeFlag(index)"
                  >
                    {{ item.name }}
                    <div class="person_rating">
                      <v-icon :icon="icon(item, index)" size="small"/>
                      <p v-if="index === 0 && rating !== 0">{{rating}}</p>
                    </div>

                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </button>
        </div>
      </div>
      <div class="recommendation"></div>
    </div>
  </wrapper>
</template>

<script>
import {useFilmsStore} from '../stores/films.js'
import Wrapper from "../helpers/Wrapper.vue";
export default {
  name: "FilmPage",
  props: ['id'],
  components: {Wrapper},
  setup(){
    const fs = useFilmsStore()
    return {fs}
  },
  data(){
    return{
      film: null,
      rating: 0,
      roll: true,
      flag: true,
      bookmark: false,
      actions:[
        {
          name: "Оценить",
          icon: "mdi-star-outline",
          fillIcon: "mdi-star"
        },
        {
          name: "Запомнить",
          icon: "mdi-bookmark-outline",
          fillIcon: "mdi-bookmark"
        }
      ]
    }
  },
  beforeRouteLeave(to, from, next){
    localStorage.removeItem('film')
    next()
  },
  beforeRouteUpdate(to, from, next){
    localStorage.removeItem('film')
    const id = to.params.id
    this.film = this.fs.films.find(film => film.id === id)
    this.rating = 0
    this.roll = true
    this.flag = true
    this.bookmark = false
    if (!this.film){
      this.$router.push({name: 'home'})
    }
    next()
  },
  mounted(){
    console.log("mounted ", this.flag)
    if(localStorage.film){
     this.film = JSON.parse(localStorage.getItem('film'))
    }
  },
  watch:{
    film(newFilm){
      localStorage.setItem('film', JSON.stringify(newFilm))
    },
    rating(){
      this.addChangesToLS()
    },
    bookmark(){
      this.addChangesToLS()
    },
  },
  methods:{
    changeFlag(index){
      if(index === 0){
        this.flag = !this.flag
      }
      else {
        this.bookmark = !this.bookmark
      }
    },
    icon(item, index){
      if(index === 0 && this.rating !== 0){
        return item.fillIcon
      }
      if(index === 1 && this.bookmark === true){
        return item.fillIcon
      }
      return item.icon
    },
    label(){
      if(this.roll){
        return "развернуть..."
      }
      else{
        return "свернуть"
      }
    },
    addChangesToLS(){
      let obj = {id: this.film.id, rating: this.rating, bookmark: this.bookmark}
      let taggetMovies = []
      if(localStorage.getItem('taggetMovies') === null){
        taggetMovies.push(obj)
      }
      else{
        taggetMovies = JSON.parse(localStorage.getItem('taggetMovies'))
        let ind = taggetMovies.map(item => item.id).findIndex(id => id === this.film.id)
        if (ind < 0){
          taggetMovies.push(obj)
        }
        else{
          taggetMovies[ind] = obj
        }
      }
      localStorage.setItem('taggetMovies', JSON.stringify(taggetMovies))
    }
  },
  created() {
    const data = JSON.parse(localStorage.getItem('film'))
    console.log("created")
    if(data == null){
      const id = this.$route.params.id
      this.film = this.fs.films.find(film => film.id === id)
      if (!this.film){
        this.$router.push({name: 'home'})
      }
    }
    else{
      this.film = data
    }
    this.addChangesToLS()
  },
}
</script>

<style lang="scss" scoped>
.wrapper{
  margin-top: 80px;
}
.main_container {
  display: grid;
  grid-template-columns: 30% minmax(350px, auto);
  grid-template-rows: repeat(2, auto);
  gap: 5px 30px;
  grid-auto-flow: row;
  grid-template-areas:
    "pic text"
    "recommendation recommendation";
}
.recommendation {
  grid-area: recommendation;
}
.pic {
  grid-area: pic;
  img{
    border-radius: 10px;
  }
}
.text {
  grid-area: text;
  .description{
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: #7DD3FC 2px solid;
  }
  .container{
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .ratings{
      display: flex;
      gap: 10px;
    }
    button{
      width: 50px;
    }
  }
}

.bordered{
  text-align: center;
  width: 100px;
  color: #7DD3FC;
  font-size: 17px;
  border-radius: 8px;
  border: #fff 2px solid;
  padding: 7px;
}
.person_rating{
  display: flex;
  gap: 3px;
  align-items:  center;
  p{
    font-size: 18px;
  }
}

</style>
