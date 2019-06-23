import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Avatar, Comment, Icon, Input, List, Rate, Select, Tooltip} from 'antd';
import withRouter from 'umi/withRouter';
import styles from './index.less'
import router from 'umi/router';
import moment from 'moment';
import top from '@/assets/top1.jpg'
import MovieList from "@/components/movieList";

const Search = Input.Search

const typeOptions = {
    name: '电影名',
    actor: '主演',
    director: '导演',
    category: '分类'
}

class Movie extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowHead: false,
            type: 'name',
            query: '',
            searchFor: 'movie',
        };
    }

    handleEditInput = (name, e) => {
        this.setState({
            [name]: e
        });
    };


    handleSearchMovie = () => {
        //this.loadMovies(1,12,this.state.type, this.state.query)
        router.push(`/movie/list?type=${this.state.type}&query=${this.state.query}`)
    }

    handleSearchForum = () => {
        //this.loadMovies(1,12,this.state.type, this.state.query)
        router.push(`/forum/list?query=${this.state.query}`)
    }

    componentDidMount() {
        let _this = this;
        window.addEventListener('scroll', (e) => {
            _this.handleScroll(e);
        });
        this.loadIndex();
    }

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


    loadIndex = () => {
        this.props.dispatch({
            type: 'idx/fetch'
        });
    };

    handleLike = (id) => {
        this.props.dispatch({
            type: 'movie/like',
            payload: {
                id
            }
        });
    };


    render() {
        const {index} = this.props;
        const {loading} = index;

        return <div>
            {this.state.isShowHead ? <div className={styles.hd}></div> : null}
            <div className={styles.header}>
                <img className={styles.headerImg} src={top}/>
            </div>
            <div className={styles.headerContent}>
                <div className={styles.search}>
                    <div className={styles.searchItem} onClick={() => this.handleEditInput('searchFor', 'movie')}>
                        <div className={this.state.searchFor === 'movie' ? styles.active : null}>检索电影</div>
                    </div>
                    <div className={styles.searchItem} onClick={() => this.handleEditInput('searchFor', 'forum')}>
                        <div className={this.state.searchFor === 'forum' ? styles.active : null}>搜索讨论组</div>
                    </div>
                </div>

                <div className={styles.searchBar}>
                    {this.state.searchFor === 'movie' ?
                        <Input.Group compact>
                            <Select value={this.state.type || 'name'}
                                    size="large" style={{width: '20%'}}
                                    onChange={(e) => this.handleEditInput('type', e)}>
                                <Select.Option value="name"><Icon type="youtube"/>&nbsp;电影名</Select.Option>
                                <Select.Option value="actor"><Icon type="star"/>&nbsp;主演</Select.Option>
                                <Select.Option value="director"><Icon type="video-camera"/>&nbsp;导演</Select.Option>
                                <Select.Option value="category"><Icon type="bars"/>&nbsp;分类</Select.Option>
                            </Select>
                            <Search style={{width: '80%'}} size="large" placeholder="输入检索关键词" enterButton
                                    onChange={(e) => this.handleEditInput('query', e.target.value)}
                                    onSearch={this.handleSearchMovie}
                                    value={this.state.query || ''}/>
                        </Input.Group>
                        : <Search size="large" placeholder="输入讨论组名" enterButton
                                  onChange={(e) => this.handleEditInput('query', e.target.value)}
                                  onSearch={this.handleSearchForum}
                                  value={this.state.query || ''}/>
                    }
                </div>
            </div>
            {index.newest_movies ?
                <div className={styles.main}>
                    <div className={styles.head}>最近上映
                        <Icon className={styles.headIcon} type="thunderbolt"/>
                    </div>
                    <div className={styles.mainContent}>
                        <MovieList data={index.newest_movies} loading={loading} like={this.handleLike}/>
                    </div>
                </div> : null}
            {index.newest_comments ?
            <div className={styles.main}>
                <div className={styles.head}>最新影评
                    <Icon className={styles.headIcon} type="solution"/>
                </div>
                <div className={styles.mainContent}>
                    <List
                        loading={loading}
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            lg: 3,
                            xl: 3,
                            xxl: 3,
                        }}
                        dataSource={index.newest_comments}
                        renderItem={item => (
                            <List.Item>
                                <Comment
                                    className={styles.commentItem}
                                    key={item.id}
                                    actions={[
                                        <p style={{height: 40, lineHeight: '20px', overflow: 'hidden'}}>
                                            {item.content}
                                        </p>

                                    ]}
                                    author={<a>{item.nick ? item.nick.substring(0,8): '匿名用户'}</a>}
                                    avatar={
                                        <Avatar
                                            src={item.avatarUrl}
                                            alt={item.nick}
                                        />
                                    }
                                    content={
                                        <Rate key="1" disabled allowHalf defaultValue={item.score / 2}
                                              style={{fontSize: 14}}/>
                                    }
                                    datetime={
                                        <span>评价了 <a onClick={()=>router.push(`/movie/${item.movie_id}`)}>{(item.movie||'').substring(0,8)}</a></span>
                                    }
                                /></List.Item>
                        )}
                    />
                </div>
            </div> : null}
            {index.newest_discussions ?
                <div className={styles.main}>
                    <div className={styles.head}>最新话题
                        <Icon className={styles.headIcon} type="number"/>
                    </div>
                    <div className={styles.mainContent}>
                        <List
                            loading={loading}
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 3,
                                xl: 3,
                                xxl: 3,
                            }}
                            dataSource={index.newest_discussions}
                            renderItem={item => (
                                <List.Item>
                                    <Comment
                                        className={styles.commentItem}
                                        key={item.id}
                                        author={<a>{item.nick ? item.nick.substring(0,8): '匿名用户'}</a>}
                                        avatar={
                                            <Avatar
                                                src={item.avatar}
                                                alt={item.nick}
                                            />
                                        }
                                        content={
                                            <p style={{height: 40, lineHeight: '20px', overflow: 'hidden'}}>
                                                {item.content}
                                            </p>
                                        }
                                        datetime={
                                            <span>发表于 <a onClick={()=>router.push(`/forum/${item.forum}`)}>{(item.forum||'').substring(0,8)}</a></span>
                                        }
                                    /></List.Item>
                            )}
                        />
                    </div>
                </div> : null}
        </div>
    }
}

export default withRouter(connect(state => ({
    index: state.idx,

}))(Movie));
