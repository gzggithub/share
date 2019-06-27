import Vue from 'vue'
import Router from 'vue-router'
import Institution from '@/components/Institution'
import Course from '@/components/Course'
import News from '@/components/News'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Institution',
            component: Institution
        },
        {
            path: '/course',
            name: 'Course',
            component: Course
        },
        {
            path: '/news',
            name: 'News',
            component: News
        }
    ]
})
