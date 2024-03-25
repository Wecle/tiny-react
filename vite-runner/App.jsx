import React from './core/React.js'

const HelloWorld = () => {
    return <div style="color: yellow">Hello World</div>
}

const Box = () => {
    return <HelloWorld />
}

const App = () => {
    return (
        <div id="app">
            Hello World
            <div style="color: red">Hello World</div>
            <Box />
        </div>
    )
}

export default App