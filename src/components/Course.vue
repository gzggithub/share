<template>
    <div class="course">
        <div v-show="!(lessonsFlag||remarksFlag)" class="contentBox">
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
                <!-- <div class="two">
                    <span class="title">上课地点</span>
                    <span class="value">{{msg.address}}</span>
                </div> -->
            </div>
            <!-- <div class="institutionInfo">
                <p class="title">所属机构</p>
                <div class="content clearfix">
                    <img class="logo" :src="`http://image.taoerxue.com/`+msg.mechanismPhoto" alt="">
                    <div class="logoRight">
                        <p class="name">{{msg.mechanismName}}</p>
                        <p class="description">{{msg.mechanismDescription}}</p>
                    </div>
                </div>
                <div @click="toApp" class="details"></div>
            </div> -->
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
            <!-- tab选项卡 -->
           <!--  <ul class="tab">
                <li class="tab-item"v-for="(item,index) in items" v-text="item" @click="getNum(index)" @mouseover="getNum(index)" @mouseout="getNum(0)" :class="{active:index === num}"></li>
            </ul> -->
            <!-- <div class="characteristic" v-show="num === 0">
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
            <div class="target" v-show="num === 1">
                <p class="title">购买须知</p>
                <ul class="content">
                    <li>
                        <div>购买说明</div>
                        <div>此课程为周六或周日上课，具体上课时间家长可以与老师沟通</div>
                    </li>
                    <li>
                        <div>温馨提示</div>
                        <div>如需要发票，请您在上课前向机构咨询</div>
                    </li>
                    <li>
                        <div>官方说明</div>
                        <div>为保障您的权益，建议使用淘儿学线上支付，若使用其他支付方式导致纠纷，淘儿学不承担任何责任，感谢您的理解和支持！</div>
                    </li>
                </ul>
            </div>
            <div class="remarks" v-show="num === 2">
                <p class="title">用户评价</p>
                <ul v-if="remarks.length" class="items">
                    <li v-for="item in remarks.slice(0,3)" class="item clearfix">
                        <img :src="`http://image.taoerxue.com/`+item.photo" alt="" class="photo">
                        <div class="itemRight">
                            <p class="name">{{item.nickName}}</p>
                            <p class="value">{{item.content}}</p>
                        </div>
                        <p class="time">{{item.createTime}}</p>
                    </li>
                </ul>
                <div v-if="remarks.length>3" @click="setRemarksFlag(true)" class="more">
                    <span>查看全部评价</span>
                    <div class="icon"></div>
                </div>
                <div v-if="remarks.length===0" class="empty">
                    <div class="icon"></div>
                    <p>暂无评价~~</p>
                </div>
            </div> -->
            
            <!-- <div class="target">
                <p class="title">学习目标</p>
                <div class="content">
                    <pre>{{msg.target}}</pre>
                </div>
            </div> -->
            <!-- <div v-if="msg.lessonDtoList.length" class="lessons">
                <p class="title">课程计划</p>
                <ul class="items">
                    <li v-for="(item,index) in msg.lessonDtoList.slice(0,3)" class="item">
                        <div class="index">{{index+1}}</div>
                        <div class="itemRight">
                            <p class="name">{{item.lessonName}}</p>
                            <p class="duration">{{msg.duration}}分钟</p>
                        </div>
                    </li>
                </ul>
                <div v-if="msg.lessonDtoList.length>3" @click="setLessonsFlag(true)" class="more">
                    <span>查看全部课时</span>
                    <div class="icon"></div>
                </div>
            </div> -->
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
                <!-- <div class="content"> -->
                    <!-- <pre>{{msg.tips}}</pre> -->
                    <ul class="content">
                        <li>
                            <div>购买说明</div>
                            <div>{{msg.tips}}</div>
                        </li>
                        <li>
                            <div>温馨提示</div>
                            <div>{{msg.warmPrompt}}}</div>
                        </li>
                        <li>
                            <div>官方说明</div>
                            <div>{{msg.official}}</div>
                        </li>
                    </ul>
                <!-- </div> -->
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
                <!-- <div v-if="remarks.length>2" @click="setRemarksFlag(true)" class="more">
                    <span>查看全部评价</span>
                    <div class="icon"></div>
                </div> -->
                <div v-if="remarks.length===0" class="empty">
                    <div class="icon"></div>
                    <p>暂无评价~~</p>
                </div>
            </div>

            <!-- <div class="remarks">
                <p class="title">用户评价</p>
                <ul v-if="remarks.length" class="items">
                    <li v-for="item in remarks.slice(0,3)" class="item clearfix">
                        <img :src="item.photo" alt="" class="photo">
                        <div class="itemRight">
                            <p class="name">{{item.nickName}}</p>
                            <p class="value">{{item.content}}</p>
                        </div>
                        <p class="time">{{item.createTime}}</p>
                    </li>
                </ul>
                <div v-if="remarks.length>3" @click="setRemarksFlag(true)" class="more">
                    <span>查看全部评价</span>
                    <div class="icon"></div>
                </div>
                <div v-if="remarks.length===0" class="empty">
                    <div class="icon"></div>
                    <p>暂无评价~~</p>
                </div>
            </div> -->
        </div>
        <div v-show="lessonsFlag" class="lessonsMore">
            <div class="title">
                课程计划
                <div class="return" @click="setLessonsFlag(false)"></div>
            </div>
            <ul class="items">
                <li v-for="(item,index) in msg.lessonDtoList" class="item clearfix">
                    <div class="index">{{index+1}}</div>
                    <div class="itemRight">
                        <p class="name">{{item.lessonName}}</p>
                        <p class="duration">{{msg.duration}}分钟</p>
                    </div>
                </li>
            </ul>
        </div>
        <div v-show="remarksFlag" class="remarksMore">
            <div class="title">
                用户评价
                <div class="return" @click="setRemarksFlag(false)"></div>
            </div>
            <ul class="items">
                <PullTo :top-load-method="remarksRefresh" :bottom-load-method="remarksMore" :top-config="topConfig"
                        :bottom-config="bottomConfig">
                    <!-- <li v-for="item in remarks" class="item clearfix">
                        <img :src="item.photo" alt="" class="photo">
                        <div class="itemRight">
                            <p class="name">{{item.nickName}}</p>
                            <p class="value">{{item.content}}</p>
                        </div>
                        <p class="time">{{item.createTime}}</p>
                    </li> -->
                    <li v-for="item in remarks" class="item_1">
                        <div class="top">
                            <img :src="item.userPhoto" alt="" class="photo">
                            <span>{{item.userNickName}}</span>
                        </div>
                        <p class="name">{{item.createTime}}</p>
                        <p class="value">{{item.content}}</p>
                    </li>
                </PullTo>
            </ul>
        </div>
        <!-- <div v-show="!(teachersFlag||teacherDetailsIndex||coursesFlag||remarksFlag)" @click="toApp"
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
        <div class="fixed top-fixed" @click='toApp'>打开淘儿学APP，了解更多精彩内容</div>
        <div class="fixed bottom-fixed" @click='toApp'>打开淘儿学APP，了解更多精彩内容</div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { getCourseDetailInfo } from '../config';
    import "swiper/dist/css/swiper.css";
    import {swiper, swiperSlide} from "vue-awesome-swiper";
    import PullTo from 'vue-pull-to';

    export default {
        name: 'Institution',
        components: {
            swiper,
            swiperSlide,
            PullTo
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
                //初始化显示第1个div里面的内容
                num: 0,
                cur:'',
                //items是从后台获取到的li内容
                items:["课程详情","购买须知","用户评价"],
                // arry是从后台获取到的div中要显示的内容
                arry:[],
                topConfig: {
                    pullText: '下拉加载', // 下拉时显示的文字
                    triggerText: '松开刷新', // 下拉到触发距离时显示的文字
                    loadingText: '加载中...', // 加载中的文字
                    doneText: "加载完成", // 加载完成的文字
                    failText: '加载失败', // 加载失败的文字
                    loadedStayTime: 400, // 加载完后停留的时间ms
                    stayDistance: 50, // 触发刷新后停留的距离
                    triggerDistance: 70 // 下拉刷新触发的距离
                },
                bottomConfig: {
                    pullText: '上拉加载',
                    triggerText: '松开刷新',
                    loadingText: '加载中...',
                    doneText: '加载完成',
                    failText: '加载失败',
                    loadedStayTime: 400,
                    stayDistance: 50,
                    triggerDistance: 70
                },
                remarkPageNum: 1,
                remarks: [
                    // {
                    //     'photo': 'http://image.taoerxue.cn/e07a160986e04112b16818cc9e620feb',
                    //     'nickName': '月亮升',
                    //     'content': '这是一个好评模板!以前基本没有认真评价过，不知道浪费了多少积分，听说评价超过100字可以送积分，这个福利真是不错，妥妥的每条都来100字评价下，这是第N次来淘宝购物了,光是一个国庆就 买了五次，是有多爱啊，东西便宜，质量好，食物新鲜',
                    //     'createTime': '2019-02-21'
                    // },
                ],
                lessonsFlag: false,
                remarksFlag: false,
            }
        },
        created: function () {
            this.id = this.getUrlParams("id");
            // this.type = this.getUrlParams("type");
            // this.setPath(this.type);
            this.getData();
            // this.getRemarks();
        },
        methods: {
            // tab选项卡
            getNum (index) {
                this.num = index;
            },
            // 获取课程id
            getUrlParams(name) {
                const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                const r = window.location.search.substr(1).match(reg); //匹配目标参数
                if (r != null) return unescape(r[2]);
                return null; //返回参数值
            },
            // // 设置跳转路由
            // setPath(type) {
            //     if (type === 1) {
            //         this.$router.push({
            //             path: '/',
            //         });
            //     } else if (type === 2) {
            //         this.$router.push({
            //             path: '/course',
            //         });
            //     } else if (type === 3) {
            //         this.$router.push({
            //             path: '/news',
            //         });
            //     } else {
            //         this.$router.push({
            //             path: '/',
            //         });
            //     }                       
            // },
            // 获取课程基本信息
            getData() {
                const params = {
                    courseId: this.id
                    // courseId: 1060
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
                        // // 轮播图片
                        const fnFilter01 = (param) => {
                            return param.type === 1;
                        }
                        // // 机构信息的图片
                        // const fnFilter02 = (param) => {
                        //     return param.type === 2;
                        // }
                        // this.msg.photoList.unshift(res.data.data.photo);
                        this.msg.photoList = res.data.data.courseInfoDTO.photos.filter(fnFilter01);
                        // 机构描述
                        // if (res.data.data.mechanismDescription) {
                        //     this.msg.mechanismDescription = res.data.data.mechanismDescription.length > 18 ? res.data.data.mechanismDescription.slice(0, 18) + "..." : res.data.data.mechanismDescription;
                        // }
                        this.msg.detailedAddress = res.data.data.org.detailedAddress;
                        // 评分处理
                        const star = res.data.data.org.totalScore ? Math.round(res.data.data.org.scoreNumber / res.data.data.org.totalScore) : 0;             
                        this.msg.star = star;
                        this.msg.starObj = this.getStarObj(star);

                        // 用户评价
                        this.remarks = res.data.data.commentDTOPageInfoVO.list;
                    } else {
                        // alert(res.data.message);
                        console.log(res.data.message);
                    }
                })
                .catch((error) => {
                    // alert(error);
                });
            },
            // 评价
            getRemarks() {
                axios.get("/w/course/getCommentByCourseId", {
                    params: {
                        courseId: this.id,
                        pageNum: this.remarkPageNum,
                        pageSize: 10
                    }
                }).then((response) => {
                    if (response.data.code === "0") {
                        const data = [];
                        response.data.data.forEach((item) => {
                            item.createTime = this.getRemarkTime(item.createTime);
                            data.push(item);
                        });
                        this.remarks = data;
                        if (response.data.data.length < 10) {
                            this.remarkPageNum = 0;
                        }
                    } else {
                        console.log(response.data.message);
                    }
                }).catch((error) => {

                });
            },
            // 更多评价
            remarksRefresh(loaded) {
                this.remarkPageNum = 1;
                axios.get("/w/course/getCommentByCourseId", {
                    params: {
                        id: this.id,
                        pageNum: this.remarkPageNum,
                        pageSize: 10
                    }
                }).then((response) => {
                    if (response.data.code === "0") {
                        const data = [];
                        response.data.data.forEach((item) => {
                            item.createTime = this.getRemarkTime(item.createTime);
                            data.push(item);
                        });
                        this.remarks = data;
                        if (response.data.data.length < 10) {
                            this.remarkPageNum = 0;
                        }
                        loaded('done');
                    } else {
                        console.log(response.data.message);
                    }
                }).catch((error) => {

                });
            },
            // 更多评价
            remarksMore(loaded) {
                if (this.remarkPageNum === 0) {
                    this.bottomConfig.doneText = "没有更多";
                    loaded('done');
                    this.bottomConfig.doneText = "加载完成";
                    return
                }
                this.remarkPageNum = this.remarkPageNum + 1;
                axios.get("/w/course/getCommentByCourseId", {
                    params: {
                        id: this.id,
                        pageNum: this.remarkPageNum,
                        pageSize: 10
                    }
                }).then((response) => {
                    if (response.data.code === "0") {
                        const data = [];
                        response.data.data.forEach((item) => {
                            item.createTime = this.getRemarkTime(item.createTime);
                            data.push(item);
                        });
                        data.forEach((item) => {
                            this.remarks.push(item);
                        });
                        if (response.data.data.length < 10) {
                            this.remarkPageNum = 0;
                        }
                        loaded('done');
                    } else {
                        console.log(response.data.message);
                    }
                }).catch((error) => {

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
            // 评价时间
            getRemarkTime(value) {
                const time = new Date();
                const timeStamp = time.getTime();
                const D_value = timeStamp - value;
                let timeDesc = "";
                if (D_value < 60000) {
                    timeDesc = "刚刚";
                } else if (D_value < 3600000) {
                    let T = Math.floor(D_value / 1000 / 60);
                    timeDesc = T + "分钟前"
                } else if (D_value < (3600000 * 24)) {
                    let T = Math.floor(D_value / 1000 / 60 / 60);
                    timeDesc = T + "小时前"
                } else if (D_value < (3600000 * 24 * 30)) {
                    let T = Math.floor(D_value / 1000 / 60 / 60 / 24);
                    timeDesc = T + "天前"
                } else {
                    const tempDate = new Date(value),
                        oMonthT = (tempDate.getMonth() + 1).toString(),
                        oMonth = oMonthT.length <= 1 ? "0" + oMonthT : oMonthT,
                        oDayT = tempDate.getDate().toString(),
                        oDay = oDayT.length <= 1 ? "0" + oDayT : oDayT,
                        oYear = tempDate.getFullYear().toString(),
                        oTime = oYear + '-' + oMonth + '-' + oDay;
                    timeDesc = oTime;
                }
                return timeDesc
            },
            setLessonsFlag(value) {
                this.lessonsFlag = value;
            },
            setRemarksFlag(value) {
                this.remarksFlag = value;
            },
            // 跳转到应用市场
            toApp() {
                window.open("https://a.app.qq.com/o/simple.jsp?pkgname=com.taoerxue.children")
            }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "../assets/css/course.scss";
</style>
