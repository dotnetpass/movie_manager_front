import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Button, Input, PageHeader} from 'antd';
import styles from './index.less'
import router from 'umi/router';
import withRouter from 'umi/withRouter';

import top from '@/assets/dis.jpg'

const Search = Input.Search


class Forum extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            name: '',
            description: ''
        };
    }

    componentDidMount() {
        if (!this.props.user.id) {
            router.replace('/login')
        }
    }

    handleEditInput = (name, e) => {
        this.setState({
            [name]: e
        });
    };

    handleSearch = () => {
        router.push(`/forum/${this.state.query || ''}`)
    };

    handleCreate = () => {
        this.props.dispatch({
            type: 'forum/create',
            payload: {
                publisher: this.props.user.id,
                name: this.state.name || this.props.location.query.query || '',
                description: this.state.description
            }
        })
    }

    render() {
        return (<div>
                <div className={styles.header}>
                    <img className={styles.headerImg} src={top}/>
                </div>
                <div className={styles.headerContent}>
                    <div className={styles.search}>
                        进入讨论组
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
                                    title='新建讨论组'
                        />

                    </div>
                    <div className={styles.newMain}>
                        <div>您正在创建讨论组，请输入相关信息：</div>
                        <div>
                            <Input
                                defaultValue={this.props.location.query.query || ''}
                                addonBefore="讨论组名"
                                style={{marginTop: 10}}
                                placeholder="讨论组名"
                                onChange={(e) => this.setState({name: e.target.value})}
                            />
                        </div>
                        <div>
                            <Input.TextArea
                                style={{marginTop: 10, marginBottom: 10}}
                                placeholder="讨论组简介"
                                onChange={(e) => this.setState({description: e.target.value})}
                            />
                        </div>
                        <Button onClick={this.handleCreate}>创建讨论组</Button>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(connect(state => ({
    forum: state.forum,
    user: state.user
}))(Forum));
