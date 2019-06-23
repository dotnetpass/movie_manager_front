import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Avatar, Comment, Icon, List, Input, Rate, Spin, Tooltip, Modal, Form} from 'antd';
import moment from 'moment';
import withRouter from 'umi/withRouter';
import styles from './index.less'

class MoviePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowHead: false,
            editModalVisible: false,
            editInputValue: null
        };
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
                movie_id: this.props.current.id,
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

    componentDidMount() {
        let _this = this;
        window.addEventListener('scroll', (e) => {
            _this.handleScroll(e);
        });
        this.loadMovie();
    }

    componentWillUnmount() {
        let _this = this;
        window.removeEventListener('scroll', _this.handleScroll, true)
    }

    handleScroll(e) {
        const top = document.documentElement.scrollTop
        if (document.documentElement.scrollTop > 475 && !this.state.isShowHead)
            this.setState({isShowHead: true})
        else if (document.documentElement.scrollTop < 475 && this.state.isShowHead)
            this.setState({isShowHead: false})
    }

    clearEditInput() {
        this.setState({
            editInputValue: {
                name: '',
            }
        });
    }

    loadMovie = (id = this.props.match.params.id) => {
        this.props.dispatch({
            type: 'movie/fetchCurrent',
            payload: +id
        });
    };

    onLoadMore = () => {
        if (this.props.comments.page >= this.props.comments.pageSize) return;
        this.props.dispatch({
            type: 'movie/fetchComment',
            payload: {
                page: this.props.comments.page + 1,
                pageSize: this.props.comments.pageSize,
                movie_id: this.props.current.id
            }
        });
    };

    handleLike = () => {
        this.props.dispatch({
            type: 'movie/like',
            payload: {
                id: this.props.current.id
            }
        });
    };


    render() {
        const {current, comments, loading, user} = this.props;
        if (!current || !current.id)
            return null;

        const img = current.img && current.img.replace("w.h", '600.800');

        const loadMore =
            comments && comments.page < comments.totalPage ? (
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
                        <a onClick={this.onLoadMore}><Icon type="down-circle"/>&nbsp;加载更多影评</a>
                    </div>
            ) : null;

        const commentsBlock = comments ? <List
            loading={loading}
            loadMore={loadMore}
            itemLayout="horizontal"
            dataSource={comments.data}
            renderItem={item => (
                <Comment
                    className={styles.commentItem}
                    key={item.id}
                    actions={[
                        <Rate key="1" disabled allowHalf defaultValue={item.score / 2} style={{fontSize: 14}}/>
                    ]}
                    author={<a>{item.nick || '匿名用户'}</a>}
                    avatar={
                        <Avatar
                            src={item.avatarUrl}
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
        /> : null;


        return (
            <div className={styles.page}>
                {this.state.isShowHead ? <div className={styles.hd}></div> : null}
                <div className={styles.header}>
                    <img className={styles.headerImg} src={img}/>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <img src={img}/>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.rightTop}>
                            <div className={styles.name}>
                                {current.name || ''}
                            </div>
                            <div className={styles.engName}>
                                {current.eng_name || ''}
                            </div>
                            <div className={styles.tags}>
                                {(current.category || '').split(',').map(e => <span key={e}
                                                                                    className={styles.tag}>{e}</span>)}
                            </div>
                            <div className={styles.desc}>
                                {current.description || ''}
                            </div>
                        </div>
                        <div className={styles.funcbar}>
                            <div className={styles.score}>
                                <Rate allowHalf className={styles.scores} defaultValue={Math.floor(current.score) / 2} disabled/>
                                <span className={styles.scoreNum}>{current.score || 0}</span>&nbsp;&nbsp;/10
                                <span className={styles.scoreCount}>{(current.score_count || 0)} 人参与评分</span>
                            </div>
                            {user?
                            <div className={styles.funcbarRight}>
                                <Icon className={styles.func} onClick={this.handleLike} type="heart"/>
                                <Icon className={styles.func} onClick={this.handleEditStart} type="edit"/>
                            </div>:null}
                        </div>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.left}>
                        <div className={styles.head}>影评
                            <Icon className={styles.headIcon} type="container"/>
                        </div>
                        <div className={styles.comments}>
                            {comments?commentsBlock:null}
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.head}>影片信息
                            <Icon className={styles.headIcon} type="question-circle"/>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.left}>导&nbsp;&nbsp;&nbsp;演</div>
                            <div className={styles.right}>{current.director || 'N/A'}</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.left}>主&nbsp;&nbsp;&nbsp;演</div>
                            <div className={styles.right}>{current.star || 'N/A'}</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.left}>上映日期</div>
                            <div className={styles.right}>{current.release_day?moment(current.release_day).format('YYYY-MM-DD') : ''}</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.left}>语&nbsp;&nbsp;&nbsp;言</div>
                            <div className={styles.right}>{current.ori_lang || ''}</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.left}>时&nbsp;&nbsp;&nbsp;长</div>
                            <div className={styles.right}>{current.duration || 0} 分钟</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.left}>版&nbsp;&nbsp;&nbsp;本</div>
                            <div className={styles.right}>{current.version || '-'}</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.left}>制片国家</div>
                            <div className={styles.right}>{current.source || '-'}</div>
                        </div>
                    </div>
                </div>
                {this.state.editInputValue?
                <Modal
                    title='发表影评'
                    visible={this.state.editModalVisible}
                    onOk={this.handlePost}
                    onCancel={() => this.handleEditModalVisible()}
                >
                    <Form.Item
                        required
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 18 }}
                        label="评分"
                    >
                        <Rate allowHalf defaultValue={this.state.editInputValue.score / 2}
                              onChange={e => this.handleEditInput('score', Math.round(e*2))}/>

                    </Form.Item>
                    <Form.Item
                        required
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 18 }}
                        label="影评"
                    >
                        <Input.TextArea style={{lineHeight:'20px'}} placeholder="请输入影评" onChange={e => this.handleEditInput('content', e.target.value)}
                                        autosize={{ minRows: 6, maxRows: 6 }}
                        />
                    </Form.Item>
                </Modal>:null}
            </div>
        );
    }
}

export default withRouter(connect(state => ({
    current: state.movie.current,
    comments: state.movie.comments,
    loading: state.movie.loading,
    user: state.user.id,
}))(MoviePage));
