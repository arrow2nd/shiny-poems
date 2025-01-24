"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { GroupBase, SelectInstance } from "react-select";
import { generateSearchQueryPath } from "libs/url";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const idolSelectRef = useRef<SelectInstance>(null);
  const clotheSelectRef = useRef<SelectInstance>(null);

  const { type, q } = query;

  const submitQuery = (
    type: NonNullable<Query["type"]>,
    q: string | undefined
  ) => {
    if (!q) {
      return;
    }

    const pagePath = generateSearchQueryPath(type, q);
    router.replace(pagePath);
  };

  useEffect(() => {
    const type = searchParams.get("type") as Query["type"];

    switch (type) {
      case "idol":
        idolSelectRef.current?.blur();
        clotheSelectRef.current?.clearValue();
        break;
      case "clothe":
        clotheSelectRef.current?.blur();
        idolSelectRef.current?.clearValue();
        break;
      default:
        idolSelectRef.current?.clearValue();
        clotheSelectRef.current?.clearValue();
    }
  }, [searchParams]);

  return (
    <div className="mb-16 flex justify-center font-sans">
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
            onChange={(e?: Option) => submitQuery("idol", e?.value)}
            ref={idolSelectRef}
          />
          <Select
            placeholder="衣装から"
            options={clotheOptions}
            value={type === "clothe" && q ? { label: q, value: q } : undefined}
            onChange={(e?: Option) => submitQuery("clothe", e?.value)}
            ref={clotheSelectRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
