import React from 'react';
import { Empty, Button } from 'antd';

const Exception403 = () => (
    <Empty
        description="无权查看内容"
    >
        <Button type="primary">返回首页</Button>
    </Empty>
);

export default Exception403;
