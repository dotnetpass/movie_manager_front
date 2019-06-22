import {getIndex} from '../services/api';
import router from "umi/router";

export default {
    namespace: 'idx',

    state: {
        newest_movies: [],
        newest_comments: [],
        newest_discussions: [],
    },

    effects: {
        * fetch({payload}, {call, put, select}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const result = yield call(getIndex, payload);
            yield put({
                type: 'queryList',
                payload: result,
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
    },

    reducers: {
        queryList(state, action) {
                return {
                    ...state,
                    ...(action.payload),
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
