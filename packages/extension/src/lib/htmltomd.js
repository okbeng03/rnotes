import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const turndownService = new TurndownService();
turndownService.use(gfm);

// const md = turndownService.turndown(`
// <div className="content">
//   <h2 id="recommended-toolchains"><a href="#recommended-toolchains" aria-hidden="" className="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>推荐的工具链 </h2>
//   <p>React 团队主要推荐这些解决方案：</p>
//   <ul>
//   <li>如果你是在<strong>学习 React</strong> 或<strong>创建一个新的<a href="/docs/glossary.html#single-page-application">单页</a>应用</strong>，请使用 <a href="#create-react-app">Create React App</a>。</li>
//   <li>如果你是在<strong>用 Node.js 构建服务端渲染的网站</strong>，试试 <a href="#nextjs">Next.js</a>。</li>
//   <li>如果你是在构建<strong>内容主导的静态网站</strong>，试试 <a href="#gatsby">Gatsby</a>。</li>
//   <li>如果你是在打造<strong>组件库</strong>或<strong>将 React 集成到现有代码仓库</strong>，尝试<a href="#more-flexible-toolchains">更灵活的工具链</a>。</li>
//   </ul>
//   <h3 id="create-react-app"><a href="#create-react-app" aria-hidden="" className="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Create React App </h3>
//   <p><i></i><a href="https://github.com/facebookincubator/create-react-app" target="_blank" rel="nofollow noopener noreferrer">Create React App</a> 是一个用于<strong>学习 React</strong> 的舒适环境，也是用 React 创建<strong>新的<a href="/docs/glossary.html#single-page-application">单页</a>应用</strong>的最佳方式。</p>
//   <p>它会配置你的开发环境，以便使你能够使用最新的 JavaScript 特性，提供良好的开发体验，并为生产环境优化你的应用程序。你需要在你的机器上安装 <a href="https://nodejs.org/en/" target="_blank" rel="nofollow noopener noreferrer">Node &gt;= 14.0.0 和 npm &gt;= 5.6</a>。要创建项目，请执行：</p>
//   <div className="gatsby-highlight" data-language="bash"><pre className="gatsby-code-bash"><code className="gatsby-code-bash">npx create-react-app my-app
//   <span className="token builtin class-name">cd</span> my-app
//   <span className="token function">npm</span> start</code></pre></div>
//   <blockquote>
//     <p>注意</p>
//     <p>第一行的 <code className="gatsby-code-text">npx</code> 不是拼写错误 —— 它是 <a href="https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b" target="_blank" rel="nofollow noopener noreferrer">npm 5.2+ 附带的 package 运行工具</a>。</p>
//   </blockquote>
//   <table>
//     <thead>
//       <tr>
//         <th>姓名</th>
//         <th>年龄</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td>小花</td>
//         <td>11</td>
//       </tr>
//       <tr>
//         <td>小明</td>
//         <td>12</td>
//       </tr>
//       <tr>
//         <td colSpan="2">哈哈</td>
//       </tr>
//     </tbody>
//   </table>
//   <p>111111</p>
//   <table>
//     <thead>
//       <tr>
//         <th>姓名</th>
//         <th>年龄</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td>小花</td>
//         <td>11</td>
//       </tr>
//       <tr>
//         <td>小明</td>
//         <td>12</td>
//       </tr>
//       <tr>
//         <td colSpan="2">哈哈</td>
//       </tr>
//     </tbody>
//   </table>
//   <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92a05ae6a1254c35b430bd322e1d248e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" alt="JVduBMXnyUorfNjFZmue.png" loading="lazy" class="medium-zoom-image"></img>
//   <p>1111122222</p>
//   </div>
// `);

// console.log(md);

export default turndownService;
