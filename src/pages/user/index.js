import { getUserList, userDelete, userUpdate } from "@/api";
import { Content } from "@/components";
import { USER_STATUS } from "@/constants";

import { useCurrentUser } from "@/utils/usehooks";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
    Button,
    Col,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Space,
    Table,
    Tag,
    message,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import styles from "./index.module.css";

const Option = Select.Option;

// 一个table只需要两个属性  一个datasource  一个columns  都是数组
const COLUMNS = [
    {
        title: "账号",
        dataIndex: "name",   //这个是datasource中对应每一行数据的每个属性的属性名， 也就是数据中的对应key
        key: "name",  //设置了上面这个dataIndex，这个就可以不设置了
        ellipsis: true,
        width: 200,
    },
    {
        title: "用户名",
        dataIndex: "nickName",
        key: "nickName",
        ellipsis: true,
        width: 200,
    },
    {
        title: "状态",
        dataIndex: "status",
        key: "status",
        ellipsis: true,
        width: 150,
        render: (text) =>  //生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引。这里当前行的值指的是datasource中的key对应dataIndex的值，也就是这一列对应的这一行的值，而当前行数据指的是这一行的所有数据，行索引就是这一行的索引
            text === "on" ? (
                <Tag color="green">正常</Tag>
            ) : (
                <Tag color="red">已禁用</Tag>
            ),
    },
    {
        title: "创建时间",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 200,
        render: (text) => {
            return dayjs(text).format("YYYY-MM-DD");  //这里用了dayjs这个库来格式化时间，这个库非常滴nice
        },
    },
];

export default function Book() {
    const [form] = Form.useForm();
    // const user = useCurrentUser();
    const [list, setList] = useState([]);

    // const [categoryList, setCategoryList] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
    });
    const [editData, setEditData] = useState({});
    const router = useRouter();

    const columns = [
        ...COLUMNS,
        {
            title: "操作",
            dataIndex: "",
            key: "action",
            render: (_, row) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => {
                            setEditData(row);
                            router.push(`/user/edit/${row._id}`);
                        }}
                    >
                        编辑
                    </Button>
                    <Button
                        type="link"
                        danger={row.status === USER_STATUS.ON}
                        onClick={() => {
                            handleStatusUpdate(row);
                        }}
                    >
                        {row.status === USER_STATUS.ON ? "禁用" : "启动"}
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => {
                            handleDeleteModal(row._id);
                        }}
                    >
                        删除
                    </Button>
                </Space>
            ),
        },
    ];

    const fetchData = useCallback(
        (search) => {
            const { name, status } = search || {};
            getUserList({
                current: pagination.current,
                pageSize: pagination.pageSize,
                ...(name && { name }),
                ...(status && { status }),
            }).then((res) => {

                console.log('%c [  ]-133', 'font-size:13px; background:pink; color:#bf2c9f;', res.data)
                setList(res.data);
                setTotal(res.total);
            });
        },
        [pagination]
    );

    useEffect(() => {
        fetchData();
    }, [fetchData, pagination]);

    const handleAdd = () => {
        router.push("/user/add");
    };

    const handleDeleteModal = (_id) => {
        Modal.confirm({
            title: "确认删除？",
            icon: <ExclamationCircleFilled />,
            okText: "确定",
            cancelText: "取消",
            async onOk() {
                await userDelete(_id);
                message.success("删除成功");
                fetchData(form.getFieldsValue());
            },
        });
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const handleSearchFinish = (values) => {
        fetchData(values);
    };

    const handleStatusUpdate = async (row) => {
        await userUpdate(row._id, {
            ...row,
            status: row.status === USER_STATUS.ON ? USER_STATUS.OFF : USER_STATUS.ON,
        });
        fetchData(form.getFieldsValue());
    };

    return (
        <>
            <Content
                title="用户列表"
                operation={
                    <Button type="primary" onClick={handleAdd}>
                        添加
                    </Button>
                }
            >
                <Form
                    form={form}
                    name="search"
                    className={styles.form}
                    onFinish={handleSearchFinish}
                >
                    <Row gutter={24}>
                        <Col span={5}>
                            <Form.Item name="name" label="名称">
                                <Input placeholder="请输入" allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="status" label="状态">
                                <Select placeholder="请选择" allowClear>
                                    <Option key={USER_STATUS.ON} value={USER_STATUS.ON}>
                                        正常
                                    </Option>
                                    <Option key={USER_STATUS.OFF} value={USER_STATUS.OFF}>
                                        禁用
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={9} style={{ textAlign: "left" }}>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button
                                style={{ margin: "0 8px" }}
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                清空
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <div className={styles.tableWrap}>
                    {/* 养成一个意识：数据库的数据一般都会有个_id标识，而前端组件中很多会要求有个key属性，有时候用这个数据库来的_id可以很方便的作为key */}
                    <Table
                        rowKey="_id"
                        dataSource={list}
                        columns={columns}
                        onChange={handleTableChange}
                        pagination={{
                            ...pagination,
                            total: total,
                            showTotal: () => `共 ${total} 条`,
                        }}
                    />
                </div>
            </Content>
        </>
    );
}
