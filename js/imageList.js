// 初期化時に画像リストをロード
export const imagePath = "img/";
export const imageList = [
  { fileName: "アイネスフウジン.png", altText: "(アイネス OR アイネスフウジン)" },
  { fileName: "アグネスタキオン.png", altText: "(タキオン OR アグネスタキオン)" },
  { fileName: "アグネスデジタル.png", altText: "(デジタル OR デジ OR アグネスデジタル)" },
  { fileName: "アストンマーチャン.png", altText: "(マーチャン OR アストンマーチャン)" },
  { fileName: "アドマイヤベガ.png", altText: "(アヤベ OR アドべ OR アドマイヤベガ)" },
  { fileName: "アーモンドアイ.png", altText: "(アーモンドアイ)" },
  { fileName: "イクノディクタス.png", altText: "(イクノ OR イクノディクタス)" },
  { fileName: "イナリワン.png", altText: "(イナリ OR イナリワン)" },
  { fileName: "ウイニングチケット.png", altText: "(チケット OR チケゾー OR ウイニングチケット)" },
  { fileName: "ヴィブロス.png", altText: "(ヴィブロス)" },
  { fileName: "ヴィルシーナ.png", altText: "(ヴィルシーナ)" },
  { fileName: "ウインバリアシオン.png", altText: "(シオン OR バリちゃん OR ウインバリアシオン)" },
  { fileName: "ヴェニュスパーク.png", altText: "(ヴェニュスパーク)" },
  { fileName: "ウオッカ.png", altText: "(ウォッカ OR ウオッカ)" },
  { fileName: "エアグルーヴ.png", altText: "(女帝 OR エアグルーヴ)" },
  { fileName: "エアシャカール.png", altText: "(シャカール OR シャカ OR エアシャカール)" },
  { fileName: "エアメサイア.png", altText: "(メサイア OR エアメサイア)" },
  { fileName: "エイシンフラッシュ.png", altText: "(フラッシュ OR エイシンフラッシュ)" },
  { fileName: "エスポワールシチー.png", altText: "(エスポ OR エスポワールシチー)" },
  { fileName: "エルコンドルパサー.png", altText: "(エル OR エルコンドルパサー)" },
  { fileName: "オグリキャップ.png", altText: "(オグリ OR オグリキャップ)" },
  { fileName: "オルフェーヴル.png", altText: "(オル OR オルフェ OR オルフェーヴル)" },
  { fileName: "カツラギエース.png", altText: "(エース OR カツラギエース)" },
  { fileName: "カルストンライトオ.png", altText: "(カルストンライトオ)" },
  { fileName: "カレンチャン.png", altText: "(カレン OR カレンチャン)" },
  { fileName: "カレンブーケドール.png", altText: "(カレンブーケドール)" },
  { fileName: "カワカミプリンセス.png", altText: "(カワカミ OR プリンセス OR カワカミプリンセス)" },
  { fileName: "キタサンブラック.png", altText: "(キタサン OR キタサンブラック)" },
  { fileName: "キングヘイロー.png", altText: "(キング OR キングヘイロー)" },
  { fileName: "クロノジェネシス.png", altText: "(クロノジェネシス)" },
  { fileName: "グラスワンダー.png", altText: "(グラス OR グラスワンダー)" },
  { fileName: "グランアレグリア.png", altText: "(グランアレグリア)" },
  { fileName: "ケイエスミラクル.png", altText: "(ケイ OR ケイエス OR ケイエスミラクル)" },
  { fileName: "ゴールドシチー.png", altText: "(シチー OR ゴールドシチー)" },
  { fileName: "ゴールドシップ.png", altText: "(ゴルシ OR ゴールドシップ)" },
  { fileName: "コパノリッキー.png", altText: "(コパ OR リッキー OR コパノリッキー)" },
  { fileName: "サイレンススズカ.png", altText: "(スズカ OR サイレンススズカ)" },
  { fileName: "サウンズオブアース.png", altText: "(アース OR サウンズオブアース)" },
  { fileName: "サクラチトセオー.png", altText: "(チトセ OR サクラチトセオー)" },
  { fileName: "サクラチヨノオー.png", altText: "(チヨ OR サクラチヨノオー)" },
  { fileName: "サクラバクシンオー.png", altText: "(バクシン OR サクラバクシンオー)" },
  { fileName: "サクラローレル.png", altText: "(ローレル OR サクラローレル)" },
  { fileName: "サトノクラウン.png", altText: "(クラ OR サトノクラウン)" },
  { fileName: "サトノダイヤモンド.png", altText: "(ダイヤ OR サトノダイヤモンド)" },
  { fileName: "サムソンビッグ.png", altText: "(サムソンビッグ)" },
  { fileName: "シーキングザパール.png", altText: "(パール OR ザパ OR シーキングザパール)" },
  { fileName: "シーザリオ.png", altText: "(ザリオ OR シーザリオ)" },
  { fileName: "ジェンティルドンナ.png", altText: "(ジェンティル OR ドンナ OR ジェンティルドンナ)" },
  { fileName: "ジャングルポケット.png", altText: "(ポッケ OR ポケット OR ジャングルポケット)" },
  { fileName: "シュヴァルグラン.png", altText: "(シュヴァ OR シュヴァルグラン)" },
  { fileName: "シリウスシンボリ.png", altText: "(シリウス OR シリウスシンボリ)" },
  { fileName: "シンコウウインディ.png", altText: "(ウインディ OR シンコウウインディ)" },
  { fileName: "シンボリクリスエス.png", altText: "(クリスエス OR シンボリクリスエス)" },
  { fileName: "シンボリルドルフ.png", altText: "(会長 OR ルドルフ OR ｶｲﾁｮ OR シンボリルドルフ)" },
  { fileName: "スイープトウショウ.png", altText: "(スイープ OR スイープトウショウ)" },
  { fileName: "スーパークリーク.png", altText: "(クリーク OR スーパークリーク)" },
  { fileName: "ステイゴールド.png", altText: "(ステゴ OR ステイゴールド)" },
  { fileName: "スティルインラブ.png", altText: "(スティル OR スティルインラブ)" },
  { fileName: "スピードシンボリ.png", altText: "(スピードシンボリ)" },
  { fileName: "スペシャルウィーク.png", altText: "(スペ OR 日本総大将 OR スペシャルウィーク)" },
  { fileName: "スマートファルコン.png", altText: "(ウマドル OR ファルコ OR スマートファルコン)" },
  { fileName: "セイウンスカイ.png", altText: "(ウンス OR スカイ OR セイウンスカイ)" },
  { fileName: "セントライト.png", altText: "(セントライト)" },
  { fileName: "ゼンノロブロイ.png", altText: "(ロブロイ OR ゼンノロブロイ)" },
  { fileName: "ダイイチルビー.png", altText: "(ルビー OR お嬢 OR ダイイチルビー)" },
  { fileName: "タイキシャトル.png", altText: "(タイキ OR タイキシャトル)" },
  { fileName: "ダイタクヘリオス.png", altText: "(ヘリオス OR ダイタクヘリオス)" },
  { fileName: "ダイワスカーレット.png", altText: "(ダスカ OR スカーレット OR ダイワスカーレット)" },
  { fileName: "タップダンスシチー.png", altText: "(タップ OR タップダンスシチー)" },
  { fileName: "タニノギムレット.png", altText: "(ギム OR タニノギムレット)" },
  { fileName: "タマモクロス.png", altText: "(タマ OR タマモ OR タマモクロス)" },
  { fileName: "ダンツフレーム.png", altText: "(ダンツ OR ダンツフレーム)" },
  { fileName: "ツインターボ.png", altText: "(ターボ OR ツインターボ)" },
  { fileName: "ツルマルツヨシ.png", altText: "(ツヨシ OR ツルマルツヨシ)" },
  { fileName: "デアリングタクト.png", altText: "(タクト OR デアリングタクト)" },
  { fileName: "デアリングハート.png", altText: "(デアリングハート)" },
  { fileName: "テイエムオペラオー.png", altText: "(オペラオー OR テイエムオペラオー)" },
  { fileName: "デュランダル.png", altText: "(デュランダル)" },
  { fileName: "トウカイテイオー.png", altText: "(テイオー OR ﾓﾝﾆ OR トウカイテイオー)" },
  { fileName: "ドゥラメンテ.png", altText: "(ドゥラ OR ドゥラメンテ)" },
  { fileName: "トーセンジョーダン.png", altText: "(ジョーダン OR トーセンジョーダン)" },
  { fileName: "トランセンド.png", altText: "(トランセンド)" },
  { fileName: "ドリームジャーニー.png", altText: "(ドリジャ OR 姉上 OR ジャーニーOR ドリームジャーニー)" },
  { fileName: "ナイスネイチャ.png", altText: "(ネイチャ OR ナイスネイチャ)" },
  { fileName: "ナカヤマフェスタ.png", altText: "(ナカヤマ OR フェスタ OR ナカヤマフェスタ)" },
  { fileName: "ナリタタイシン.png", altText: "(タイシン OR ナリタタイシン)" },
  { fileName: "ナリタトップロード.png", altText: "(NTR OR トプロ OR ナリタトップロード)" },
  { fileName: "ナリタブライアン.png", altText: "(ナリブ OR ブライアン OR ナリタブライアン)" },
  { fileName: "ニシノフラワー.png", altText: "(ニシノ OR フラワー OR ニシノフラワー)" },
  { fileName: "ネオユニヴァース.png", altText: "(ネオユニ OR ネオユニヴァース)" },
  { fileName: "ノースフライト.png", altText: "(ノースフライト)" },
  { fileName: "ノーリーズン.png", altText: "(ズン子 OR ノーリーズン)" },
  { fileName: "ハイセイコー.png", altText: "(ハイセイコー)" },
  { fileName: "ハッピーミーク.png", altText: "(ミーク OR ハッピーミーク)" },
  { fileName: "バブルガムフェロー.png", altText: "(バブルガムフェロー)" },
  { fileName: "ハルウララ.png", altText: "(ウララ OR ハルウララ)" },
  { fileName: "バンブーメモリー.png", altText: "(バンちゃむ OR バンブー OR バンブーメモリー)" },
  { fileName: "ビコーペガサス.png", altText: "(ビコー OR ビコペ OR ビコーペガサス)" },
  { fileName: "ヒシアケボノ.png", altText: "(ボーノ OR アケボノ OR ヒシアケボノ)" },
  { fileName: "ヒシアマゾン.png", altText: "(アマゾン OR ヒシアマ OR ヒシアマゾン)" },
  { fileName: "ヒシミラクル.png", altText: "(ミラ子 OR ヒシミラクル)" },
  { fileName: "ビターグラッセ.png", altText: "(グラッセ OR ビターグラッセ)" },
  { fileName: "ビリーヴ.png", altText: "(ビリーヴ)" },
  { fileName: "ビワハヤヒデ.png", altText: "(姉貴 OR ハヤヒデ OR ビワハヤヒデ)" },
  { fileName: "ファインモーション.png", altText: "(殿下 OR 姫様 OR ファイン OR ファインモーション)" },
  { fileName: "フェノーメノ.png", altText: "(フェノーメノ)" },
  { fileName: "ブエナビスタ.png", altText: "(ブエナビスタ)" },
  { fileName: "フサイチパンドラ.png", altText: "(パンドラ OR フサイチパンドラ)" },
  { fileName: "フジキセキ.png", altText: "(寮長 OR フジ OR キセキ OR フジキセキ)" },
  { fileName: "ブラストワンピース.png", altText: "(ブラストワンピース)" },
  { fileName: "フリオーソ.png", altText: "(フリオ OR フリオーソ)" },
  { fileName: "ホッコータルマエ.png", altText: "(タルマエ OR ロコドル OR ホッコータルマエ)" },
  { fileName: "マーベラスサンデー.png", altText: "(マーベラス OR マーベラスサンデー)" },
  { fileName: "マチカネタンホイザ.png", altText: "(タンホイザ OR おマチさん OR マチタン OR マチカネタンホイザ)" },
  { fileName: "マチカネフクキタル.png", altText: "(ﾌﾝｷﾞｬﾛ OR フクキタル OR マチカネフクキタル)" },
  { fileName: "マヤノトップガン.png", altText: "(マヤ OR マヤノ OR マヤノトップガン)" },
  { fileName: "マルゼンスキー.png", altText: "(マブ OR マルゼン OR マルゼンスキー)" },
  { fileName: "マンハッタンカフェ.png", altText: "(カフェ OR マンハッタンカフェ)" },
  { fileName: "ミスターシービー.png", altText: "(シービー OR CB OR ミスターシービー)" },
  { fileName: "ミホノブルボン.png", altText: "(ブルボン OR ミホノブルボン)" },
  { fileName: "メイショウドトウ.png", altText: "(ドトウ OR メイショウドトウ)" },
  { fileName: "メジロアルダン.png", altText: "(アルダン OR メジロアルダン)" },
  { fileName: "メジロドーベル.png", altText: "(ドーベル OR どぼめ OR メジロドーベル)" },
  { fileName: "メジロパーマー.png", altText: "(パーマー OR パマちん OR メジロパーマー)" },
  { fileName: "メジロブライト.png", altText: "(ブライト OR メジロブライト)" },
  { fileName: "メジロマックイーン.png", altText: "(マックイーン OR メジロマックイーン)" },
  { fileName: "メジロライアン.png", altText: "(ライアン OR メジロライアン)" },
  { fileName: "メジロラモーヌ.png", altText: "(ラモーヌ OR メジロラモーヌ)" },
  { fileName: "ヤエノムテキ.png", altText: "(ヤエノ OR ヤエめろ OR ヤエノムテキ)" },
  { fileName: "ヤマニンゼファー.png", altText: "(ゼファー OR ヤマニンゼファー)" },
  { fileName: "ユキノビジン.png", altText: "(ユキノ OR ユキノビジン)" },
  { fileName: "ライスシャワー.png", altText: "(ライス OR ライスシャワー)" },
  { fileName: "ラインクラフト.png", altText: "(ラインクラフト)" },
  { fileName: "ラッキーライラック.png", altText: "(ラッキーライラック)" },
  { fileName: "ラヴズオンリーユー.png", altText: "(ラヴズオンリーユー)" },
  { fileName: "リガントーナ.png", altText: "(リガントーナ)" },
  { fileName: "リトルココン.png", altText: "(リトルココン)" },
  { fileName: "ロイスアンドロイス.png", altText: "(ロイス OR ロイスアンドロイス)" },
  { fileName: "ワンダーアキュート.png", altText: "(アキュート OR ワンダーアキュート)" },
  { fileName: "ゴドルフィンバルブ.png", altText: "(ゴドルフィンバルブ)" },
  { fileName: "ダーレーアラビアン.png", altText: "(ダーレーアラビアン)" },
  { fileName: "バイアリーターク.png", altText: "(バイアリーターク)" },
  { fileName: "シュガーライツ.png", altText: "(博士 OR シュガー OR ライツ OR シュガーライツ)" },
  { fileName: "ソノンエルフィー.png", altText: "(エルフィー OR ソノンエルフィー)" },
  { fileName: "ライトハロー.png", altText: "(ハロー OR ライトハロー)" },
  { fileName: "タッカーブライン.png", altText: "(タッカー OR ブライン OR タッカーブライン)" },
  { fileName: "乙名史悦子.png", altText: "(悦子 OR 乙名史 OR 乙名史悦子)" },
  { fileName: "佐岳メイ.png", altText: "(佐岳 OR メイ OR 佐岳メイ)" },
  { fileName: "安心沢刺々美.png", altText: "(安心沢 OR 不審者 OR 安心沢刺々美)" },
  { fileName: "桐生院葵.png", altText: "(鬼龍院 OR 桐生院 OR 葵 OR 桐生院葵)" },
  { fileName: "樫本理子.png", altText: "(理子 OR 樫本理子)" },
  { fileName: "秋川やよい.png", altText: "(やよい OR 秋川やよい)" },
  { fileName: "都留岐涼花.png", altText: "(都留岐 OR 涼花 OR 都留岐涼花)" },
  { fileName: "駿川たづな.png", altText: "(トキノミノル OR たづな OR 駿川たづな)" },
  { fileName: "沖野トレーナー.png", altText: "(沖野トレーナー)" },
  { fileName: "黒沼トレーナー.png", altText: "(黒沼トレーナー)" },
  { fileName: "東条ハナトレーナー.png", altText: "(東条ハナトレーナー)" },
  { fileName: "南坂トレーナー.png", altText: "(南坂トレーナー)" },
  { fileName: "女トレーナー.png", altText: "(トレーナー OR 女トレ OR 女トレーナー)" },
  { fileName: "男トレーナー.png", altText: "(トレーナー OR 男トレ OR 男トレーナー)" },
  // 他の画像ファイルもここにリストアップ
];
