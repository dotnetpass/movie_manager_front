import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Input, PageHeader} from 'antd';
import withRouter from 'umi/withRouter';
import styles from './list.less'
import router from 'umi/router';
import MovieList from '@/components/movieList'

class Movie extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowHead: false,
            type: undefined,
            query: undefined,
        };
    }

    componentDidMount() {
        this.loadMovies();
    }

    handleLike = (id) => {
        this.props.dispatch({
            type: 'movie/like',
            payload: {
                id
            }
        });
    };


    loadMovies = () => {
        this.props.dispatch({
            type: 'movie/fetchLiked'
        });
    };

    render() {
        const {movie} = this.props;
        if (!movie || !movie.data)
            return null;

        const {loading} = movie;

        return <div>
            <div className={styles.hd}></div>
            <div className={styles.hds}></div>
            <div className={styles.content}>
                <div className={styles.contentHeader}>
                    <PageHeader onBack={() => router.goBack()}
                                title='我喜欢的电影'
                                subTitle={`共收藏 ${movie.data.length || 0} 条电影`}/>

                </div>
                <MovieList data={movie.data} loading={movie.loading} like={this.handleLike}/>
            </div>
        </div>
    }
}

export default withRouter(connect(state => ({
    movie: state.movie,

}))(Movie));
