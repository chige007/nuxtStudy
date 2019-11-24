<template>
<div>
    <el-form
        ref="form"
        :model="form"
        label-width="80px">
        <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
            <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="list" style="width: 100%">
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                    @click="deleteRow(scope.row)"
                    type="text"
                    size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import axios from 'axios'
export default {
    layout: 'default',
    data: () => {
        return {
            form: {
                name: '',
                age: ''
            },
            list: []
        };
    },
    mounted() {},
    methods: {
        onSubmit() {
            axios.post('/user/add', {
                name: this.form.name,
                age: this.form.age
            }).then(res => {
                this.getList();
            }).catch(err => {
                console.log(err)
            })
        },
        getList() {
            axios.get('/user/find').then(res => {
                console.log(res);
                this.list = res.data.result;
            }).catch(err => {

            })
        },
        deleteRow (row) {
            axios.post('/user/delete', {
                _id: row._id
            }).then(res => {
                this.getList();
            }).catch(err => {
                
            })
        },
        updateRow (row) {
            axios.post('/user/update', {
                _id: row._id,
                name: row.name,
                age: row.age
            }).then(res => {
                this.getList();
            }).catch(err => {
                
            })
        }
    },
    mounted() {
        this.getList();
    }
}
</script>

<style lang="less">
    
</style>
