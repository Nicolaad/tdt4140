import React from "react"
import { unmountComponentAtNode, render } from "react-dom"
import ThreadManager from "../ThreadComponents/ThreadManager.js"
import { act } from "react-dom/test-utils"

let container = null
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div")
    document.body.appendChild(container)
})

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

describe("testing Body.js", () => {
    it("Body renders", () => {
        act(() => {
            render(<ThreadManager  />, container)
        })
        expect(container).toBeTruthy()
    })
})
