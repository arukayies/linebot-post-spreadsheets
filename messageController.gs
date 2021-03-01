//メッセージイベントの処理
function messageController(event, replyToken) {
  //メッセージを取得
  const message = event.message;
  //本文を取得
  const text = message.text;

  //本文に'買い物リスト'と送られてきた場合
  if (text.indexOf('買い物リスト') > -1) {
    //送信するメッセージの変数
    let postMessage = '';
    //シートを取得
    const sheet = SpreadsheetApp.openById("通知させたいシートのIDを指定");// 通知させたいシートのIDを指定
    //シートの中身を２次元配列で取得  
    const sheetData = sheet.getDataRange().getValues();

    //シートの中身を送信するメッセージにすべて入れる     
    for (let row in sheetData) {
      postMessage = postMessage + sheetData[row][0] + '\n';
    }

    //LINEのメッセージ形式にする
    const LineMessageObject = [{
      'type': 'text',
      'text': postMessage
    }];

    //LINEに返信する
    replyLine(prop, LineMessageObject, replyToken);
  }
}