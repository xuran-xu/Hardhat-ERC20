# HSKWIN ERC-20 代币开发与部署新手教程

本教程将带你从零开始，分步骤完成 ERC-20 代币的开发与部署，适合完全没有区块链开发经验的新手。

---

## 步骤一：环境搭建与新建 Hardhat 项目

### 1.1 安装 Node.js

请先前往 [Node.js 官网](https://nodejs.org/) 下载并安装最新版 Node.js（建议 LTS 版本）。

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

> **提示：** 过程中如有提示，选择“Create an empty hardhat.config.js”。

### 1.5 创建目录结构

```bash
mkdir contracts scripts test
```

---

## 步骤二：编写和编译 ERC-20 合约

### 2.1 编写合约

在 `contracts` 目录下新建 `HSKWIN.sol` 文件，内容如下：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HSKWIN is ERC20 {
    constructor(uint256 initialSupply) ERC20("HSKWIN", "HSKWIN") {
        _mint(msg.sender, initialSupply);
    }
}
```

### 2.2 编写部署脚本

在 `scripts` 目录下新建 `deploy.js` 文件，内容如下：

```js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("部署账户:", deployer.address);
  const HSKWIN = await ethers.getContractFactory("HSKWIN");
  const initialSupply = ethers.utils.parseEther("1000000");
  const token = await HSKWIN.deploy(initialSupply);
  await token.deployed();
  console.log("HSKWIN合约已部署到:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

### 2.3 编译合约

在命令行执行：

```bash
npx hardhat compile
```

**预期输出：**
- 显示“Compiled X Solidity files successfully”字样，表示合约编译通过。

---

## 步骤三：部署到 HashKey Testnet

### 3.1 配置网络

编辑 `hardhat.config.js`，添加如下内容：

```js
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    hashkey_testnet: {
      url: "https://testnet.hsk.xyz",
      chainId: 133,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
```

### 3.2 配置私钥

在项目根目录新建 `.env` 文件，内容如下：

```
PRIVATE_KEY=你的钱包私钥（无0x前缀）
```

> **注意：** 请勿将私钥上传到任何公开仓库！

### 3.3 获取测试币

访问 [HashKey Chain 水龙头](https://testnet-explorer.hsk.xyz/faucet) 领取测试 HSK 代币。

### 3.4 部署合约

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
