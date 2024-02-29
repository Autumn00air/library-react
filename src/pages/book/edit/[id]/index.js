import { getBookDetail } from "@/api";
import { BookForm } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Book() {
    const [data, setData] = useState();
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const res = await getBookDetail(router.query.id);

            // console.log('%c [  ]-13', 'font-size:13px; background:pink; color:#bf2c9f;', res.data)
            setData(res.data);
        })();
    }, [router]);
    return <BookForm title="图书编辑" editData={data} />;
}
