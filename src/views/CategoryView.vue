<template>
  <div >
   
     <LoaderComponent :loading="loading" loaderText="Loading...">   </LoaderComponent>
     <h1>   {{ category.name }}        </h1> <br>
     <h1>   {{ category.description }}        </h1> <br>
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
    paramKey :function(){
      console.log("*****************" +this.$route.params.key);
      return this.$route.params.key;
    },
    category : function(){
       return this.getCategory(this.paramKey);
    },
    ...mapGetters({
        'categories' : 'category/getCategories',
        'getCategory' : 'category/getCategory',
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
  methods : {
      ...mapActions({
          'fetchCategories' : 'category/fetchCategories'
      })
  }
}
</script>

<style lang="scss">


</style>
