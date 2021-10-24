import React, { useMemo, forwardRef } from 'react'
import ReactSelect, { StylesConfig } from 'react-select'

type Props = {
  placeholder: string
  options: string[]
  onChange: (label: string) => void
}

const Select = forwardRef(function SelectContent(
  props: Props,
  ref: React.MutableRefObject<any>
) {
  const options = useMemo(
    () => props.options.map((e, i) => ({ value: i, label: e })),
    [props.options]
  )

  const handleChangeSelect = (value: { value: number; label: string }) => {
    if (value) {
      props.onChange(value.label)
    }
  }

  const styles: StylesConfig = {
    placeholder: (provided) => ({
      ...provided,
      textAlign: 'left'
    }),
    menu: (provided) => ({
      ...provided,
      textAlign: 'center'
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: 'left'
    })
  }

  return (
    <ReactSelect
      className="w-72 h-9 mx-1 my-2 rounded-md bg-white"
      instanceId={props.placeholder}
      placeholder={<p>{props.placeholder}</p>}
      options={options}
      styles={styles}
      onChange={handleChangeSelect}
      ref={ref}
    />
  )
})

export default Select
