export default {
    // 支持值为 Object 和 Array
    'GET /api/forum': {
        data: {
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },
        pageSize: 12,
        page: 2,
        totalPage: 7,
        count: 20,
        discussions: [{
            id: 0,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        }, {
            id: 1,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        },{
            id: 2,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        },{
            id: 3,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        },{
            id: 4,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        },{
            id: 5,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        },{
            id: 6,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        },
        ]
    },
    'GET /api/discussion': {
        pageSize: 12,
        page: 2,
        totalPage: 7,
        count: 20,
        discussions: [{
            id: 0,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        }, {
            id: 1,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        },{
            id: 2,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        },{
            id: 3,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        },{
            id: 4,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        },{
            id: 5,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        },{
            id: 6,
            content: '我喜欢泰坦尼克号',
            time: '2019-06-03 11:00:32',
            avatar: 'https://img.meituan.net/avatar/__47981909__8288376.jpg',
            nick: 'Hello',
        },
        ]
    },
    ['POST /api/forum']: {
        id: 4,
    },
    'POST /api/forum/like': {
        message: '已添加到我喜爱的讨论组'
    },
    'GET /api/forum/like': {
        data: [{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        }, {
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        }, {
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        }, {
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        }, {
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },{
            id: 4,
            name: '泰坦尼克号',
            description: '电影泰坦尼克号讨论组',
            publisher: '泰坦'
        },]
    }
}