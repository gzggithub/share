<template>
    <div class="institution">
        <div class="main" v-title data-title="机构详情"></div>
        <div v-show="!(teachersFlag||teacherDetailsIndex||coursesFlag||remarksFlag)" class="contentBox">
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
                   <!--  <div class="logo">
                        <img :src="`http://image.taoerxue.com/`+msg.icon" alt="">
                    </div> -->
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
                        <!-- <span class="title">地点</span> -->
                        <img src="../assets/images/location.png" alt="">
                        <span class="value">{{msg.detailedAddress || '余杭区余杭街道万佳聚中心2幢1206室'}}</span>
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
                            <pre>{{msg.description ||'少儿英语创意室，2016年成立，专注儿童音乐、体育、美术、核心素养培养，主要经营项目有少儿英语、英语口语、英语训练、一对一外教，在有声小面试环节90%高通过率。'}}</pre>
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
                            <!-- <div @click="setTeacherDetailsIndex(index+1)"> -->
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
                <!-- <div class="content clearfix">
                    <ul class="items clearfix">
                        <li v-for="(item,index) in teachers.slice(0,4)" @click="setTeacherDetailsIndex(index+1)"
                            class="item">
                            <img v-show="item.photo" :src="item.photo" alt="" class="photo">
                            <div v-show="!item.photo" class="ellipsis">...</div>
                            <div class="name">{{item.nickName}}</div>
                            <div v-show="item.experienceAge" class="experienceAge">{{item.experienceAge}}年教龄</div>
                        </li>
                    </ul>
                    <div v-if="teachers.length>4" @click="setTeachersFlag(true)" class="more"></div>
                </div> -->
            </div>
            <!-- <div v-if="teachers.length" class="teachers">
                <p class="title">教师展示</p>
                <div class="content clearfix">
                    <ul class="items clearfix">
                        <li v-for="(item,index) in teachers.slice(0,4)" @click="setTeacherDetailsIndex(index+1)"
                            class="item">
                            <img :src="`http://image.taoerxue.com/`+item.photo" alt="" class="photo">
                            <span class="name">{{item.nickName}}</span>
                            <span class="experienceAge">{{item.experienceAge}}年教龄</span>
                        </li>
                    </ul>
                    <div v-if="teachers.length>4" @click="setTeachersFlag(true)" class="more"></div>
                </div>
            </div> -->
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
                                <!-- <span class="suitAge">适合年龄：{{item.studentTypeList ? item.studentTypeList[0].name : ""}}周岁以上</span> -->
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
            <!-- <div class="remarks">
                <p class="title">机构评价</p>
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
        </div>
        <div v-show="teachersFlag&&!teacherDetailsIndex" class="teachersMore">
            <div class="title">
                教师展示
                <div class="return" @click="setTeachersFlag(false)"></div>
            </div>
            <ul class="items">
                <PullTo :top-load-method="teachersRefresh" :bottom-load-method="teachersMore" :top-config="topConfig"
                        :bottom-config="bottomConfig">
                    <li v-for="(item,index) in teachers" class="item clearfix">
                        <img :src="item.photo" alt="" class="photo">
                        <div class="itemRight">
                            <p class="name">{{item.nickName}}</p>
                            <p class="experienceAge">{{item.experienceAge}}年教龄</p>
                        </div>
                        <div @click="setTeacherDetailsIndex(index+1)" class="details"></div>
                    </li>
                </PullTo>
            </ul>
        </div>
        <div v-show="teacherDetailsIndex" class="teacherDetails">
            <div class="title">
                教师展示
                <div class="return" @click="setTeacherDetailsIndex(0)"></div>
            </div>
            <div class="content">
                <div class="partOne">
                    <img v-if="teacherDetailsIndex" class="photo"
                         :src="(teacherDetailsIndex?teachers[teacherDetailsIndex-1].photo:'')"
                         alt="">
                    <p class="name">{{teacherDetailsIndex?teachers[teacherDetailsIndex-1].nickName:""}}</p>
                    <p class="type">{{teacherDetailsIndex?teachers[teacherDetailsIndex-1].types:""}} |
                        {{teacherDetailsIndex?teachers[teacherDetailsIndex-1].experienceAge:""}}年教龄</p>
                </div>
                <div class="partTwo">
                    <pre>{{teacherDetailsIndex?teachers[teacherDetailsIndex-1].description:""}}</pre>
                </div>
            </div>
        </div>
        <div v-show="coursesFlag" class="coursesMore">
            <div class="title">
                机构课程
                <div class="return" @click="setCoursesFlag(false)"></div>
            </div>
            <ul class="items">
                <PullTo :top-load-method="coursesRefresh" :bottom-load-method="coursesMore" :top-config="topConfig"
                        :bottom-config="bottomConfig">
                    <li v-for="item in courses" class="item clearfix" @click="toApp">
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
                                <span class="price">￥{{item.price}}</span>
                                <span class="suitAge">适合年龄：{{item.schoolAge}}</span>
                                <!-- <span class="suitAge">适合年龄：{{item.studentTypeList ? item.studentTypeList[0].name : ""}}周岁以上</span> -->
                            </div>
                            <!-- <p class="name">{{item.name}}</p>
                            <p class="type_count">{{item.typeName}} | {{item.count}}课时</p>
                            <div class="bottom clearfix">
                                <span class="price">￥{{item.price}}</span>
                                <span class="suitAge">适合年龄：{{item.studentTypeList?item.studentTypeList[0].name:""}}</span>
                            </div> -->
                        </div>
                    </li>
                </PullTo>
            </ul>
        </div>
        <div v-show="remarksFlag" class="remarksMore">
            <div class="title">
                机构评价
                <div class="return" @click="setRemarksFlag(false)"></div>
            </div>
            <ul class="items">
                <PullTo :top-load-method="remarksRefresh" :bottom-load-method="remarksMore" :top-config="topConfig"
                        :bottom-config="bottomConfig">
                    <li v-for="item in remarks" class="item clearfix">
                        <img :src="`http://image.taoerxue.com/`+item.photo" alt="" class="photo">
                        <div class="itemRight">
                            <p class="name">{{item.nickName}}</p>
                            <p class="value">{{item.content}}</p>
                        </div>
                        <p class="time">{{item.createTime}}</p>
                    </li>
                </PullTo>
            </ul>
        </div>
        <!-- <div v-show="!(teachersFlag||teacherDetailsIndex||coursesFlag||remarksFlag)" @click="toApp"
             class="institutionBottom">
            <div class="one">
                <div class="icon"></div>
                <p>咨询</p>
            </div>
            <div class="two">立即沟通</div>
        </div> -->
        <div class="fixed top-fixed" @click="toApp">打开淘儿学APP，了解更多精彩内容</div>
        <div class="fixed bottom-fixed" @click="toApp">打开淘儿学APP，了解更多精彩内容</div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Swiper from 'swiper';
    import "swiper/dist/css/swiper.css";
    import { getOrgDetailInfo } from '../config';
    import {
        swiper,
        swiperSlide
    } from "vue-awesome-swiper";
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
                swiperOptionTeachers: {
                   slidesPerView: 3,
                   spaceBetween: 15,
                },
                id: null,
                type: null,
                msg: {},
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
                teacherPageNum: 1,
                teachers: [],
                coursePageNum: 1,
                courses: [],
                remarkPageNum: 1,
                remarks: [],
                teachersFlag: false,
                teacherDetailsIndex: 0,
                coursesFlag: false,
                remarksFlag: false,
            }
        },
        created: function () {
            this.id = this.getUrlParams("id");
            this.type = this.getUrlParams("type");
            this.setPath(this.type);
            this.getData();
            // this.getTeachers();
            // this.getCourses();
            // this.getRemarks();
        },
        methods: {
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
            getTeachers() {
                axios.get("/w/teacher/getTeacherList", {
                    params: {
                        eid: this.id,
                        pageNum: this.teacherPageNum,
                        pageSize: 10
                    }
                }).then((response) => {
                    if (response.data.code === "0") {
                        this.teachers = response.data.data;
                        if (response.data.data.length < 10) {
                            this.teacherPageNum = 0;
                        }
                    } else {
                        console.log(response.data.message);
                    }
                }).catch((error) => {

                });
            },
            teachersRefresh(loaded) {
                this.teacherPageNum = 1;
                axios.get("/w/teacher/getTeacherList", {
                    params: {
                        eid: this.id,
                        pageNum: this.teacherPageNum,
                        pageSize: 10
                    }
                }).then((response) => {
                    if (response.data.code === "0") {
                        this.teachers = response.data.data;
                        if (response.data.data.length < 10) {
                            this.teacherPageNum = 0;
                        }
                        loaded('done');
                    } else {
                        console.log(response.data.message);
                    }
                }).catch((error) => {

                });
            },
            teachersMore(loaded) {
                if (this.teacherPageNum === 0) {
                    this.bottomConfig.doneText = "没有更多";
                    loaded('done');
                    this.bottomConfig.doneText = "加载完成";
                    return
                }
                this.teacherPageNum = this.teacherPageNum + 1;
                axios.get("/w/teacher/getTeacherList", {
                    params: {
                        eid: this.id,
                        pageNum: this.teacherPageNum,
                        pageSize: 10
                    }
                }).then((response) => {
                    if (response.data.code === "0") {
                        response.data.data.forEach((item) => {
                            this.teachers.push(item);
                        });
                        if (response.data.data.length < 10) {
                            this.teacherPageNum = 0;
                        }
                        loaded('done');
                    } else {
                        console.log(response.data.message);
                    }
                }).catch((error) => {

                });
            },
            getCourses() {
                axios.get("/w/course/getRecommendCourseList", {
                    params: {
                        eId: this.id,
                        pageNum: this.coursePageNum,
                        pageSize: 10
                    }
                }).then((response) => {
                    if (response.data.code === "0") {
                        this.courses = response.data.data;
                        if (response.data.data.length < 10) {
                            this.coursePageNum = 0;
                        }
                    } else {
                        console.log(response.data.message);
                    }
                }).catch((error) => {

                });
            },
            coursesRefresh(loaded) {
                this.coursePageNum = 1;
                axios.get("/w/course/getRecommendCourseList", {
                    params: {
                        eId: this.id,
                        pageNum: this.coursePageNum,
                        pageSize: 10
                    }
                }).then((response) => {
                    if (response.data.code === "0") {
                        this.courses = response.data.data;
                        if (response.data.data.length < 10) {
                            this.coursePageNum = 0;
                        }
                        loaded('done');
                    } else {
                        console.log(response.data.message);
                    }
                }).catch((error) => {

                });
            },
            coursesMore(loaded) {
                if (this.coursePageNum === 0) {
                    this.bottomConfig.doneText = "没有更多";
                    loaded('done');
                    this.bottomConfig.doneText = "加载完成";
                    return
                }
                this.coursePageNum = this.coursePageNum + 1;
                axios.get("/w/course/getRecommendCourseList", {
                    params: {
                        eId: this.id,
                        pageNum: this.coursePageNum,
                        pageSize: 10
                    }
                }).then((response) => {
                    if (response.data.code === "0") {
                        response.data.data.forEach((item) => {
                            this.courses.push(item);
                        });
                        if (response.data.data.length < 10) {
                            this.coursePageNum = 0;
                        }
                        loaded('done');
                    } else {
                        console.log(response.data.message);
                    }
                }).catch((error) => {

                });
            },
            getRemarks() {
                axios.get("/w/education/getMechanismComment", {
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
                    } else {
                        console.log(response.data.message);
                    }
                }).catch((error) => {

                });
            },
            remarksRefresh(loaded) {
                this.remarkPageNum = 1;
                axios.get("/w/education/getMechanismComment", {
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
            remarksMore(loaded) {
                if (this.remarkPageNum === 0) {
                    this.bottomConfig.doneText = "没有更多";
                    loaded('done');
                    this.bottomConfig.doneText = "加载完成";
                    return
                }
                this.remarkPageNum = this.remarkPageNum + 1;
                axios.get("/w/education/getMechanismComment", {
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
            setTeachersFlag(value) {
                this.teachersFlag = value;
            },
            setTeacherDetailsIndex(value) {
                this.teacherDetailsIndex = value;
            },
            setCoursesFlag(value) {
                this.coursesFlag = value;
            },
            setRemarksFlag(value) {
                this.remarksFlag = value;
            },
        },        
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "../assets/css/institution.scss";
</style>
