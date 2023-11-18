"use client";

import { FormEventHandler, KeyboardEventHandler, useRef } from "react";

import { SelectOptions } from "types/select-options";

import Input from "./input";
import Label from "./label";
import Select, { SelectElement } from "./select";

export type FormProps = {
  selectOptions: SelectOptions;
  dispatch: (payload: FormData) => void;
};

const Form = ({ selectOptions, dispatch }: FormProps) => {
  const idolSelectRef = useRef<SelectElement>(null);
  const clotheSelectRef = useRef<SelectElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = ({
    currentTarget
  }) => {
    // ポエムの一部からの検索なら他の選択状態をクリア
    if (currentTarget.query?.value) {
      idolSelectRef.current?.clear();
      clotheSelectRef.current?.clear();
    }
  };

  const handleIdolChange: FormEventHandler<HTMLSelectElement> = ({
    currentTarget: { form }
  }) => {
    if (form) {
      form.query.value = "";
      clotheSelectRef.current?.clear();
      form.requestSubmit();
    }
  };

  const handleClotheChange: FormEventHandler<HTMLSelectElement> = ({
    currentTarget: { form }
  }) => {
    if (form) {
      form.query.value = "";
      idolSelectRef.current?.clear();
      form.requestSubmit();
    }
  };

  return (
    <div className="flex justify-center mb-16">
      {/* 画面幅が lg 以下なら縦並びにする */}
      <div className="w-full lg:w-auto max-w-lg lg:max-w-none">
        <Label />
        <form
          className="flex flex-wrap"
          action={dispatch}
          onSubmit={handleSubmit}
        >
          <Input name="query" placeholder="ポエムの一部から" />
          <Select
            name="idol"
            placeholder="アイドルから"
            onChange={handleIdolChange}
            ref={idolSelectRef}
            data-testid="idol-combobox"
          >
            {selectOptions.units.map(({ name, members }) => (
              <optgroup key={name} label={name}>
                {members.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </optgroup>
            ))}
          </Select>
          <Select
            name="clothe"
            placeholder="衣装から"
            onChange={handleClotheChange}
            ref={clotheSelectRef}
            data-testid="clothe-combobox"
          >
            {selectOptions.clothes.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </Select>
        </form>
      </div>
    </div>
  );
};

export default Form;
