const ethers = require("ethers");
const BigNumber = ethers.BigNumber;
const verifyMessage = ethers.utils.verifyMessage;

const Sale = require("../models/Sale");
const Preset = require("../models/Preset");
const { getPreset } = require("../getters/preset");
const { uploadToIPFS } = require("../ipfs");

async function calculate(req, res) {
    let sale;
    try {
        sale = await Sale.findOne({ saleId: req.body.id.toLowerCase() });
    } catch(err) {
        res.sendStatus(404);
        return;
    }

    try {
        await Preset.findById(req.body.preset);
    } catch(err) {
        res.sendStatus(404);
        return;
    }

    try {
        const signer = verifyMessage(process.env.SIGN_MESSAGE, req.body.signature);
        if (signer.toLowerCase() !== sale.owner.toLowerCase()) {
            res.sendStatus(403);
            return;
        }
    } catch(err) {
        res.sendStatus(403);
        return;
    }

    req.queue.push(async () => {
        console.log("Going for calculation");
        sale.preset = req.body.preset;

        for (let i = 0; i < sale.users.length; i++) {
            sale.users[i].score = await getPreset(req.body.preset, sale.users[i].address);
        }
        sale.users = sale.users.sort((a, b) => b.score - a.score);
        console.log("Sorted users according to preset");

        let remainingCap = BigNumber.from(sale.totalCap);
        for (let i = 0; i < sale.users.length; i++) {
            let allocation = BigNumber.from(sale.users[i].amount);
            if (allocation.gt(remainingCap)) {
                allocation = remainingCap;
            }

            sale.users[i].allocation = allocation.toString();
            remainingCap = remainingCap.sub(allocation);
        }
        console.log("Calculated allocations");

        const hash = await uploadToIPFS({
            id: sale._id.toString(),
            users: sale.users
        });
        console.log("Pinned calculation result to IPFS with hash", hash);
        sale.ipfsHash = hash;

        sale.calculated = true;
        await sale.save();
    });
    res.sendStatus(200);
}

module.exports = { calculate }