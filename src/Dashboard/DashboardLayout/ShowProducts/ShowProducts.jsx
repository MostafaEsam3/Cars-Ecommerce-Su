import React from 'react'
import { Table } from 'antd'
import img from "./../../../assets/g27cq4-500x500 1.png"
import { Link } from 'react-router-dom';

export default function ShowProducts() {

    const dataSource = [
        {
            key: '1',
            Product: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            Product: 'John',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '2',
            Product: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Product',
            dataIndex: 'Product',
            key: 'Product',
            render: (Product) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={img}
                        alt="avatar"
                        style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }}
                    />
                    {Product}
                </div>
            ),

        },
        {
            title: 'Price',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Quantity',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Subtotal',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'update',
            dataIndex: 'address',
            key: 'address',
            render: (address) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <img
                        src={img}
                        alt="avatar"
                        style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }}
                    /> */}
                    <button className="btn btn-success">
                        <i className="fa fa-pencil"></i>
                    </button>
                    <Link to={`/sign/${address}`}>
                        <button className="btn btn-danger mx-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </Link>
                </div>
            ),

        },

    ];
    const rowClassName = (record, index) => {
        // Alternate row background color
        return index % 2 === 0 ? 'black-row' : 'green-row';
    };
    return (
        <>
            <div className='mt-3 container'>
                <Table pagination={1} dataSource={dataSource} columns={columns} rowClassName={rowClassName}
                    components={{
                        header: {
                            cell: (props) => <th {...props} style={{}} />,
                        },
                    }}

                />
                <div className='d-flex justify-content-between align-items-center'>
                    <button className='btn btn- border-black rounded-0'>Return</button>
                    <button className='btn btn- border-black rounded-0'>Update</button>
                </div>
                <div className='mt-5  '>
                    <div className='row p-0 m-0 g-0 justify-content-between'>
                        <div className='col-12 col-md-5 d-flex mb-2 mb-md-0'>
                            <div className='w-50'>
                                <input type="text" name="" className='form-control  border-black rounded-0 ' id="" placeholder='Coupon Code' />
                            </div>
                            <div>
                                <button className='btn btn- border-black rounded-0 ms-2'>Apply Cupon    </button>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 p-3 border border-dark rounded-0">
                            <h5>Cart</h5>
                            {
                                dataSource.map((item, index) => {
                                    return (
                                        <div key={index}> {/* Add a unique key for each item */}
                                            <div className="d-flex align-items-center justify-content-between">
                                                {
                                                    index == 0 ? <span>Subtotal:</span> : index == 1 ? <span>shipping:</span> : <span>total:</span>
                                                }
                                                <span>1133$</span>
                                            </div>
                                            <div className="border-bottom border-2 border-dark rounded-0 my-2"></div> {/* Adds spacing between rows */}
                                        </div>
                                    );
                                })
                            }
                            <div className='m-auto text-center'>
                                <button className='btn btn-danger text-center'>Procees to checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}