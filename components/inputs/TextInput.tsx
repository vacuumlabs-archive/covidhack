import cn from 'classnames'
import {Field} from 'formik'
import React from 'react'

const TextInput = (props) => {
  return (
    <>
      <Field name={props.name}>
        {({form, field}) => (
          <input
            type="text"
            {...props}
            onChange={(evt) => {
              form.setFieldValue(props.name, evt.target.value)
            }}
            placeholder={props.placeholder}
            className={cn(
              'input',
              (props.name === 'address_number' || props.name === 'address_psc') && 'input-short',
            )}
            value={field.value}
          />
        )}
      </Field>
      <style jsx>{`
        .input {
          border: 0;
          outline: none;
          background: #fdfcfc;
          box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.06);
          border-radius: 4px;
          width: 100%;
          font-size: 16px;
          line-height: 20px;
          padding: 14px 12px;
        }
        .input-short {
          max-width: 120px;
        }
        ::-webkit-input-placeholder {
          font-size: 13px;
          line-height: 22px;
          font-style: italic;
          color: #91908d;
        }
        ::-moz-placeholder {
          font-size: 13px;
          line-height: 22px;
          font-style: italic;
          color: #70706f;
        }
        :-ms-input-placeholder {
          font-size: 13px;
          line-height: 22px;
          font-style: italic;
          color: #91908d;
        }
        :-moz-placeholder {
          font-size: 13px;
          line-height: 22px;
          font-style: italic;
          color: #91908d;
        }
      `}</style>
    </>
  )
}

export default TextInput
