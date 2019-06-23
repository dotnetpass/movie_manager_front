import styles from "./login.less";
import {connect} from 'dva';
import React from "react";
import {Button, Icon, Input} from 'antd';

class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            password: ''
        }
    }

    handleSubmit = _ => {
        this.props.dispatch({
            type: 'user/login',
            payload: this.state,
        })
    }

    render() {
        return <div className={styles.main}>
            <div className={styles.login}>用户登录</div>
            <Input
                size="large"
                style={{width: 300}}
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="用户名"
                onChange={(e) => this.setState({nick: e.target.value})}
            />
            <Input
                size="large"
                style={{width: 300, marginTop: 10, marginBottom: 10}}
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                placeholder="密码"
                onChange={(e) => this.setState({password: e.target.value})}
            />

            <Button size="large" type="primary" onClick={this.handleSubmit} style={{width: 300}}>
                登录
            </Button>
        </div>
    }
}

export default connect()(Login);