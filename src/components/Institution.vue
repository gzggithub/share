<template>
    <div class="institution" ref="org">
        <div class="main" v-title data-title="机构详情"></div>
        <div class="contentBox">
            <div class="photos">
                <swiper :options="swiperOption">
                    <swiperSlide v-for="(item,index) in msg.photoList" :key="index">
                        <img style="width: 100%" :src="item.path">
                    </swiperSlide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="baseData">
                <div class="one clearfix">
                    <div class="logoRight">
                        <div class="top clearfix">
                            <span class="name">{{msg.name}}</span>                            
                            <span class="auth">认证</span>
                            <img class="icon" src="../assets/images/auth_icon.png" alt="">                     
                        </div>
                        <div class="bottom stars clearfix">
                            <div v-for="item in msg.starObj" class="star" :class="`star_` + item"></div>
                            <span class="score">{{msg.star ? msg.star : "暂无评分"}}</span>
                            <span class="area">{{msg.areaName}}</span>
                        </div>
                        
                    </div>

                </div>
                <div class="two clearfix">
                    <div class="address">
                        <img src="../assets/images/location.png" alt="">
                        <span class="value">{{msg.detailedAddress}}</span>
                    </div>
                    <div class="telephone" @click="toApp">
                        <img class="icon" src="../assets/images/telephone.png" alt="">
                    </div>                   
                </div>
                <div class="three">
                    <div class="descriptionTitle">
                        机构信息
                    </div>
                    <div class="descriptionContent">
                        <div>
                            <img :src="msg.icon" alt="">
                        </div>
                        <div>
                            <pre>{{msg.description}}</pre>
                        </div>                        
                    </div>
                    <h4>商家信息</h4>
                    <p class="title">营业时间： {{msg.businessHours}}</p>
                    <p class="title">商家面积： {{msg.scope}} 平方米</p>
                    <p class="title">教室数目： {{msg.classNumber}} 间</p>
                    <p class="title">师资力量： {{msg.teacherNumber}} 名</p>
                    <ul class="tag">
                        <li class="tag-item" v-for="(item, index) in msg.label" :key="index">
                            <img src="../assets/images/tag.png" alt="">
                            <span>{{item}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="teachers">
                <h4 class="title">教师展示</h4>
                <div class="content">
                    <swiper :options="swiperOptionTeachers" class='items'>
                        <swiperSlide v-for="(item,index) in teachers" :key="index" class='item'>
                            <div @click="toApp">
                                <img v-show="item.photo" :src="item.photo" alt="" class="photo">
                                <div class="name">{{item.nickName}}</div>
                                <div v-show="item.experienceAge" class="experienceAge">{{item.experienceAge}}年教龄</div>
                            </div>                                                      
                        </swiperSlide>
                        <!-- <swiperSlide class='item'>
                            <div v-show="teachers.length > 3" @click="setTeachersFlag(true)">
                                <div  class="ellipsis">...</div>
                                <div class="name">查看更多</div>                                
                            </div>                                                      
                        </swiperSlide> -->                        
                    </swiper>
                </div>               
            </div>
            
            <div class="courses">
                <div class="coursesHeader">
                    <div class="title">机构课程</div>
                    <!-- <div @click="setCoursesFlag(true)"> -->
                    <div @click="toApp">
                        <span>共{{courses.length}}个课程可选</span>
                        <div class="icon"></div>
                    </div>      
                </div>                
                <ul v-if="courses.length" class="items">
                    <li v-for="item in courses.slice(0,3)" class="item clearfix" @click="toApp">
                        <img :src="item.photos[0].path" alt="" class="photo">
                        <div class="itemRight">
                            <div class="name">
                                <span>{{item.name.length > 8 ? item.name.slice(0, 8) + "..." : item.name}}</span>
                                <span>购买</span>
                            </div>
                            <div class="type_count">
                                <span>{{item.typeName}} | {{item.count}}课时</span>
                                <span>已售{{item.quantity}}份</span>
                            </div>
                            <div class="bottom clearfix">
                                <span class="price">￥{{item.price.toFixed(2)}}</span>
                                <span class="suitAge">适合年龄：{{item.schoolAge}}</span>                       
                            </div>
                        </div>
                    </li>
                </ul>
               <!--  <div v-if="courses.length>3" @click="setCoursesFlag(true)" class="more">
                    <span>查看全部课程</span>
                    <div class="icon"></div>
                </div> -->
                <div v-if="courses.length===0" class="empty"></div>
            </div>            
        </div>
        <!-- <div @click="toApp"
             class="institutionBottom">
            <div class="one">
                <div class="icon"></div>
                <p>咨询</p>
            </div>
            <div class="two">立即沟通</div>
        </div> -->
        
        <div class="fixed" :class="appStatus ? 'top-fixed' : 'bottom-fixed'" @click="toApp">点击这里打开淘儿学APP，收获更多精彩</div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import "swiper/dist/css/swiper.css";
    import { getOrgDetailInfo } from '../config';
    import {
        swiper,
        swiperSlide
    } from "vue-awesome-swiper";

    export default {
        name: 'Institution',
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
                swiperOptionTeachers: {
                   slidesPerView: 3,
                   spaceBetween: 15,
                },
                id: null,
                type: null,
                msg: {},                
                teachers: [],
                courses: [],
                appStatus: true,
            }
        },
        created: function () {
            this.id = this.getUrlParams("id");
            this.type = this.getUrlParams("type");
            this.setPath(this.type);
            if (this.type == 1) {
                this.getData();
            }             
        },
        mounted() {
            window.addEventListener('scroll', this.setScrollTop)
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
            // 获取机构id
            getUrlParams(name) {
                const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                const r = window.location.search.substr(1).match(reg); //匹配目标参数
                if (r != null) return unescape(r[2]);
                return null; //返回参数值
            },
            // 设置跳转路由
            setPath(type) {
                if (type == 1) {
                    this.$router.push({
                        path: '/',
                    });
                } else if (type == 2) {
                    console.log(21212)
                    this.$router.push({
                        path: '/course',
                    });                    
                } else if (type == 3) {
                    this.$router.push({
                        path: '/news',
                    });
                } else {
                    this.$router.push({
                        path: '/',
                    });
                }                       
            },
            // 获取机构基本信息
            getData() {
                const params = {
                    id: this.id
                    // id: 197
                };
                getOrgDetailInfo(params).then((res) => {
                    if (res.data.result === "0") {
                        console.log(res.data.data);
                        // 机构信息
                        const data = res.data.data.orgInfoDTO;
                        console.log(data)
                        // 评分处理
                        const star = data.totalScore ? Math.round((data.scoreNumber / data.totalScore) * 10) / 10 : 0;                    
                        // 数据
                        this.msg = data;
                        // 机构名称处理
                        this.msg.name = data.name.length > 14 ? data.name.slice(0, 14) + "..." : data.name;
                        // 图片处理
                        if (!this.msg.photoList) {
                            this.msg.photoList = [];
                        }
                        // this.msg.photoList.unshift(data.orgResourceList);
                        // 轮播图片
                        const fnFilter01 = (param) => {
                            return param.type === 1;
                        }
                        // 机构信息的图片
                        const fnFilter02 = (param) => {
                            return param.type === 2;
                        }
                        this.msg.photoList = data.orgResourceList.filter(fnFilter01);
                        this.msg.icon = data.orgResourceList.filter(fnFilter02)[0].path;        
                        this.msg.star = star;
                        this.msg.starObj = this.getStarObj(star);
                        // 教师展示信息
                        this.teachers = res.data.data.teacherDTOS.list;
                        // this.teachers.push({
                        //     'photo': '',
                        //     'nickName': '查看更多',
                        //     'experienceAge': ''
                        // });
                        // 机构课程信息
                        this.courses = res.data.data.courseInfoDTOS.list;
                    } else {
                        // alert(res.data.message);
                        console.log(res.data.message);
                    }
                }).catch((error) => {
                    // alert(error);
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
            },
        },
        destoryed() {
            window.removeEventListener('scroll', this.setScrollTop)
        }      
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "../assets/css/institution.scss";
</style>