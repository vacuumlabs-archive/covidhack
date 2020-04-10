import cn from 'classnames'
import {FormikHelpers} from 'formik'
import React, {useCallback} from 'react'
import {DropzoneOptions, useDropzone} from 'react-dropzone'
import {maxFileSize} from '../utils/constants'

interface FormikDropzoneProps<T> {
  setFieldValue: FormikHelpers<T>['setFieldValue']
  setFieldError: FormikHelpers<T>['setFieldError']
  setFieldTouched: FormikHelpers<T>['setFieldTouched']
  isFileUploaded: boolean
}

// TODO typing is meh, can be inferred from passed in props
const FormikDropzone = ({
  setFieldValue,
  setFieldTouched,
  isFileUploaded,
}: FormikDropzoneProps<{file: File}>) => {
  const onDrop: DropzoneOptions['onDrop'] = useCallback(
    (acceptedFiles) => {
      setFieldValue('file', acceptedFiles[0])
      setFieldTouched('file', true)
    },
    [setFieldValue, setFieldTouched],
  )
  // maxSize should be in mb
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    maxSize: maxFileSize,
    accept: '.jpg',
  })

  return (
    <div
      {...getRootProps()}
      className={cn('box', isDragActive && 'box-active', isFileUploaded && 'without-outline')}
    >
      <input {...getInputProps()} />
      <label className="label-wrapper" htmlFor="file">
        <img src="/images/placeholder.svg" alt="placeholder" className="img" />
        <span className="label-text">Presuňte súbor sem</span>
        <span className="label-text">
          <small>alebo</small>
        </span>
        <div className="btn">Vyberte súbor</div>
      </label>
      <style jsx>{`
        .box {
          background-color: #fdfcfc;
          outline: 2px dashed #d2cbc6;
          width: 100%;
          height: 207px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .without-outline {
          outline: 0;
        }
        .box-active {
          outline: none;
          background-color: #fbf4ef;
        }
        .label-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .img {
          margin-bottom: 12px;
        }
        .label-text {
          display: block;
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          color: #938e8a;
          text-align: center;
        }
        .label-text small {
          font-weight: normal;
          font-size: 14px;
          margin-top: 4px;
        }
        .btn {
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          text-align: center;
          color: #e56a61;
          background: #f6e0df;
          padding: 12px 40px;
          margin-top: 8px;
          cursor: pointer;
        }
        .btn:hover {
          background: #eacdcc;
          transition: all 0.1s linear;
        }
      `}</style>
    </div>
  )
}

export default FormikDropzone
