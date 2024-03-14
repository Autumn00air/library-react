import request from "@/utils/request";
import Icon from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import classnames from "classnames";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "./index.module.css";
import axios from "axios";

export default function Login() {
    const router = useRouter();
    const onFinish = async (values) => {
        try {
            //这是个单独的axios请求，不是走的request实例
            // const res = await request.post("/api/login", values);
            const res = await axios.post("/api/login",
                values,
                { withCredentials: false }
            );
            console.log(
                "%c [ res ]-17",
                "font-size:13px; background:pink; color:#bf2c9f;",
                res
            );
            localStorage.setItem("user", JSON.stringify(res.data));
            message.success("登陆成功");
            router.push("/book");
        } catch (error) {
            message.success("登录失败");
            console.error(error);
        }
    };

    return (
        <>
            <Head>
                <title>登陆</title>
                <meta name="description" content="图书管理系统" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <main className={styles.main}>
                    <header className={styles.header}>
                        {/* <Image
                        className={styles.img}
                        width={100}
                        height={100}
                        src="/logo.svg"
                        alt="logo"
                    /> */}
                        图书管理系统
                    </header>
                    <div className={styles.form}>
                        <Form
                            name="basic"
                            initialValues={{ name: "", password: "" }}
                            onFinish={onFinish}
                            layout="vertical"
                            autoComplete="off"
                            size="large"
                        >
                            <Form.Item
                                name="name"
                                label={<span className={styles.label}>账号</span>}
                                rules={[{ required: true, message: "请输入用户名啊" }]}
                            >
                                <Input placeholder="请输入用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label={<span className={styles.label}>密码</span>}
                                rules={[{ required: true, message: "别忘了输入密码哟" }]}
                            >
                                <Input.Password placeholder="请输入密码" />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    className={classnames(styles.btn, styles.loginBtn)}
                                    size="large"
                                >
                                    登陆
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </main>
            </body>
        </>
    );
}
