import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        setupFiles: ['./test/__test__/setup.ts'],
        globalSetup: ['./test/__test__/global.ts'],
        fakeTimers: {
            now: new Date(2022, 1, 10),
            toFake: [
                // 'setTimeout',
                // 'setImmediate',
                'clearTimeout',
                'setInterval',
                'clearInterval',
                'clearImmediate',
                'Date',
            ],
        },
    },
})
