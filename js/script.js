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

  // 画像の作成
  const img = document.createElement("img");
  img.className = "selected-image";
  img.src = `${imagePath}モブウマ娘.png`; // 初期画像
  img.alt = ""; // 初期alt
  img.addEventListener("click", () => openModal(img)); // 画像クリックでモーダルを開く
  unit.appendChild(img);

  // 削除ボタンの作成
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "削除";
  deleteButton.addEventListener("click", () => deleteUnit(unit));
  unit.appendChild(deleteButton);
  // お気に入りボタンの作成
  const favoriteButton = document.createElement("button");
  favoriteButton.className = "delete-button";
  favoriteButton.textContent = "お気に入り追加";
  favoriteButton.addEventListener("click", () =>
    addToFavorites(img.src, img.alt)
  );
  unit.appendChild(favoriteButton);
  container.appendChild(unit); // ボタンを削除したため直接ユニットを追加
}
// お気に入りを追加する関数
// お気に入りを追加する関数
function addToFavorites(fileName, altText) {
  // 現在のページのベースURLを取得
  const baseUrl = window.location.origin; // http://localhost:8000 や https://yourdomain.com

  // "img/" プレフィックスを取り除く
  const cleanFileName = fileName.replace(baseUrl + "/img/", "");

  // 既存のデータを取得
  let favorites = JSON.parse(localStorage.getItem("favoriteCharacter")) || [];

  // 重複を防ぐ
  if (
    !favorites.some(
      (fav) => fav.fileName === cleanFileName && fav.altText === altText
    )
  ) {
    // 画像ファイル名とaltTextをセットで保存
    favorites.push({ fileName: cleanFileName, altText });
    localStorage.setItem("favoriteCharacter", JSON.stringify(favorites));
    console.log("お気に入りに追加しました:", {
      fileName: cleanFileName,
      altText,
    });
  }
}

function getFavorites() {
  return JSON.parse(localStorage.getItem("favoriteCharacter")) || [];
}

// ユニットを削除する関数
function deleteUnit(unit) {
  const img = unit.querySelector(".selected-image");
  const altText = img.alt;

  // 選択済みリストから削除
  if (altText !== "モブウマ娘" && selectedImages.includes(altText)) {
    selectedImages = selectedImages.filter((alt) => alt !== altText);
  }

  // containerからユニットを削除
  container.removeChild(unit);

  // クエリの更新
  characterQuery = selectedImages.join(" "); // 選択済みのaltを半角スペース区切りで結合
  updateQueryDisplay();
}

let selectedImages = []; // 選択された画像のaltを格納する配列
let characterQuery = ""; // グローバルに宣言したcharacterQuery
let bfdayQuery = ""; // グローバルに宣言したdateQuery
let afdayQuery = ""; // グローバルに宣言したdateQuery
let isFavoritesMode = false; // 初期はすべての画像を表示

function openModal(targetImg) {
  imageGrid.innerHTML = ""; // モーダル内容をリセット

  // 表示するリストを切り替え
  const displayList = isFavoritesMode ? getFavorites() : imageList;

  displayList.forEach(({ fileName, altText }) => {
    const img = document.createElement("img");
    img.src = `${imagePath}${fileName}`;
    img.alt = altText;

    if (selectedImages.includes(altText)) {
      img.style.opacity = "0.5";
      img.style.pointerEvents = "none";
    }

    img.addEventListener("click", () => {
      const currentAlt = targetImg.alt;
      if (currentAlt !== "モブウマ娘" && selectedImages.includes(currentAlt)) {
        selectedImages = selectedImages.filter((alt) => alt !== currentAlt);
      }

      targetImg.src = img.src;
      targetImg.alt = img.alt;

      if (!selectedImages.includes(img.alt)) {
        selectedImages.push(img.alt);
      }

      characterQuery = selectedImages.join(" ");
      updateQueryDisplay();
      closeModal.click();
    });

    imageGrid.appendChild(img);
  });

  modal.style.display = "block";
}

// モード切り替えボタンのクリックイベント
// モード切り替えボタンのクリックイベント
function toggleMode() {
  isFavoritesMode = !isFavoritesMode; // モードを切り替える
  const modeText = isFavoritesMode ? "お気に入り" : "すべての画像";
  document.getElementById(
    "toggleButton"
  ).textContent = `モード切り替え: ${modeText}`;

  // 現在のモードに基づいてモーダルを再描画
  //  openModal(document.querySelector(".selected-image")); // 任意のtargetImgを再描画
}

// 初期設定でモード切り替えボタンを作成
function createToggleButton() {
  const toggleButton = document.createElement("button");
  toggleButton.id = "toggleButton";
  toggleButton.textContent = "モード切り替え: すべての画像";
  toggleButton.addEventListener("click", toggleMode);

  // buttonContainerに追加
  const buttonContainer = document.getElementById("buttonContainer");
  buttonContainer.appendChild(toggleButton); // ボタンを追加
}

function updateSearchInput() {
  const selectedAlts = Array.from(document.querySelectorAll(".selected-image"))
    .map((img) => img.alt)
    .join(" ");
  searchInput.value = selectedAlts;
}
// グローバル変数
let query = "";
let userQuery = "";
const baseQuery = `site:bbs.animanch.com/ "カテゴリ『ウマ娘・競馬』"`;
// 検索クエリを表示する要素
const queryDisplay = document.getElementById("query-display");
function performGoogleSearch() {
  // 画像の alt 情報を取得
  const selectedImg = document.querySelector(".selected-image");

  // 3つの検索ワードを組み合わせる
  query = `${baseQuery} ${userQuery} ${characterQuery} ${afdayQuery} ${bfdayQuery}`;

  // Google 検索 URL を作成
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(
    query
  )}`;

  // 新しいタブで検索結果を開く
  window.open(googleUrl, "_blank");
}

// ボタンのクリック時にユニットを追加し、クエリを更新
addUnitBtn.addEventListener("click", () => {
  // ユニットを追加する処理
  createUnit();

  // クエリの更新
  updateQueryDisplay();
});
// 入力フィールドの変更時にクエリを更新
searchInput.addEventListener("input", () => {
  userQuery = searchInput.value.trim();
  updateQueryDisplay();
});

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
  searchBtn.addEventListener("click", performGoogleSearch);
  createToggleButton(); // ボタン作成関数を呼び出し
});
// カレンダーの日付が変更された際にクエリを更新
document.getElementById("bfday").addEventListener("change", updateQuery);
document.getElementById("afday").addEventListener("change", updateQuery);
let bfday = "";
let afday = "";
function updateQuery() {
  bfday = document.getElementById("bfday").value;
  afday = document.getElementById("afday").value;

  // 検索クエリを構築
  if (afday) {
    afdayQuery = ` after:${afday}`;
  }
  if (bfday) {
    bfdayQuery = ` before:${bfday}`;
  }
  updateQueryDisplay();
  console.log(afdayQuery); // 結果を表示（必要に応じて他の処理に使用）
  console.log(bfdayQuery); // 結果を表示（必要に応じて他の処理に使用）
}
function updateQueryDisplay() {
  // 3つの検索ワードを組み合わせる
  query = `${baseQuery} ${userQuery} ${characterQuery} ${afdayQuery} ${bfdayQuery}`;
  // HTML 上に表示
  queryDisplay.textContent = query;
}
// 初期ユニットを1つ作成
//createUnit();
updateQueryDisplay(); //query表示を更新
