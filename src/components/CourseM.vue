<template>
    <div class="courseM">
        <div v-show="!remarksFlag" class="contentBox">
            <div class="photos">
                <img :src="`http://image.taoerxue.com/`+msg.photo" alt="">
                <div class="value">
                    <p>{{msg.name}}</p>
                </div>
            </div>
            <div class="baseData">
                <div class="one">
                    <div class="priceBox">
                        <div class="price">
                            <span class="priceOne">{{msg.price?"￥":""}}</span>
                            <span class="priceTwo">{{msg.price?msg.price:"免费"}}</span>
                        </div>
                        <span v-if="msg.originalPrice" class="originalPrice">
              <span class="priceOne">￥</span>
              <span class="priceTwo">{{msg.originalPrice}}</span>
              <div class="line"></div>
            </span>
                    </div>
                    <div v-if="msg.type===1" class="number_time clearfix">
                        <div class="number">
                            <div class="icon"></div>
                            <span class="value">开班人数：{{msg.openClassPeopleNum}}人</span>
                        </div>
                        <div class="time">
                            <div class="icon"></div>
                            <span class="value">上课时间：{{this.getTime(msg.openClassDate)}}</span>
                        </div>
                    </div>
                    <div v-if="msg.type===0" class="time_">
                        <span class="value">上课时间：{{this.getTime(msg.openClassDate)}}</span>
                    </div>
                </div>
                <div v-if="msg.type===1" class="two">
                    <span class="title">上课地点</span>
                    <span class="value">{{msg.openClassAddress}}</span>
                </div>
            </div>
            <div class="target">
                <p class="title">课程介绍</p>
                <div class="content">
                    <pre>{{msg.summary}}</pre>
                </div>
            </div>
            <div class="target">
                <p class="title">关于讲师</p>
                <div class="content">
                    <pre>{{msg.teacherInfo}}</pre>
                </div>
            </div>
            <div class="target">
                <p class="title">适宜人群</p>
                <div class="content">
                    <pre>{{msg.suitablePeople}}</pre>
                </div>
            </div>
            <div class="target">
                <p class="title">你将获得</p>
                <div class="content">
                    <pre>{{msg.courseCollect}}</pre>
                </div>
            </div>
            <div v-if="msg.mdhClassDtoList.length" class="lessons">
                <p class="title">课程列表</p>
                <ul class="items">
                    <li v-for="item in msg.mdhClassDtoList" class="item clearfix">
                        <img :src="`http://image.taoerxue.com/`+item.photo" alt="" class="photo">
                        <div class="itemRight">
                            <p class="title">{{item.title.slice(0,12)+"..."}}</p>
                            <p class="time">{{item.openClassTime}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="msg.tips" class="target">
                <p class="title">购买须知</p>
                <div class="content">
                    <pre>{{msg.tips}}</pre>
                </div>
            </div>
            <div class="remarks">
                <p class="title">课程评价</p>
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
            </div>
        </div>
        <div v-show="remarksFlag" class="remarksMore">
            <div class="title">
                课程评价
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
        <div v-show="!remarksFlag" @click="toApp" class="courseBottom">
            <div class="one">
                <div class="icon"></div>
                <p>电话</p>
            </div>
            <div class="two">
                <div class="icon"></div>
                <p>咨询</p>
            </div>
            <div class="three">立即购买</div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import PullTo from 'vue-pull-to';

    export default {
        name: 'CourseM',
        components: {
            PullTo
        },
        data() {
            return {
                id: null,
                msg: {
                    mdhClassDtoList: []
                },
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
                remarks: [],
                remarksFlag: false,
            }
        },
        methods: {
            getId(name) {
                const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                const r = window.location.search.substr(1).match(reg); //匹配目标参数
                if (r != null) return unescape(r[2]);
                return null; //返回参数值
            },
            getData() {
                axios.get("/w/mdh/getCourseDetail", {params: {id: this.id}}).then((response) => {
                    if (response.data.code === "0") {
                        const mdhClassDtoList = [];
                        response.data.data.mdhClassDtoList.forEach((item) => {
                            item.openClassTime = this.getLessonTime(item.openClassTime);
                            mdhClassDtoList.push(item);
                        });
                        this.msg = response.data.data;
                        this.msg.mdhClassDtoList = mdhClassDtoList;
                    } else {
                        console.log(response.data.message);
                    }
                }).catch((error) => {

                });
            },
            getRemarks() {
                axios.get("/w/mdh/getOrderCommentList", {
                    params: {
                        courseId: this.id,
                        pageNum: 1,
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
                axios.get("/w/mdh/getOrderCommentList", {
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
                axios.get("/w/mdh/getOrderCommentList", {
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
            getTime(value) {
                const tempDate = new Date(value),
                    oMonth = (tempDate.getMonth() + 1).toString(),
                    oDay = tempDate.getDate().toString(),
                    oTime = oMonth + "月" + oDay + "日";
                return oTime;
            },
            getLessonTime(value) {
                const tempDate = new Date(value),
                    oMonthT = (tempDate.getMonth() + 1).toString(),
                    oMonth = oMonthT.length <= 1 ? "0" + oMonthT : oMonthT,
                    oDayT = tempDate.getDate().toString(),
                    oDay = oDayT.length <= 1 ? "0" + oDayT : oDayT,
                    oHourT = tempDate.getHours().toString(),
                    oHour = oHourT.length <= 1 ? "0" + oHourT : oHourT,
                    oMinuteT = tempDate.getMinutes().toString(),
                    oMinute = oMinuteT.length <= 1 ? "0" + oMinuteT : oMinuteT,
                    oTime = oMonth + '-' + oDay + " " + oHour + ":" + oMinute;
                return oTime;
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
            setRemarksFlag(value) {
                this.remarksFlag = value;
            },
            toApp() {
                window.open("https://a.app.qq.com/o/simple.jsp?pkgname=com.taoerxue.children")
            }
        },
        created: function () {
            this.id = this.getId("id");
            this.getData();
            this.getRemarks();
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "../assets/css/courseM.scss";
</style>
