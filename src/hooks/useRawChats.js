import { useEffect, useState } from 'react'

export default function useRawChats() {
    const [rawChats, setRawChats] = useState([])

    useEffect(() => {
        (async function fetchChat() {
            fetch('/chat.txt')
                .then((res) => res.text())
                .then((data) => {
                    setRawChats(data.split(/\r?\n/))
                })
        })()
    }, [])

    return rawChats
}
