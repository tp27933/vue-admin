<template>
  <div class="employee_wrap">
    <div class="employee_main">
      <div class="ab">
      <el-carousel
        :autoplay="false"
        arrow="always"
        indicator-position="none"
        ref="carousel"
        @change="chooseCard"
      >
        <el-carousel-item v-for="(item, index) in employee" :key="index" :label="item.name">
          <img :src="item.image" alt="" class="pr"/>
        </el-carousel-item>
        
      </el-carousel>
      <div class="intr">
          <img src="../../assets/circle.png" class="profile">
        <transition name="fade" v-for="(item, index) in employee" :key="index">
          <div class="text" v-if="item.name === introName" >
            <h3>{{ introName}}</h3>
            <p>{{ item.position }}</p>
          </div>
        </transition>
      
      </div>
    </div>

    <div class="members">
      <ul>
        <li v-for="(item, index) in member" :key="index">
          <!-- 底部圖片 -->
          <div
            class="item"
            :style="
              'background:url(' +
                item.image +
                ');background-repeat: no-repeat; background-size: cover;'
            "
          >
            <img src="" alt="" />
            <!-- 翻面時的底色+外圍透明圈  -->

            <div class="info-wrap">
              <!-- 正反兩面容器 -->
              <div class="info">
                <!-- 正面 -->
                <div
                  class="font-image item-image"
                  :style="
                    'background:url(' +
                      item.image +
                      ');background-repeat: no-repeat; background-size: cover;'
                  "
                ></div>
                <div class="info-back">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.position }}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed, reactive, onMounted } from '@vue/composition-api';
export default {
  name: 'employee',
  setup(props, { refs }) {
    const show = ref(true);
    const member = reactive([
      {
        name: '陳佳惠',
        position: '櫃台',
        image: require('../../assets/1.jpg')
      },
      {
        name: '陳佳惠',
        position: '櫃台',
        image: require('../../assets/2.jpg')
      },
      {
        name: '陳佳惠',
        position: '櫃台',
        image: require('../../assets/3.jpg')
      },
      {
        name: 'Amy',
        position: '執行長',
        image: require('../../assets/4.jpg')
      },
      {
        name: '陳佳惠',
        position: '櫃台',
        image: require('../../assets/5.jpg')
      },
      {
        name: '陳佳惠',
        position: '櫃台',
        image: require('../../assets/6.jpg')
      }
    ]);

    const employee = reactive([
      {
        name: 'JACK',
        position: '髮型師',
        image: require('../../assets/employee_1.png')
      },
      {
        name: 'ALLEN',
        position: '髮型師',
        image: require('../../assets/employee_2.png')
      },
      {
        name: 'AMY',
        position: '櫃台',
        image: require('../../assets/employee_4.png')
      },
      {
        name: 'ANDRE',
        position: '經理',
        image: require('../../assets/employee_5.png')
      }
    ]);
    const introName = ref('JACK');
    const chooseCard = index => {
      introName.value = refs.carousel.items[index].label;
    };
    return {
      show,
      introName,
      chooseCard,
      employee,
      member
    };
  }
};
</script>
<style lang="scss" scoped>
$picWidth_Height: 110px;

.item-image {
  background-position: center center;
  background-size: cover;
}
ul {
  display: flex;
  flex-wrap: wrap;
    justify-content: space-evenly;
}
li {
  width: $picWidth_Height;
  height: $picWidth_Height;
  display: inline-block;
  margin-bottom: 10px;
  margin-left: 5px;
}
li:first-child {
  margin-left: 0;
}
.item {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.info-wrap {
  position: absolute;
  width: 70px;
  height: 70px;
  top: 20px;
  left: 20px;
  background: #fff;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 3px rgba(115, 114, 23, 0.8);
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.info > div {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 50%;
}
.info {
  position: absolute;
  top: -20px;
  left: -20px;
  width: $picWidth_Height;
  height: $picWidth_Height;
  border-radius: 50%;

  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;

  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.info-back {
  -webkit-transform: rotate3d(0, 1, 0, 180deg);
  -moz-transform: rotate3d(0, 1, 0, 180deg);
  -o-transform: rotate3d(0, 1, 0, 180deg);
  -ms-transform: rotate3d(0, 1, 0, 180deg);
  transform: rotate3d(0, 1, 0, 180deg);

  background: #000;
  h3,
  p {
    text-align: center;
    color: #fff;
    font-family: 'Open Sans', Arial, sans-serif;
  }
  h3 {
    margin: 0 40px;
    padding: 75px 0 20px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
  p {
    padding: 20px 0;
    text-align: center;
    color: #fff;
  }
}
.item:hover .info-wrap {
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.8), inset 0 0 3px rgba(115, 114, 23, 0.8);
}

.item:hover .info {
  -webkit-transform: rotate3d(0, 1, 0, -180deg);
  -moz-transform: rotate3d(0, 1, 0, -180deg);
  -o-transform: rotate3d(0, 1, 0, -180deg);
  -ms-transform: rotate3d(0, 1, 0, -180deg);
  transform: rotate3d(0, 1, 0, -180deg);
}

.employee_wrap {
  position: relative;
}

img {
  clip-path: circle(70% at 50% 33%);
}
.employee_main img.pic {
    position: absolute;
    border-style: none;
    width: 50%;
    right: 0;
    left: 0;
    margin: auto;
    height: 275px;
    object-fit: contain;
}
.pr{
      width: 50%;
    height: 375px;
    position: absolute;
    border-style: none;
    width: 50%;
    right: 0;
    left: 0;
    margin: auto;
    height: 275px;
    object-fit: contain;
}
.el-carousel {
  z-index: 100;
}
.ab{
      height: 60vh;
}
.intr {
top: -25%;
    text-align: center;
    position: relative;
    width: 80%;
    left: 0;
    background: purple;
    height: 40%;
    right: 0;
    margin: auto;
    img{
         width: 100%;
    height: 100;
    position: absolute;
    top: -70%;
    min-width: 260px;
    max-width: 370px;
    left: 50%;
    -o-object-fit: contain;
    object-fit: contain;
    transform: translateX(-50%);
    }
  .text {
    
    position: absolute;
    margin: auto;
         top: 47%;
    left: 0;
    right: 0;
    
    h3{
      font-size: 32px;
    }
    p{
      margin-top: 15px;
    padding: 10px 0px;
    background: #DCCDF4;
    color: #7C59B8;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
.fade-enter-active {
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter,
.fade-enter-to {
  animation-name: bounceInRight;
  animation-duration: 1.5s;
}

.fade-leave {
  opacity: 1;
}
@keyframes bounceInRight {
  0% {
    opacity: 0;
    transform: translateX(80%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
