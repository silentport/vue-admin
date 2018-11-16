<template>
  <div class="container">
  <button class="prev"></button>
  <ul>
    <li v-for="(item, n) in list" :key="n" 
       
    >
    <div @click="switchRouter(item, n)">
<span class="not-active" 
            
           :class="{active: n === activeIndex ? true : false}"
      >
      </span>
        {{item.name}}
    </div>
      
      <span class="delete" @click="deleteRouter(n)" :style="{visibility: n > 0 ? '	visible' : 'hidden'}">
        +
      </span>
    </li>
  </ul>
  <button class="next"></button>
  <button class="delete"></button>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  mounted() {},

  computed: {
    list() {
      return this.$store.state.historyList;
    },
    activeIndex() {
      return this.$store.state.activeIndex;
    }
  },
  methods: {
    ...mapMutations(['resetPushing', 'deleteHistory', 'changeActive']),
    // 切换导航
    switchRouter(item, n) {
      console.log(999)
      this.$router.push(item.path);
      this.changeActive({index: n})
    },
    // 删除导航
    deleteRouter(n) {
      this.deleteHistory({vm: this, index: n});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  ul {
    width: calc(100% - 60px);
    display: flex;
    align-items: 25px;
    & > li {
      margin: 0 10px;
      background: #fff;
      min-width: 100px;
      height: 25px;
      cursor: pointer;
      margin-top: 2px;
      line-height: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      & > div {
        min-width: 50px;
         display: flex;
         justify-content: space-between;
         align-items: center;
      }

      &  span.not-active {
        display: inline-block;
        height: 15px;
        width: 15px;
        background: #ddd;
        border-radius: 50%;
      }
      &  span.active {
        background: #2d8cf0 !important;
      }
      &  span.delete {
        transform: rotate(45deg);
        color: #ddd;
        font-size: 20px;
      }
      &  span.delete:hover {
        
        color: rgb(15, 127, 231);
      }
    }
  }
  background: #eee;
  display: flex;
  button {
    height: 30px;
    display: block;
    width: 30px;
    outline: none;
    border: 1px solid #ddd;
    margin: 0px;
    padding: 0px;
    background: #fff;
    position: relative;
    cursor: pointer;

    &.prev::after {
      content: "";
      display: block;
      position: absolute;
      height: 10px;
      width: 10px;
      top: 50%;
      left: 50%;
      margin-left: 3px;
      border: 2px solid;
      border-color: #ccc #ccc transparent transparent;
      transform: rotate(-135deg) translate(-50%, -50%);
      transform-origin: 0px 0px;
    }
    &.next::after {
      content: "";
      display: block;
      position: absolute;
      height: 10px;
      width: 10px;
      top: 50%;
      left: 50%;
      margin-left: -3px;
      border: 2px solid;
      border-color: #ccc #ccc transparent transparent;
      transform: rotate(45deg) translate(-50%, -50%);
      transform-origin: 0px 0px;
    }
    &.delete::after {
      content: "+";
      display: block;
      font-size: 16px;
      color: #ccc;
      font-weight: 700;
      position: absolute;
      height: 20px;
      line-height: 18px;
      width: 20px;
      top: 50%;
      left: 50%;
      border: 2px solid #ccc;
      border-radius: 50%;
      transform: rotate(45deg) translate(-50%, -50%);
      transform-origin: 0px 0px;
    }
    &.next:hover:after,
    &.prev:hover:after {
      transition: all 0.4s;
      border-color: rgb(15, 127, 231) rgb(15, 127, 231) transparent transparent;
    }
    &.delete:hover:after {
      transition: all 0.4s;
      border-color: rgb(15, 127, 231);
      color: rgb(15, 127, 231);
    }
  }
}
</style>
