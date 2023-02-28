import { CanvasJSChart } from 'canvasjs-react-charts'
import React, { useEffect, useState } from 'react'

const GraphMessageThroughTime = ({ chats }) => {
    const [options, setOptions] = useState(null)

    useEffect(() => {
        if (!chats || Object.keys(chats).length === 0) return

        function createChar() {

            const person1 = chats[Object.keys(chats)[0]]
            const person2 = chats[Object.keys(chats)[1]]

            const dataPoints1 = Object
                .entries(person1
                    .reduce((acc, current) => {
                        acc[current.date] === undefined ? acc[current.date] = 0 : acc[current.date] += 1
                        return acc
                    }, {}))
                .map(([date, messages]) => {
                    return { x: new Date(date), y: messages }
                })

            const dataPoints2 = Object
                .entries(person2
                    .reduce((acc, current) => {
                        acc[current.date] === undefined ? acc[current.date] = 0 : acc[current.date] += 1
                        return acc
                    }, {}))
                .map(([date, messages]) => {
                    return { x: new Date(date), y: messages }
                })

            const options = {
                theme: "light2",
                title: {
                    text: "Cantidad de mensajes por persona"
                },
                subtitles: [{
                    text: "A lo largo del tiempo"
                }],
                axisY: {
                    title: "Cantidad",
                    suffix: ""
                },
                toolTip: {
                    shared: true
                },
                data: [
                    {
                        type: "area",
                        name: person1[0].name,
                        showInLegend: true,
                        xValueFormatString: "D MMM YYYY",
                        yValueFormatString: "#,##0.##",
                        dataPoints: dataPoints1
                    },
                    {
                        type: "area",
                        name: person2[0].name,
                        showInLegend: true,
                        xValueFormatString: "D MMM YYYY",
                        yValueFormatString: "#,##0.##",
                        dataPoints: dataPoints2
                    }
                ]
            }
            setOptions(options)
        }

        createChar()
    }, [chats])

    return (
        <div>
            {options && <CanvasJSChart options={options} />}
        </div>

    )
}

export default GraphMessageThroughTime