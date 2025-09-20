// ===== インポート =====
// 初期化時に画像リストをロード
import { imagePath, imageList } from "./imageList.js";
// ===== グローバル変数 =====
// DOM要素
const container = document.getElementById("unit-container");
const addUnitBtn = document.getElementById("add-unit-btn");
const modal = document.getElementById("imageModal");
const closeModal = document.getElementById("closeModal");
const imageGrid = document.getElementById("imageGrid");
const searchInput = document.getElementById("searchInput");
const perfectInputs = document.querySelectorAll(".perfectInput");
console.log(perfectInputs.length);
// モーダル要素
const historyModal = document.getElementById("history-modal");
const closehistoryModal = document.getElementById("close-modal");
const historyList = document.getElementById("history-list");
const historyButton = document.getElementById("history-button");
// 検索クエリを表示する要素
const queryDisplay = document.getElementById("query-display");
// ベース検索クエリ
const baseQuery = `site:bbs.animanch.com/ "カテゴリ『ウマ娘・競馬』"`;
const honkeQuery = `site:animanch.com -site:bbs.animanch.com "ウマ娘"`;
// 状態管理
let afday = "";
let afdayQuery = ""; // グローバルに宣言したdateQuery
let bfday = "";
let bfdayQuery = ""; // グローバルに宣言したdateQuery
let characterQuery = ""; // グローバルに宣言したcharacterQuery
let isFavoritesMode = false; // 初期はすべての画像を表示
let isHonkeMode = false; // 初期はあにまん掲示板を表示
let query = "";
let selectedImages = []; // 選択された画像のaltを格納する配列
let unitCount = 0;
let userQuery = "";
let userPerfectQuery = []; // 配列を初期化

// ===== ヘルパー関数 =====
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
// お気に入り判定
function isFavorite(fileName) {
  // お気に入りリストを取得
  const favorites = JSON.parse(localStorage.getItem("favoriteCharacter")) || [];
  // fileNameがオブジェクトの中に存在するかをチェック
  return favorites.some((fav) => fav.fileName === fileName);
}

function createUnit() {
  unitCount++;
  const unit = document.createElement("div");
  unit.className = "unit";
  unit.id = `unit-${unitCount}`;

  // 画像の作成
  const img = document.createElement("img");
  img.className = "selected-image";
  img.src = `${imagePath}モブウマ娘_70.webp`; // 初期画像
  img.alt = ""; // 初期alt
  img.addEventListener("click", () => openModal(img)); // 画像クリックでモーダルを開く
  unit.appendChild(img);

  // 削除アイコンの作成
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "img/icons/delete_icon.png";
  deleteIcon.alt = "削除";
  deleteIcon.className = "delete-icon"; // 必要に応じてスタイルを適用するクラス
  deleteIcon.addEventListener("click", () => deleteUnit(unit));

  // アイコンをラップするボタン（必要なら）
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.appendChild(deleteIcon);

  unit.appendChild(deleteButton);
  container.appendChild(unit); // ボタンを削除したため直接ユニットを追加
}

// お気に入りリストを取得
function getFavorites() {
  return JSON.parse(localStorage.getItem("favoriteCharacter")) || [];
}
function updateQueryDisplay() {
  // 3つの検索ワードを組み合わせる
  if (isHonkeMode) {
    query = `${honkeQuery} ${userQuery} ${userPerfectQuery.join(
      " "
    )} ${characterQuery} ${afdayQuery} ${bfdayQuery}`;
  } else {
    query = `${baseQuery} ${userQuery} ${userPerfectQuery.join(
      " "
    )} ${characterQuery} ${afdayQuery} ${bfdayQuery}`;
  }
  queryDisplay.textContent = query;
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
// ===== モーダル関連関数 =====
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
    // 星マーク（お気に入りアイコン）
    const star = document.createElement("span");
    console.log(fileName);
    star.className = "star";
    if (isFavorite(fileName)) {
      // お気に入りかどうかをチェック
      star.textContent = "★";
      star.classList.add("favorite"); // 色変更用のクラス
      console.log(star.textContent);
    } else {
      star.textContent = "☆";
      console.log(star.textContent);
    }

    // 星マークのクリックイベント
    star.addEventListener("click", (event) => {
      event.stopPropagation(); // 他のクリックイベントを防止
      if (star.textContent === "☆") {
        addToFavorites(fileName, altText);
        star.textContent = "★";
        star.classList.add("favorite");
      } else {
        removeFromFavorites(fileName);
        star.textContent = "☆";
        star.classList.remove("favorite");
      }
      // isFavoritesModeがtrueの場合にモーダルを再描画
      if (isFavoritesMode) {
        updateImageGrid(); // モーダルを再描画
      }
    });
    // ダウンロードボタンを作成
    const downloadButton = document.createElement("a");
    downloadButton.href = img.src; // 画像のURLをリンクに設定
    downloadButton.download = fileName; // ダウンロード時のファイル名を設定
    downloadButton.style.display = "inline-block"; // ボタンのスタイルを設定
    downloadButton.style.marginLeft = "10px";

    // ダウンロード用のアイコンを作成
    const downloadIcon = document.createElement("img");
    downloadIcon.src = "img/icons/download_icon.png"; // アイコン画像のパス
    downloadIcon.alt = "ダウンロードアイコン"; // 代替テキスト
    downloadIcon.style.width = "24px"; // アイコンのサイズを指定
    downloadIcon.style.height = "24px"; // アイコンのサイズを指定
    //downloadIcon.style.verticalAlign = "middle"; // テキストとアイコンの位置を揃える
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
    //imgContainer.appendChild(favoriteButton);
    imgContainer.appendChild(star); // 星マークを追加

    downloadButton.appendChild(downloadIcon); // ボタンにアイコンを追加
    imgContainer.appendChild(downloadButton);
    imageGrid.appendChild(imgContainer);
  });

  modal.style.display = "block";
}
// 画像グリッドの更新関数
function updateImageGrid() {
  imageGrid.innerHTML = ""; // 現在のグリッドをクリア

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

    // 星マーク（お気に入りアイコン）
    const star = document.createElement("span");
    star.className = "star";
    if (isFavorite(fileName)) {
      star.textContent = "★";
      star.classList.add("favorite"); // 色変更用のクラス
    } else {
      star.textContent = "☆";
    }

    // 星マークのクリックイベント
    star.addEventListener("click", (event) => {
      event.stopPropagation();
      if (star.textContent === "☆") {
        addToFavorites(fileName, altText);
        star.textContent = "★";
        star.classList.add("favorite");
        console.log("Favorite added:", star.classList); // デバッグ用
      } else {
        removeFromFavorites(fileName);
        star.textContent = "☆";
        star.classList.remove("favorite");
        console.log("Favorite removed:", star.classList); // デバッグ用
      }

      // 再描画せずにグリッド更新
      updateImageGrid();
    });

    const imgContainer = document.createElement("div");
    imgContainer.appendChild(img);
    imgContainer.appendChild(star);
    imageGrid.appendChild(imgContainer);
  });
}
// モード切り替えボタンのクリックイベント
function toggleMode() {
  isFavoritesMode = !isFavoritesMode; // モードを切り替える
  const modeText = isFavoritesMode ? "お気に入り" : "すべての画像";
  document.getElementById(
    "toggleButton"
  ).textContent = `モード切り替え: ${modeText}`;
}
document.getElementById("tohonkeButton").addEventListener("click", tohonkeMode);

// モード切り替えボタンのクリックイベント
function tohonkeMode() {
  isHonkeMode = !isHonkeMode; // モードを切り替える
  const modeText = isHonkeMode ? "あにまん本家" : "あにまん掲示板";
  document.getElementById("tohonkeButton").textContent = `${modeText}`;
  updateQueryDisplay();
}
// カレンダーの日付が変更された際にクエリを更新
document.getElementById("bfday").addEventListener("input", updateQuery);
document.getElementById("afday").addEventListener("input", updateQuery);
function updateQuery() {
  bfday = document.getElementById("bfday").value;
  afday = document.getElementById("afday").value;

  // 検索クエリを構築
  if (afday) {
    afdayQuery = ` after:${afday}`;
  } else {
    afdayQuery = "";
  }
  if (bfday) {
    bfdayQuery = ` before:${bfday}`;
  } else {
    bfdayQuery = "";
  }
  updateQueryDisplay();
  console.log(afdayQuery); // 結果を表示（必要に応じて他の処理に使用）
  console.log(bfdayQuery); // 結果を表示（必要に応じて他の処理に使用）
}
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
      <div class="panel-link">
        <span>${entry.date}</span>
        <a href="${entry.url}" target="_blank" class="query-link">${shortQuery}</a>
        <button class="delete-btn" data-index="${index}">削除</button>
        <button class="set-btn" data-index="${index}">セット</button>
      </div>
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
// イベントリスナーを追加
document.getElementById("toggleButton").addEventListener("click", toggleMode);
// 実際にGoogle検索をする箇所
function performGoogleSearch() {
  // 画像の alt 情報を取得
  const selectedImg = document.querySelector(".selected-image");

  // 3つの検索ワードを組み合わせる
  updateQueryDisplay();
  const historyQuery = `${userQuery} ${userPerfectQuery} ${characterQuery} ${afdayQuery} ${bfdayQuery}`;

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
    userPerfectQuery: userPerfectQuery,
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
// 各入力フィールドにリスナーを追加
perfectInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    console.log("Input changed:", input.value);
    userPerfectQuery[index] = `"${input.value}"`; // 配列の特定インデックスを更新
    updateQueryDisplay();
  });
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
});

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
// 指定した文字列の配列をすべての入力欄にセットする関数
function setPerfectInputValues(values) {
  const perfectInputs = document.querySelectorAll(".perfectInput"); // class属性で取得
  if (perfectInputs.length > 0) {
    userPerfectQuery = []; // userPerfectQueryを初期化
    perfectInputs.forEach((input, index) => {
      if (index < values.length) {
        input.value = values[index]; // 配列内の対応する値をセット
        userPerfectQuery.push(values[index]); // 配列に値を保存
      } else {
        input.value = ""; // 値が不足している場合は空文字をセット
        userPerfectQuery.push(""); // 空文字も保存
      }
    });
    console.log("値が設定されました:", userPerfectQuery);
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
  // 使用例：ユーザーが入力したクエリを設定
  if (entry.userPerfectQuery) {
    setPerfectInputValues(entry.userPerfectQuery); // 入力値を設定
  } else {
    console.warn("userPerfectQuery が未設定:", entry.userPerfectQuery);
  }
  // クエリ（characterQuery）を基にユニットを作成
  if (entry.characterQuery) {
    createUnitsFromQuery(entry.characterQuery); // クエリからユニットを作成
  } else {
    console.warn("characterQuery が未設定:", entry.characterQuery);
  }
  updateQueryDisplay();
}
document
  .getElementById("animanSearchButton")
  .addEventListener("click", updateIframe);
// 関数をグローバルスコープに登録
function updateIframe() {
  if (!userQuery || userQuery.trim() === "") {
    alert("検索ワードが設定されていません。");
    return;
  }
  if (userQuery.length === 1) {
    userQuery = ">" + userQuery;
  }
  const url = `https://bbs.animanch.com/search/${encodeURIComponent(
    userQuery
  )}`;
  const url2 = `https://bbs.animanch.com/search2/${encodeURIComponent(
    userQuery
  )}`;
  const urlRes = `https://bbs.animanch.com/searchRes/${encodeURIComponent(
    userQuery
  )}`;

  document.getElementById("searchIframe").src = url;
  document.getElementById("searchIframe2").src = url2;
  document.getElementById("searchIframeRes").src = urlRes;
  // <a>タグにもURLを設定
  document.getElementById("link1").href = url;
  document.getElementById("link2").href = url2;
  document.getElementById("linkRes").href = urlRes;

  const iframeContainer = document.getElementById("iframe-container");
  if (
    iframeContainer.style.display === "none" ||
    iframeContainer.style.display === ""
  ) {
    iframeContainer.style.display = "flex"; // 表示する
  }
}
// CSV生成用の関数
// CSV生成用の関数
function createCSV(data, headers) {
  const csvRows = [headers.join(",")];
  data.forEach((item) => {
    const row = headers.map((header) => {
      let value = item[header];
      if (Array.isArray(value)) {
        value = value.join(","); // 配列はカンマで結合
      }
      if (value === null || value === undefined) {
        value = ""; // null や undefined を空文字列に置き換える
      }
      return `"${String(value).replace(/"/g, '""')}"`; // ダブルクォート対応
    });
    csvRows.push(row.join(","));
  });
  return csvRows.join("\n");
}

// ダウンロード処理
function downloadCSV(filename, content) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Favorite Character: エクスポート
document
  .getElementById("export-favorite-character")
  .addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("favoriteCharacter") || "[]");
    if (data.length === 0) {
      alert("favoriteCharacter にデータがありません。");
      return;
    }
    const headers = ["fileName", "altText"];
    const csv = createCSV(data, headers);
    downloadCSV("favoriteCharacter.csv", csv);
  });

// Search History: エクスポート
document
  .getElementById("export-search-history")
  .addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    if (data.length === 0) {
      alert("searchHistory にデータがありません。");
      return;
    }
    const headers = [
      "date",
      "query",
      "url",
      "userQuery",
      "userPerfectQuery",
      "characterQuery",
      "afday",
      "bfday",
    ];
    const csv = createCSV(data, headers);
    downloadCSV("searchHistory.csv", csv);
  });

// CSV読み込み用の共通関数
function parseCSV(content) {
  const rows = content.split("\n");
  const headers = rows
    .shift()
    .split(",")
    .map((header) => header.trim());
  return rows
    .filter((row) => row.trim() !== "")
    .map((row) => {
      const values = row.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
      const entry = {};
      headers.forEach((header, i) => {
        entry[header] = values[i] ? values[i].replace(/(^"|"$)/g, "") : "";
      });
      return entry;
    });
}

// 配列から重複を排除する関数（keyに基づいて）
function mergeUniqueData(existingData, newData, key) {
  const existingKeys = new Set(existingData.map((item) => item[key]));
  return [
    ...existingData,
    ...newData.filter((item) => !existingKeys.has(item[key])),
  ];
}

// Favorite Character: インポート
document
  .getElementById("import-favorite-character")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      const newData = parseCSV(content);

      // 既存のデータを取得
      const existingData = JSON.parse(
        localStorage.getItem("favoriteCharacter") || "[]"
      );

      // 重複を排除してデータをマージ
      const mergedData = mergeUniqueData(existingData, newData, "fileName");

      // ローカルストレージに保存
      localStorage.setItem("favoriteCharacter", JSON.stringify(mergedData));
      alert("favoriteCharacter にデータをインポートしました！");
    };
    reader.readAsText(file);
  });

// Search History: インポート
document
  .getElementById("import-search-history")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      const newData = parseCSV(content);

      // 既存のデータを取得
      const existingData = JSON.parse(
        localStorage.getItem("searchHistory") || "[]"
      );

      // 重複を排除してデータをマージ (ここでは "date" と "query" をキーとして扱う)
      const mergedData = [
        ...existingData,
        ...newData.filter(
          (newItem) =>
            !existingData.some(
              (existingItem) =>
                existingItem.date === newItem.date &&
                existingItem.query === newItem.query
            )
        ),
      ];

      // ローカルストレージに保存
      localStorage.setItem("searchHistory", JSON.stringify(mergedData));
      alert("searchHistory にデータをインポートしました！");
    };
    reader.readAsText(file);
  });

updateQueryDisplay(); //query表示を更新
