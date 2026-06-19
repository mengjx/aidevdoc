#!/usr/bin/env python3
"""
AI Dev Hub — 一键构建 + 部署到腾讯云 COS

用法：
  python3 scripts/deploy.py

功能：
  1. npm run build 构建静态站点
  2. 上传 out/ 目录所有文件到 COS
  3. 为每个 HTML 页面额外上传无后缀副本（解决 COS REST 模式不支持目录索引的问题）
"""

import os
import subprocess
import sys
from qcloud_cos import CosConfig, CosS3Client

# ====== 配置（从环境变量读取，不硬编码密钥）======
SECRET_ID = os.environ.get("COS_SECRET_ID", "")
SECRET_KEY = os.environ.get("COS_SECRET_KEY", "")
BUCKET = os.environ.get("COS_BUCKET", "ai-blog-1253479692")
REGION = os.environ.get("COS_REGION", "ap-shanghai")

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(PROJECT_ROOT, "out")

CONTENT_TYPE_MAP = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json",
    ".xml": "application/xml",
    ".txt": "text/plain; charset=utf-8",
    ".ico": "image/x-icon",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".webmanifest": "application/manifest+json",
}

HTML_CONTENT_TYPE = "text/html; charset=utf-8"


def run_build():
    """执行 npm run build"""
    print("📦 构建项目...")
    env = os.environ.copy()
    env.pop("NODE_OPTIONS", None)
    result = subprocess.run(
        ["npm", "run", "build"],
        cwd=PROJECT_ROOT,
        capture_output=True,
        text=True,
        env=env,
    )
    if result.returncode != 0:
        print(f"❌ 构建失败:\n{result.stderr}")
        sys.exit(1)
    print("✅ 构建成功\n")


def upload_file(client, local_path, cos_key, content_type):
    """上传单个文件到 COS"""
    try:
        client.put_object_from_local_file(
            Bucket=BUCKET,
            LocalFilePath=local_path,
            Key=cos_key,
            ContentType=content_type,
            CacheControl="public, max-age=0" if "text/html" in content_type else "public, max-age=3600",
        )
        return True
    except Exception as e:
        print(f"   ❌ {cos_key}: {e}")
        return False


def upload_to_cos():
    """上传 out/ 目录到 COS，并为每个 HTML 页面额外上传无后缀副本"""
    if not os.path.exists(OUT_DIR):
        print(f"❌ out/ 目录不存在: {OUT_DIR}")
        sys.exit(1)

    config = CosConfig(Region=REGION, SecretId=SECRET_ID, SecretKey=SECRET_KEY)
    client = CosS3Client(config)

    print(f"📤 上传到 COS ({BUCKET})...")
    upload_count = 0
    failed_count = 0
    html_no_ext_keys = set()  # 记录已上传的无后缀 key

    for root, dirs, files in os.walk(OUT_DIR):
        for fname in files:
            local_path = os.path.join(root, fname)
            rel_path = os.path.relpath(local_path, OUT_DIR)
            ext = os.path.splitext(fname)[1].lower()
            content_type = CONTENT_TYPE_MAP.get(ext, "application/octet-stream")

            # 1. 上传原始文件
            if upload_file(client, local_path, rel_path, content_type):
                upload_count += 1

            # 2. 如果是 HTML 文件，额外上传无后缀副本
            if ext == ".html" and fname != "404.html":
                # 读取 HTML 内容
                with open(local_path, "rb") as f:
                    html_content = f.read()

                # 计算无后缀的 key
                if fname == "index.html":
                    # index.html → 上级目录名作为 key
                    # 根目录 index.html → 跳过（根路径由 COS 处理）
                    if root == OUT_DIR:
                        continue
                    no_ext_key = os.path.relpath(root, OUT_DIR)
                else:
                    # foo.html → foo
                    no_ext_key = rel_path[:-5]  # 去掉 .html

                # 避免重复上传
                if no_ext_key in html_no_ext_keys:
                    continue
                html_no_ext_keys.add(no_ext_key)

                # 直接用 put_object 上传无后缀 key
                try:
                    client.put_object(
                        Bucket=BUCKET,
                        Key=no_ext_key,
                        Body=html_content,
                        ContentType=HTML_CONTENT_TYPE,
                        CacheControl="public, max-age=0",
                    )
                    upload_count += 1
                except Exception as e:
                    print(f"   ❌ {no_ext_key} (无后缀): {e}")
                    failed_count += 1

            if upload_count % 20 == 0:
                print(f"   已上传 {upload_count} 个文件...")

    print(f"\n✅ 上传完成: {upload_count} 成功, {failed_count} 失败")
    return upload_count


def main():
    print("=" * 50)
    print("  AI Dev Hub — 一键部署")
    print("=" * 50)

    run_build()
    upload_to_cos()

    print("\n" + "=" * 50)
    print("  🎉 部署完成！")
    print("  访问: http://ai.dxbd.top/")
    print("=" * 50)


if __name__ == "__main__":
    main()
