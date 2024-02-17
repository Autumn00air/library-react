//这段代码是在 JavaScript 模块系统中使用的导出语句。它的作用是将其他模块中的导出内容重新导出。

// 在这个例子中，它从四个不同的模块（'./book'、'./category'、'./borrow' 和 './user'）中导出所有的导出内容。这些模块的文件路径是相对于当前文件的。

// export * from 'module' 的语法意味着将 'module' 中所有的导出（除了默认导出）都重新导出。这样，其他模块就可以直接从这个模块中导入这些内容，而不需要知道这些内容实际上是在其他模块中定义的。

// 例如，如果 './book' 模块导出了一个名为 'getBook' 的函数，那么其他模块可以直接从这个模块中导入 'getBook'，如 import { getBook } from './index'，而不需要知道 'getBook' 实际上是在 './book' 模块中定义的。

//模块转移导出
export * from './book';
export * from './category';
export * from './borrow';
export * from './user';

//书籍详情--
//书籍分类数据--
//书籍借阅删除等等--
//用户数据--