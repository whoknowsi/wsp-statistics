import { useEffect, useState } from 'react'
import useRawChats from './useRawChats'

export default function useChats() {
    const rawChats = useRawChats()
    const [chats, setChats] = useState({})

    useEffect(() => {
        const orderChatsByPerson = (rawChats) => {
            return rawChats.reduce((acc, curr) => {
                if (curr.includes(' - ') && curr.includes(':') && curr.split(' - ')[1].includes(':')) {
                    const name = curr.split(' - ')[1].split(':')[0]
                    let date = curr.split(' - ')[0].split(' ')[0].split("/")
                    date = `${date[1]}/${date[0]}/${date[2]}`
                    const time = curr.split(' - ')[0].split(' ')[1]
                    const message = curr.split(' - ')[1].split(':')[1]
                    const data = {
                        name,
                        date,
                        time,
                        message
                    }
                    acc[name] ? acc[name].push(data) : acc[name] = [data]
                }
                return acc
            }, {})
        }

        setChats(orderChatsByPerson(rawChats))
    }, [rawChats])

    return chats
}

