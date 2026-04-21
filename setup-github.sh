#!/bin/bash

# GitHub仓库创建和推送脚本
# 使用方法：在终端中运行 bash setup-github.sh

# 1. 首先，在GitHub网站上创建新仓库：
#    - 访问 https://github.com/new
#    - Repository name: bilibili-video-analysis
#    - 选择 Private 或 Public
#    - 不要勾选 "Initialize this repository with a README"
#    - 点击 "Create repository"

# 2. 替换下面的 YOUR_USERNAME 为你的GitHub用户名
GITHUB_USERNAME="YOUR_USERNAME"
REPO_NAME="bilibili-video-analysis"

# 3. 如果你还没有设置GitHub认证，请先设置：
#    gh auth login

# 或者使用以下方法添加远程仓库（需要手动创建仓库）：
echo "请按照以下步骤操作："
echo ""
echo "1. 访问 https://github.com/new 创建新仓库"
echo "   - Repository name: bilibili-video-analysis"
echo "   - 选择 Public（公开）或 Private（私有）"
echo "   - 不要勾选任何初始化选项"
echo ""
echo "2. 创建仓库后，复制仓库的URL（SSH或HTTPS）"
echo ""
echo "3. 在项目目录中添加远程仓库："
echo "   cd /workspace/projects"
echo "   git remote add origin <你的仓库URL>"
echo ""
echo "4. 推送代码到GitHub："
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "示例命令（请替换为你的实际仓库URL）："
echo "   git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
