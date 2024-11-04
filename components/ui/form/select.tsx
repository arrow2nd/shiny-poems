import dynamic from "next/dynamic";
import { ComponentProps, useRef } from "react";
import {
  GroupBase,
  OptionsOrGroups,
  SelectInstance,
  StylesConfig,
  ThemeConfig
} from "react-select";

type Props = {
  options: OptionsOrGroups<Option, GroupBase<Option>>;
  placeholder?: string;
} & Omit<ComponentProps<typeof ReactSelect>, "onMenuClose">;

export type Option = {
  label: string;
  value: string;
};

const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => (
    <input
      className="m-2 flex h-10 w-full items-center rounded-md border-2 border-main bg-white p-2 text-main lg:w-72"
      type="text"
      disabled
      data-testid="combobox-loading"
    />
  )
});

const Select = ({ placeholder, options, ...props }: Props) => {
  const ref = useRef<SelectInstance>(null);

  const styles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      borderWidth: 2,
      boxShadow: "none"
    })
  };

  const theme: ThemeConfig = (theme) => ({
    ...theme,
    borderRadius: 6, // rounded-md
    colors: {
      ...theme.colors,
      primary: "#4C7ABE",
      primary25: "#8FA2BE",
      primary50: "#8FA2BE",
      primary75: "#4C7ABE",
      neutral5: "#4C7ABE",
      neutral10: "#4C7ABE",
      neutral20: "#4C7ABE",
      neutral30: "#4C7ABE",
      neutral40: "#4C7ABE",
      neutral50: "#8FA2BE",
      neutral60: "#4C7ABE",
      neutral70: "#4C7ABE",
      neutral80: "#4C7ABE",
      neutral90: "#4C7ABE"
    }
  });

  return (
    <ReactSelect
      className="m-2 h-10 w-full bg-white lg:w-72"
      instanceId={placeholder}
      placeholder={<p>{placeholder}</p>}
      options={options}
      styles={styles}
      theme={theme}
      noOptionsMessage={() => "見つかりません…"}
      onMenuClose={() => {
        // NOTE: blurInputOnSelectが効かないので
        ref.current?.blur();
      }}
      ref={ref}
      {...props}
    />
  );
};

export default Select;
