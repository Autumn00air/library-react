import { getBorrowDetail } from "@/api";
import { BorrowForm } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BorrowBook = () => {
    const router = useRouter();
    const [data, setData] = useState();

    useEffect(() => {
        getBorrowDetail(router.query.id).then((res) => {
            setData(res.data);
        });
    }, [router.query.id]);

    return <BorrowForm title="借阅编辑" editData={data} />;
};

export default BorrowBook;
