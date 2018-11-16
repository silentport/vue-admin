<template>
  <div id="app">
    <Layout>
      <Sider ref="side" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <Submenu ref="submenu" :name="n + 1" v-for="(item, n) in menuData" :key="n">
            <template slot="title">
                    <Icon :type="item.icon"></Icon>
                    {{item.itemName}}
            </template>
              <MenuItem :name="`${n + 1}-${m + 1}`"
                        v-for="(child, m) in item.children" 
                        :key="n + '-' + m"
                        @click.native="enter(item, child)"
              >
                <Icon :type="child.icon"></Icon>
                {{child.itemName}}  
              </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>

          <div class="avator">
            <img src="https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png" alt="">
          </div>
        </Header>
        <Content :style="{marginTop: '1px', background: '#fff'}">
          <RouterHistory/>
          <keep-alive :include="list">
              <router-view/>
          </keep-alive>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import {
    Layout,
    Sider,
    Menu,
    Submenu,
    MenuItem,
    Icon,
    Content
  } from 'iview'
  import {
    mapMutations
  } from 'vuex'
  import RouterHistory from '@/components/RouterHistory'
  export default {
    name: 'App',
    mounted() {
      this.$router.push('/')
    },
    components: {
      Layout,
      Sider,
      Menu,
      Icon,
      Content,
      Submenu,
      MenuItem,
      RouterHistory
    },
  
    data() {
      return {
        isCollapsed: false,
        menus: [], // 已经展开的菜单
        hasSpread: false, //是否展开子菜单
        menuData: [{
            itemName: 'Item1',
            icon: 'ios-navigate',
            children: [{
              itemName: 'option-1',
              icon: 'ios-navigate',
              path: "/a"
            }, {
              itemName: 'option-2',
              icon: 'ios-navigate',
              path: "/b"
            }, {
              itemName: 'option-3',
              icon: 'ios-navigate',
              path: "/c"
            }, ]
          },
          {
            itemName: 'Item2',
            icon: 'ios-navigate',
            children: [{
              itemName: 'option-1',
              icon: 'ios-navigate',
              path: "/d"
            }, {
              itemName: 'option-2',
              icon: 'ios-navigate',
              path: "/e"
            }, {
              itemName: 'option-3',
              icon: 'ios-navigate',
              path: "/f"
            }, ]
          }
        ]
      }
    },
    computed: {
      rotateIcon() {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      menuitemClasses() {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      list() {
        return this.$store.state.historyList.map(item => {
          return item.name;
        })
      }
    },
    methods: {
      ...mapMutations(['changeActive']),
      enter(item, child) {
        this.$router.push(child.path)
      },
      collapsedSider() {
        if (this.hasSpread && this.menus.length !== 0) {
          this.menus.forEach(i => {
            i.opened = true;
          })
        } else {
          this.menus.length = 0;
          this.$refs.submenu.forEach(sub => {
            if (sub.opened) {
              this.menus.push(sub);
              sub.opened = false;
            }
          })
  
        }
        this.hasSpread = !this.hasSpread;
        this.$refs.side.toggleCollapse();
      }
    },
    watch: {
      $route(newVal, oldVal) {
        this.changeActive({
          path: newVal.path
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .avator {
    margin-right: 60px;
    position: relative;
    width: 50px;
    cursor: pointer;
    &>img {
      width: 40px;
    }
    &::after {
      display: block;
      position: absolute;
      content: "";
      border: 5px solid transparent;
      border-top-color: #555;
      top: 50%;
      margin-top: 3px;
      cursor: pointer;
      transform: translateY(-50%);
      left: 50px;
      width: 0;
      height: 0;
    }
  }
  
  .ivu-layout-sider {
    height: 100vh;
  }
  
  .layout-header-bar {
    background: #fff;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 1px #ddd;
  }
  
  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  
  .menu-icon {
    transition: all .3s;
  }
  
  .rotate-icon {
    transform: rotate(-90deg);
  }
  
  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  
  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  
  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }
  
  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
