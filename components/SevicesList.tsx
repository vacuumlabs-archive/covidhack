import _ from 'lodash'
import React from 'react'
import {categoriesToArrays, useMappedCategories} from '../utils/frontendHelper'

const deleteSubcategory = (oldValue, category, subcategory) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const value = useMappedCategories(oldValue)
  delete value[category]['categories'][subcategory]
  if (_.isEmpty(value[category]['categories'])) delete value[category]
  return categoriesToArrays(value)
}

const ServicesList = (props) => (
  <>
    {props.services.length > 0 && (
      <div className="title-wrapper">
        <span className="title">Názov tovaru/služieb</span>
        <span className="title">Číslo triedy</span>
      </div>
    )}
    {_.sortBy(props.services, (o) => o.number).map((category) => (
      <div key={category.name} className="wrapper">
        <ul className="list">
          {category.categories.map((subcategory) => (
            <li key={subcategory.name} className="item">
              <div className="category-wrapper">
                <span
                  onClick={() =>
                    props.setFieldValue(
                      'services',
                      deleteSubcategory(props.services, category.name, subcategory.name),
                    )
                  }
                  className="close-icon"
                />
                <span className="name">{subcategory.name}</span>
              </div>
              <span className="category_number">{category.number}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
    <style jsx>{`
      .title-wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
      }
      .title {
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
      }
      .wrapper + .wrapper {
        margin-top: 12px;
      }
      .list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .item {
        padding-left: 28px;
        position: relative;
        display: flex;
        align-items: center;
      }
      .item + .item {
        margin-top: 12px;
      }
      .close-icon {
        content: '';
        position: absolute;
        top: 6px;
        left: 0;
        width: 16px;
        height: 16px;
        background-image: url('/images/x.svg');
        background-repeat: no-repeat;
        cursor: pointer;
      }
      .category-wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      .name {
        max-width: 415px;
      }
      .name,
      .category_number {
        font-size: 16px;
        line-height: 28px;
      }
      .category_number {
        text-align: right;
      }
    `}</style>
  </>
)

export default ServicesList
