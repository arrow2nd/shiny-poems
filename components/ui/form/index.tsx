"use client";

import { SearchParams } from "libs/poems";

import { poemList } from "data/poem-list";

import Input from "./input";
import Label from "./label";
import Select from "./select";

type Props = {
  params?: SearchParams;
};

const Form = ({ params }: Props) => {
  // 選択要素に使用するアイドル名
  const idolNames = Array.from(new Set(poemList.map((e) => e.idolName)));

  // 選択要素に使用する衣装名
  const clothesTitles = Array.from(
    new Set(poemList.map((e) => e.clothesTitle))
  ).sort();

  return (
    <div className="flex justify-center mb-16">
      {/* 画面幅が lg 以下なら縦並びにする */}
      <div className="w-full lg:w-auto max-w-lg lg:max-w-none">
        <Label />
        <form className="flex flex-wrap" action="/search">
          <input name="type" value="text" hidden />
          <Input
            name="query"
            placeholder="ポエムの一部から"
            defaultValue={params?.query}
          />
          <Select
            placeholder="アイドルから"
            options={idolNames}
            onChange={() => {}} // TODO: formで使いたい
          />
          <Select
            placeholder="衣装から"
            options={clothesTitles}
            onChange={() => {}}
          />
        </form>
      </div>
    </div>
  );
};

export default Form;
