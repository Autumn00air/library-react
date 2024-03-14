import { useCurrentUser } from '@/utils/usehooks'
import { useRouter } from 'next/router'
import React from 'react'

export default function Index() {
    const user = useCurrentUser()
    const router = useRouter()
    if (!user) {
        router.push("/login")
    }
    router.push("/book")
    return (
        <div></div>
    )
}
