import {createForum, getForum, likeForum, listDiscussion, listLikedForum, postDiscussion} from '../services/api';
import router from 'umi/router';

export default {
    namespace: 'forum',

    state: {
        data: {},
        discussions: [],
        loading: false,
        pageSize: 12,
        page: 1,
        totalPage: 1,
        count: 0,
        list: []
    },

    effects: {
        * like({payload}, {call, put, select}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const result = yield call(likeForum, payload);
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
        * post({payload}, {call, put, select}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const result = yield call(postDiscussion, payload);
            yield put({type: 'fetchDiscussion'});
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
        * fetch({payload}, {call, put, select}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const result = yield call(getForum, payload);
            yield put({
                type: 'query',
                payload: result,
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
        * fetchLiked({payload}, {call, put, select}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const result = yield call(listLikedForum, payload);
                yield put({
                    type: 'queryList',
                    payload: Array.isArray(result.data) ? result.data : []
                });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
        * create({payload}, {call, put, select}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const result = yield call(createForum, payload);
            if (result.id)
                router.push('/forum/' + result.id)
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
        * fetchDiscussion({payload}, {call, put, select}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const {pageSize, page, data} = yield select(state => state.forum);
            const result = yield call(listDiscussion, {
                pageSize: payload && payload.pageSize ? payload.pageSize : pageSize,
                page: payload && payload.page ? payload.page : page,
                forum_id: payload && payload.forum_id ? payload.forum_id : data.id,
            });
            yield put({
                type: 'query',
                payload: result,
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
    },

    reducers: {
        query(state, action) {
            if (action.payload.page === 1)
                return {
                    ...state,
                    ...action.payload,
                };
            else
                return {
                    ...state,
                    ...action.payload,
                    discussions: [...state.discussions, ...action.payload.discussions]
                };
        },
        queryList(state, action) {
            return {
                ...state,
                list: action.payload,
            };
        },
        changeLoading(state, action) {
            return {
                ...state,
                loading: action.payload,
            };
        },
    },
};
