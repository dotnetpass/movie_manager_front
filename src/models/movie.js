import {getMovie, listMovie, listComment, likeMovie, postComment, listLikedMovie} from '../services/api';
import router from "umi/router";

export default {
    namespace: 'movie',

    state: {
        data: [],
        current: {},
        loading: false,
        pageSize: 12,
        page: 1,
        totalPage: 1,
        count: 0,
        query: {
            sort_by: 'scoreCount',
            query: '',
            type: ''
        },
        comments: {
            data: [],
            pageSize: 12,
            page: 1,
            totalPage: 7,
            count: 0,
        },
    },

    effects: {
        * like({payload}, {call, put, select}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const result = yield call(likeMovie, payload);
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
            const result = yield call(postComment, payload);
            yield put({ type: 'fetchComment' });
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
            const result = yield call(listMovie, payload);
            yield put({
                type: 'queryList',
                payload: {...result, data: Array.isArray(result.data) ? result.data : []},
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
            const result = yield call(listLikedMovie, payload);
                yield put({
                    type: 'queryList',
                    payload: {...result, data: Array.isArray(result.data) ? result.data : []},
                });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
        * fetchComment({ payload }, { call, put, select }) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const { pageSize, page } = yield select(state => state.movie.comments);
            const { current } = yield select(state => state.movie);
            const result = yield call(listComment, {
                pageSize: payload && payload.pageSize ? payload.pageSize : pageSize,
                page: payload && payload.page ? payload.page : page,
                movie_id: payload && payload.movie_id ? payload.movie_id : current.id,
            });
            yield put({
                type: 'queryComment',
                payload: { ...result, data: Array.isArray(result.data) ? result.data : [] },
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
        * fetchCurrent({payload}, {call, put}) {
            const id = payload;
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            yield put({
                type: 'queryCurrent',
                payload: {},
            });
            let {data} = yield call(getMovie, {
                id,
            });
            yield put({
                type: 'queryCurrent',
                payload: data,
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },

    },

    reducers: {
        queryList(state, action) {
            if (action.payload.page === 1)
                return {
                    ...state,
                    ...(action.payload),
                };
            else
                return {
                    ...state,
                    ...(action.payload),
                    data: [...state.data, ...action.payload.data]
                };
        },
        queryCurrent(state, action) {
            return {
                ...state,
                current: action.payload,
                comments: action.payload.comments,
            };
        },
        queryComment(state, action) {
            if (!action.payload.page) return state;
            if (action.payload.page === 1)
                return {
                    ...state,
                    comments: action.payload
                };
            else
                return {
                    ...state,
                    comments: {
                        ...action.payload,
                        data: [...state.comments.data, ...action.payload.data]
                    }
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
