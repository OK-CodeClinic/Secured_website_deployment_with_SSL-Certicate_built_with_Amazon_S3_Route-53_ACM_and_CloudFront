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
![s3-project](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/66ef7e6b-e204-43b6-9370-6f6c9ac3c5aa)



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
  ![Screenshot (195)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/a901634d-9bbe-49b9-964c-ede491b0b7aa)

  
- Upload your static website files to the bucket
  ![Screenshot (196)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/f10f4488-a803-4b18-9b50-57d47db2a9a0)

  
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
![Screenshot (200)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/9155ae85-37d4-485b-8281-1075c9459ae2)

![Screenshot (201)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/1cb8c388-790a-4995-8e0a-3df70888ebd9)




- Configure the S3 to enable static website this will generate a static website url for the s3. This url will be used in a later step.
  ![Screenshot (197)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/7c3d4f98-ddd3-4778-b499-58339f52ccd5)

```
http://profile-page-kardozo.s3-website-us-east-1.amazonaws.com
```
![Screenshot (198)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/e38e2269-b2e7-411e-8b76-55bedb60b610)


### 2. Amazon Certficate Manager (ACM)
- On the ACM console, generate a new SSL/TLS certificate.
  ![Screenshot (202)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/fa9d31eb-d343-4e36-8a46-6a18837619a2)

- Verify the certificate issuance with your domain name registrar with the CNAME and CNAME value provided
  ![Screenshot (203)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/1d8a3bd3-d250-474b-9083-d8614d7f6353)


### 3. CloudFront distribution
- Navigate to create Cloudfront distribution
- Use the s3 url as the origin path of the distribution
- Redirect all request HTTP to HTTPS
- Attach a certificate
- Create Distribution
![Screenshot (204)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/e21508af-46a6-40ce-a6d9-df78b0f94f01)

![Screenshot (205)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/fbac18f6-4941-4519-834d-483deb1f1b95)


- Wait few minutes until its deployed, and will generate a domain name. 
- Validate the cloudfront domain name.


### 3. Create Hosted Zone in Route 53
- Create an hosted zone
  ![Screenshot (206)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/7bc9c75b-a4d7-4d20-88c7-980996fc8237)

- This will generate new ```NS and SOA records``` update the nameservers in your domain registrar to the hosted zone nameservers.

  ![Screenshot (207)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/646c3971-220d-40fc-9906-db8b8624d187)

- Create an A record set. Choose Alias and route traffic to; Cloudfront distribution. Insert the cloudfront domain name generated on the previous step.

  ![Screenshot (208)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/b0ab8306-b399-47db-8fd4-94799f0a1866)

  ![Screenshot (209)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/48a715e6-0bee-480e-be66-0b2e455eb912)

- Validate the A record

## OUTCOME
Website working and running securely

![Screenshot (210)](https://github.com/OK-CodeClinic/Secured_website_deployment_with_SSL-Certificate_built_with_Amazon_S3_Route-53_ACM_and_CloudFront/assets/100064229/1667c0f1-c7dd-479c-bc62-435fa6f7affe)


### CONCLUSION
Amazon S3 stores your website files, ACM provides SSL/TLS certificates for security, Route 53 manages your domain's DNS mapping, and Amazon CloudFront enhances performance and availability by caching content globally. Together, these services create a comprehensive solution for hosting a secure, performance, and highly available static website on AWS cloud.

## Author

- [Kehinde Omokungbe](https://www.github.com/OK-CodeClinic)



## Purpose
This is for leaning purpose only.

