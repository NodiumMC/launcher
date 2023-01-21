import { makeAutoObservable } from 'mobx'

/**
 * # Progress
 * Управляет состояниями прогресса
 */
export class Progress<T> {
  private _progress = 0
  private _total = 0
  private _stage: T | null

  constructor(total = 100, progress = 0, stage?: T) {
    this._total = total
    this._progress = progress
    this._stage = stage ?? null
    makeAutoObservable(this)
  }

  /**
   * Максимальное значение прогресса
   */
  get total() {
    return this._total
  }

  /**
   * Текущее значение прогресса
   */
  get progress() {
    return this._progress
  }

  /**
   * Нормализованное значение прогресса. От **0** до **size(1)**
   * @param size - Значение нормализации. По умолчанию `size`
   */
  normalized(size = 1) {
    return this._progress.map(0, this._total, 0, size)
  }

  /**
   * Дополнительное состояние прогресса
   */
  get stage() {
    return this._stage
  }

  /**
   * Обновляет состояние прогресса
   * @param progress - значение прогресса
   * @param total - максимальное значение прогресса
   * @param stage - дополнительное состояние
   */
  update(progress: number, total?: number, stage?: T) {
    this._progress = progress
    if (total) this._total = total
    if (stage) this._stage = stage
  }

  /**
   * Сбрасывает значение прогресса
   * @param stage - Обновить дополнительное состояние
   */
  reset(stage?: T) {
    this._progress = 0
    if (stage !== undefined) this._stage = stage
  }
}

if (import.meta.vitest) {
  const { describe, it, expect, beforeEach } = import.meta.vitest

  describe('Progress', () => {
    let progress: Progress<number>

    beforeEach(() => {
      progress = new Progress<number>(100, 0, 0)
    })

    it('Should just step', () => {
      expect(progress.progress).toBe(0)
      expect(progress.total).toBe(100)
      progress.update(10)
      expect(progress.progress).toBe(10)
      progress.update(10, 50)
      expect(progress.progress).toBe(10)
      expect(progress.total).toBe(50)
      progress.update(50, 100, 1)
      expect(progress.stage).toBe(1)
    })

    it('Should normalize value', () => {
      progress.update(50, 100)
      expect(progress.total).toBe(100)
      expect(progress.progress).toBe(50)
      expect(progress.normalized()).toBe(0.5)
      expect(progress.normalized(10)).toBe(5)
    })

    it('Should reset all', () => {
      progress.update(1, 2, 3)
      expect(progress.progress).toBe(1)
      expect(progress.total).toBe(2)
      expect(progress.stage).toBe(3)
      progress.reset(0)
      expect(progress.progress).toBe(0)
      expect(progress.total).toBe(2)
      expect(progress.stage).toBe(0)
    })
  })
}
