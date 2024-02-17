import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* 这两个组件是用来渲染页面的，不需要修改 */}

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
