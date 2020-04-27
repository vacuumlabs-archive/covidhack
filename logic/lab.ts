import {GridElement} from '../pages/edit-lab-result/[id]'
import {removeFrame} from '../utils/helpers'

const ROWS = 'ABCDEFGH'
const COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const getFormattedCell = (r: number, c: number) => ROWS[r] + COLS[c]

export const createBioradCsv = (table: GridElement[][]): string => {
  const header = ['Row', 'Column', '*Target Name', '*Sample Name']
  const csvRows = removeFrame(table).flatMap((row, rInd) =>
    row.map((cell, cInd) => {
      return [ROWS[rInd], COLS[cInd], '', cell.value].join(',')
    }),
  )

  return [header, ...csvRows].join('\n')
}

export const createBrandCsv = (table: GridElement[][]): string => {
  const header = ['Well', 'Volume', 'Name', 'Priority', 'Type']
  const csvRows = removeFrame(table).flatMap((row, rInd) =>
    row.map((cell, cInd) => {
      return [getFormattedCell(rInd, cInd), '50.00', cell.value || '', 'No', 'Standard'].join(',')
    }),
  )

  return [header, ...csvRows].join('\n')
}
