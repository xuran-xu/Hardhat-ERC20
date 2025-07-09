# HSKWIN ERC-20 代币开发与部署新手教程

本教程将带你从零开始，分步骤完成 ERC-20 代币的开发与部署，适合完全没有区块链开发经验的新手。

---

## 步骤一：环境搭建与新建 Hardhat 项目

### 1.1 安装 Node.js

在 Windows 系统中，使用以下命令安装 Node.js：

```bash
# 使用 winget 安装（Windows 11 及新版 Windows 10）
winget install OpenJS.NodeJS.LTS

# 或使用 chocolatey 安装
choco install nodejs-lts
```

在 Linux/macOS 系统中，使用以下命令：

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS (使用 Homebrew)
brew install node

# 验证安装
node --version
npm --version
```

### 1.2 创建项目文件夹并初始化

在命令行中执行：

```bash
mkdir Hardhat-ERC20
cd Hardhat-ERC20
npm init -y
```

### 1.3 安装 Hardhat 及依赖

```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers dotenv @openzeppelin/contracts
```

### 1.4 初始化 Hardhat 项目

```bash
npx hardhat init --yes
```

> **提示：** 过程中如有提示，选择"Create an empty hardhat.config.js"。

### 1.5 创建目录结构

```bash
mkdir contracts scripts test
```

---

## 步骤二：编写和编译 ERC-20 合约

### 2.1 项目文件说明

本项目包含以下关键文件：

1. **contracts/HSKWIN.sol**
   - ERC-20 代币合约文件
   - 定义了代币的基本信息：名称、符号和初始供应量
   - 继承自 OpenZeppelin 的 ERC20 标准合约

2. **scripts/deploy.js**
   - 合约部署脚本
   - 负责部署代币合约并设置初始供应量
   - 部署完成后会输出合约地址

3. **hardhat.config.js**
   - Hardhat 配置文件
   - 包含编译器版本、网络配置等信息
   - 需要配置 HashKey Testnet 网络信息

这些文件已经预先配置好，您可以直接在项目中找到它们。

### 2.2 编译合约

在命令行执行：

```bash
npx hardhat compile
```

**预期输出：**
- 显示"Compiled X Solidity files successfully"字样，表示合约编译通过。

---

## 步骤三：部署到 HashKey Testnet

### 3.1 配置环境

1. **配置私钥**
   - 在项目根目录创建 `.env` 文件
   - 添加您的私钥（不要包含0x前缀）：
     ```
     PRIVATE_KEY=你的钱包私钥
     ```
   > ⚠️ 注意：永远不要将包含私钥的文件上传到公开仓库！

### 3.2 获取测试币

访问 [HashKey Chain 水龙头](https://faucet.hsk.xyz/faucet) 领取测试 HSK 代币。

### 3.3 部署合约

执行：

```bash
npx hardhat run scripts/deploy.js --network hashkey_testnet
```

**预期输出：**
- 显示部署账户地址
- 显示合约部署成功及合约地址
- 可在区块链浏览器查看合约：
  `https://testnet-explorer.hsk.xyz/address/你的合约地址`

---

恭喜你！现在你已经学会了如何从零开发并部署属于自己的 ERC-20 代币。
