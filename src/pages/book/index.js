import { bookDelete, getBookList, getCategoryList } from "@/api";
import { AuthHoc, Content } from "@/components";
import { USER_ROLE } from "@/constants";
import { useCurrentUser } from "@/utils/usehooks";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
    Button,
    Col,
    Form,
    Input,
    Modal,
    Popover,
    Row,
    Select,
    Space,
    Table,
    TablePaginationConfig,
    Tag,
    Tooltip,
    message,
} from "antd";
import Image from "next/image";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./index.module.css";

const Option = Select.Option;

const COLUMNS = [
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
        ellipsis: true,
        width: 200,
    },
    {
        title: "封面",
        dataIndex: "cover",
        key: "cover",
        ellipsis: true,
        width: 120,
        render: (text) => (

            <Image
                // <img
                alt=""
                width={50}
                height={50}
                src={
                    text
                        ? text
                        : "https://cdn.pixabay.com/photo/2023/10/20/19/25/moon-8330104_1280.png"
                }
            />
        ),
    },
    {
        title: "作者",
        dataIndex: "author",
        key: "author",
        ellipsis: true,
        width: 150,
    },
    {
        title: "分类",
        dataIndex: "category",
        key: "category",
        ellipsis: true,
        width: 80,
        render: (text) =>
            text ? <Tag color="blue">{text.name}</Tag> : "-",
    },
    {
        title: "描述",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
        render: (text) => (
            <Tooltip placement="topLeft" title={text}>
                {text}
            </Tooltip>
        ),
    },
    {
        title: "库存",
        dataIndex: "stock",
        width: 80,
        key: "stock",
    },
    {
        title: "创建时间",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 130,
        render: (text) => dayjs(text).format("YYYY-MM-DD"),
        // render: (text) => text,
    },
];

export default function Book() {
    const [form] = Form.useForm();
    const user = useCurrentUser();
    const [list, setList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
    });
    const router = useRouter();

    const columns =
        user?.data.role === USER_ROLE.ADMIN
            ? [
                ...COLUMNS,
                {
                    title: "操作",
                    dataIndex: "",
                    key: "action",
                    render: (_, row) => (
                        <Space>
                            <Button
                                type="link"
                                block
                                onClick={() => {
                                    router.push(`/book/edit/${row._id}`);
                                }}
                            >
                                编辑
                            </Button>
                            <Button
                                type="link"
                                danger
                                block
                                onClick={() => {
                                    handleDeleteModal(row._id);
                                }}
                            >
                                删除
                            </Button>
                        </Space>
                    ),
                },
            ]
            : COLUMNS;

    const fetchData = useCallback(
        (search) => {
            const { name, category, author } = search || {};
            getBookList({
                current: pagination.current,
                pageSize: pagination.pageSize,
                name,
                category,
                author,
            }).then((res) => {
                console.log('%c [  ]-159', 'font-size:13px; background:pink; color:#bf2c9f;', res.data)
                setList(res.data);
                setTotal(res.total);
            });
        },
        [pagination]
    );

    useEffect(() => {
        fetchData();
    }, [fetchData, pagination]);

    useEffect(() => {
        (async function () {
            getCategoryList({ all: true }).then((res) => {
                setCategoryList(res.data);

                console.log('%c [  ]-175', 'font-size:13px; background:pink; color:#bf2c9f;', res.data)
            });
        })();
    }, []);

    const handleBookAdd = () => {
        router.push("/book/add");
    };

    const handleDeleteModal = (id) => {
        Modal.confirm({
            title: "确认删除？",
            icon: <ExclamationCircleFilled />,
            okText: "确定",
            cancelText: "取消",
            async onOk() {
                try {
                    await bookDelete(id);
                    message.success("删除成功");
                    fetchData(form.getFieldsValue());
                } catch (error) {
                    console.error(error);
                }
            },
        });
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const handleSearchFinish = (values) => {
        fetchData(values);
    };

    return (
        <Content
            title="图书列表"
            operation={
                <AuthHoc>
                    <Button type="primary" onClick={handleBookAdd}>
                        添加
                    </Button>
                </AuthHoc>
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
                            <Input placeholder="请输入" />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="author" label="作者">
                            <Input placeholder="请输入" />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="category" label="分类">
                            <Select placeholder="请选择" allowClear>
                                {categoryList.map((category) => (
                                    <Option key={category._id} value={category._id}>
                                        {category.name}
                                    </Option>
                                ))}
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
                <Table
                    size="large"
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
    );
}
