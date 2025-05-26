import React, { useEffect, useState } from 'react';
import { useFetchData } from '../../../hooks/useFetch';
import { Table } from 'antd';
import Loading from '../../../Shared/Loading/Loading';

const ContactUsDashboard = () => {
    const { Data: ContuctUsData, setData: setContuctUsData, fetchData } = useFetchData("dashboard/contact-us", "ContactUs");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then(() => {
            setLoading(false); // Set loading to false AFTER fetching data
        });
        console.log(ContuctUsData);
    }, [])

    const columns = [

        {
            title: 'الكود',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'الاسم',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'الرساله ',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: ' البريد الالكتروني',
            dataIndex: 'email',
            key: 'email',
        },
    
        // {
        //     title: 'الحالة',
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (status) => <span style={{ color: status === "1" ? "green" : status === "0" ? "blue" : "red" }}>{status}</span>
        // }

      

    ];

    if (loading) return <Loading />; // Show Loading spinner

    return (
        <>
            <h1 className='text-center mainFont'>بيانات الاشخاص المتصله معنا </h1>
            <div className='mt-3' style={{ direction: "rtl" }}>
                {Array.isArray(ContuctUsData) && (
                    <Table pagination={ContuctUsData?.length > 5 ? { pageSize: 5 } : false} dataSource={ContuctUsData} columns={columns} />
                )}
            </div>




        </>
    );
}

export default ContactUsDashboard;
