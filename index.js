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
    const devFps = await prisma.userFingerprint.findMany();
    const userIP = await prisma.userIPAddresses.findMany({
        where: {
            deviceFp: devFps[0].userFp
        }
    })
    console.log(devFps);
    console.log(userIP);
    // console.log('\n--------------------\n');

    // const devIPs = await prisma.userIPAddresses.findMany({
    //     where: {
    //         deviceFp: "eb3e4714d4151ada7316c9a15c592bff"
    //     }
    // })
    // console.log(devIPs);
    res.render('mod', { devId: devFps }, function (err, html) {
        res.send(html);
    });
})

app.get('/deviceId', (req, res) => {
    res.send(deviceIds);
})

app.post('/deviceId', async (req, res) => {
    const newFp = await prisma.userFingerprint.create({
        data: {
            userFp: req.body.fp,
            UserIPAddresses: {
                create: {
                    userIP: requestIp.getClientIp(req)
                }
            }
        }
    })
    console.log(newFp);
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})
