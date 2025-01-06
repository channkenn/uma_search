// 初期化時に画像リストをロード
import { imagePath, imageList } from "./imageList.js";

const container = document.getElementById("container");
const addUnitBtn = document.getElementById("add-unit-btn");
const modal = document.getElementById("imageModal");
const closeModal = document.getElementById("closeModal");
const imageGrid = document.getElementById("imageGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
// `input` 要素を取得（HTML に id="searchInput" の要素が必要）
const inputField = document.getElementById("searchInput");
let unitCount = 0;

function createUnit() {
  unitCount++;
  const unit = document.createElement("div");
  unit.className = "unit";
  unit.id = `unit-${unitCount}`;

  const img = document.createElement("img");
  img.className = "selected-image";
  img.src = `${imagePath}モブウマ娘.png`; // 初期画像
  img.alt = ""; // 初期alt
  img.addEventListener("click", () => openModal(img)); // 画像クリックでモーダルを開く
  unit.appendChild(img);

  container.appendChild(unit); // ボタンを削除したため直接ユニットを追加
}

let selectedImages = []; // 選択された画像のaltを格納する配列
let characterQuery = ""; // グローバルに宣言したcharacterQuery
let bfdayQuery = ""; // グローバルに宣言したdateQuery
let afdayQuery = ""; // グローバルに宣言したdateQuery
// モーダルを開いて画像を選択
function openModal(targetImg) {
  imageGrid.innerHTML = ""; // モーダル内容をリセット

  imageList.forEach(({ fileName, altText }) => {
    const img = document.createElement("img");
    img.src = `${imagePath}${fileName}`;
    img.alt = altText; // alt テキストを設定

    // すでに選択されている場合は半透明にしてクリックできないようにする
    if (selectedImages.includes(altText)) {
      img.style.opacity = "0.5"; // 半透明
      img.style.pointerEvents = "none"; // クリック無効
    }

    img.addEventListener("click", () => {
      // 選択解除の場合、選択済みリストから削除
      const currentAlt = targetImg.alt;
      if (currentAlt !== "モブウマ娘" && selectedImages.includes(currentAlt)) {
        selectedImages = selectedImages.filter((alt) => alt !== currentAlt);
      }

      // 新しい画像を選択
      targetImg.src = img.src;
      targetImg.alt = img.alt;

      // 選択済みリストに追加
      if (!selectedImages.includes(img.alt)) {
        selectedImages.push(img.alt);
      }

      // `characterQuery` を更新
      characterQuery = selectedImages.join(" "); // 選択済みのaltを半角スペース区切りで結合

      console.log("characterQuery:", characterQuery); // デバッグ用にconsoleで確認

      closeModal.click();
    });

    imageGrid.appendChild(img);
  });

  modal.style.display = "block";
}

function updateSearchInput() {
  const selectedAlts = Array.from(document.querySelectorAll(".selected-image"))
    .map((img) => img.alt)
    .join(" ");
  searchInput.value = selectedAlts;
}

function performGoogleSearch() {
  const baseQuery = `site:bbs.animanch.com/ "カテゴリ『ウマ娘・競馬』"`;
  const userQuery = searchInput.value.trim();

  // 画像の alt 情報を取得
  const selectedImg = document.querySelector(".selected-image");

  // 3つの検索ワードを組み合わせる
  const query = `${baseQuery} ${userQuery} ${characterQuery} ${afdayQuery} ${bfdayQuery}`;

  // Google 検索 URL を作成
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(
    query
  )}`;

  // 新しいタブで検索結果を開く
  window.open(googleUrl, "_blank");
}

addUnitBtn.addEventListener("click", createUnit);
searchBtn.addEventListener("click", performGoogleSearch);

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  searchBtn.addEventListener("click", performGoogleSearch);

  function performGoogleSearch() {
    const baseQuery = `site:bbs.animanch.com/ "カテゴリ『ウマ娘・競馬』"`;
    const userQuery = searchInput.value.trim();
    const query = `${baseQuery} ${userQuery}`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(
      query
    )}`;
    window.open(googleUrl, "_blank");
  }
});
// カレンダーの日付が変更された際にクエリを更新
document.getElementById("bfday").addEventListener("change", updateQuery);
document.getElementById("afday").addEventListener("change", updateQuery);

function updateQuery() {
  const bfday = document.getElementById("bfday").value;
  const afday = document.getElementById("afday").value;

  // 検索クエリを構築
  if (afday) {
    afdayQuery = ` after:${afday}`;
  }
  if (bfday) {
    bfdayQuery = ` before:${bfday}`;
  }

  console.log(afdayQuery); // 結果を表示（必要に応じて他の処理に使用）
  console.log(bfdayQuery); // 結果を表示（必要に応じて他の処理に使用）
}
// 初期ユニットを1つ作成
createUnit();
