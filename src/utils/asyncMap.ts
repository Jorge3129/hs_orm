export const asyncMap = async <T = any, U = any>(array: T[], callback: Function): Promise<U[]> => {
   return Promise.all(array.map(async (item, i, array) => {
      return callback(item, i, array)
   }))
}
