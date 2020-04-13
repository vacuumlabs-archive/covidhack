import produce from 'immer'
import _ from 'lodash'
import {Lab_Result} from './graphqlSdk'

export const gridRows = 8
export const gridColumns = 12

export const createEmptyGrid = () =>
  Array.from({length: gridRows}, () =>
    Array.from({length: gridColumns}, () => ({
      positive: false,
      width: 200,
      height: 100,
      value: '',
      readOnly: false,
    })),
  )

export const mapLabResultsToGrid = (labResults: Lab_Result[]) => {
  const grid = createEmptyGrid()
  labResults.forEach((result) => {
    grid[result.row][result.column] = {
      ...grid[result.row][result.column],
      value: result.sample_code,
      positive: result.positive,
      readOnly: true,
    }
  })
  return grid
}

// https://stackoverflow.com/a/10834843
export const isNormalInteger = (str) => {
  return /^\+?(0|[1-9]\d*)$/.test(str)
}

// not importing the type from component to prevent circular dependencies
type GridElement = {
  value: string | null
  readonly?: boolean
  className?: string
  broken?: boolean
}

export const autofillGrid = (grid: GridElement[][]) => {
  return produce(grid, (draft) => {
    let currentValue = 1
    // go by columns
    for (let i = 0; i < gridColumns; i++) {
      for (let j = 0; j < gridRows; j++) {
        if (draft[j][i].broken) continue
        if (draft[j][i].value) {
          if (isNormalInteger(draft[j][i].value)) {
            currentValue = Number.parseInt(draft[j][i].value)
          }
          continue
        }
        draft[j][i].value = `${currentValue++}`
      }
    }
  })
}

const rowLabels = Array.from('ABCDEFGH').map((value) => ({
  value,
  readOnly: true,
}))
const colLabels = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => ({
  value: String(value),
  readOnly: true,
}))

export const addFrame = (grid: GridElement[][]) =>
  [colLabels].concat(grid.map((row: any, i) => [rowLabels[i]].concat(row)))
export const removeFrame = (grid) => grid.slice(1).map((row) => row.slice(1))

// omits the always positive/negative sample, keeps only numebred ones
export const getSampleCodesFromGrid = (grid: ReturnType<typeof createEmptyGrid>) =>
  _.flatten(grid)
    .map((v) => v.value)
    .filter(isNormalInteger)

export const mapValuesAsync = async (
  obj: Record<string, any>,
  cb: (val: any) => Promise<any>,
): Promise<any> => {
  const keys = Object.keys(obj)
  const ans = {}
  for (const key of keys) {
    ans[key] = await cb(obj[key])
  }

  return ans
}
