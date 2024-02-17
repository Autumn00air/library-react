// 就相当于一个总集合，将所有的组件都引入进来，然后再导出，这样在其他地方引入这个文件夹（会自动找到这个index.js）的时候，就可以直接使用了
import AuthHoc from "./AuthHoc";
import BookForm from "./BookForm";
import BorrowForm from "./BorrowForm";
import Content from "./Content/";
import Layout from "./Layout";
import UserForm from "./UserForm";

export { Content, AuthHoc, BookForm, BorrowForm, Layout, UserForm };