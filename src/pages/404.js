import React from 'react';
import { Empty, Button } from 'antd';
import router from 'umi/router';

const Exception404 = () => (
    <div>
        <div style={{height: 80, marginBottom: 40, background: 'black'}}></div>
    <Empty
        description="找不到内容"
    >
        <Button type="primary" onClick={()=>router.replace('/')}>返回首页</Button>
    </Empty>
    </div>
);

export default Exception404;
