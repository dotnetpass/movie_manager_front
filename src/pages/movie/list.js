import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Dropdown, Icon, Input, Menu, PageHeader, Select, Spin} from 'antd';
import withRouter from 'umi/withRouter';
import styles from './list.less'
import router from 'umi/router';
import MovieList from '@/components/movieList'

const Search = Input.Search

const typeOptions = {
    name: '电影名',
    actor: '主演',
    director: '导演',
    category: '分类'
}

const sortByOptions = {
    scoreCount: '人气从高到低',
    score: '评分从高到低',
    releaseDay: '上映从近到远',
    name: '按电影名排序',

}

class Movie extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowHead: false,
            type: undefined,
            query: undefined,
        };
    }

    handleEditInput = (name, e) => {
        this.setState({
            [name]: e
        });
    };


    handleSearch = () => {
        //this.loadMovies(1,12,this.state.type, this.state.query)
        router.push(`/movie/list?type=${this.state.type || this.props.movie.query.type}&query=${this.state.query || this.props.movie.query.query}`)
    }

    changeSortBy = (sort_by) => {
        this.loadMovies(null, null, null, null, sort_by)
    }

    componentDidMount() {
        let _this = this;
        window.addEventListener('scroll', (e) => {
            _this.handleScroll(e);
        });
        this.loadMovies(1, 12);
    }

    handleLike = (id) => {
        this.props.dispatch({
            type: 'movie/like',
            payload: {
                id
            }
        });
    };

    componentWillUnmount() {
        // this.clearEditInput();
        let _this = this;
        window.removeEventListener('scroll', _this.handleScroll, true)
    }

    handleScroll(e) {
        const top = document.documentElement.scrollTop
        if (document.documentElement.scrollTop > 150 && !this.state.isShowHead)
            this.setState({isShowHead: true})
        else if (document.documentElement.scrollTop < 150 && this.state.isShowHead)
            this.setState({isShowHead: false})
    }


    loadMovies = (page = this.props.movie.page, pageSize = this.props.movie.pageSize, type = this.props.location.query.type || 'name',
                  query = this.props.location.query.query || '', sort_by = this.props.movie.query.sort_by || 'scoreCount') => {
        this.props.dispatch({
            type: 'movie/fetch', payload: {
                type, query, sort_by
            }
        });
    };

    onLoadMore = () => {
        if (this.props.movie.page >= this.props.movie.pageSize) return;
        this.loadMovies(this.props.movie.page + 1)
    };


    render() {
        const {movie} = this.props;
        if (!movie || !movie.data)
            return null;

        const {loading} = movie;

        const img = Array.isArray(movie.data) && movie.data[0] && movie.data[0].img && movie.data[0].img.replace("w.h", '600.800');

        const menu = <Menu>
            {Object.entries(sortByOptions).map(([e, f]) => <Menu.Item key={e} onClick={()=>this.changeSortBy(e)}>
                {f}
            </Menu.Item>)}
        </Menu>

        const loadMore =
            movie.page < movie.totalPage ? (
                loading ? <Spin style={{
                        marginLeft: 330,
                        marginTop: 12
                    }}></Spin> :
                    <div
                        style={{
                            textAlign: 'center',
                            marginTop: 12,
                            height: 32,
                            lineHeight: '32px',
                        }}
                    >
                        <a onClick={this.onLoadMore}><Icon type="down-circle"/>&nbsp;加载更多搜索结果</a>
                    </div>
            ) : null;

        return <div>
            {this.state.isShowHead ? <div className={styles.hd}></div> : null}
            <div className={styles.header}>
                {img ? <img className={styles.headerImg} src={img}/> : null}
            </div>
            <div className={styles.headerContent}>
                <div className={styles.search}>
                    检索电影
                </div>

                <div className={styles.searchBar}>
                    <Input.Group compact>
                        <Select value={this.state.type !== undefined ? this.state.type : movie.query.type}
                                size="large" style={{width: '20%'}} onChange={(e) => this.handleEditInput('type', e)}>
                            <Select.Option value="name"><Icon type="youtube"/>&nbsp;电影名</Select.Option>
                            <Select.Option value="actor"><Icon type="star"/>&nbsp;主演</Select.Option>
                            <Select.Option value="director"><Icon type="video-camera"/>&nbsp;导演</Select.Option>
                            <Select.Option value="category"><Icon type="bars"/>&nbsp;分类</Select.Option>
                        </Select>
                        <Search style={{width: '80%'}} size="large" placeholder="输入检索关键词" enterButton
                                onChange={(e) => this.handleEditInput('query', e.target.value)}
                                onSearch={this.handleSearch}
                                value={this.state.query !== undefined ? this.state.query : movie.query.query}/>
                    </Input.Group>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.contentHeader}>
                    <PageHeader onBack={() => router.goBack()}
                                title={`${movie.query.query || ''}（按${typeOptions[movie.query.type || 'name']}查找）`}
                                subTitle={`共找到 ${movie.count || 0} 条结果`}/>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a>
                            {sortByOptions[movie.query.sort_by || 'scoreCount']} <Icon type="down"/>
                        </a>
                    </Dropdown></div>
                <MovieList data={movie.data} loading={movie.loading} loadMore={loadMore} like={this.handleLike}/>
            </div>
        </div>
    }
}

export default withRouter(connect(state => ({
    movie: state.movie,

}))(Movie));
