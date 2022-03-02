import React, { forwardRef, useMemo } from 'react'
import ReactSelect, { StylesConfig, ThemeConfig } from 'react-select'

type Props = {
  placeholder: string
  options: string[]
  onChange: (label: string) => void
}

const Select = (props: Props, ref: React.MutableRefObject<any>) => {
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
    control: (provided) => ({
      ...provided,
      borderWidth: 2,
      boxShadow: 'none'
    })
  }

  const theme: ThemeConfig = (theme) => ({
    ...theme,
    borderRadius: 6, // rounded-md
    colors: {
      ...theme.colors,
      primary: '#4C7ABE',
      primary25: '#8FA2BE',
      primary50: '#8FA2BE',
      primary75: '#4C7ABE',
      neutral5: '#4C7ABE',
      neutral10: '#4C7ABE',
      neutral20: '#4C7ABE',
      neutral30: '#4C7ABE',
      neutral40: '#4C7ABE',
      neutral50: '#8FA2BE',
      neutral60: '#4C7ABE',
      neutral70: '#4C7ABE',
      neutral80: '#4C7ABE',
      neutral90: '#4C7ABE'
    }
  })

  return (
    <ReactSelect
      className="w-full lg:w-72 m-2 bg-white"
      instanceId={props.placeholder}
      placeholder={<p>{props.placeholder}</p>}
      options={options}
      styles={styles}
      theme={theme}
      onChange={handleChangeSelect}
      ref={ref}
    />
  )
}

export default forwardRef(Select)
