import {FindOperatorType} from "../../../find-options/FindOperatorType";

const ComparisonMapping = [
   ['>', '<='],
   ['>=', '<'],
   ['<', '>='],
   ['<=', '>'],
   ['=', '!='],
   ['!=', '='],
]


export const OperatorMap: { [key in FindOperatorType]: (placeholder: string) => string } = {
   not: (ph) => {
      if (ph == 'IS NULL') return 'IS NOT NULL'
      for (const [key, value] of ComparisonMapping) {
         if (ph.startsWith(key + ' ')) return ph.replace(key, value)
      }
      return `NOT ${ph}`
   },
   lessThan: (ph) => `< ${ph}`,
   lessThanOrEqual: (ph) => `<= ${ph}`,
   moreThan: (ph) => `> ${ph}`,
   moreThanOrEqual: (ph) => `>= ${ph}`,
   equal: (ph) => `= ${ph}`,
   between: (ph) => `BETWEEN ? AND ?`,
   in: (ph) => `IN (${ph})`,
   isNull: (ph) => `IS NULL`,
   like: (ph) => `LIKE ${ph}`
}
