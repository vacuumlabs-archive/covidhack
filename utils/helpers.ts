import _ from 'lodash'

export const createEmptyGrid = () =>
  Array.from({length: 8}, () =>
    Array.from({length: 12}, () => ({value: Math.round(Math.random() * 1000000).toString()})),
  )

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
