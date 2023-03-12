<template>
  <div>
    <template v-if="!paramKeyPost">
          <h1>{{ category.name }}</h1>
          <h4>{{ category.description }}</h4>
          <hr>
          <LoaderComponent :loading="loading" loaderText="Loading..."></LoaderComponent>  
          <div v-if="!loading">
              <div class="row" v-for="(post,index) in getPosts" :key="'card' + index" >
                <div class="col-8">
                  <div class="card" style="margin-bottom:50px;padding:10px;">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-8">
                          <h5 class="card-title">{{ post.name | truncate(70) }}</h5>
                          <p class="card-text">{{ post.description | truncate(200) }}</p>
                          <router-link tag="a" class="btn btn-primary" :to="{ name : 'post' , params : { keypost : post.key}}" :key="'menu' + index" >
                              View...
                          </router-link>
                        </div>
                        <div class="col-4">
                          <img class="card-img-top" :src="post.img" height="150px;">
                        </div>
                      </div>
                       
                    </div>
                  </div>
                </div>
              </div>
             
          </div>
    </template>
    <template v-else>
      <LoaderComponent :loading="loading" loaderText="Loading..."></LoaderComponent>
      <router-view v-if="!loading"></router-view>
    </template>
  </div>
</template>

<script>
import LoaderComponent from '@/components/LoaderComponent.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
  name : 'CategoryView',
  components : {
    LoaderComponent
  },
  data () {
    return {
      loading : true
    }
  },
  mounted() {
    this.checkPost();
    
  },
  computed : {
    paramKeyPost :function(){
      return this.$route.params.keypost;
    },
    paramKey :function(){
      return this.$route.params.key;
    },
    category : function(){
       return this.getCategory(this.paramKey);
    },
    ...mapGetters({
       // 'categories' : 'category/getCategories',
        'getCategory' : 'category/getCategory',
        'getPosts' : 'post/getPosts'
    }),
  },
  beforeMount(){
    /*
    this.fetchCategories().then(()=>{
      this.loading=false;
    }).catch((error)=>{
      console.log(error);
        this.loading=false ;
    });*/
  },
  watch: {
    category: function (val,old) {
      console.log(val);
      console.log(old);
      this.checkPost();
    },
  },
  
  methods : {
      ...mapActions({
          //'fetchCategories' : 'category/fetchCategories',
          'fetchPosts' :'post/fetchPosts'
      }),
      checkPost(){
        if(this.category){
          this.loading = true;
          this.fetchPosts({cat: this.category.id}).then(() => {
            console.log("id categoruyy "+this.category.id)
            this.loading = false ;
          }).catch((error) => {
            console.log(error)
              this.loading = false;         
          });
        }
      }
  }
}
</script>

<style lang="scss">


</style>
