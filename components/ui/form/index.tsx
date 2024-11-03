"use client";

import { redirect } from "next/navigation";
import { GroupBase } from "react-select";
import { Query } from "types/query";
import Input from "./input";
import Label from "./label";
import Select, { Option } from "./select";

export type FormProps = {
  query: Query;
  idolOptions: GroupBase<Option>[];
  clotheOptions: Option[];
};

const Form = ({ query, idolOptions, clotheOptions }: FormProps) => {
  const { type, q } = query;

  const handleChangeIdolSelect = (e: Option): void => {
    const searchParams = new URLSearchParams();
    searchParams.set("type", "idol");
    searchParams.set("q", e.value);
    redirect(`/?${searchParams.toString()}`);
  };

  const handleChangeClotheSelect = (e: Option): void => {
    const searchParams = new URLSearchParams();
    searchParams.set("type", "clothe");
    searchParams.set("q", e.value);
    redirect(`/?${searchParams.toString()}`);
  };

  return (
    <div className="mb-16 flex justify-center">
      {/* 画面幅が lg 以下なら縦並びにする */}
      <div className="w-full max-w-lg lg:w-auto lg:max-w-none">
        <Label />
        <div className="flex flex-wrap">
          <Input
            type="search"
            form="search"
            name="q"
            placeholder="ポエムの一部から"
            defaultValue={type === "poem" && q ? q : undefined}
          />
          <Select
            placeholder="アイドルから"
            options={idolOptions}
            value={type === "idol" && q ? { label: q, value: q } : undefined}
            onChange={handleChangeIdolSelect}
            data-testid="idol-combobox"
          />
          <Select
            placeholder="衣装から"
            options={clotheOptions}
            value={type === "clothe" && q ? { label: q, value: q } : undefined}
            onChange={handleChangeClotheSelect}
            data-testid="clothe-combobox"
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
