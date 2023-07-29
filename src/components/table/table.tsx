import React, {useState} from 'react';
import type {TableProps} from 'antd';
import {Button, Space, Table} from 'antd';
import type {ColumnsType, SorterResult} from 'antd/es/table/interface';
import {UserDomainType} from "../../model/users/users-slice";
import {createDate} from "../../common/utils/createDate";
import {createBirthdayDate} from "../../common/utils/creat-birthday-date";
import {useAppSelector} from "../../common/hooks";


export const UsersTable: React.FC = () => {
    const [sortedInfo, setSortedInfo] = useState<SorterResult<UserDomainType>>({});
     const data = useAppSelector((state) => state.users.users);
    const handleChange: TableProps<UserDomainType>['onChange'] = (pagination, filters, sorter) => {
        setSortedInfo(sorter as SorterResult<UserDomainType>);
    };
    const handleDelete = (record: UserDomainType) => {
        console.log('sadas')
    };



    const columns: ColumnsType<UserDomainType> = [
        {
            title: 'RowHead',
            dataIndex: 'key',
            rowScope: 'row',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Date of Birth',
            dataIndex: 'date',
            key: 'date',
            render: (date) => createBirthdayDate(new Date(date)),
            sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            sortOrder: sortedInfo.columnKey === 'dateOfBirth' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Date Created',
            dataIndex: 'created',
            key: 'created',
            render: (date) => createDate(new Date(date)),
            sorter: (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime(),
            sortOrder: sortedInfo.columnKey === 'created' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Date Updated',
            dataIndex: 'updated',
            key: 'updated',
            render: (date) => createDate(new Date(date)),
            sorter: (a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime(),
            sortOrder: sortedInfo.columnKey === 'updated' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space>
                    <Button onClick={() => handleDelete(record)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={data} onChange={handleChange}/>
        </>
    );
};
