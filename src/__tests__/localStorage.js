import { saveState, loadState } from '../localStorage'

const survivor = { name: 'Test' }

describe('Local Storage', () => {

  beforeEach(() => {
    localStorage.clear()
  })

  it('should be able to save a value on a given key', () => {
    const key = 'local-key'
    localStorage.setItem(key, JSON.stringify({}))

    saveState(key, survivor)
    const value = JSON.parse(localStorage.getItem(key))

    expect(value).toEqual(survivor)
  })

  it('should be able to load a value from a given key', () => {
    const key = 'local-key-test'
    localStorage.setItem(key, JSON.stringify(survivor))

    expect(loadState(key)).toEqual(survivor)
  })

})
