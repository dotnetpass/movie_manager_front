import React from 'react';
import { Empty, Button } from 'antd';

const Exception404 = () => (
    <Empty
        description="找不到内容"
    >
        <Button type="primary">返回首页</Button>
    </Empty>
);

export default Exception404;
