import { Table, Popconfirm, Button } from 'antd';

interface Iprops {
    onDelete: Function;
    products: Array<object>
}

const ParamSetting = ({ onDelete, products }:Iprops) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render: (text, record) => {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];
  return (
    <div>
        <Table dataSource={products} columns={columns} /> 
        <p style={{height: '1200px'}}>123</p>
    </div>
    
    );
};

export default ParamSetting;