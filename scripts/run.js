const main = async() => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({value: hre.ethers.utils.parseEther("0.1"),});
    await waveContract.deployed();

    const [owner, randomPerson] = await hre.ethers.getSigners();
    console.log("Contract deployed to: ", waveContract.address);
    console.log("Contract deployed by: ", owner.address);


    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance : ", hre.ethers.utils.formatEther(contractBalance));

    let waveCount;
    waveCount = await waveContract.getTotalWaves(); 
    console.log(waveCount.toNumber());

    let waveTxn;
    waveTxn = await waveContract.wave("Yeah yeah. This works now");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave("Yeah. It's increasing too");
    await waveTxn.wait();
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave("Why you checking againnn???");
    await waveTxn.wait();
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    // waveCount = await waveContract.getTotalWaves();
}

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

};

runMain();