"use client";

import {
  FormEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  useRef
} from "react";

import { poemList } from "data/poem-list";

import Input from "./input";
import Label from "./label";
import Select, { SelectElement } from "./select";

type Props = {
  dispatch: (payload: FormData) => void;
};

const Form = ({ dispatch }: Props) => {
  const idolSelectRef = useRef<SelectElement>(null);
  const clotheSelectRef = useRef<SelectElement>(null);

  // 選択要素に使用するアイドル名
  const idolNames = Array.from(new Set(poemList.map((e) => e.idolName)));

  // 選択要素に使用する衣装名
  const clothesTitles = Array.from(
    new Set(poemList.map((e) => e.clothesTitle))
  ).sort();

  const handleQueryKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    // 変換中 OR Enter 以外ならクリアしない
    if (e.nativeEvent.isComposing || e.key !== "Enter") {
      return;
    }

    idolSelectRef.current?.clear();
    clotheSelectRef.current?.clear();
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
        <form className="flex flex-wrap" action={dispatch}>
          <Input
            name="query"
            placeholder="ポエムの一部から"
            onKeyDown={handleQueryKeyDown}
          />
          <Select
            name="idol"
            placeholder="アイドルから"
            onChange={handleIdolChange}
            ref={idolSelectRef}
          >
            {idolNames.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </Select>
          <Select
            name="clothe"
            placeholder="衣装から"
            onChange={handleClotheChange}
            ref={clotheSelectRef}
          >
            {clothesTitles.map((e) => (
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
