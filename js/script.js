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
  /*   const favoriteButton = document.createElement("button");
  favoriteButton.className = "delete-button";
  favoriteButton.textContent = "お気に入り追加";
  favoriteButton.addEventListener("click", () =>
    addToFavorites(img.src, img.alt)
  );
  unit.appendChild(favoriteButton); */
  container.appendChild(unit); // ボタンを削除したため直接ユニットを追加
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

    // お気に入り追加・削除ボタン
    const favoriteButton = document.createElement("button");
    favoriteButton.textContent = isFavoritesMode ? "削除" : "お気に入り追加";
    favoriteButton.addEventListener("click", () => {
      if (isFavoritesMode) {
        removeFromFavorites(fileName); // お気に入りから削除
      } else {
        addToFavorites(fileName, altText); // お気に入りに追加
      }
      openModal(targetImg); // モーダルを再描画
    });

    // 画像クリック時の処理
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

    const imgContainer = document.createElement("div");
    imgContainer.appendChild(img);
    imgContainer.appendChild(favoriteButton);
    imageGrid.appendChild(imgContainer);
  });

  modal.style.display = "block";
}
// モーダル要素
const historyModal = document.getElementById("history-modal");
const closehistoryModal = document.getElementById("close-modal");
const historyList = document.getElementById("history-list");
const historyButton = document.getElementById("history-button");

// 履歴モーダルを開く
historyButton.addEventListener("click", () => {
  // 履歴を取得
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // 履歴をリストに追加
  historyList.innerHTML = ""; // 既存のリストをクリア
  if (searchHistory.length === 0) {
    const noHistoryItem = document.createElement("li");
    noHistoryItem.textContent = "検索履歴はありません。";
    historyList.appendChild(noHistoryItem);
  } else {
    searchHistory.forEach((entry, index) => {
      const listItem = document.createElement("li");
      listItem.className = "history-item";

      // リストアイテムの内容（削除ボタン、日時、URLの順）
      const shortQuery =
        entry.query.length > 50
          ? `${entry.query.slice(0, 47)}...`
          : entry.query;

      listItem.innerHTML = `
        <span>${entry.date}</span>
        <a href="${entry.url}" target="_blank" class="query-link">${shortQuery}</a>
        <button class="delete-btn" data-index="${index}">削除</button>
        <button class="set-btn" data-index="${index}">セット</button>
      `;
      historyList.appendChild(listItem);
    });

    // 削除ボタンにイベントリスナーを追加
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index; // 削除対象のインデックスを取得
        searchHistory.splice(index, 1); // 配列から該当項目を削除
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory)); // 更新された履歴を保存
        e.target.parentElement.remove(); // リストから該当項目を削除

        // リストが空の場合、"検索履歴はありません"を表示
        if (searchHistory.length === 0) {
          const noHistoryItem = document.createElement("li");
          noHistoryItem.textContent = "検索履歴はありません。";
          historyList.appendChild(noHistoryItem);
        }
      });
    });
    // セットボタンにイベントリスナーを追加
    document.querySelectorAll(".set-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index; // セット対象のインデックスを取得
        const selectedEntry = searchHistory[index]; // 選択した履歴項目を取得
        // ユニットの初期化処理
        resetUnits(); // ここでユニットの初期化を行う関数を呼び出す
        historySet(selectedEntry); // historySet関数を実行
        // 履歴モーダルを閉じる
        historyModal.style.display = "none";
      });
    });
    // 「すべて削除」ボタンのイベントリスナー
    document.getElementById("clear-all-btn").addEventListener("click", () => {
      localStorage.removeItem("searchHistory"); // 履歴を削除
      historyList.innerHTML = ""; // リストをクリア
      const noHistoryItem = document.createElement("li");
      noHistoryItem.textContent = "検索履歴はありません。";
      historyList.appendChild(noHistoryItem);
    });
  }

  // モーダルを表示
  historyModal.style.display = "block";
});
// ユニットの初期化関数（例）
function resetUnits() {
  unitCount = 0;
  // ここにユニットを初期化するロジックを記述
  console.log("ユニットを初期化しました");
  // 例えば、すべてのユニットを削除する、または新しいユニットを作成し直すなど
  document.querySelectorAll(".unit").forEach((unit) => {
    unit.remove(); // ユニットを削除する例
  });
}
// モーダルを閉じる
closehistoryModal.addEventListener("click", () => {
  historyModal.style.display = "none";
});

// モーダル外をクリックしたときに閉じる
window.addEventListener("click", (event) => {
  if (event.target === historyModal) {
    historyModal.style.display = "none";
  }
});
// お気に入り追加
function addToFavorites(fileName, altText) {
  let favorites = JSON.parse(localStorage.getItem("favoriteCharacter")) || [];
  if (!favorites.some((fav) => fav.fileName === fileName)) {
    favorites.push({ fileName, altText });
    localStorage.setItem("favoriteCharacter", JSON.stringify(favorites));
  }
}

// お気に入り削除
function removeFromFavorites(fileName) {
  let favorites = JSON.parse(localStorage.getItem("favoriteCharacter")) || [];
  favorites = favorites.filter((fav) => fav.fileName !== fileName);
  localStorage.setItem("favoriteCharacter", JSON.stringify(favorites));
}

// お気に入りリストを取得
function getFavorites() {
  return JSON.parse(localStorage.getItem("favoriteCharacter")) || [];
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
// 実際にGoogle検索をする箇所
function performGoogleSearch() {
  // 画像の alt 情報を取得
  const selectedImg = document.querySelector(".selected-image");

  // 3つの検索ワードを組み合わせる
  query = `${baseQuery} ${userQuery} ${characterQuery} ${afdayQuery} ${bfdayQuery}`;
  const historyQuery = `${userQuery} ${characterQuery} ${afdayQuery} ${bfdayQuery}`;

  // Google 検索 URL を作成
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(
    query
  )}`;
  // 現在の日時を取得
  const currentDate = new Date().toLocaleString();

  // 履歴を保存
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistory.push({
    date: currentDate,
    query: historyQuery,
    url: googleUrl,
    userQuery: userQuery,
    characterQuery: characterQuery,
    afday: afdayQuery,
    bfday: bfdayQuery,
  });
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
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

function createUnitsFromQuery(query) {
  // クエリをスペース区切りで分割して配列にする
  const keywords = query.match(/\([^)]*\)/g);
  // キーワードごとに処理
  keywords.forEach((keyword) => {
    // imageList から一致する画像を検索
    const image = imageList.find((img) => img.altText.includes(keyword));

    if (image) {
      // 一致する画像が見つかった場合、ユニットを作成
      createUnitWithImage(`${imagePath}${image.fileName}`, image.altText);
    } else {
      console.warn(`No matching image found for keyword: ${keyword}`);
    }
  });
  characterQuery = query;
}

function createUnitWithImage(imgSrc, altText) {
  // コンテナ要素を取得
  const container = document.getElementById("container");
  if (!container) {
    console.error("Container element not found.");
    return;
  }

  // ユニットを作成
  unitCount++;
  const unit = document.createElement("div");
  unit.className = "unit";
  unit.id = `unit-${unitCount}`; // 一意のID（タイムスタンプ）

  // 画像を作成して追加
  const img = document.createElement("img");
  img.className = "selected-image";
  img.src = imgSrc; // imagePath を含む完全な相対パス
  img.alt = altText;
  if (!selectedImages.includes(img.alt)) {
    selectedImages.push(img.alt);
  }
  img.addEventListener("click", () => openModal(img)); // 画像クリックでモーダルを開く

  unit.appendChild(img);

  // 削除ボタンを作成して追加
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "削除";
  deleteButton.addEventListener("click", () => unit.remove());
  unit.appendChild(deleteButton);

  // ユニットをコンテナに追加
  container.appendChild(unit);
}

// 指定した文字列を入力欄にセットする関数
function setInputValue(value) {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = value;
    userQuery = value;
  } else {
    console.error("検索欄が見つかりません");
  }
}

// 特定の日付を指定の date input に設定する関数
// 特定の日付を指定の date input に設定する関数
function setDate(inputId, dateValue) {
  const dateInput = document.getElementById(inputId);
  if (dateInput) {
    // コロンより後ろの部分を取得
    const dateOnly = dateValue.split(":")[1]; // コロンで分割して後ろの部分を取り出す

    // 日付の形式を確認して "YYYY-MM-DD" 形式に変換
    const formattedDate = new Date(dateOnly).toISOString().split("T")[0]; // "YYYY-MM-DD" 形式に変換

    // "YYYY-MM-DD" 形式で設定
    dateInput.value = formattedDate;

    // inputId に応じて対応する変数に値を設定
    if (inputId === "afday") {
      afdayQuery = `${dateValue}`;
    } else if (inputId === "bfday") {
      bfdayQuery = `${dateValue}`;
    }

    console.log(`afdayQuery: ${afdayQuery}, bfdayQuery: ${bfdayQuery}`);
  } else {
    console.error(`ID "${inputId}" の要素が見つかりません`);
  }
}

// 使用例

// historySet関数の例（カスタマイズ可能）
// historySet関数の例（カスタマイズ可能）
function historySet(entry) {
  console.log("履歴をセット:", entry);

  // entry が適切なデータであることを確認
  if (!entry || typeof entry !== "object") {
    console.error("無効な履歴データ:", entry);
    return;
  }

  // 以降の日付（afday）と以前の日付（bfday）の設定
  if (entry.afday) {
    setDate("afday", entry.afday); // 以降の日付を設定
  } else {
    console.warn("afday が未設定:", entry.afday);
  }

  if (entry.bfday) {
    setDate("bfday", entry.bfday); // 以前の日付を設定
  } else {
    console.warn("bfday が未設定:", entry.bfday);
  }

  // 使用例：ユーザーが入力したクエリを設定
  if (entry.userQuery) {
    setInputValue(entry.userQuery); // 入力値を設定
  } else {
    console.warn("userQuery が未設定:", entry.userQuery);
  }

  // クエリ（characterQuery）を基にユニットを作成
  if (entry.characterQuery) {
    createUnitsFromQuery(entry.characterQuery); // クエリからユニットを作成
  } else {
    console.warn("characterQuery が未設定:", entry.characterQuery);
  }
  updateQueryDisplay();
}

// 初期ユニットを1つ作成
//createUnit();
updateQueryDisplay(); //query表示を更新
