import React, {PureComponent} from 'react';
import moment from 'moment';
import {Avatar, Comment, Icon, Input, List, Spin, Tooltip, PageHeader, Form, Modal} from 'antd';
import styles from './index.less'
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import {connect} from 'dva';

import top from '@/assets/dis.jpg'

const Search = Input.Search


class Forum extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowHead: false,
            type: undefined,
            query: undefined,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.loadForum(nextProps.match.params.id);
        }
    }

    handleEditModalVisible = (flag) => {
        this.setState({
            editModalVisible: !!flag,
        });
    }
    handleEditInput = (name, e) => {
        this.setState({
            editInputValue: {...this.state.editInputValue, [name]: e},
        });
    };
    handleEditStart = (item) => {
        // this.clearEditInput();
        this.setState({
            editInputValue: {
                forum_id: this.props.forum.data.id,
                score: 5,
                content: ''
            }
        });
        this.handleEditModalVisible(true);
    }

    handlePost = () => {
        this.props.dispatch({
            type: 'movie/post',
            payload: this.state.editInputValue,
        });
        this.handleEditModalVisible(false);
    }


    handleSearch = () => {
        //this.loadMovies(1,12,this.state.type, this.state.query)
        router.push(`/forum/list?query=${this.state.query || (this.props.forum.data && this.props.forum.data.name) || ''}`)
    };

    componentDidMount() {
        let _this = this;
        window.addEventListener('scroll', (e) => {
            _this.handleScroll(e);
        });
        this.loadForum()
    }

    componentWillUnmount() {
        // this.clearEditInput();
        let _this = this;
        window.removeEventListener('scroll', _this.handleScroll, true)
    }

    handlePost = () => {
        this.props.dispatch({
            type: 'forum/post',
            payload: this.state.editInputValue,
        });
        this.handleEditModalVisible(false);
    }

    handleScroll(e) {
        const top = document.documentElement.scrollTop
        if (document.documentElement.scrollTop > 150 && !this.state.isShowHead)
            this.setState({isShowHead: true})
        else if (document.documentElement.scrollTop < 150 && this.state.isShowHead)
            this.setState({isShowHead: false})
    }

    handleLike = () => {
        this.props.dispatch({
            type: 'forum/like',
            payload: {
                id: this.props.forum.data.id
            }
        });
    };


    loadForum = (id = this.props.match.params.id) => {
        this.props.dispatch({
            type: 'forum/fetch', payload: {
                id: +id
            }
        });
    };
    loadDiscussion = (page) => {
        this.props.dispatch({
            type: 'forum/fetchDiscussion', payload: {
                page
            }
        });
    };

    onLoadMore = () => {
        if (this.props.forum.page >= this.props.forum.pageSize) return;
        this.loadDiscussion(this.props.forum.page + 1)
    };


    render() {
        const {forum, user} = this.props;
        if (!forum || !forum.data || !forum.data.id) return null;

        const {loading} = forum;

        const loadMore =
            forum.page < forum.totalPage ? (
                loading ? <Spin style={{marginLeft: 330, marginTop: 12}}/> :
                    <div style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}>
                        <a onClick={this.onLoadMore}><Icon type="down-circle"/>&nbsp;加载更多讨论</a>
                    </div>
            ) : null;

        const commentsBlock = <List
            loading={loading}
            loadMore={loadMore}
            itemLayout="horizontal"
            dataSource={forum.discussions}
            renderItem={item => (
                <Comment
                    className={styles.comment}
                    key={item.id}
                    author={<a>{item.nick || '匿名用户'}</a>}
                    avatar={
                        <Avatar
                            src={item.avatar}
                            alt={item.nick}
                        />
                    }
                    content={
                        <p>
                            {item.content}
                        </p>
                    }
                    datetime={
                        <Tooltip title={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(item.time).fromNow()}</span>
                        </Tooltip>
                    }
                />
            )}
        />

        return (<div>
                {this.state.isShowHead ? <div className={styles.hd}></div> : null}
                <div className={styles.header}>
                    <img className={styles.headerImg} src={top}/>
                </div>
                <div className={styles.headerContent}>
                    <div className={styles.search}>
                        搜索讨论组
                    </div>

                    <div className={styles.searchBar}>
                        <Search size="large" placeholder="输入讨论组名" enterButton
                                onChange={(e) => this.setState({'query': e.target.value})}
                                onSearch={this.handleSearch}
                                value={this.state.query !== undefined ? this.state.query : (forum.data.name || '')}/>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentHeader}>
                        <PageHeader onBack={() => router.goBack()}
                                    title={`${forum.data.name || 'N/A'} 讨论组`}
                                    subTitle={`共找到 ${forum.count || 0} 条讨论`}/>
                        {user?
                        <div className={styles.funcbarRight}>
                            <Icon className={styles.func} onClick={this.handleLike} type="heart"/>
                            <Icon className={styles.func} onClick={this.handleEditStart} type="edit"/>
                        </div>:null}

                    </div>
                    <div className={styles.main}>
                        <div className={styles.left}>
                            <div className={styles.head}>讨论
                                <Icon className={styles.headIcon} type="form"/>
                            </div>
                            <div className={styles.comments}>
                                {commentsBlock}
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.head}>讨论组信息
                                <Icon className={styles.headIcon} type="question-circle"/>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.left}>创建者</div>
                                <div className={styles.right}>{forum.data.nick || 'N/A'}</div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.left}>简介</div>
                                <div className={styles.right}>{forum.data.description || ''}</div>
                            </div>
                        </div>
                    </div>

                </div>
                {this.state.editInputValue?
                    <Modal
                        title='发起话题'
                        visible={this.state.editModalVisible}
                        onOk={this.handlePost}
                        onCancel={() => this.handleEditModalVisible()}
                    >
                        <Form.Item
                            required
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 18 }}
                            label="话题"
                        >
                            <Input.TextArea style={{lineHeight:'20px'}} placeholder="请输入话题" onChange={e => this.handleEditInput('content', e.target.value)}
                                            autosize={{ minRows: 6, maxRows: 6 }}
                            />
                        </Form.Item>
                    </Modal>:null}
            </div>
        )
    }
}

export default withRouter(connect(state => ({
    forum: state.forum,
    user: state.user.id

}))(Forum));
