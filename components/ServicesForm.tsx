import cn from 'classnames'
import {useField} from 'formik'
import produce from 'immer'
import latinize from 'latinize'
import _ from 'lodash'
import React, {useCallback, useEffect, useState} from 'react'
import Highlighter from 'react-highlight-words'
import allCategories from '../utils/categories'
import {
  categoriesToArrays,
  Category,
  filterFromSearch,
  Subcategory,
  useMappedCategories,
} from '../utils/frontendHelper'

type CategoryCheckboxProps = {
  category: Category
  query?: string
  showAll: boolean
}

type SubcategoryCheckboxProps = {
  category: Category
  subcategory: Subcategory
  query?: string
}

const SubcategoryCheckbox = ({category, subcategory, query}: SubcategoryCheckboxProps) => {
  const [field, meta, helpers] = useField<Category[]>('services')
  const selectedCategoriesMap = useMappedCategories(field.value)
  const checked = !!selectedCategoriesMap[category.name]?.categories?.[subcategory.name]
  const onChange = useCallback(() => {
    if (checked) {
      // produce returns the results of mutation in callback as a new object without mutating the original one
      const updatedCategoriesMap = produce(selectedCategoriesMap, (draft) => {
        delete draft[category.name]['categories'][subcategory.name]
      })
      helpers.setValue(categoriesToArrays(updatedCategoriesMap))
    } else {
      const updatedCategoriesMap = produce(selectedCategoriesMap, (draft) => {
        // need to add the whole category when selecting from search and parent was not selected yet
        if (draft[category.name]) {
          draft[category.name]['categories'][subcategory.name] = subcategory
        } else {
          draft[category.name] = {
            ...category,
            categories: {
              [subcategory.name]: subcategory,
            },
          }
        }
      })
      helpers.setValue(categoriesToArrays(updatedCategoriesMap))
    }
  }, [category, checked, helpers, selectedCategoriesMap, subcategory])
  return (
    <>
      <div className="item">
        <label className="label">
          <Highlighter
            searchWords={query.split(' ')}
            sanitize={latinize}
            autoEscape={true}
            textToHighlight={subcategory.name}
          />
          <input type="checkbox" checked={checked} onChange={onChange} />
          <span className="checkmark" />
        </label>
      </div>
      <style jsx>{`
        .item {
          width: 46%;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
        }
        .label {
          display: flex;
          align-items: center;
          position: relative;
          font-size: 16px;
          line-height: 28px;
          padding-left: 40px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          cursor: pointer;
        }
        .label input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        .checkmark {
          position: absolute;
          left: 0;
          height: 16px;
          width: 16px;
          background: #fbf4ef;
          box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.08);
        }
        .label input:checked ~ .checkmark {
          background: #e56a61;
        }
        .checkmark:after {
          content: '';
          position: absolute;
          display: none;
        }
        .label input:checked ~ .checkmark:after {
          display: block;
        }
        .label .checkmark:after {
          left: 5.5px;
          top: 2.5px;
          width: 3px;
          height: 7px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          -webkit-transform: rotate(36deg);
          -ms-transform: rotate(36deg);
          transform: rotate(36deg);
        }
      `}</style>
    </>
  )
}

const CategoryCheckbox = ({category, query, showAll}: CategoryCheckboxProps) => {
  const [field, meta, helpers] = useField<Category[]>('services')
  const [isExpanded, setIsExpanded] = useState(false)
  const selectedCategoriesMap = useMappedCategories(field.value)
  const checked = !!selectedCategoriesMap[category.name]
  const onChange = useCallback(() => {
    if (checked) {
      // produce returns the results of mutation in callback as a new object without mutating the original one
      const updatedCategoriesMap = produce(selectedCategoriesMap, (draft) => {
        delete draft[category.name]
      })
      helpers.setValue(categoriesToArrays(updatedCategoriesMap))
    } else {
      // we don't want to preselect all subcategories when adding their parent category
      const categoryWithoutSubcategories = {
        ...category,
        categories: [],
      }
      // this case is easy to do directly
      helpers.setValue(field.value.concat(categoryWithoutSubcategories))
      setIsExpanded(true)
    }
  }, [category, checked, field.value, helpers, selectedCategoriesMap, isExpanded, setIsExpanded])
  return (
    <>
      <div className="item">
        <label className="label">
          <Highlighter
            searchWords={query.split(' ')}
            sanitize={latinize}
            autoEscape={true}
            textToHighlight={`${category.number}. ${category.name}`}
          />
          <input type="checkbox" checked={checked} onClick={onChange} />
          <span className="checkmark" />
        </label>
        <span
          className={cn('chevron', (isExpanded || showAll) && 'chevron-down')}
          onClick={(e) => {
            setIsExpanded(!isExpanded)
          }}
        />
      </div>
      <>
        {/* When filtering, always show all subcategories matching the filter */}
        {(isExpanded || showAll) && (
          <div className="wrapper">
            {category.categories.map((sc) => (
              <SubcategoryCheckbox
                key={`${query}:${sc.name}`}
                category={category}
                subcategory={sc}
                query={query}
              />
            ))}
          </div>
        )}
      </>
      <style jsx>{`
        .item {
          padding: 16px;
          border-top: 2px solid #fbf4ef;
          position: relative;
          display: flex;
          align-items: center;
        }
        .item:first-of-type {
          padding-top: 0;
          border-top: 0;
        }
        .label {
          display: flex;
          align-items: center;
          position: relative;
          margin-bottom: 0;
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          padding-left: 40px;
          padding-right: 44px;
          max-width: 976px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .label input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        .chevron {
          content: '';
          position: absolute;
          right: -2px;
          height: 24px;
          width: 24px;
          transform: rotate(180deg);
          background-image: url('/images/chevron_left.svg');
          background-repeat: no-repeat;
          cursor: pointer;
        }
        .chevron-down {
          transform: rotate(270deg);
        }
        .checkmark {
          position: absolute;
          left: 0;
          height: 16px;
          width: 16px;
          background: #fbf4ef;
          box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.08);
          cursor: pointer;
        }
        .label input:checked ~ .checkmark {
          background: #e56a61;
        }
        .checkmark:after {
          content: '';
          position: absolute;
          display: none;
        }
        .label input:checked ~ .checkmark:after {
          display: block;
        }
        .label .checkmark:after {
          left: 5.5px;
          top: 2.5px;
          width: 3px;
          height: 7px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          -webkit-transform: rotate(36deg);
          -ms-transform: rotate(36deg);
          transform: rotate(36deg);
        }
        .wrapper {
          padding: 16px 32px 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          border-top: 2px solid #fbf4ef;
        }
      `}</style>
      <style jsx global>{`
        .label mark {
          background-color: #f6e0df;
        }
      `}</style>
    </>
  )
}

const ServicesForm = (props) => {
  const [query, setQuery] = useState('')
  const [filteredCategories, setFilteredCategories] = useState(allCategories)
  const debouncedSearchEffect = useCallback(
    _.debounce(() => {
      if (!query || query.length < 3) {
        setFilteredCategories(allCategories)
        return
      }
      // TODO here you can set value to show loading if needed
      filterFromSearch(latinize(query), allCategories)
        .then(setFilteredCategories)
        .finally(() => {
          // TODO here you can turn off loading
        })
    }, 500),
    [query],
  )
  useEffect(debouncedSearchEffect, [query])

  return (
    <>
      <div className="overlay" onClick={props.closeModal} />
      <div className="modal">
        <div>
          <div className="header">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search"
              placeholder="Hľadať"
            />
            <h5 className="title">Zoznam tovarov a služieb</h5>
          </div>
          <div className="body">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => {
                return (
                  <CategoryCheckbox
                    category={category}
                    key={`${query}:${category.name}`}
                    query={query}
                    showAll={filteredCategories !== allCategories}
                  />
                )
              })
            ) : (
              <span className="no-results">Nenašli sa žiadne výsledky</span>
            )}
          </div>
        </div>
        <div className="footer">
          <div className="footer-wrapper">
            <div className="footer-text">
              Počet zvolených tried: &nbsp;
              <span>{props.numberOfServices}</span>
            </div>
            <span className="footer-text-light">
              {props.international
                ? 'Výsledná cena závisí aj od počtu zvolených tried. S výslednou cenou Vás kontaktuje náš právnik.'
                : props.national
                ? 'Počet tried v cene: 3 | Každá ďalšia trieda + 20 EUR'
                : 'Počet tried v cene: 1 | Druhá trieda + 50 EUR a každá ďalšia trieda + 150 EUR'}
            </span>
          </div>
          <div className="footer-wrapper-right">
            {props.national ? (
              props.numberOfServices > 3 && (
                <div className="price-note">
                  Cena za triedu navyše:&nbsp;
                  <span className="price">
                    {props.servicesFee > 0 ? props.servicesFee : '--'} EUR
                  </span>
                </div>
              )
            ) : props.international ? (
              <></>
            ) : (
              props.numberOfServices > 1 && (
                <div className="price-note">
                  Cena za triedu navyše:&nbsp;
                  <span className="price">
                    {props.servicesFee > 0 ? props.servicesFee : '--'} EUR
                  </span>
                </div>
              )
            )}
            <button className="btn" onClick={() => props.closeModal()}>
              Uložiť výber
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .overlay {
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0px;
          right: 0px;
          bottom: 0px;
          left: 0px;
          z-index: 1;
          background: rgb(18, 16, 14, 0.75);
        }
        .modal {
          width: 1056px;
          height: 758px;
          margin: 0 auto;
          display: table;
          position: fixed;
          left: 0;
          right: 0;
          top: calc(50% - 379px);
          background-color: #fff;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .header {
          height: 96px;
          background: #fdfcfc;
          border: 4px solid #fbf4ef;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .search {
          background: #fbf4ef;
          box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.06);
          border-radius: 4px;
          border: 0;
          outline: 0;
          font-size: 16px;
          line-height: 28px;
          padding: 15px 12px 14px;
          position: absolute;
          left: 20px;
          width: 100%;
          max-width: 240px;
          background-image: url('/images/search.svg');
          background-repeat: no-repeat;
          background-position-x: 12px;
          background-position-y: 12px;
        }
        .search:not(:placeholder-shown) {
          background-image: none;
        }
        ::-webkit-input-placeholder {
          font-size: 16px;
          line-height: 28px;
          text-align: center;
          color: #938e8a;
        }
        ::-moz-placeholder {
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          text-align: center;
          color: #938e8a;
        }
        :-ms-input-placeholder {
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          text-align: center;
          color: #938e8a;
        }
        :-moz-placeholder {
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          text-align: center;
          color: #938e8a;
        }
        .title {
          font-weight: 800;
          font-size: 26px;
          line-height: 38px;
          margin: 0;
        }
        .body {
          border-left: 4px solid #fbf4ef;
          border-right: 4px solid #fbf4ef;
          max-height: 582px;
          padding: 24px 24px 8px;
          overflow-y: auto;
        }
        ::-webkit-scrollbar-track {
          width: 4px;
          margin-top: 8px;
          margin-bottom: 8px;
          background-color: transparent;
        }
        ::-webkit-scrollbar {
          width: 4px;
          margin-top: 8px;
          margin-bottom: 8px;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          width: 4px;
          height: 32px;
          border-radius: 60px;
          background-color: #d2cbc6;
        }
        .footer {
          height: 80px;
          border: 4px solid #fbf4ef;
          padding: 0 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-wrapper {
          display: flex;
          flex-direction: column;
        }
        .footer-text {
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          margin-bottom: 4px;
          background: #fdfcfc;
        }
        .footer-text-light {
          font-style: italic;
          font-size: 14px;
          line-height: 22px;
          color: #938e8a;
          padding-left: 24px;
          position: relative;
        }
        .footer-text-light:before {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          top: 2px;
          left: 0;
          background-image: url('/images/info.svg');
        }
        .footer-wrapper-right {
          display: flex;
          align-items: center;
        }
        .price-note {
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          margin-right: 24px;
        }
        .price {
          color: #e56a61;
        }
        .btn {
          padding: 12px 40px;
          background: #f6e0df;
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          color: #e56a61;
          border: 0;
          outline: 0;
          cursor: pointer;
        }
        .btn:hover {
          background: #eacdcc;
          transition: all 0.1s linear;
        }
        .no-results {
          color: #938e8a;
          font-style: italic;
        }
      `}</style>
    </>
  )
}

export default ServicesForm
