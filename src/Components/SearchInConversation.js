import React, { useEffect, useState } from 'react'
import './SearchInConversation.css'
import ChatMessage from './ChatMessage'

const SearchInConversation = ({ chats }) => {
    const [sentenceToSearch, setSentenceToSearch] = useState('')
    const [sentences, setSentences] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (!chats) return
        const sentences = Object.keys(chats)
            .map(key => chats[key])
            .map((chat) => chat.filter(({ message }) => message.toLowerCase().includes(sentenceToSearch.toLowerCase())))

        setSentences(sentences)

        setUsers([...Object.keys(chats)])

    }, [chats, sentenceToSearch])

    return (
        <div>

            <form>
                <label>
                    Palabras/Oración a buscar:
                    <input type="text" value={sentenceToSearch} onChange={(e) => setSentenceToSearch(e.target.value)} />
                </label>
            </form>
            <div className='container_search'>

                {sentences.map((sentence, index) => {
                    const sentencesByDate = Object.entries(
                        sentence?.reduce((acc, curr) => {
                            if (acc[curr.date]) {
                                acc[curr.date].push(curr)
                            } else
                                acc[curr.date] = [curr]
                            return acc
                        }, {})
                    )
                    console.log()

                    return (
                        <div className='container_search_block' key={index}>
                            <div className='container_search_block_header'>
                                <strong>{`${users[index]}`}</strong>
                            </div>
                            <div className='container_search_block_body'>
                                {sentencesByDate.splice(0, 10).map(([date, messages], index) => <ChatMessage key={date + users[index]} date={date} messages={messages} />)}
                            </div>
                            <p>{`Total de mensajes: ${sentence.length}`}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchInConversation