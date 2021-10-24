const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const { calculate } = require("./handlers/calculate");
const Sale = require("./models/Sale");
const Preset = require("./models/Preset");
const { getPreset } = require("./getters/preset");

function createApp(calculationQueue) {
    const app = express();

    app.options('*', cors());

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('*', (req, res, next) => {
        req.queue = calculationQueue;
        next();
    });

    app.post('/sales/calculate', calculate);

    app.get("/presets", async (req, res) => {
        const presets = await Preset.find({});
        res.json(presets.map(p => ({
            id: p._id,
            name: p.name,
            description: p.description
        })));
    });

    app.get("/sales/:id", async (req, res) => {
        const sale = await Sale.findOne({saleId: req.params.id.toLowerCase()});
        res.json({
            saleId: sale.saleId,
            preset: sale.preset,
            calculated: sale.calculated,
            ipfsHash: sale.ipfsHash,
            users: sale.users,
        });
    });

    app.get("/sales", async (req, res) => {
        const sales = await Sale.find({});
        res.json(sales.map(s => ({
            saleId: s.saleId
        })))
    });

    app.get("/score", async (req, res) => {
        const score = await getPreset(req.query.preset, req.query.address);
        res.json({
            score
        });
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    app.listen(3000, () => console.log('Server running...'));

    return app;
}

module.exports = { createApp }