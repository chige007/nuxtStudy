<template>
    <div>
        test page
        <input type="text" v-model="cityName">
        <el-button @click="add">新增</el-button>
        <ul>
            <li v-for="(x, idx) in list" :key="'a' + idx">
                {{x}}
            </li>
            <li v-for="(y, idx) in $store.state.city.list" :key="'b' + idx">
                {{y}}
            </li>
            <li v-for="(z, idx) in $store.state.org.list" :key="'c' + idx">
                {{z}}
            </li>
        </ul>
        <test></test>
    </div>
</template>

<script>
import test from '~/components/test.vue'
import axios from 'axios'
export default {
    components: {
        test
    },
    layout: 'test',
    data: () => {
        return {
            cityName: '',
            list: []
        };
    },
    mounted () {
    },
    methods: {
        add () {
            if (!this.cityName) return;
            this.$store.commit('city/add', this.cityName);
            this.cityName = '';
        }
    },
    async asyncData () {
        let {status, data: {list}} = await axios.get('http://localhost:3000/city/list')
        if( status == 200 ) {
            return {
                list
            }
        }
    }
}
</script>

<style lang="less">
    
</style>