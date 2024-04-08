import { Typography, Flex } from 'antd';

export default function CoinInfoBlock({coin, showSymbol}) {
    return(
        <Flex align="center">
            <img src={coin.icon} alt={coin.name} style={{width: 40, marginRight: 10}}/>
            <Typography.Title level={2} style={{margin: 0}}>{showSymbol ? '(' + coin.symbol + ')' : ''} {coin.name}</Typography.Title>
        </Flex>
    )
}
