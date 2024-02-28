import styles from "./index.module.css";

//其实这个就是内容组件，也就是右下角的这一部分  上header，下左nav，下右内容的典型布局

const Content = ({ children, operation, title }) => {
    return (
        <>
            <div className={styles.title}>
                {title}
                {operation && <span className={styles.btn}>{operation}</span>}
            </div>
            <div className={styles.content}>{children}</div>
        </>
    );
};

export default Content;
