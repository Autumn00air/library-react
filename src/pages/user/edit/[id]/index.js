import { getUserDetail } from "@/api";
import { UserForm } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserAdd = () => {
    const router = useRouter();
    const [data, setData] = useState();

    useEffect(() => {
        (async () => {
            const res = await getUserDetail(router.query.id);
            setData(res.data);
        })();
    }, [router.query.id]);

    return <UserForm title="用户编辑" editData={data} />;
};

export default UserAdd;
