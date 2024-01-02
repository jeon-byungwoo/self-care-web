<template>
  <div>
    <Header @update="onChildUpdate"> </Header>
    <div class="main" v-if="!navigationStatus">
      <div class="banner-group">
        <div class="title">셀프케어 스토어</div>
        <div class="title-sub">
          셀프케어에서 제공하는 건강식품을 만나보세요.
        </div>
      </div>

      <div class="scroll-group">
        <div class="scroll-header-group">
          <div class="tab-group">
            <!-- <div
              :class="tabStatus == 1 ? 'selected-tab-btn-area' : 'tab-btn-area'"
              @click="tabStatusChange(1)"
            >
              전체보기
            </div>
            <div
              :class="tabStatus == 2 ? 'selected-tab-btn-area' : 'tab-btn-area'"
              @click="tabStatusChange(2)"
            >
              헬스케어
            </div>
            <div
              :class="tabStatus == 3 ? 'selected-tab-btn-area' : 'tab-btn-area'"
              @click="tabStatusChange(3)"
            >
              퍼스널케어
            </div>
            <div
              :class="tabStatus == 4 ? 'selected-tab-btn-area' : 'tab-btn-area'"
              @click="tabStatusChange(4)"
            >
              의료기기
            </div> -->
            <div class="select-area">
              <select v-model="selectedCategory" @change="onSelectCategory()" >
                <option 
                v-for="(item, index) in categoryList"
                :key="index" 
                >{{item.text}}</option>
              </select>
              <img class="right-arrow" src="@/assets/image/ic_down_arrow.png" />
            </div>
            <input v-model="searchText" class="input-search" placeholder="검색" @keypress.enter="search()" />
          </div>
          <div class="category-group" id="category-group">
            <div
              v-for="(item, index) in categories"
              :key="index"
              class="category-area"
              @click="categoryChange(item,index)"
            >
              <img class="category-img" :src="item.url" draggable="false" />
              <div class="category-text">{{ item.title }}</div>
            </div>
            <div class="more-wrap">
                <div class="more" @click="toggleShowCategory()">
                    <div id="arrow" class="arrow down"></div>

                </div>
            </div>
          </div>
        </div>

        <div class="item-group">
          <div
            v-for="(item, index) in productList"
            :key="index"
            class="item-body"
            @click="productDetailClick(item)"
          >
            <div class="item-img-group">
              <img v-if="item.i_r!=null"
                class="item-img"
                :src="`${hostUrl+JSON.parse(item.i_r)[0]}`"
                draggable="false"
              />
            </div>

            <div class="item-title">{{ item.name }}</div>
            <div v-if="item.p_discount!= 0" class="item-basic-group">
              <div class="item-basic-price">
                <s>{{ item.p_discount }}</s>
              </div>
              <div class="item-basic-price-won">원</div>
            </div>

            <div class="item-total-group">
              <div v-if="item.p_discount_per!= 0" class="item-sale-group">
                <div class="item-sale">
                  {{ item.p_discount_per }}
                </div>
                <div class="item-sale-percent">%</div>
              </div>

              <div v-if="item.p_sell!= 0" class="item-total-price-group">
                <div class="item-total-price">{{ item.p_sell }}</div>
                <div class="item-total-price-won">원</div>
              </div>
            </div>
            <div v-if="item.rating!= 0" class="item-rating-review-group">
              <img
                class="item-rating-img"
                src="@/assets/image/ic_star.png"
                draggable="false"
              />
              <div class="item-rating-review">
                {{ item.rating + ' 후기 ' + item.review_cnt }}
              </div>
            </div>

            <div class="item-tag-group">
              <div
                v-for="(h, index1) in JSON.parse(item.hashtag)"
                :key="index1"
                class="item-tag"
              >
                <div class="item-tag-text">{{ h }}</div>
              </div>
            </div>

            <div v-if="item.rating == 0" class="item-new-product">
              새로운 상품
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header.vue'
import _ from 'lodash'
export default {
  layout: 'default',
  name: 'IndexPage',
  components: {
    Header,
  },
  data() {
    return {
      tabStatus: 1, //1 전체보기, 2 라이프, 3 영양성분, 4 후기
      selectedCategory:'전체',
      hostUrl: process.env.BASE_URL,
      navigationStatus: false,
      categories: [
        {
          title: '여성건강',
          url: require('@/assets/image/ic_store_category01.png'),
        },
        {
          title: '관절,뼈',
          url: require('@/assets/image/ic_store_category02.png'),
        },
        {
          title: '피로,활력',
          url: require('@/assets/image/ic_store_category03.png'),
        },
        {
          title: '간건강',
          url: require('@/assets/image/ic_store_category04.png'),
        },
        {
          title: '변비,장건강',
          url: require('@/assets/image/ic_store_category05.png'),
        },
        {
          title: '위,소화',
          url: require('@/assets/image/ic_store_category06.png'),
        },
        {
          title: '남성건강',
          url: require('@/assets/image/ic_store_category07.png'),
        },
        {
          title: '눈건강',
          url: require('@/assets/image/ic_store_category08.png'),
        },
        {
          title: '면역력',
          url: require('@/assets/image/ic_store_category09.png'),
        },
        {
          title: '유,소아건강',
          url: require('@/assets/image/ic_store_category10.png'),
        },
        {
          title: '다이어트',
          url: require('@/assets/image/ic_store_category11.png'),
        },
        {
          title: '노화,황산화',
          url: require('@/assets/image/ic_store_category12.png'),
        },
        {
          title: '모발,두피',
          url: require('@/assets/image/ic_store_category13.png'),
        },
      ],
        fullCategories: [
        {
          title: '여성건강',
          url: require('@/assets/image/ic_store_category01.png'),
        },
        {
          title: '관절,뼈',
          url: require('@/assets/image/ic_store_category02.png'),
        },
        {
          title: '피로,활력',
          url: require('@/assets/image/ic_store_category03.png'),
        },
        {
          title: '간건강',
          url: require('@/assets/image/ic_store_category04.png'),
        },
        {
          title: '변비,장건강',
          url: require('@/assets/image/ic_store_category05.png'),
        },
        {
          title: '위,소화',
          url: require('@/assets/image/ic_store_category06.png'),
        },
        {
          title: '남성건강',
          url: require('@/assets/image/ic_store_category07.png'),
        },
        {
          title: '눈건강',
          url: require('@/assets/image/ic_store_category08.png'),
        },
        {
          title: '면역력',
          url: require('@/assets/image/ic_store_category09.png'),
        },
        {
          title: '유,소아건강',
          url: require('@/assets/image/ic_store_category10.png'),
        },
        {
          title: '다이어트',
          url: require('@/assets/image/ic_store_category11.png'),
        },
        {
          title: '노화,황산화',
          url: require('@/assets/image/ic_store_category12.png'),
        },
        {
          title: '모발,두피',
          url: require('@/assets/image/ic_store_category13.png'),
        },
      ],
      categoryList:[
        {text:'전체'},
        {text:'타겟영양'},
        {text:'헬스케어'},
        {text:'퍼스널케어'},
        {text:'의료기기'},
        {text:'여성건강'},
        {text:'관절,뼈'},
        {text:'피로,활력'},
        {text:'간건강'},
        {text:'변비,장건강'},
        {text:'위,소화'},
        {text:'남성건강'},
        {text:'눈건강'},
        {text:'면역력'},
        {text:'유,소아건강'},
        {text:'다이어트'},
        {text:'노화,황산화'},
        {text:'모발,두피'},
      ],
      productList: [
      ],
      searchText:'',
      selectedItem:"전체"
    }
  },
  mounted() {
    this.selectItem()
    this.selectedCategory ='전체'
    if(this.isMobile()){
        this.categories = this.categories.slice(0,4)
    }
  },
  methods: {
    onSelectCategory(){
        this.selectItem()
    },
    search(){
        this.selectItem()
    },
    isMobile(){
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
                navigator.userAgent,
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                navigator.userAgent.substr(0, 4),
            )
        ) {
            return true;
        }

        return false;
    },
    toggleShowCategory(){
        var categoryGroup = document.getElementById("arrow")
        categoryGroup.classList.toggle('up')
        categoryGroup.classList.toggle('down')
        if(this.categories.length<5){
            this.categories = this.fullCategories
        }else{
            this.categories = this.categories.slice(0,4)
        }
    },
    productDetailClick(item) {
        this.$router.push({name: 'productDetail', query: {no: item.no}})
    },
    onChildUpdate(newValue) {
      console.log('index', newValue)
      this.navigationStatus = newValue
    },
    tabStatusChange(index){
        this.tabStatus = index
        if(index == 1) this.selectedCategory = ''
        if(index == 2) this.selectedCategory = '헬스케어'
        if(index == 3) this.selectedCategory = '퍼스널케어'
        if(index == 4) this.selectedCategory = '의료기기'
        
        this.selectItem()
    },
    categoryChange(item, index){
        //this.toggleShowCategory()
        this.categories = _.cloneDeep(this.fullCategories)
        console.log(this.fullCategories)
        this.selectedCategory = item.title
        let indexStr = ''
        if(index+1<10){
            indexStr = '0'+(index+1)
        }else{
            indexStr = ''+(index+1)
        }
        this.categories[index].url = require(`@/assets/image/ic_store_category_active${indexStr}.png`)
        this.selectItem()
    },
    async selectItem(){
        this.productList = []
        let conditions = [{ q: '=', f: 'part', v: 1 }]
        if(this.searchText!=''){
            conditions.push({ op:"AND", q: 'like', f: 'name', str: this.searchText })
        }
        if(this.selectedCategory!='전체'){
            conditions.push({ op:"AND", q: 'JSON_CONTAINS', f: 'category', v: this.selectedCategory })
        }
        let formBody = {
        table: 'product',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            console.log('조회된 데이터:: ', (res.data))
            if (res.data.length > 0) {
                this.productList = res.data
                
            } 
          })
          .catch(function (error) {
            console.log('에러!!', error)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.input-search {
    border: 1px solid #ddd;
    background-color: #fff;
    flex: 1;
    height: 60px;
    padding: 20px;
    color: #000;
    font-size: 16px;
    font-family: 'score2';
    outline: none;
}
.select-area {
    width: 200px;
    height: 40px;
    border: 1px solid #ddd;
    background-color: #fff;
    font-weight: bold;
    display: flex;
    align-items: center;
    position: relative;
    select {
        width: 100%;
        height: 100%;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        font-family: 'score2';
        font-size: 12px;
        color: #000;
        background-color: #fff;
        outline: none;
        padding-left: 10px;
    }
}
.arrow {
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
}
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.more-wrap{
    display: none;
    padding: 8px;
    width: calc((100vw - 80px) / 5);
    height: calc((100vw - 80px) / 5);
}
.more{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #F2F2F2;
    border-radius: 10px;
    font-family: 'score2';
    cursor: pointer;
}
.main {
  width: 100%;
  margin-top: 197px;

  .banner-group {
    width: 100%;
    height: 400px;
    top: 197px;
    position: fixed;
    background-image: url('@/assets/image/img_store_rep.png');
    background-size: 100% 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title {
      color: #fff;
      font-size: 36px;
      font-family: 'score7';
    }
    .title-sub {
      margin-top: 20px;
      color: #fff;
      font-size: 16px;
      font-family: 'score2';
    }
  }

  .scroll-group {
    position: relative;
    width: 100%;
    background-color: #fff;
    margin-top: 400px;
    padding: 0px 20px;
    .scroll-header-group {
      max-width: 1200px;
      margin: auto;
      width: 100%;
      position: sticky;
      top: 197px;
      z-index: 10;
      .tab-group {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 50px 0px;
        background-color: #fff;
        .select-area {
          width: 200px;
          height: 60px;
          font-weight: bold;
          border: 1px solid #ddd;
          background-color: #fff;
          display: flex;
          align-items: center;
          position: relative;
          select {
            width: 100%;
            height: 100%;
            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: none;
            font-family: 'score2';
            font-size: 16px;
            color: #000;
            background-color: #fff;
            outline: none;
            padding-left: 20px;
          }
          .right-arrow {
            position: absolute;
            width: 16.75px;
            height: 9.76px;
            right: 20px;
          }
        }
        .input-search {
          border: 1px solid #ddd;
          background-color: #fff;
          flex: 1;
          height: 60px;
          padding: 20px;
          color: #000;
          font-size: 16px;
          font-family: 'score2';
          outline: none;
        }
      }
      .category-group {
        display: flex;
        gap: 13px;
        background-color: #fff;
        padding-bottom: 10px;
        .category-area {
          display: flex;
          flex-direction: column;
          width: 80px;
          align-items: center;
          cursor: pointer;
          .category-img {
            width: 80px;
            height: 80px;
          }
          .category-text {
            font-weight: bold;
            margin-top: 15px;
            font-size: 14px;
            font-family: 'score2';
            color: #333;
          }
        }
      }
    }
    .item-group {
      max-width: 1200px;
      margin: auto;
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
      .item-body {
        width: 270px;
        height: 446px;
        cursor: pointer;
      }

      .item-img-group {
        background-color: #f6f6f6;
        width: 100%;
        height: 270px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
      }
      .item-img {
        height: 166px;
      }
      .item-tag-group {
        display: flex;
        flex-direction: row;
        width: 100%;
        .item-tag {
          padding: 9px 12px 7px 12px;
          border-width: 1px;
          border-style: solid;
          border-color: #e5e5e5;
          border-radius: 20px;
          text-align: center;
          margin-right: 12px;
          margin-top: 10px;
        }
        .item-tag-text {
          font-size: 12px;
          font-family: 'score2';
          color: #666666;
        }
      }

      .item-new-product {
        width: 90px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-width: 1px;
        border-style: solid;
        border-radius: 20px;
        padding: 9px 12px 7px 12px;
        text-align: center;
        font-size: 12px;
        font-family: 'score5';
        color: #ff6600;
        border-color: #ff6600;
      }

      .item-title {
        margin-top: 30px;
        font-size: 16px;
        font-family: 'score5';
        color: #333333;
      }
      .item-basic-group {
        margin-top: 10px;
        display: flex;
        align-items: flex-end;
        .item-basic-price {
          font-size: 16px;
          font-family: 'score6';
          color: #999999;
        }
        .item-basic-price-won {
          font-size: 12px;
          font-family: 'score2';
          color: #999999;
        }
      }
      .item-total-group {
        margin-top: 10px;
        display: flex;
        align-items: center;
        .item-sale-group {
          display: flex;
          align-items: flex-end;
          margin-right: 7px;
          .item-sale {
            font-size: 16px;
            font-family: 'score6';
            color: #ef2a23;
          }
          .item-sale-percent {
            font-size: 14px;
            font-family: 'score2';
            color: #ef2a23;
          }
        }

        .item-total-price-group {
          display: flex;
          align-items: flex-end;
          .item-total-price {
            font-size: 18px;
            font-family: 'score6';
            color: #333333;
          }
          .item-total-price-won {
            font-size: 14px;
            font-family: 'score2';
            color: #333333;
          }
        }
      }
      .item-rating-review-group {
        margin-top: 10px;
        display: flex;
        .item-rating-img {
          width: 16px;
          height: 16px;
          margin-right: 3px;
        }
        .item-rating-review {
          font-size: 14px;
          font-family: 'score2';
          color: #333333;
        }
      }
    }
  }
}
@media (max-width: 720px) {
    .more-wrap{
        display: flex;
    }
    .more{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
        cursor: pointer;
        margin-bottom: 10px;
        font-family: 'score2';
        font-size: 10px;
    }
  .main {
    width: 100%;
    margin-top: 0px;

    .banner-group {
      width: 100%;
      height: 250px;
      top: 76px;
      left: 0px;
      position: fixed;
      background-image: url('@/assets/image/img_store_rep.png');
      background-size: 100% 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .title {
        color: #fff;
        font-size: 30px;
        font-family: 'score7';
      }
      .title-sub {
        margin-top: 20px;
        color: #fff;
        font-size: 12px;
        font-family: 'score2';
      }
    }

    .scroll-group {
      position: relative;
      width: 100%;
      background-color: #fff;
      margin-top: 250px;
      padding-bottom: 0px;
      .scroll-header-group {
        margin: auto;
        width: 100%;
        position: sticky;
        top: 76px;
        z-index: 10;
        padding: 10px 0px;
        background-color: #fff;
        margin-top: 0px;

        .tab-group::-webkit-scrollbar {
          display: none;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none;
        }
        .tab-group {
          width: 100%;
          display: flex;
          flex-direction: row;
          padding: 20px 20px;
          background-color: #fff;
          * + * {
            margin-left: 10px;
          }
          .select-area {
            width: 200px;
            height: 40px;
            border: 1px solid #ddd;
            background-color: #fff;
            display: flex;
            align-items: center;
            position: relative;
            select {
              width: 100%;
              height: 100%;
              -moz-appearance: none;
              -webkit-appearance: none;
              appearance: none;
              font-family: 'score2';
              font-size: 12px;
              color: #000;
              background-color: #fff;
              outline: none;
              padding-left: 10px;
            }
            .right-arrow {
              position: absolute;
              width: 13.75px;
              height: 6.76px;
              right: 10px;
            }
          }
          .input-search {
            border: 1px solid #ddd;
            background-color: #fff;
            max-width: 150px;
            flex: 0;
            height: 40px;
            padding: 10px;
            color: #000;
            font-size: 12px;
            font-family: 'score2';
            outline: none;
          }
        }
        .category-group::-webkit-scrollbar {
          display: none;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none;
        }
        .category-group {
          flex-wrap: wrap;
          display: flex;
          gap: 0px;
          background-color: #fff;
          padding-bottom: 0px;
          overflow: auto;
          white-space: nowrap;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none;
          padding: 0px 20px;
          margin-top: 10px;

          .category-area {
            display: flex;
            flex-direction: column;
            width: 20%;
            align-items: center;
            cursor: pointer;
            margin-bottom: 10px;
            padding:8px;
            .category-img {
              width: 100%;
              height: 100%;
            }
            .category-text {
              margin-top: 15px;
              font-size: 11px;
              font-weight: bold;
              font-family: 'score2';
              color: #333;
            }
          }
        }
      }
      .item-group {
        margin: auto;
        margin-top: 0px;
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        gap: 10px;
        padding: 0px 20px 20px 20px;
        .item-body {
          width: 48%;
          height: auto;
          cursor: pointer;
        }

        .item-img-group {
          background-color: #f6f6f6;
          width: 100%;
          height: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          padding: 20px;
        }
        .item-img {
          width: 60%;
          height: auto;
        }
        .item-tag-group {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          width: 100%;
          .item-tag {
            padding: 9px 12px 7px 12px;
            border-width: 1px;
            border-style: solid;
            border-color: #e5e5e5;
            border-radius: 20px;
            text-align: center;
            margin-right: 6px;
            margin-top: 10px;
          }
          .item-tag-text {
            font-size: 10px;
            font-family: 'score2';
            color: #666666;
          }
        }

        .item-new-product {
          width: 90px;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-width: 1px;
          border-style: solid;
          border-radius: 20px;
          padding: 9px 12px 7px 12px;
          text-align: center;
          font-size: 10px;
          font-family: 'score5';
          color: #ff6600;
          border-color: #ff6600;
        }

        .item-title {
          margin-top: 20px;
          font-size: 14px;
          font-family: 'score5';
          color: #333333;
        }
        .item-basic-group {
          margin-top: 8px;
          display: flex;
          align-items: flex-end;
          .item-basic-price {
            font-size: 14px;
            font-family: 'score6';
            color: #999999;
          }
          .item-basic-price-won {
            font-size: 10px;
            font-family: 'score2';
            color: #999999;
          }
        }
        .item-total-group {
          margin-top: 8px;
          display: flex;
          align-items: center;
          .item-sale-group {
            display: flex;
            align-items: flex-end;
            margin-right: 5px;
            .item-sale {
              font-size: 14px;
              font-family: 'score6';
              color: #ef2a23;
            }
            .item-sale-percent {
              font-size: 12px;
              font-family: 'score2';
              color: #ef2a23;
            }
          }

          .item-total-price-group {
            display: flex;
            align-items: flex-end;
            .item-total-price {
              font-size: 16px;
              font-family: 'score6';
              color: #333333;
            }
            .item-total-price-won {
              font-size: 12px;
              font-family: 'score2';
              color: #333333;
            }
          }
        }
        .item-rating-review-group {
          margin-top: 8px;
          display: flex;
          .item-rating-img {
            width: 14px;
            height: 14px;
            margin-right: 3px;
          }
          .item-rating-review {
            font-size: 12px;
            font-family: 'score2';
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
