const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const requestIp = require('request-ip');
const PORT = 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/fingerprintjs', express.static(path.join(__dirname, 'node_modules/@fingerprintjs/fingerprintjs/dist')));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/mod', async (req, res) => {
    // res.render('mod', { devId: deviceIds }, function(err, html) {
    //     res.send(html);
    // });
    const devFps = await prisma.userFingerprint.findMany();

    res.render('mod', { devId: devFps }, function(err, html) {
        res.send(html);
    });
})

app.get('/deviceId', (req, res) => {
    res.send(deviceIds);
})

app.get('/bill', (req, res) => {
    res.render('bill')
})

// app.post('/deviceId', (req, res) => {
//     const newId = {
//         ip: req.ip,
//         id: req.body.fp
//     }
//     deviceIds.push(newId);
//     console.log(newId);
// })

app.post('/deviceId', async (req, res) => {
    // const fingerprintExists = await prisma.$exists.userFingerprint({
    //     deviceFp: req.body.fp
    // })

    // if(fingerprintExists) {
    //     const newIP = await prisma.userIP.create({
    //         data: {
    //             deviceIP: req.ip
    //         }
    //     })
    //     console.log(newIP);
    // } else {
        
    // }
    const newFp = await prisma.userFingerprint.create({
        data: {
            deviceFp: req.body.fp,
            deviceIP: requestIp.getClientIp(req)
        }
    })
    console.log(newFp);
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})
