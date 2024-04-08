import {Layout, Button, Modal, Drawer, Select, Space} from 'antd';
import { useCryptoContext } from '../../context/context-crypto';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';


const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'gray'
}

export default function AppHeader(props) {
    const { crypto } = useCryptoContext();
    const [selectVal, setSelectVal] = useState(false);
    const [modal, setModal] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [coin, setCoin] = useState(null);

    function handleSelect(val) {
        setCoin(crypto.find(c => c.id === val));
        setModal(true);
        
    }

    
    const keyPressCb = (e) => {
        if (e.key === '/') {
            setSelectVal(prev => !prev);
        }
    }

    useEffect(() => {
        document.addEventListener('keypress', keyPressCb);
        return () => {
            document.removeEventListener('keypress', keyPressCb);
        }
    }, [])

    return(
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                  width: 350,
                }}
                open={selectVal}
                value="press / to open"
                optionLabelProp="label"
                options={crypto.map(c => ({
                    label: c.name,
                    value: c.id,
                    icon: c.icon})
                )}
                optionRender={(option) => (
                  <Space>
                    <img src={option.data.icon} alt={option.data.label} style={{width: '20px', height: 'auto'}}/>{option.data.label}
                  </Space>
                )}
                onSelect={handleSelect}
                onClick={() => setSelectVal(prev => !prev)}
            />
            <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>
            <Modal  
                open={modal}
                onOk={() => setModal(false)}
                onCancel={() => setModal(false)}
                footer={null}>
                <CoinInfoModal coin={coin}/>
            </Modal>
            <Drawer 
                width={600} 
                title="Add Asset" 
                onClose={() => setDrawer(false)} 
                open={drawer} 
                destroyOnClose>
                <AddAssetForm onClose={() => setDrawer(false)}/>
            </Drawer>
        </Layout.Header>
    )
}
