<template>
  <div v-if="type" class="card combine">
    <div class="pic">
      <img :src="item.poster.url" :alt="item.name"/>
      <svg v-if="bookmark" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"
           style="fill:#FA5252;">
        <path d="M 4 2 L 4 22 L 12 19 L 20 22 L 20 2 L 6 2 L 4 2 z"></path>
      </svg>
    </div>
    <p>{{item.name}}</p>
  </div>
  <div v-else class="card horizontal">
    <div class="pic">
      <img :src="item.poster.url" :alt="item.name"/>
      <svg v-if="bookmark" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"
           style="fill:#FA5252;">
        <path d="M 4 2 L 4 22 L 12 19 L 20 22 L 20 2 L 6 2 L 4 2 z"></path>
      </svg>
    </div>
    <div class="information">
      <div class="up">
        <p>{{item.year}}</p>
        <div class="rating">
          IMDb: {{item.rating.imdb}}
        </div>
      </div>
      <div class="down">
        <h3>{{item.name}}</h3>
        <p>{{item.shortDescription}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilmComponent",
  props:['item', 'type'],
  computed:{
    bookmark(){
      if(localStorage.getItem('taggetMovies') === null){
        return false
      }
      else{
        let taggetMovies = JSON.parse(localStorage.getItem('taggetMovies'))
        let ind = taggetMovies.map(item => item.id).findIndex(id => id === this.item.id)
        if(ind < 0){
          return false
        }
        return taggetMovies[ind].bookmark;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card:hover .pic{
  transform: scale(105%);
  box-shadow: 0 0 30px rgba(248, 245, 245, 0.1);
}
.pic{
  object-fit: cover;
  transition: transform 0.1s ease-in-out 0.1s;
  img{
    border-radius: 10px;
  }
  position: relative;
  svg{
    position: absolute;
    right: 7%;
    top: -2px;
    width: 20px;
    height: 20px;
  }
}

.horizontal{
  display: flex;
  gap: 2%;
  .pic{
    max-width: 35%;
    width: 100%;
  }
  .information{
    max-width: 63%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding-top: 5px;
    padding-bottom: 10px;
  }
  .up{
    display: flex;
    justify-content: space-between;
  }
  .down h3{
    margin-bottom: 5px;
  }
}

@media (max-width: 720px) {
  .pic svg{
    width: 15px;
    height: 15px;
  }
}
</style>
