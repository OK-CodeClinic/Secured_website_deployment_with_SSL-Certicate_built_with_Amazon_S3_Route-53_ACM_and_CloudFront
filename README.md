#  SECURED WEBSITE DEPLOYMENT WITH SSL CERTIFICATE USING AMAZON S3, ROUTE 53, ACM AND CLOUDFRONT
## DESCRIPTION: 
This blog covers how i deployed secure static website on AWS cloud using some core AWS Services.

## OBJECTIVE:
- Cost-Efficiency
- Scalability
- Global Content Delivery
- Security
- Simple Setup
- Versioning and Backup
- Simplified Management
- Serverless Architecture
- Backup and Disaster Recovery


### AWS Services Used;
- Amazon S3; Stores website files and its configurations
- Amazon Certificate Manager (ACM); Management and provisioning of SSL certificate
- Route 53; For DNS mapping and hosted zone
- Amazon CloudFront; Perfomance and availability


## ARCHITECTURE

#### Wondering how it works?
- User enters the domain name '' in their browser.
- Route 53 resolves the domain name to the CloudFront distribution's edge location using DNS.
- CloudFront, using SSL certificate, securely delivers content from your S3 bucket to the user's browser.
- The user's browser displays the website, benefiting from CloudFront's performance enhancements


### PREREQUISTIES
- AWS Account
- Static website files (html ,js and css files)






## STEP BY STEP; How its done
### 1. S3 Bucket
- Create an s3 bucket.
- Upload your static website files to the bucket
- There is a need to make this bucket publicly accessible by attaching a bucket policy
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::profile-page-kardozo/*"
        }
    ]
}
```
- Attach a COR policy (optional, if there is a need to interact with a different domain)
```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

- Configure the S3 to enable static website this will generate a static website url for the s3. This url will be used in a later step.
```
http://profile-page-kardozo.s3-website-us-east-1.amazonaws.com
```

### 2. Amazon Certficate Manager (ACM)
- On the ACM console, generate a new SSL/TLS certificate. 
- Verify the certificate issuance with your domain name registrar

### 3. CloudFront distribution
- Navigate to create Cloudfront distribution
- Use the s3 url as the origin path of the distribution
- Redirect all request HTTP to HTTPS
- Attach a certificate
- Create Distribution
- Wait few minutes until its deployed, and will generate a domain name. 
- Validate the cloudfront domain name.


### 3. Create Hosted Zone in Route 53
- Create an hosted zone
- This will generate new ```NS and SOA records``` update the nameservers in your domain registrar to the hosted zone nameservers. 
- Create an A record set. Choose Alias. Value: Cloudfront distribution. Insert the cloudfront domain name generated on the previous step.
- Validate the A record

## OUTCOME
Website working and running securely

### CONCLUSION
Amazon S3 stores your website files, ACM provides SSL/TLS certificates for security, Route 53 manages your domain's DNS mapping, and Amazon CloudFront enhances performance and availability by caching content globally. Together, these services create a comprehensive solution for hosting a secure, performance, and highly available static website on AWS cloud.

## Author

- [Kehinde Omokungbe](https://www.github.com/OK-CodeClinic)



## Purpose
This is for leaning purpose only.

