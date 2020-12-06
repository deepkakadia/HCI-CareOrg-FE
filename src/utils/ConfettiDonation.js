import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default () => {
    const { width, height } = { "width": "600px", "height": "500px" }
    return (
        <Confetti
            width={width}
            height={height}
        />
    )
}