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
  img.alt = "モブウマ娘";
  unit.appendChild(img);

  const btn = document.createElement("button");
  btn.textContent = "画像選択";
  btn.className = "btn";
  btn.addEventListener("click", () => openModal(img));
  unit.appendChild(btn);

  container.appendChild(unit);
}

let selectedImages = []; // 選択された画像のaltを格納する配列
let characterQuery = ""; // グローバルに宣言したcharacterQuery
// モーダルを開いて画像を選択
function openModal(targetImg) {
  imageGrid.innerHTML = ""; // モーダル内容をリセット

  imageList.forEach(({ fileName, altText }) => {
    const img = document.createElement("img");
    img.src = `${imagePath}${fileName}`;
    img.alt = altText; // alt テキストを設定
    img.addEventListener("click", () => {
      // 画像を選択リストに追加
      if (!selectedImages.includes(img.alt)) {
        selectedImages.push(img.alt);
      }

      // 画像が2つ以上選ばれた場合にcharacterQueryを更新
      if (selectedImages.length >= 2) {
        characterQuery = selectedImages.join(" "); // altを半角スペース区切りで結合
      } else {
        characterQuery = selectedImages; // altを設定
      }
      console.log("characterQuery:", characterQuery); // デバッグ用にconsoleで確認

      targetImg.src = img.src;
      targetImg.alt = img.alt;
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
  //const characterQuery = selectedImg ? selectedImg.alt : ""; // 画像が選ばれている場合のみ alt を取得

  // 3つの検索ワードを組み合わせる
  const query = `${baseQuery} ${userQuery} ${characterQuery}`;

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

// 初期ユニットを1つ作成
createUnit();
