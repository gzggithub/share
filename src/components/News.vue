<template>
    <div class="content">
        <div class="main" v-title data-title="资讯详情"></div>
        <p class="title">{{msg.title}}</p>
        <div class="source-date clearfix">
            <!-- 来源 -->
            <div class="source">
                <!-- <span>转自： {{msg.author}}</span> -->
            </div>
            <span class="date">{{msg.createTime}}</span>
        </div>
        <!-- 富文本 -->
        <div v-html="msg.rich" class="html-box"></div>
        <!-- 底部 -->
        <div class="content-bottom">
            <div class="read-info clearfix">
                <span>阅读</span>
                <span>{{msg.views}}</span>
            </div>
        </div>
        <div class="fixed top-fixed" @click="toApp">打开淘儿学APP，了解更多精彩内容</div>
        <div class="fixed bottom-fixed" @click="toApp">打开淘儿学APP，了解更多精彩内容</div>
    </div>
</template>

<script>
    import { getNewsDetail } from '../config'
    export default {
        name: 'content',
        components: {},
        data () {
            return {
                id: null,
                type: null,
                msg: {},
            }
        },
        created: function () {
            this.id = this.getUrlParams("id");
            // this.type = this.getUrlParams("type");
            // this.setPath(this.type);
            this.getData();
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
            // setPath(type) {                
            //     if (type === 1) { // 跳到机构分享
            //         this.$router.push({
            //             path: '/',
            //         });
            //     } else if (type === 2) { // 跳到课程分享
            //         this.$router.push({
            //             path: '/course',
            //         });
            //     } else if (type === 3) { // 跳到资讯分享
            //         this.$router.push({
            //             path: '/news',
            //         });
            //     } else { // 跳到机构分享
            //         this.$router.push({
            //             path: '/',
            //         });
            //     }                       
            // },
            // 获取资讯基本信息
            getData() {
                const params = {
                    id: this.id
                    // id: 197
                };
                getNewsDetail(params).then((res) => {
                    if (res.data.result === "0") {
                        console.log(res.data.data);
                        this.msg = res.data.data;
                        this.msg.rich = this.richesHandle(res.data.data.riches);
                    } else {
                        // alert(res.data.message);
                        console.log(res.data.message);
                    }
                }).catch((error) => {
                    console.log(error)
                    // alert(error);
                });
            },
            // 富文本处理
            richesHandle(data) {
                let fn_result = data;
                fn_result = fn_result.replace(/(↵)/g, "");
                fn_result = fn_result.replace(/(&nbsp;)/g, "");
                fn_result = fn_result.replace("<html><head><title></title></head><body>", "");
                fn_result = fn_result.replace("</body></html>", "");
                return fn_result;
            },
            // 跳转到应用市场
            toApp() {
                window.open("https://a.app.qq.com/o/simple.jsp?pkgname=com.taoerxue.children")
            }
        }
    };
</script>

<style scoped lang="css">
    .content {
        width: 100%;
        padding: 1.0rem 0.38rem;
        background-color: #fff;
    }

    .content .title {
        text-align: justify;
        font-size: 0.48rem;
        color: #333;
        font-weight: bold;
        line-height: 0.58rem;
    }

    .content .source-date {
        margin-top: 0.4rem;
    }

    .content .source-date .source {
        float: left;
    }

    .content .source-date .source span {
        float: left;
        font-size: 0.28rem;
        line-height: 0.28rem;
    }

    .content .source-date .source span:nth-child(1) {
        color: #a8a8a8;
    }

    .content .source-date .source span:nth-child(2) {
        margin-left: 0.2rem;
        color: #F5B91D;
    }

    .content .source-date .date {
        float: right;
        font-size: 0.28rem;
        color: #a8a8a8;
        line-height: 0.28rem;
    }

    .content .html-box {
        width: 100%;
        margin-top: 0.3rem;
    }
    
    /* 图片处理 */
    .content .html-box>>> img {
        display: block;
        margin: 0 auto;
        max-width: 100% !important;
        height: auto !important;
    }

    .content .html-box>>> p {
        max-width: 100%;
        word-break: break-all;
        font-size: 15px !important;
    }

    .content .html-box>>> span {
        max-width: 100%;
        word-break: break-all;
        font-size: 15px !important;
    }

    .content .html-box>>> table {
        width: 100%;
    }

    .content .content-bottom {
        width: 100%;
        margin-top: 0.3rem;
    }

    .content .content-bottom .read-info span {
        float: left;
        margin-right: 0.1rem;
        font-size: 0.26rem;
        color: #a8a8a8;
        line-height: 0.26rem;
    }

    .fixed {
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        background: #FFEB99;
        border: 1px solid #FF9900;
        position: fixed;
        left: 0;
        z-index: 99999;
    }

    .top-fixed {
        top: 0;        
    }

    .bottom-fixed {
        bottom: 0;
    }
</style>