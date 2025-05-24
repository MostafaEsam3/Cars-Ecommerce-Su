import React, { useEffect, useState } from 'react';
import { useFetchData } from '../../../hooks/useFetch';
import { Table } from 'antd';
import Loading from '../../../Shared/Loading/Loading';

const Order = () => {
    const { Data: OrderData, setData: setOrderData, fetchData } = useFetchData("http://127.0.0.1:8000/dashboard/orders", "OrderData");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then(() => {
            setLoading(false); // Set loading to false AFTER fetching data
        });
        console.log(OrderData);
    }, [])

    const columns = [

        {
            title: 'الكود',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'العنوان ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'صوره المنتج',
            dataIndex: 'model_image',
            key: 'model_image',
            render: (model_image) => <img src={`${model_image}`} alt="model_image" style={{ width: '50px' }} />
        },
        {
            title: 'التاريخ',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'الحالة',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <span style={{ color: status === "1" ? "green" : status === "0" ? "blue" : "red" }}>{status}</span>
        }

        // {
        //     title: 'تحديث',
        //     dataIndex: 'id',
        //     key: 'id',
        //     render: (id,{paneling_id,is_connect,brand_id,model_id,price,car_chairs}) => (
        //         <div style={{ display: 'flex', alignItems: 'center' }}>
        //             <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#editSpecify" onClick={() => collectedDataToEdit(id,
        //             {"paneling_id":paneling_id,
        //             "brand_id":brand_id,
        //              id:id,
        //              "model_id":model_id,
        //              "price":price,
        //              "is_connect":is_connect,
        //              "car_chairs":car_chairs


        //         }
        //                 )
        //                 } >
        //                 <i className="fa fa-pencil"></i>
        //             </button>
        //                 <button className="btn btn-danger mx-2"  onClick={() => deleteCategoryWithConfirmation(id)}> 
        //                     <i className="fa fa-trash"></i>
        //                 </button>
        //         </div>
        //     ),

        // },

    ];

    if (loading) return <Loading />; // Show Loading spinner

    return (
        <>
            <h1 className='text-center mainFont'>تتبع الاوردرات</h1>
            <div className='mt-3' style={{ direction: "rtl" }}>
                {Array.isArray(OrderData) && (
                    <Table pagination={OrderData?.length > 5 ? { pageSize: 5 } : false} dataSource={OrderData} columns={columns} />
                )}
            </div>




        </>
    );
}

export default Order;
