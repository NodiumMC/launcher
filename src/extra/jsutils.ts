Array.prototype.mapAsync = async function mapAsync<T, U>(
  callbackfn: (value: T, index: number, array: T[]) => Promise<U>,
): Promise<U[]> {
  return Promise.all(this.map(callbackfn))
}

Array.prototype.filterAsync = async function filterAsync<T>(
  callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<T[]> {
  const filterMap = await this.mapAsync(callbackfn)
  return this.filter((value, index) => filterMap[index])
}

Array.prototype.removeIf = function (predicate) {
  const candidate = this.findIndex(predicate)
  if (candidate === -1) return false
  this.splice(candidate, candidate + 1)
  return true
}

Array.prototype.chunk = function (size) {
  return this.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / size)
    if (!resultArray[chunkIndex]) resultArray[chunkIndex] = []
    resultArray[chunkIndex].push(item)
    return resultArray
  }, [])
}

Array.prototype.underslice = function (offset) {
  return this.slice(0, this.length - offset)
}

Reflect.defineProperty(Array.prototype, 'first', {
  get(): any {
    return this[0]
  },
})

Reflect.defineProperty(Array.prototype, 'last', {
  get(): any {
    return this.at(-1)
  },
})

Number.prototype.map = function (fromMin, fromMax, toMin = 0, toMax = 100) {
  return ((this.valueOf() - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin
}

String.prototype.explain = function (placeholders) {
  return this.replace(/\{(?<key>\w+)}/g, (...[, key]) => String(placeholders[key]))
}

export {}
