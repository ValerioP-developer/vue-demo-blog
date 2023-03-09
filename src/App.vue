<template>
  <div id="app">
   <div class="wrapper"> 
      <nav id="sidebar">
        <LoaderComponent :loading="loading" loaderText="Loading...">   </LoaderComponent>
        <template v-if="!loading">
          <router-link  tag="div"  class="link"  to="/">Home</router-link> |
          <router-link  tag="div"  class="link"   to="/about">About</router-link>
        </template>
      </nav>
      <div id="content">
        <router-view/>

      </div>
   </div>
  </div>
</template>
<script>
import LoaderComponent from '@/components/LoaderComponent.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
  name : 'app',
  components : {
    LoaderComponent
  },
  data () {
    return {
      loading : false
    }
  },
  mounted() {
    this.fetchCategories().then(() => {
      if(this.$route.params.key && !this.getCategory(this.$route.params.key)){
        this.$router.push({ name : 'notfound'});
      }
      this.loading = false;       
    }).catch((error) => {
      console.log(error)
      this.loading = false;         
    });
  },
  computed : {
    ...mapGetters({
        'categories' : 'category/getCategories',
        'getCategory' : 'category/getCategory',
    }),
  },
  beforeMount(){
    this.fetchCategories();
  },
  methods : {
      ...mapActions({
          'fetchCategories' : 'category/fetchCategories'
      })
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.wrapper {
    display: flex;
    width: 100%;
}
#sidebar {
    width: 100px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 999;
    background: rgb(94, 236, 177);
    padding:60px 60px 100px 60px;
    color: #fff;
}
#content {
    width: calc(100% - 300px);
    max-width:none;
    margin-left: 300px;
    padding:60px 60px 100px 60px;
    min-height: 50vh;
    box-sizing: border-box;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.link{
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  transition: 0.3s;
}

.link:hover{
  font-size: 28px;
  color: green;
}

</style>
