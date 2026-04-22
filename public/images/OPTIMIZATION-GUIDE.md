# 圖片優化指南

## 🚨 當前問題
**page4-monks-pilgrimage.jpg** 大小為 **2.0MB**，導致頁面切換卡頓。

## 📝 建議優化目標
所有圖片應該控制在 **300-500KB** 以內，以確保流暢的切換體驗。

## 🛠️ 優化方法

### 方法 1：使用線上工具（最簡單）
推薦使用 **TinyPNG** 或 **Squoosh**：

1. **TinyPNG**
   - 網址：https://tinypng.com
   - 上傳 page4-monks-pilgrimage.jpg
   - 通常可以減少 50-70% 的大小
   - 下載優化後的圖片，替換原檔案

2. **Squoosh** （Google 出品）
   - 網址：https://squoosh.app
   - 上傳圖片
   - 調整品質至 75-80
   - 可以選擇轉換為 WebP 格式（更小）
   - 下載並替換

### 方法 2：使用圖片編輯軟體
- **Photoshop**：儲存為網頁用途，品質 70-80
- **GIMP**（免費）：匯出時調整品質為 75

### 方法 3：批次優化所有圖片
如果您有 ImageMagick，可以執行：
```bash
cd public/images
mogrify -quality 75 -resize '1920x1080>' *.jpg
```

## 📊 優化前後對照

| 圖片 | 目前大小 | 建議大小 | 狀態 |
|------|---------|---------|------|
| page1-sunset-tree.jpg | 130K | ✓ | 已優化 |
| page2-buddha-relief.jpg | 428K | ✓ | 已優化 |
| page3-fisherman.jpg | 347K | ✓ | 已優化 |
| **page4-monks-pilgrimage.jpg** | **2.0M** | **< 500K** | ⚠️ 需優化 |
| page5-monk-meditation.jpg | 490K | ✓ | 已優化 |

## ✅ 優化完成後
替換圖片後，刷新頁面即可看到明顯的速度提升！

## 💡 進階優化（選用）
如果想要更好的性能，可以考慮：
1. 轉換為 **WebP** 格式（比 JPG 小 30-50%）
2. 提供不同尺寸的圖片（響應式圖片）
3. 使用 CDN 加速圖片載入
