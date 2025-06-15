import {
  type Poem,
  generatePoemId,
  loadPoems,
  savePoems,
  validatePoem
} from "@/lib/poem-data";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await loadPoems();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, poem } = body;

    if (action === "create") {
      const errors = validatePoem(poem);
      if (errors.length > 0) {
        return NextResponse.json({ errors }, { status: 400 });
      }

      const data = await loadPoems();
      const newPoem: Poem = {
        ...poem,
        id: poem.id || generatePoemId(poem.idolName, poem.clothesName)
      };

      // IDの重複チェック
      if (data.poems.some((p) => p.id === newPoem.id)) {
        return NextResponse.json(
          { errors: ["同じIDのポエムが既に存在します"] },
          { status: 400 }
        );
      }

      data.poems.push(newPoem);
      data.updatedAt =
        new Date()
          .toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "Asia/Tokyo"
          }) + " (JST)";

      await savePoems(data);
      return NextResponse.json({ success: true, poem: newPoem });
    }

    if (action === "update") {
      const errors = validatePoem(poem);
      if (errors.length > 0) {
        return NextResponse.json({ errors }, { status: 400 });
      }

      const data = await loadPoems();
      const index = data.poems.findIndex((p) => p.id === poem.id);

      if (index === -1) {
        return NextResponse.json(
          { errors: ["ポエムが見つかりません"] },
          { status: 404 }
        );
      }

      data.poems[index] = poem;
      data.updatedAt =
        new Date()
          .toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "Asia/Tokyo"
          }) + " (JST)";

      await savePoems(data);
      return NextResponse.json({ success: true, poem });
    }

    if (action === "delete") {
      const data = await loadPoems();
      const index = data.poems.findIndex((p) => p.id === poem.id);

      if (index === -1) {
        return NextResponse.json(
          { errors: ["ポエムが見つかりません"] },
          { status: 404 }
        );
      }

      data.poems.splice(index, 1);
      data.updatedAt =
        new Date()
          .toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "Asia/Tokyo"
          }) + " (JST)";

      await savePoems(data);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { errors: ["不正なアクションです"] },
      { status: 400 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { errors: ["サーバーエラーが発生しました"] },
      { status: 500 }
    );
  }
}

