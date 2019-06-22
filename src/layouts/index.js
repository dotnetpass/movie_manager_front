import styles from './index.less';
import {Avatar, BackTop, Dropdown, Menu} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import router from 'umi/router';

import logo from '../assets/logo.png';
import React from "react";

function BasicLayout(props) {
    const {user} = props
    const menu = <Menu style={{width: 150, marginTop: 10}}>
        <Menu.Item key="1" onClick={() => router.push('/movie/my')}>
            我喜爱的电影
        </Menu.Item>
        <Menu.Item key="2" onClick={() => router.push('/forum/my')}>
            我喜爱的讨论组
        </Menu.Item>
        <Menu.Item key="0" onClick={() => props.dispatch({type: 'user/logout'})}>
            注销
        </Menu.Item>
    </Menu>
    return (
        <div className={styles.normal}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <img src={logo} className={styles.logo} onClick={() => router.push('/')}/>
                </div>
                {user && user.id ?
                    <div className={styles.right}>
                        <div className={styles.item}>
                            <Dropdown overlay={menu}>
                                <span>
                            <Avatar src={user.avatar_url}
                                    alt={user.nick}/>
                                    &nbsp;&nbsp;{user.nick}
                                </span>
                            </Dropdown>
                        </div>
                    </div> :
                    <div className={styles.right}>
                        <div className={styles.item} onClick={() => router.push('/login')}>
                            登录
                        </div>
                        <div className={styles.item} onClick={() => router.push('/register')}>
                            注册
                        </div>
                    </div>
                }
            </div>
            <div className={styles.content}>
                <BackTop/>
                {props.children}
            </div>
        </div>
    );
}

export default withRouter(connect(state => ({
    user: state.user
}))(BasicLayout));
