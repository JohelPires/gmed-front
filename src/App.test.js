import { render, screen } from '@testing-library/react'
import App from './App'
import { money } from './util/money'

// test('renders learn react link', () => {
//     render(<App />)
//     const linkElement = screen.getByText(/learn react/i)
//     expect(linkElement).toBeInTheDocument()
// })

describe('money function', () => {
    test('formats currency correctly', () => {
        // Test case 1: Positive value
        expect(money(1234.5678)).toBe('1,234.57')

        // Test case 2: Negative value
        expect(money(-9876.54321)).toBe('-9,876.54')

        // Test case 3: Zero value
        expect(money(0)).toBe('0.00')
    })
})

describe('test the test', () => {
    test('testing the test', () => {
        // Test case 1: Positive value
        expect('test').toBe('test')
    })
})
