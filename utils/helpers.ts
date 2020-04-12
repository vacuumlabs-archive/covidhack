import _ from 'lodash'
import {Lab_Result} from './graphqlSdk'

export const createEmptyGrid = () =>
  Array.from({length: 8}, () =>
    Array.from({length: 12}, () => ({
      positive: false,
      width: 200,
      height: 100,
      value: Math.round(Math.random() * 1000000).toString(),
    })),
  )

export const mapLabResultsToGrid = (labResults: Lab_Result[]) => {
  const grid = createEmptyGrid()
  labResults.forEach((result) => {
    grid[result.row][result.column] = {
      ...grid[result.row][result.column],
      value: result.sample_code,
      positive: result.positive,
    }
  })
  return grid
}

// https://stackoverflow.com/a/10834843
export const isNormalInteger = (str) => {
  return /^\+?(0|[1-9]\d*)$/.test(str)
}

const a = createEmptyGrid()
// omits the always positive/negative sample, keeps only numebred ones
export const getSampleCodesFromGrid = (grid: ReturnType<typeof createEmptyGrid>) =>
  _.flatten(grid)
    .map((v) => v.value)
    .filter(isNormalInteger)

console.log(a[0])
