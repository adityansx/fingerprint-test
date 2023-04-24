const fpPromise = FingerprintJS.load();

// fpPromise
//     .then(fp => fp.get())
//     .then(res => console.log(res.visitorId));

async function getVisitorId() {
    const fp = await fpPromise;
    const result = await fp.get();
    return result.visitorId;
}

async function postDeviceId() {
    const visitorId = await getVisitorId();
    fetch('/deviceId', {
        method: 'POST',
        body: JSON.stringify({
            fp: visitorId
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        // .then(res => JSON.parse(res))
        // .then(data => console.log(data))
}

postDeviceId()