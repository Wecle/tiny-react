function createDom (type) {
    return type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type)
}

function updateProps (dom, props) {
    Object.keys(props).forEach(key => {
        if (key !== 'children') {
            dom[key] = props[key]
        }
    })
}

function initChildren (fiber) {
    const children = fiber.props.children
    let preChild = null
    children.forEach((child, index) => {
        const newFiber = {
            type: child.type,
            props: child.props,
            child: null,
            sibling: null,
            parent: fiber,
            dom: null
        }
        if (index === 0) {
            fiber.child = newFiber
        } else {
            preChild.sibling = newFiber
        }
        preChild = newFiber
    })
}

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

function performWorkOfUnit (fiber) {
    if (!fiber.dom) {
        // 1.创建 dom
        const dom = (fiber.dom = createDom(fiber.type))

        // fiber.parent.dom.append(dom)
        // 2.更新 props
        updateProps(dom, fiber.props)
    }
    // 3.转换链表，设置指针
    initChildren(fiber)
    // 4.返回下一个要执行的任务
    if (fiber.child) {
        return fiber.child
    }
    if (fiber.sibling) {
        return fiber.sibling
    }

    return fiber.parent?.sibling
}

let root = null
let nextWorkOfUnit = null
function workLoop (deadline) {
    let shouldYield = false
    while (!shouldYield && nextWorkOfUnit) {
        nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)

        shouldYield = deadline.timeRemaining() < 1
    }

    if (!nextWorkOfUnit && root) {
        commitRoot()
    }

    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function commitRoot () {
    commitWork(root.child)
    root = null
}

function commitWork (fiber) {
    if (!fiber) return
    fiber.parent.dom.append(fiber.dom)
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

function render (dom, container) {
    nextWorkOfUnit = {
        dom: container,
        props: {
            children: [dom]
        }
    }

    root = nextWorkOfUnit
}

const React = {
    createElement,
    render
}

export default React