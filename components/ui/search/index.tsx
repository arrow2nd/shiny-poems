import { useRef, useState } from "react";

import { poemList } from "data/poem-list";

import Input from "./input";
import Label from "./label";
import Select from "./select";

type Props = {
  onSearch: (type: string, label: string) => void;
};

const Search = ({ onSearch }: Props) => {
  // 選択要素に使用するアイドル名
  const [idolNames] = useState(
    Array.from(new Set(poemList.map((e) => e.idolName)))
  );

  // 選択要素に使用する衣装名
  const [clothesTitles] = useState(
    Array.from(new Set(poemList.map((e) => e.clothesTitle))).sort()
  );

  const keywordInput = useRef<HTMLInputElement>(null);
  const idolSelect = useRef(null);
  const clothesSelect = useRef(null);

  // キーワード欄をクリア
  const clearKeywordInput = () => {
    if (keywordInput.current.value) {
      keywordInput.current.value = "";
    }
  };

  // アイドル名の選択をクリア
  const clearIdolSelect = () => {
    if (idolSelect.current.state.selectValue) {
      idolSelect.current.clearValue();
    }
  };

  // 衣装名の選択をクリア
  const clearClothesSelect = () => {
    if (clothesSelect.current.state.selectValue) {
      clothesSelect.current.clearValue();
    }
  };

  const handleSubmit = () => {
    const keyword = keywordInput.current.value;
    if (!keyword) return;

    clearIdolSelect();
    clearClothesSelect();

    onSearch("text", keyword);
  };

  const handleChangeIdolName = (label: string) => {
    clearKeywordInput();
    clearClothesSelect();

    onSearch("idolName", label);
  };

  const handleChangeclothesTitle = (label: string) => {
    clearKeywordInput();
    clearIdolSelect();

    onSearch("clothesTitle", label);
  };

  return (
    <div className="flex justify-center mb-16">
      {/* 画面幅が lg 以下なら縦並びにする */}
      <div className="w-full lg:w-auto max-w-lg lg:max-w-none">
        <Label />
        <div className="flex flex-wrap">
          <Input
            placeholder="ポエムの一部から"
            onSubmit={handleSubmit}
            ref={keywordInput}
          />
          <Select
            placeholder="アイドル名から"
            options={idolNames}
            onChange={handleChangeIdolName}
            ref={idolSelect}
            data-testid="idol-search-select"
          />
          <Select
            placeholder="衣装名から"
            options={clothesTitles}
            onChange={handleChangeclothesTitle}
            ref={clothesSelect}
            data-testid="clothes-search-select"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
