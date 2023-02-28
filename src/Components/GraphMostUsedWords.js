import React from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts'
import { useEffect, useState } from 'react'

const preposiciones = ["a", "ante", "bajo", "cabe", "con", "contra", "de", "desde", "durante", "en", "entre", "hacia", "hasta",
    "mediante", "para", "por", "según", "sin", "so", "sobre", "tras", "versus", "vía"]

const wordsToIgnoreAlways = ["<multimedia", "omitido>"]

const GraphMostUsedWords = ({ chats }) => {
    const [options, setOptions] = useState(null)
    const [wordToIgnore, setWordToIgnore] = useState('')
    const [minLength, setMinLength] = useState(3)
    const [wordsToIgnore, setWordsToIgnore] = useState([])


    useEffect(() => {
        const words = chats
            .map(chat => chat.message.toLowerCase().split(' '))
            .flat()
            .filter((word) => word.length && !wordsToIgnoreAlways.includes(word) && !wordsToIgnore.includes(word) && word.length >= minLength && !preposiciones.includes(word))

        const data = Object.entries(words.reduce((acc, current) => {
            acc[current] === undefined ? acc[current] = 1 : acc[current] += 1
            return acc
        }, {})).map(([key, value]) => {
            return {
                label: key,
                y: value,
            }
        }).sort((a, b) => b.y - a.y).slice(0, 10)

        console.log(data)

        setOptions({
            title: {
                text: `Most used words by ${chats[0].name}`
            },
            data: [
                {
                    type: "bar",
                    dataPoints: data
                }
            ]
        })
    }, [chats, wordsToIgnore, minLength])


    const handleSubmit = (e) => {
        e.preventDefault()
        setWordsToIgnore([...wordsToIgnore, wordToIgnore])
        setWordToIgnore('')
    }

    return (
        <div>
            <form>
                <label>
                    Palabras a ignorar:
                    <input type="text" value={wordToIgnore} onChange={(e) => setWordToIgnore(e.target.value)} />
                </label>
                <label>
                    Mínimo largo de palabra <span>{minLength}</span>
                    <input type="range" min="3" max="10" value={minLength} onChange={(e) => setMinLength(e.target.value)} />
                </label>

                <button onClick={handleSubmit}>Ignorar</button>
            </form>

            {options ? <CanvasJSChart options={options} /> : null}
        </div>
    )
}

export default GraphMostUsedWords