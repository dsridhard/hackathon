import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest";
import ErrorMessage from "./errorMessage"
describe('', () => {
    it('render default error state', () => {
        render(<ErrorMessage />)
        expect(screen.getByTestId('message-container')).toHaveTextContent("Something went wrong")
    })
})