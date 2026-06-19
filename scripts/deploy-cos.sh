#!/bin/bash
#
# 腾讯云 COS 静态网站部署脚本
#
# 前置条件：
#   1. 安装 coscmd: pip install coscmd
#   2. 配置 coscmd: coscmd config -a <SecretId> -s <SecretKey> -b <BucketName> -r <Region>
#   3. 项目已构建: npm run build
#
# 用法：
#   bash scripts/deploy-cos.sh
#

set -e

BUCKET_PATH="/"           # COS 桶中的路径，根路径或子目录
CDN_URL=""                 # CDN 加速域名（可选，用于刷新）

echo "========================================="
echo "  AI Dev Hub — 腾讯云 COS 部署"
echo "========================================="

# 1. 检查 coscmd
if ! command -v coscmd &> /dev/null; then
    echo "❌ coscmd 未安装，请运行: pip install coscmd"
    exit 1
fi

# 2. 构建项目
echo ""
echo "📦 构建项目..."
cd "$(dirname "$0")/.."
npm run build

if [ ! -d "out" ]; then
    echo "❌ 构建失败：out 目录不存在"
    exit 1
fi

# 3. 上传到 COS
echo ""
echo "📤 上传到腾讯云 COS..."
coscmd upload -r out/ "$BUCKET_PATH" --delete

echo ""
echo "✅ 上传完成！"

# 4. 刷新 CDN 缓存（如果配置了 CDN_URL）
if [ -n "$CDN_URL" ]; then
    echo ""
    echo "🔄 刷新 CDN 缓存..."
    # 使用腾讯云 CDN 刷新 API
    # coscmd 不支持 CDN 刷新，需要使用 tccli 或 API
    echo "⚠️  请手动刷新 CDN 缓存或配置自动化刷新"
fi

# 5. 提示
echo ""
echo "========================================="
echo "  部署完成！"
echo "  访问地址: https://你的域名/"
echo "========================================="
