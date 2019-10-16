# route53-ddns

This provides a simple script to automatically update a Route53 DNS entry for an EC2 instance that works between reboots and instance resizes. 



# Run in node

In node, set your environment variables and run `npm run start`.

Environment:

    AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY,
    AWS_DEFAULT_REGION,
    AWS_ROUTE53_HOSTED_ZONE_ID,
    AWS_ROUTE53_RECORD_NAME,
    AWS_CHECK_IP_ENDPOINT



# Public mode

Query https://checkip.amazonaws.com. 


# Private mode

Query the link-local metadata for the ipv4 of the instance.

http://169.254.169.254/latest/meta-data/local-ipv4