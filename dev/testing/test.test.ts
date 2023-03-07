import { vitest } from './config'

describe('dev', () => {
  describe('testing', () => {
    describe('config', () => {
      it('Should be defined', () => {
        expect(vitest).toBeDefined()
      })
    })
  })
})

export {}
