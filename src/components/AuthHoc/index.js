import { USER_ROLE } from "@/constants";
import { useCurrentUser } from "@/utils/hoos";

//这是个高阶组件，用于控制只有管理员才能看到的UI部分
const AuthHoc = ({ children }) => {
    const user = useCurrentUser();
    return user?.role === USER_ROLE.ADMIN ? <>{children}</> : null;
};
export default AuthHoc;

// 这段代码定义了一个名为 AuthHoc 的高阶组件（Higher-Order Component，HOC）。在 React 中，高阶组件是一种用于重用组件逻辑的高级技术。具体来说，高阶组件是参数为组件，返回值为新组件的函数。

// AuthHoc 接收一个 children 属性，这个属性通常是其他 React 组件。然后，它使用 useCurrentUser 钩子函数获取当前用户的信息。

// useCurrentUser 是一个自定义的 React 钩子，它可能从某个上下文或者状态中获取当前用户的信息。这个信息被存储在 user 变量中。

// 然后，AuthHoc 检查 user 对象的 role 属性是否等于 USER_ROLE.ADMIN。USER_ROLE.ADMIN 是从 @/constants 模块导入的一个常量，它代表管理员角色。

// 如果当前用户的角色是管理员，AuthHoc 就会渲染它的 children。否则，它会渲染 null，这意味着在 DOM 中不会渲染任何东西。

// 这个 AuthHoc 高阶组件的主要用途是控制只有管理员用户才能看到的 UI 部分。你可以将任何需要这种权限检查的组件作为 AuthHoc 的 children。