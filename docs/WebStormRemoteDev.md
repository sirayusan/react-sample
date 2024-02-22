# 概要
WSL2配下にプロジェクトフォルダを配置しており、WebStormを使用している方向けの構築手順です。  
WSL2配下に配置する理由としては、この手順を見に来ている方は理解していると思いますが動作が早くなるからです。  
https://qiita.com/BlueBaybridge/items/c1adcf1dab5da2b40b4f
# 環境構築手順
1. ソースをクローン
```
git clone https://github.com/sirayusan/react-sample.git
```
2. ディレクトリ移動
```
cd remote-dev-front
```
3. コンテナの構築
```
docker-compose up -d
```
このような表示がでたら完了  
![image](https://github.com/sirayusan/react-sample/assets/73060776/a7180a84-1e32-48e9-9905-9f7710a78c4b)
4. tcp:// … のリンクをコピーする。
![image](https://github.com/sirayusan/react-sample/assets/73060776/8dc695f1-989e-45b4-a24c-b5064eef3ac7)
5. Gatewayを開き`Remote Development`の`connect to Running IDE`にペーストする。
![image](https://github.com/sirayusan/react-sample/assets/73060776/33f6a3fe-b27a-466f-94c3-d02d45fd3096)
6. Connectを押下し  
7. あとは流れでボタンを押して行き開くだけ