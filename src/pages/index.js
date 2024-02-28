import { useRouter } from 'next/router'
import React from 'react'

export default function Index() {
    const router = useRouter()
    router.push("/book")
    return (
        <div></div>
    )
}
