
type MapperFunction<T> = (value: T, index: number, array: T[]) => any

const methods = function <T>() {
   return {
      mapAsync<U = any>(callback: MapperFunction<T>): Promise<U[]> {
         //@ts-ignore
         return Promise.all(this.map(async (item, i, array) => {
            return callback(item, i, array)
         }))
      }
   }
}

export class AsyncArray {
   public static from<T>(iterable: Iterable<T> | ArrayLike<T>) {
      return Object.assign(Array.from(iterable), methods<T>())
   }
}
