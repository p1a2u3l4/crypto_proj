import { Table } from 'antd';
import { useCryptoContext } from '../context/context-crypto';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Price, $',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.amount - b.amount,
    },
  ];

export default function AssetsTable({text}) {
    const {assets} = useCryptoContext();

    const data = assets.map(asset => ({
        key: asset.id,
        name: asset.id,
        price: asset.price,
        amount: asset.amount
    }))

    return(
      <div>
        <Table 
          pagination={false} 
          columns={columns} 
          dataSource={data} />
      </div>
    )
}
