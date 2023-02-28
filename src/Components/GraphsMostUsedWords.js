import React from 'react'
import GraphMostUsedWords from './GraphMostUsedWords'

const GraphsMostUsedWords = ({ chats }) => {
    console.log(chats)
    return (
        <div className='mostUsedWords'>
            {chats ? Object.keys(chats).reverse().map((key) => <GraphMostUsedWords key={key} chats={chats[key]} />) : null}
        </div>
    )
}

export default GraphsMostUsedWords