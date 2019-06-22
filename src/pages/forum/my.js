import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Card, Icon, Input, List, PageHeader} from 'antd';
import withRouter from 'umi/withRouter';
import styles from './index.less'
import router from 'umi/router';

const Search = Input.Search

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
        this.loadForums();
    }


    handleLike = (id) => {
        this.props.dispatch({
            type: 'forum/like',
            payload: {
                id
            }
        });
    };


    loadForums = () => {
        this.props.dispatch({
            type: 'forum/fetchLiked'
        });
    };

    render() {
        const {forum} = this.props;
        if (!forum || !forum.list)
            return null;

        const {loading} = forum;

        return <div>
            <div className={styles.hd}></div>
            <div className={styles.hds}></div>
            <div className={styles.content}>
                <div className={styles.contentHeader}>
                    <PageHeader onBack={() => router.goBack()}
                                title='我喜欢的讨论组'
                                subTitle={`共收藏 ${forum.list.length || 0} 个讨论组`}/>

                </div>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 4,
                        xxl: 6,
                    }}
                    dataSource={forum.list}
                    renderItem={item => (
                        <List.Item>
                            <Card>{item.name}&nbsp;<a onClick={() => this.handleLike(item.id)}><Icon type="delete"/></a></Card>
                        </List.Item>
                    )}
                />,
            </div>
        </div>
    }
}

export default withRouter(connect(state => ({
    forum: state.forum,

}))(Movie));
