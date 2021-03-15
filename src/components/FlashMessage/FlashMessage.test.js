import React from 'react';
import { render, act } from '@testing-library/react';

import FlashMessage from './FlashMessage.js';

describe('Notice', () => {
    it('displays when displayMessage === true, then disappears after five seconds', () => {
        jest.useFakeTimers()
        const {container} = render(
            <FlashMessage message={"Hello"} />
        )
        expect(container.textContent).toBe("Hello")
        act(() => {
            jest.advanceTimersByTime(5000)
        })
        expect(container.textContent).not.toBe("Hello")
    })
})
 