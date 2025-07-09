const { ethers } = require("hardhat");

async function main() {
  // 获取部署者账户
  const [deployer] = await ethers.getSigners();

  console.log("使用账户部署合约:", deployer.address);

  // 获取账户余额
  const balance = await deployer.getBalance();
  console.log("账户余额:", ethers.utils.formatEther(balance), "HSK");

  // 获取合约工厂
  const HSKWIN = await ethers.getContractFactory("HSKWIN");
  
  // 设置代币的初始供应量 (1,000,000 tokens with 18 decimals)
  const initialSupply = ethers.utils.parseEther("1000000");
  
  console.log("开始部署HSKWIN合约...");
  
  // 部署合约
  const token = await HSKWIN.deploy(initialSupply);
  await token.deployed();

  console.log("HSKWIN合约已部署到:", token.address);
  console.log("代币名称:", await token.name());
  console.log("代币符号:", await token.symbol());
  console.log("代币总供应量:", ethers.utils.formatEther(await token.totalSupply()));
  console.log("部署者余额:", ethers.utils.formatEther(await token.balanceOf(deployer.address)));

  // 验证合约（可选）
  if (hre.network.name !== "hardhat") {
    console.log("等待区块确认...");
    await token.deployTransaction.wait(5);
    
    console.log("合约部署完成！");
    console.log("浏览器查看: https://testnet-explorer.hsk.xyz/address/" + token.address);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 