// test.ts
import {Random} from 'mockjs'
import {MockMethod} from 'vite-plugin-mock'

export default [
    {
        url: '/api/getUserInfo',
        method: 'get',
        timeout: 1000,
        response: {
            code: 200,
            message: '成功',
            result: {
                name: '测试者',
                token: Random.string(),
                id: 1,
                age: 12
            },
        },
    },
    {
        url: '/api/registerUser',
        method: 'post',
        timeout: 1000,
        response: {
            code: 200,
            message: '成功',
            result: {
                name: '哈哈哈',
            },
        },
    },
    {
        url: '/api/login',
        method: 'post',
        timeout: 100,
        response: {
            code: 200,
            message: '成功',
            result: {
                name: '测试者',
                token: Random.string(),
                id: 1,
                age: 12
            },
        },
    },
    {
        url: '/api/getUserInfoPromises',
        method: 'get',
        timeout: 100,
        response: {
            code: 200,
            message: '成功',
            result: ['async_look', 'async_edit']
        }
    }
] as MockMethod[]
