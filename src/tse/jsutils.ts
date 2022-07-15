Array.prototype.mapAsync = async function mapAsync<T, U>(callbackfn: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]> {
  return Promise.all(this.map(callbackfn));
}

Array.prototype.filterAsync = async function filterAsync<T>(callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>): Promise<T[]> {
  const filterMap = await this.mapAsync(callbackfn);
  return this.filter((value, index) => filterMap[index]);
}

export {}
