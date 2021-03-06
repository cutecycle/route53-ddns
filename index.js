const AWS = require('aws-sdk')
const axios = require('axios')
const sleep = require('sleep-promise')

var route53 = new AWS.Route53();
let options = {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_KEY,
    defaultRegion: process.env.AWS_DEFAULT_REGION,
    hostedZoneId: process.env.AWS_ROUTE53_HOSTED_ZONE_ID,
    recordName: process.env.AWS_ROUTE53_RECORD_NAME,
}

doit = async function () {

    let response = await axios.get(process.env.AWS_CHECK_IP_ENDPOINT ? process.env.AWS_CHECK_IP_ENDPOINT : "https://checkip.amazonaws.com");
    address = response.data;
    console.log("updating DNS entry.")

    var payload = {
        ChangeBatch: {
            Changes: [
                {
                    Action: "UPSERT",
                    ResourceRecordSet: {
                        Name: process.env.AWS_ROUTE53_RECORD_NAME,
                        ResourceRecords: [
                            {
                                Value: address
                            }
                        ],
                        TTL: 60,
                        Type: "A"
                    }
                }
            ],
            Comment: "Automated record by cutecycle/route53-ddns"
        },
        HostedZoneId: process.env.AWS_ROUTE53_HOSTED_ZONE_ID
    };
    let result = await route53.changeResourceRecordSets(payload);
    console.dir(await result.promise())

    await sleep(30000)
    console.log("Waiting 30 seconds.")
}

main = async function () {
    while (true) {
        await doit();
    }

}
main()