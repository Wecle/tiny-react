import React from '../core/React.js'
import { it, expect, describe } from 'vitest'

describe('createElement', () => {
    it ('when props is null', () => {
        const element = React.createElement('div', null, 'hello')
        expect(element).toMatchInlineSnapshot(`
          {
            "props": {
              "children": [
                {
                  "props": {
                    "children": [],
                    "nodeValue": "hello",
                  },
                  "type": "TEXT_ELEMENT",
                },
              ],
            },
            "type": "div",
          }
        `)
    })

    it ('should return element vdom witn props', () => {
        const element = React.createElement('div', { id: 'app' }, 'Hello World', React.createElement('div', { style: 'color: red' }, 'Hello World'))
        expect(element).toMatchInlineSnapshot(`
          {
            "props": {
              "children": [
                {
                  "props": {
                    "children": [],
                    "nodeValue": "Hello World",
                  },
                  "type": "TEXT_ELEMENT",
                },
                {
                  "props": {
                    "children": [
                      {
                        "props": {
                          "children": [],
                          "nodeValue": "Hello World",
                        },
                        "type": "TEXT_ELEMENT",
                      },
                    ],
                    "style": "color: red",
                  },
                  "type": "div",
                },
              ],
              "id": "app",
            },
            "type": "div",
          }
        `)
    })
})