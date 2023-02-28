import { CanvasJSChart } from 'canvasjs-react-charts'
import React, { useEffect, useState } from 'react'

const GraphMostUsedSearchWord = ({ chats }) => {
    const [options, setOptions] = useState(null)
    const [sentenceToSearch, setSentenceToSearch] = useState('')
    const [sentences, setSentences] = useState([])

    useEffect(() => {
        const sentences = Object.keys(chats)
            .map(key => chats[key])
            .map((chat) => chat.filter(({ message }) => message.toLowerCase().includes(sentenceToSearch.toLowerCase())))

        setSentences(sentences)
        console.log(sentences)

        // const data = Object.entries(words.reduce((acc, current) => {
        //     acc[current] === undefined ? acc[current] = 1 : acc[current] += 1
        //     return acc
        // }, {})).map(([key, value]) => {
        //     return {
        //         label: key,
        //         y: value,
        //     }
        // }).sort((a, b) => b.y - a.y).slice(0, 10)

        // console.log(data)

        setOptions({
            title: {
                text: `Most used words by `
            },
            data: [
                {
                    type: "bar",
                    dataPoints: []
                }
            ]
        })
    }, [chats, sentenceToSearch])

    return (
        <div>

            <form>
                <label>
                    Palabras/Oración a buscar:
                    <input type="text" value={sentenceToSearch} onChange={(e) => setSentenceToSearch(e.target.value)} />
                </label>
            </form>
            <div>
                <strong>Who</strong>
                {sentences[0] ? sentences[0].slice(0, 10).map(({ message }) => <p>{message}</p>) : null}
                <strong>Maggie</strong>
                {sentences[1] ? sentences[1].slice(0, 10).map(({ message }) => <p>{message}</p>) : null}
            </div>

            {options ? <CanvasJSChart options={options} /> : null}
        </div>
    )
}

export default GraphMostUsedSearchWord