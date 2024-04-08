import { useRef, useState } from "react";
import { Select, Space, Divider, Form, InputNumber, Button, DatePicker, Result } from 'antd';
import { useCryptoContext } from "../context/context-crypto";
import CoinInfoBlock from "./CoinInfoBlock";


export default function AddAssetForm({onClose}) {
    const [form] = Form.useForm();
    const {crypto, addAsset} = useCryptoContext();
    const [coin, setCoin] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const assetRef = useRef();

    if (isSubmit) {
        return(<Result
            status="success"
            title="Currency info has been successfully updated!"
            subTitle={`added ${assetRef.current.amount} of ${assetRef.current.id} by price ${assetRef.current.price}`}
            extra={[
            <Button type="primary" key="console" onClick={onClose}>
                Close Panel
            </Button>]}
        />)
    }

    if (!coin) {
        return(
            <Select
                style={{
                  width: '100%'
                }}
                placeholder="Select coin"
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
                onSelect={(v) => {setCoin(crypto.find(c => c.id === v))}}
            />
        )
    }
    
    const onFinish = (values) => {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date()
        }
        assetRef.current = newAsset;
        setIsSubmit(true);
        addAsset(newAsset);
    }

    function handleAmountChange(value) {
        form.setFieldsValue({
            total: (value * form.getFieldValue('price')).toFixed(2)
        })
    }

    function handlePriceChange(value) {
        form.setFieldsValue({
            total: (value * form.getFieldValue('amount')).toFixed(2)
        })
    }

    const validateMessages = {
        required: '${label} is required',
        types: {
            number: '${label} is not valid'
        },
        number: {
            range: '${label} must be a positive number'
        }
    }

    return (
    <Form
        form={form}
        name="basic"
        labelCol={{
        span: 4,
        }}
        wrapperCol={{
        span: 10,
        }}
        style={{
        maxWidth: 600,
        }}
        initialValues={{
            price: coin.price.toFixed(2),
            // total: coin.total
        }}
        onFinish={onFinish}
        validateMessages={validateMessages}>
        <CoinInfoBlock coin={coin} showSymbol={false}/>
        <Divider/>
        <Form.Item
            label="Amount"
            name="amount"
            rules={[
                {
                required: true,
                type: 'number',
                min: 0
                },
            ]}>
            <InputNumber placeholder='enter amount of currency' onChange={handleAmountChange} style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item
            label="Price"
            name="price">
            <InputNumber onChange={handlePriceChange} style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item
            label="Date & time "
            name="date">
            <DatePicker showTime />
        </Form.Item>
        <Form.Item
            label="Total"
            name="total">
            <InputNumber disabled style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">
                Add asset
            </Button>
        </Form.Item>
    </Form>);
}
