这个项目是B站三木图书馆的一个项目，原本是ts做的，我将它用js复刻了一遍，其中特别要注意的是这个项目使用的是页面路由，现在最新使用的是应用路由，而本人第一次敲的时候，没有将原作者的package.json复制下来，选择了自己安装，但是运行的时候，antd库报了SyntaxError: Cannot use import statement outside a module这个错误，耗费了大量时间去配置启动文件以及动态导入等等仍然没有解决。

然后本人用create-next-app就单纯创建了两个项目，其中一个使用的是应用路由，另外一个使用的是页面路由，然后试着用es6模块，（比如import {}引入，export导出这种）引入自己写的组件，发现都没有问题啊，然后引入antd库，页面路由的报错了，但是应用路由没问题。

最后一想，不会它喵的是库的版本问题吧，于是尝试着将next.js和antd分别降级，最后发现当next.js从最新的14降到了原作者写的时候的13之后，就没报错了

引以为鉴啊~引以为鉴。。

所以如果失败了，可以使用我的package.json

另外原作者的登录鉴权部分没写好，没有首页的重定向，还有首页删掉了index.js，布局有点小问题，（无冒犯之意哦，只是自己的标注）后面有空我再改改。

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
