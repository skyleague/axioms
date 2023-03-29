import { defer } from './defer.js'

test('deferred can be resolved', async () => {
    const p = defer<string>()
    await expect(Promise.race([p, Promise.resolve('second')])).resolves.toEqual('second')
    p.resolve('first')
    await expect(Promise.race([p, Promise.resolve('second')])).resolves.toEqual('first')
})

test('deferred can be rejected', async () => {
    const p = defer<string>()
    await expect(Promise.race([p, Promise.resolve('second')])).resolves.toEqual('second')
    p.reject(new Error('first'))
    await expect(Promise.race([p, Promise.resolve('second')])).rejects.toThrowError('first')
})

test('deferred resolves to the first resolved value', async () => {
    const p = defer<string>()
    p.resolve('first')
    await expect(p).resolves.toEqual('first')
    p.resolve('second')
    await expect(p).resolves.toEqual('first')
})

test('deferred rejects to the first rejected value', async () => {
    const p = defer<string>()
    p.reject(new Error('first'))
    await expect(p).rejects.toThrowError('first')
    p.reject(new Error('second'))
    await expect(p).rejects.toThrowError('first')
})

test('deferred resolves when resolve is called first', async () => {
    const p = defer<string>()
    p.resolve('first')
    await expect(p).resolves.toEqual('first')
    p.reject(new Error('second'))
    await expect(p).resolves.toEqual('first')
})

test('deferred rejects when reject is called first', async () => {
    const p = defer<string>()
    p.reject(new Error('first'))
    await expect(p).rejects.toThrowError('first')
    p.resolve('second')
    await expect(p).rejects.toThrowError('first')
})
