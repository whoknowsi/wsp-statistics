import { CanvasJSChart } from 'canvasjs-react-charts'
import React, { useEffect, useState } from 'react'
import { hateWordsList } from '../hateWordsList'

const GraphInsultsPerPerson = ({ chats }) => {
    const [options, setOptions] = useState(null)

    useEffect(() => {
        if (!chats || Object.keys(chats).length === 0) return

        const getHateWordsByPerson = () => {
            const persons = Object.keys(chats)
            return persons.reduce((acc, curr) => {
                const hateWords = chats[curr].reduce((acc, curr) => {
                    const words = curr.message.split(' ')

                    const hateWords = words.filter(word => hateWordsList.includes(word))

                    return [...acc, ...hateWords]
                }, [])

                acc[curr] = hateWords
                return acc
            }, {})
        }

        const hateWordsByPerson = getHateWordsByPerson(chats)

        const hatedWordsCount = Object.keys(hateWordsByPerson)
            .reduce((acc, current) => {
                acc[current] = hateWordsByPerson[current].reduce((acc, current) => {
                    acc[current] === undefined ? acc[current] = 1 : acc[current] += 1
                    return acc
                }, {})
                return acc
            }, {})

        const person1 = hatedWordsCount[Object.keys(hatedWordsCount)[0]]
        const person2 = hatedWordsCount[Object.keys(hatedWordsCount)[1]]
        const listOfWords = Object.keys({ ...person1, ...person2 })

        const finalResult = listOfWords.map(word => {
            return {
                label: word,
                y: person1[word] ? person1[word] : 0,
                y2: person2[word] ? person2[word] : 0
            }
        }).sort((a, b) => b.y + b.y2 - a.y + a.y2).slice(0, 20)

        const options = {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "Cantidad de insultos por persona",
                fontFamily: "verdana"
            },
            axisY: {
                title: "Cantidad",
                includeZero: true,
                prefix: "",
                suffix: ""
            },
            toolTip: {
                shared: true,
                reversed: true
            },
            legend: {
                verticalAlign: "center",
                horizontalAlign: "right",
                reversed: true,
                cursor: "pointer",
            },
            data: [
                {
                    type: "stackedColumn",
                    name: Object.keys(hatedWordsCount)[0],
                    showInLegend: true,
                    yValueFormatString: "###",
                    dataPoints: finalResult.map(({ label, y }) => {
                        return { label, y }
                    })
                },
                {
                    type: "stackedColumn",
                    name: Object.keys(hatedWordsCount)[1],
                    showInLegend: true,
                    yValueFormatString: "###",
                    dataPoints: finalResult.map(({ label, y2 }) => {
                        return { label, y: y2 }
                    })
                }]
        }

        setOptions(options)
    }, [chats])

    return (
        <div>
            {options && <CanvasJSChart options={options} />}
        </div>
    )
}

export default GraphInsultsPerPerson
