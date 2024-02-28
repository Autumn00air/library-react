import "@/styles/globals.css";
import { Layout } from "@/components";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import locale from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// 这段代码是 Next.js 应用的主入口点，也就是 _app.js 文件。在 Next.js 中，_app.js 文件用于初始化页面。你可以在这个文件中引入全局 CSS，设置布局，保持状态，添加额外的数据到页面等。

// 首先，这段代码导入了一个全局 CSS 文件。在 Next.js 中，只有在 _app.js 文件中才能导入全局 CSS。这个 CSS 文件会应用到你的整个应用。

// 然后，这段代码定义了一个名为 App 的 React 组件，并将其导出。这个 App 组件接收两个 props：Component 和 pageProps。

// Component 是一个 React 组件，它对应于你的页面。例如，如果你访问 /about，那么 Component 就是 about.js 文件导出的组件。

// pageProps 是一个对象，它包含了你的页面需要的初始 props。这些 props 是在你的页面的 getInitialProps 或 getServerSideProps 或 getStaticProps 函数中返回的。
const Spin = dynamic(() => import("antd/es/spin"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <>
      {/* 在这个例子中，我们动态导入了 antd 库中的 Spin 组件。Spin 组件是 Ant Design 的一个组件，用于显示加载状态。 */}
      {load ? (
        <ConfigProvider locale={locale}>
          {router.pathname === "/login" ? (
            <Component {...pageProps} />
          ) : (
            //这里相当于app路由里的layou.js
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ConfigProvider>
      ) : (
        <Spin className="loading" tip="Loading..." size="large" />
      )}
    </>
  );
}
