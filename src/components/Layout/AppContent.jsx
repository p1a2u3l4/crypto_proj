import {Layout, Typography} from 'antd';
import { useCryptoContext } from '../../context/context-crypto';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: 'black',
    backgroundColor: 'white',
    padding: '1rm'
}

export default function AppContent({text}) {
    const { assets, crypto } = useCryptoContext();
    return(
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{textAlign: 'center'}}>My portfolio: {assets.map(asset => {
                const coin = crypto.find(c => c.id === asset.id);
                return asset.amount * coin.price;
            }).reduce((acc, curr) => acc + curr, 0).toFixed(2)}$
            </Typography.Title>
            <PortfolioChart />
            <AssetsTable />
        </Layout.Content>
    )
}
