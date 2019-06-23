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

    handleChange = ({file, fileList}) => {
        const res = fileList.filter(e => e.status === 'done' && (e.origin || (!e.error && e.response && e.response.data && e.response.data.imgUrl)))
            .map(e => e.origin ? e.url : e.response.data.imgUrl);
        console.log(res)
        this.setState({avatar_url: res[0]})
    };

    render() {
        const uploadButton = (
            <div style={{width: 280, marginLeft: 0}}>
                <Icon type='plus'/>
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
                    action="https://weapp.gene.xluyun.com/upload"
                    onChange={this.handleChange}
                >
                    {this.state.avatar_url ? <img src={this.state.avatar_url} style={{width: 100, height: 100}}alt="avatar"/> : uploadButton}
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
                onChange={(e) => this.setState({password: e.target.value})}
            />

            <Button size="large" type="primary" onClick={this.handleSubmit} style={{width: 300}}>
                注册
            </Button>
        </div>
    }
}

export default connect()(Login);