function createTextNode (nodeValue) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue,
            children: []
        }
    }
}

function createElement (type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                return typeof child === 'string' ? createTextNode(child) : child
            })
        }
    }
}

function render (el, container) {
    const { type, props} = el
    const dom = type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type)
    console.log(el, dom)
    Object.keys(props).forEach(key => {
        if (key !== 'children') {
            dom[key] = props[key]
        }
    })
    props.children.forEach(child => render(child, dom))
    console.log(dom)
    container.append(dom)
}

const React = {
    createElement,
    render
}

export default React