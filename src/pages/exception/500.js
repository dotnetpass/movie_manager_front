import React from 'react';
import { Empty, Button } from 'antd';

const Exception500 = () => (
    <Empty
        description="服务器错误"
    >
        <Button type="primary">返回首页</Button>
    </Empty>
);

export default Exception500;
