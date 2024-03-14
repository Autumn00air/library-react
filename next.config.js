// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   //这个是URL重写的配置，将/api/开头的请求重写到http://localhost:3001/api/下，主要是给开发环境使用的，生产环境下是不需要的，生产环境下可能会使用nginx做代理
//   async rewrites() {
//     return [
//       {

//         source: '/api/:path*',

//         //如果有本地的node.js后端，比如express搭建的后端，使用这个
//         destination: 'http://localhost:3001/api/:path*',

//         //如果没有本地的node.js后端，使用mock服务来模拟，使用这个
//         destination: `https://mock.apifox.cn/m1/2398938-0-default/api/:path*`,
//       },
//     ]
//   }
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: `/api/:path*`,
  //       // 启动mock服务，执行这个代码
  //       // destination: `http://localhost:3001/api/:path*`,
  //       // 连接本地的nodejs服务，执行这个代码
  //       destination: `https://mock.apifox.cn/m1/2398938-0-default/api/:path*`,
  //     },
  //   ]
  // },
  //这个重定向，只是客户端请求的重定向，是解决不了跨域问题的
  // async redirects() {
  //   return [
  //     {
  //       source: `/api/:path*`,
  //       destination: 'http://127.0.0.1:3005/api/:path*',
  //       permanent: false,
  //     },
  //   ]
  // },
  // 这个重写才是真正的服务端帮你解决跨域问题，重新转发
  async rewrites() {
    return [
      //接口请求 前缀带上/api-text/
      // { source: `/api/:path*`, destination: `http://127.0.0.1:3001/api/:path*` },
      {
        source: `/api/:path*`,
        destination: `http://127.0.0.1:3005/api/:path*`
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.**',
      },
    ],
  },
  // images: {
  //   domains: ['img1.doubanio.com'],
  // },
}

module.exports = nextConfig

//不，Next.js 的配置文件 next.config.js 或 next.config.mjs 必须位于项目的根目录，而不是 src 文件夹或其他任何子目录。Next.js 在启动时会自动在项目的根目录下查找这个文件，如果它在其他位置，Next.js 将无法找到并加载它。

//next.config.js 和 next.config.mjs 都是 Next.js 项目的配置文件，它们的功能是一样的，主要的区别在于它们使用的 JavaScript 模块系统不同。

// next.config.js 使用的是 CommonJS 模块系统，这是 Node.js 的默认模块系统。在 CommonJS 中，我们使用 require 来导入模块，使用 module.exports 来导出模块。

// next.config.mjs 使用的是 ES Modules 模块系统，这是 ECMAScript 的官方模块系统。在 ES Modules 中，我们使用 import 来导入模块，使用 export 来导出模块。

// next.config.js 或 next.config.mjs 文件是 Next.js 框架自动导入的，你不需要在你的代码中手动导入它。

// 当你启动 Next.js 应用时（例如，通过运行 next dev 或 next build），Next.js 会在项目的根目录下查找 next.config.js 或 next.config.mjs 文件。如果找到了这个文件，Next.js 就会自动导入它，并使用它来配置你的 Next.js 应用。

//这段代码是 Next.js 的配置文件，其中定义了一个 rewrites 函数，该函数用于重写请求的 URL。在这个例子中，所有以 /api/ 开头的请求都会被重定向到 https://mock.apifox.cn/m1/2398938-0-default/api/。




// 这种重写通常在开发环境中使用，以便将请求重定向到模拟（mock）服务器或本地的开发服务器。这样可以方便地模拟和测试 API 的行为，而无需实际连接到生产服务器。

// 在生产环境中，通常会使用反向代理服务器（如 Nginx）来处理这种 URL 重写和请求转发。Nginx 可以提供更强大和灵活的 URL 重写规则，同时还可以处理负载均衡、SSL 终止等其他任务。

// 所以，这段代码通常只在开发环境中使用，而在生产环境中，你可能会使用 Nginx 或其他反向代理服务器来处理 URL 重写和请求转发。