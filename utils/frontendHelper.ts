import download from 'downloadjs'
import Flexsearch from 'flexsearch'
import produce from 'immer'
import _ from 'lodash'
import qs from 'qs'
import categoriesIndex from '../public/flexsearchCategoriesIndex.json'

// there are limits to next.js code-splitting, and it can't handle
// requiring some files on both api routes and frontend

// turns out fetch-ing a file (with auth headers) isn't so straightforward
// this should do it - basically pasted together from following stackoverflows :hackerman:
// https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch
// https://stackoverflow.com/questions/40939380/how-to-get-file-name-from-content-disposition
// if this is too big of a hurdle, just remove the required authentication on backend
export const fetchFile = (url, headers, query) => {
  let filename = 'download' // fallback in case it's not parsed out
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
  fetch(`${url}${qs.stringify(query, {addQueryPrefix: true})}`, {
    headers,
  })
    .then(function(resp) {
      // try to read filename from Content-Disposition header
      const disposition = resp.headers.get('Content-Disposition')
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const matches = filenameRegex.exec(disposition)
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '')
        }
      }
      return resp.blob()
    })
    .then(function(blob) {
      download(blob, filename)
    })
}

// categories helpers

export type Subcategory = {name: string; code: string}

export type Category = {name: string; number: number; categories: Subcategory[]}

export type CategoriesMapped = {
  [key: string]: {
    name: string
    number: number
    categories: {
      [key: string]: Subcategory
    }
  }
}

const useMappedCategoriesRecipe = (categories: Category[]): CategoriesMapped => {
  const categoriesMappedWithArraySubcategories = _.keyBy(categories, 'name')
  return _.mapValues(categoriesMappedWithArraySubcategories, (category) => ({
    ...category,
    categories: _.keyBy(category.categories, 'name'),
  }))
}

// we don't want to recalculate this for same value accross different components
export const useMappedCategories = _.memoize(useMappedCategoriesRecipe)

// the reverse of 'useMappedCategories' hook in CategoriesSection
export const categoriesToArrays = (categoriesMapped: CategoriesMapped) => {
  const categoriesMappedWithArraySubcategories = _.mapValues(categoriesMapped, (category) => ({
    ...category,
    categories: Object.values(category.categories),
  }))
  return Object.values(categoriesMappedWithArraySubcategories)
}

// if it turns out index is too large to store with codebase, it can be fetched instead of being imported
const index = Flexsearch.create()
index.import(JSON.stringify(categoriesIndex))

export const filterFromSearch = async (query: string, categories: Category[]) => {
  // we want the categories and subcategories sorted by original order instead of relevance (?)
  // this is according to designs, it also makes our lives a bit easier here
  const foundIndexes = (await index.search(query)) as number[]
  const sortedUniqueIndexes = _.uniq(foundIndexes.sort((a, b) => a - b))
  return sortedUniqueIndexes.reduce((result, id) => {
    // index stores each searchable record by id
    // this is close to using 'codes' of subcategories, which are not usable for indexing as they contain duplicates
    // for more details check the comments on top of 'categories.ts'
    const categoryIndex = Math.floor(id / 10000) // we encode categories as "their_index_in_category_array * 10000"
    const subcategoryIndex = (id % 10000) - 1 // we encode subcategories as "parent_category_index + index_in_subcategories_array + 1"
    if (id % 10000) {
      // a subcategory is matched, add if not already present
      if (result[result.length - 1]?.name !== categories[categoryIndex].name) {
        const categoryWithSingleSubcategory = {
          ...categories[categoryIndex],
          categories: [categories[categoryIndex].categories[subcategoryIndex]],
        }
        return result.concat(categoryWithSingleSubcategory)
      } else {
        // since we are working on sorted array, the parent category is always last in array if it exists
        return produce(result, (draft) => {
          draft[draft.length - 1].categories.push(
            categories[categoryIndex].categories[subcategoryIndex],
          )
        })
      }
    } else {
      // whole category is matched - add it, but without subcategories
      return result.concat({
        ...categories[categoryIndex],
        categories: [],
      })
    }
  }, [])
}
