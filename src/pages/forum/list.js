import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Card, Icon, Input, List, PageHeader} from 'antd';
import withRouter from 'umi/withRouter';
import styles from './index.less'
import router from 'umi/router';
import top from "@/assets/dis.jpg";

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
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.query.query !== this.props.location.query.query) {
            this.loadForums(nextProps.location.query.query);
        }
    }

    loadForums = (query = this.props.location.query.query) => {
        this.props.dispatch({
            type: 'forum/fetchList',
            payload: {query}
        });
    };

    handleSearch = () => {
        router.push(`/forum/list?query=${this.state.query || ''}`)
    };

    render() {
        const {forum} = this.props;
        if (!forum || !forum.list)
            return null;

        const {loading} = forum;

        return <div>
            <div className={styles.header}>
                <img className={styles.headerImg} src={top}/>
            </div>
            <div className={styles.headerContent}>
                <div className={styles.search}>
                    搜索讨论组
                </div>

                <div className={styles.searchBar}>
                    <Search size="large" placeholder="输入讨论组名" enterButton
                            onChange={(e) => this.handleEditInput('query', e.target.value)}
                            onSearch={this.handleSearch}
                            value={this.state.query !== undefined ? this.state.query : (forum.data.name || '')}/>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.contentHeader}>
                    <PageHeader onBack={() => router.goBack()}
                                title={`搜索讨论组 ${this.props.location.query.query}`}
                                subTitle={`共找到 ${forum.list.length || 0} 个讨论组`}/>

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
                            <Card>{item.name}</Card>
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
