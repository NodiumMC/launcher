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
    if (stage) this._stage = stage
  }
}
