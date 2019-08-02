<template>
    <div class="course">
        <div class="main" v-title data-title="课程详情"></div>
        <div class="contentBox">
            <div class="photos">
                <swiper :options="swiperOption">
                    <swiperSlide v-for="(item,index) in msg.photos" :key="index">
                        <img :src="item.path">
                    </swiperSlide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="baseData">
                <div class="one">
                    <div class="priceBox">
                        <div class="price">
                            <span class="priceOne">￥</span>
                            <span class="priceTwo">{{msg.price}}</span>
                        </div>
                        <span class="originalPrice">
                            <span class="priceOne">￥</span>
                            <span class="priceTwo">{{msg.originalPrice}}</span>
                            <div class="line"></div>
                        </span>
                    </div>
                    <p class="name">{{msg.name || '英语体验课'}}</p>
                    <ul class="others">
                        <li>
                            <!-- <div class=""></div> -->
                            <img src="../assets/images/coures_top_1.png" alt="">
                            <p class="key">适合年龄</p>
                            <p class="value">{{msg.schoolAge}}</p>
                            <!-- <p class="value">{{msg.studentTypeList ? msg.studentTypeList[0].name : "3-12"}}周岁</p> -->
                        </li>
                        <li>
                            <img src="../assets/images/coures_base.png" alt="">
                            <!-- <div class=""></div> -->
                            <p class="key">适合基础</p>
                            <p class="value">{{msg.studentLevelName}}</p>
                        </li>
                        <li>
                            <img src="../assets/images/coures_top_2.png" alt="">
                            <!-- <div class=""></div> -->
                            <p class="key">开班人数</p>
                            <p class="value">{{msg.number ? "满" + msg.number + "人开班" : ""}}</p>
                        </li>
                        <li>
                            <!-- <div class=""></div> -->
                            <img src="../assets/images/coures_top_3.png" alt="">
                            <p class="key">课程课时</p>
                            <p class="value">{{msg.count || ""}}课时</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="characteristic">               
                <p class="title">课程特色</p>
                <ul class="items">
                    <!-- <li v-for="item in msg.characteristicList" class="item"> -->
                    <li class="item">
                        <div class="point"></div>
                        <span class="value">{{msg.characteristic}}</span>
                    </li>
                </ul>
            </div>
            <div class="org">
                <div class="top">
                    <div class="left">
                        <div>{{msg.orgName}}</div>
                        <div class="stars clearfix">
                            <div v-for="item in msg.starObj" class="star" :class="`star_`+item"></div>
                            <span class="score">{{msg.star ? msg.star : "暂无评分"}}</span>
                        </div>
                    </div>
                    <div class="right">
                        <img src="../assets/images/telephone.png" alt="">
                    </div>
                </div>
                <div class="bottom">
                    <img src="../assets/images/location.png" alt="">
                    <span>{{msg.detailedAddress}}</span>
                </div>
            </div>
            <div class="characteristic">
                <h3 class="title">课程详情</h3>
                <div class="title">课程介绍</div>
                <ul class="items">
                    <li class="item">
                        <div class="point"></div>
                        <span class="value">{{msg.sketch}}</span>
                    </li>
                </ul>
                <div class="title">学习目标</div>
                <ul class="items">
                    <li class="item">
                        <div class="point"></div>
                        <span class="value">{{msg.target}}</span>
                    </li>
                </ul>
            </div>
            <div class="target">
                <p class="title">购买须知</p>                
                <ul class="content">
                    <li>
                        <div>购买说明</div>
                        <div>{{msg.tips}}</div>
                    </li>
                    <li>
                        <div>温馨提示</div>
                        <div>{{msg.warmPrompt}}</div>
                    </li>
                    <li>
                        <div>官方说明</div>
                        <div>{{msg.official}}</div>
                    </li>
                </ul>
            </div>
            <div class="remarks">
                <p class="title">用户评价</p>
                <ul v-if="remarks.length" class="items">
                    <li v-for="item in remarks" class="item_1">
                        <div class="top">
                            <img :src="item.userPhoto" alt="" class="photo">
                            <span>{{item.userNickName}}</span>
                        </div>
                        <p class="name">{{item.createTime}}</p>
                        <p class="value">{{item.content}}</p>
                    </li>
                </ul>
                <div v-if="remarks.length===0" class="empty">
                    <div class="icon"></div>
                    <p>暂无评价~~</p>
                </div>
            </div>
        </div>
        <!-- <div @click="toApp"
             class="courseBottom">
            <div class="one">
                <div class="icon"></div>
                <p>电话</p>
            </div>
            <div class="two">
                <div class="icon"></div>
                <p>咨询</p>
            </div>
            <div class="three">立即购买</div>
        </div> -->
        <div class="fixed " :class="appStatus ? 'top-fixed' : 'bottom-fixed'" @click='toApp'>点击这里打开淘儿学APP，收获更多精彩</div>
    </div>
</template>

<script>
    import { getCourseDetailInfo } from '../config';
    import "swiper/dist/css/swiper.css";
    import {swiper, swiperSlide} from "vue-awesome-swiper";

    export default {
        // name: 'Institution',
        components: {
            swiper,
            swiperSlide,
        },
        data() {
            return {
                swiperOption: {
                    //自动轮播
                    autoplay: {
                      delay: 2500
                    },
                    //开启循环模式
                    loop: true,
                    //显示分页
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction'
                    },
                },
                id: null,
                type: null,
                msg: {},
                remarks: [],
                appStatus: true,
            }
        },
        created: function () {
            this.id = this.getUrlParams("id");
            this.getData();
        },
        mounted() {
            window.addEventListener('scroll', this.setScrollTop);
        },
        methods: {
            // 监听设置页面滚动高度
            setScrollTop() {
                let scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
                if (scrollTop > 50) {
                    this.appStatus = false;
                } else {
                    this.appStatus = true;
                }
            },
            // 获取课程id
            getUrlParams(name) {
                const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                const r = window.location.search.substr(1).match(reg); //匹配目标参数
                if (r != null) return unescape(r[2]);
                return null; //返回参数值
            },
            // 获取课程基本信息
            getData() {
                const params = {
                    courseId: this.id
                };
                getCourseDetailInfo(params)
                .then((res) => {
                    if (res.data.result === "0") {
                        // 所有課程数据
                        this.msg = res.data.data.courseInfoDTO;
                        console.log(res.data.data.courseInfoDTO);
                        // 图片处理
                        if (!this.msg.photoList) {
                            this.msg.photoList = [];
                        }
                        // 轮播图片
                        const fnFilter01 = (param) => {
                            return param.type === 1;
                        }
                        // 机构信息的图片
                        this.msg.photoList = res.data.data.courseInfoDTO.photos.filter(fnFilter01);
                        // 详细地址
                        this.msg.detailedAddress = res.data.data.org.detailedAddress;
                        // 评分处理
                        const star = res.data.data.org.totalScore ? Math.round(res.data.data.org.scoreNumber / res.data.data.org.totalScore) : 0;             
                        this.msg.star = star;
                        this.msg.starObj = this.getStarObj(star);

                        // 用户评价
                        this.remarks = res.data.data.commentDTOPageInfoVO.list;
                    } else {
                        console.log(res.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
            },
            // 评分处理
            getStarObj(value) {
                value = value * 10;
                let starObj = [];
                const a = Math.floor(value / 10);
                const b = value % 10;
                for (let i = 1; i < 6; i++) {
                    if (i <= a) {
                        starObj.push("true");
                    }
                    if (i === a + 1) {
                        if (b <= 2) {
                            starObj.push("false")
                        }
                        if (b > 2 && b < 8) {
                            starObj.push("half")
                        }
                        if (b >= 8) {
                            starObj.push("true")
                        }
                    }
                    if (i > a + 1) {
                        starObj.push("false")
                    }
                }
                return starObj;
            },
            // 跳转到应用市场
            toApp() {
                window.open("https://a.app.qq.com/o/simple.jsp?pkgname=com.taoerxue.children")
            }
        },
        destoryed() {
            window.removeEventListener('scroll', this.setScrollTop)
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "../assets/css/course.scss";
</style>