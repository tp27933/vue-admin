<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in member"
        :key="index"
      >
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
</template>

<script>
import {
  ref,
  watch,
  computed,
  reactive,
  onMounted
} from '@vue/composition-api';
export default {
  name: 'employee',
  setup(props) {
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
      },
      {
        name: '陳佳惠',
        position: '櫃台',
        image: require('../../assets/7.jpg')
      },
      {
        name: '陳佳惠',
        position: '櫃台',
        image: require('../../assets/7.jpg')
      }
    ]);
    return {
      member
    };
  }
};
</script>
<style lang="scss" scoped>
.item-image {
  background-image: url('https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png');
  background-position: center center;
  background-size: cover;
}
ul {
  padding: 0 50px;
}
li {
  width: 220px;
  height: 220px;
  display: inline-block;
  margin-left: 50px;
}
li:nth-child(2n) {
  margin: 10px 10px 0 50px ;
}
.item {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.info-wrap {
  position: absolute;
  width: 180px;
  height: 180px;
  top: 20px;
  left: 20px;
  width: 180px;
  height: 180px;
  background: #fff;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.2),
    inset 0 0 3px rgba(115, 114, 23, 0.8);
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
  width: 220px;
  height: 220px;
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
    border-bottom: 1px solid
      rgba(255, 255, 255, 0.5);
  }
  p {
    padding: 20px 0;
    text-align: center;
    color: #fff;
  }
}
.item:hover .info-wrap {
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.8),
    inset 0 0 3px rgba(115, 114, 23, 0.8);
}

.item:hover .info {
  -webkit-transform: rotate3d(0, 1, 0, -180deg);
  -moz-transform: rotate3d(0, 1, 0, -180deg);
  -o-transform: rotate3d(0, 1, 0, -180deg);
  -ms-transform: rotate3d(0, 1, 0, -180deg);
  transform: rotate3d(0, 1, 0, -180deg);
}
</style>
