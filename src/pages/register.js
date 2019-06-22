import styles from "./login.less";
import {connect} from 'dva';
import React from "react";
import {Button, Icon, Input, Upload} from 'antd';

class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            password: '',
            avatar_url: null
        }
    }

    handleSubmit = _ => {
        this.props.dispatch({
            type: 'user/register',
            payload: this.state,
        })
    }

    render() {
        const uploadButton = (
            <div style={{width: 280, marginLeft: 0}}>
                <Icon type='plus' />
                <div className="ant-upload-text">上传头像</div>
            </div>
        );
        return <div className={styles.main}>
            <div className={styles.login}>用户注册</div>
            <div style={{width: 300}}>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={(e) => this.setState({avatar_url: e})}
            >
                {this.state.avatar_url ? <img src={this.state.avatarUrl} alt="avatar" /> : uploadButton}
            </Upload>
            </div>
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
                onChange={(e) => this.setState({nick: e.target.value})}
            />

            <Button size="large" type="primary" onClick={this.handleSubmit} style={{width: 300}}>
                注册
            </Button>
        </div>
    }
}

export default connect()(Login);