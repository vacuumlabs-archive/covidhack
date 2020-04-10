import {Field} from 'formik'
import React from 'react'

const BooleanCheckbox = (props) => {
  return (
    <>
      <Field name={props.name}>
        {({field, form}) => (
          <label className="label">
            {props.label}
            <input
              type="checkbox"
              {...props}
              checked={field.value === 'true'}
              onChange={() => {
                if (field.value === 'true') form.setFieldValue(props.name, 'false')
                else form.setFieldValue(props.name, 'true')
              }}
            />
            <span className="checkmark" />
          </label>
        )}
      </Field>
      <style jsx>{`
        .label {
          display: flex;
          align-items: center;
          position: relative;
          margin-bottom: 0;
          cursor: pointer;
          font-size: 12px;
          line-height: 20px;
          padding-left: 32px;
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
        .checkmark {
          position: absolute;
          top: 2px;
          left: 0;
          height: 16px;
          width: 16px;
          background: #f9f5f2;
          box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.08);
        }
        .label input:checked ~ .checkmark {
          background: #da716c;
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
          top: 2px;
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

export default BooleanCheckbox
