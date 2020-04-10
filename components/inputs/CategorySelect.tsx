import {Field} from 'formik'
import React from 'react'
import Select from 'react-select'

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    borderRadius: '4px',
    border: 0,
    cursor: 'pointer',
    minHeight: '47px',
    borderColor: 'transparent',
    boxShadow: 'none',
    padding: '23px 40px',

    ':after': {
      content: '""',
      position: 'relative',
      width: '20px',
      height: '20px',
      backgroundImage: 'url("/images/chevron_down_2.svg")',
      backgroundPosition: 'right center',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    background: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
    margin: 0,
    position: 'relative',
    top: '4px',
    width: '560px',
    left: '-4px',
    borderTop: '4px solid #f9f5f2',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
    '::-webkit-scrollbar-track': {
      width: '3px',
      marginTop: '8px',
      marginBottom: '8px',
      backgroundColor: 'transparent',
    },
    '::-webkit-scrollbar': {
      width: '3px',
      marginTop: '8px',
      marginBottom: '8px',
      backgroundColor: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      width: '3px',
      height: '32px',
      borderRadius: '60px',
      backgroundColor: '#d2cbc6',
    },
  }),
  option: (styles) => {
    return {
      ...styles,
      fontSize: '18px',
      lineHeight: '25px',
      fontWeight: 800,
      color: '#000',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      height: '81px',
      padding: '24px 40px',
      backgroundColor: '#fff',

      ':active': {
        backgroundColor: '#fff',
      },
      ':not(:last-of-type)': {
        borderBottom: '2px solid #fbf4ef;',
      },
    }
  },
  singleValue: (provided) => ({
    ...provided,
    fontSize: '24px',
    lineHeight: '33px',
    fontWeight: 800,
    color: '#000',
    margin: 0,
  }),
}

const options = [
  {value: 'national', label: 'Národná ochranná známka'},
  {value: 'european', label: 'Európska ochranná známka'},
  {value: 'international', label: 'Medzinárodná ochranná známka'},
]

const valueToOption = (value) => {
  return options.filter((item) => item.value === value)
}

const optionToValue = (option) => {
  return option.value
}

const CategorySelect = (props) => {
  return (
    <Field name={props.name}>
      {({form, field}) => (
        <Select
          options={options}
          placeholder=""
          onChange={(value) => {
            if (typeof props.changeCallback === 'function') props.changeCallback()
            form.setFieldValue(props.name, optionToValue(value))
          }}
          value={valueToOption(field.value)}
          hideSelectedOptions
          styles={customStyles}
        />
      )}
    </Field>
  )
}

export default CategorySelect
