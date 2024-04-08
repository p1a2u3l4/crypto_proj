import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppSider from './AppSider';
import { useContext } from 'react';
import CryptoContext from '../../context/context-crypto';

import { Layout, Spin } from 'antd';

export default function AppLayout() {
    const {loading} = useContext(CryptoContext);
    if (loading) {
        return <Spin fullscreen />
    } else return(
        <Layout>
            <AppHeader/>
            <Layout>
                <AppSider/>
                <AppContent/>
            </Layout>
            <Layout.Footer>footer</Layout.Footer>
        </Layout>
    )
}
