import { Layout, Card, Statistic, List, Spin, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import CryptoContext from '../../context/context-crypto';

export default function AppSider(props) {

    const {loading, assets} = useContext(CryptoContext);

    const siderStyle = {
        width: '950px',
        padding: '1rem',
    }

    if (loading) {
        return <Spin fullscreen />
    }
    return(
        <Layout.Sider width={400} style={siderStyle} className='vsdsd'>
            {assets.map(asset => (
                <Card key={asset.id} style={{marginBottom: '1rem', width: '350px'}}>
                <Statistic
                    title={asset.currencyName}
                    value={asset.totalAmount}
                    precision={2}
                    valueStyle={{color: asset.grow ? '#3f8600' : '#cf1322'}}
                    prefix={ asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined/>}
                    suffix="$"/>
                    <List
                        size='small'
                        itemLayout="horizontal"
                        dataSource={[
                            {title: 'Total income: ', value: asset.totalProfit, needTag: true},
                            {title: 'Asset amount: ', value: asset.totalAmount, isPlain: true},
                        ]}
                        renderItem={(item, index) => (
                        <List.Item>
                            <span>{item.title}</span>
                            {item.needTag ? <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag> : ''}
                            {!item.isPlain ? 
                                <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                    {item.value.toFixed(2) + ' $'}
                                </Typography.Text> 
                                : <span>{item.value}</span>}
                        </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    )
}
