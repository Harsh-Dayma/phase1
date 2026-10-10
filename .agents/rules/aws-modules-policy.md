# AWS Policy: Use Only Open-Source "Build It" Modules

## Directive
Only use AWS Open Source "Build It" modules running locally on the machine without requiring AWS accounts, credit cards, or bills. Do not introduce any cloud-hosted "Ship It" AWS services.

## Module Rules
- **Agents and AI:** Use `Strands Agents SDK`, `PartyRock`. Do NOT use `SageMaker AI`.
- **Containers and Kubernetes:** Use `Finch`, `EKS Distro`, `EKS Anywhere`. Do NOT use `EKS`, `ECS`, `Fargate`.
- **Serverless:** Use `SAM CLI`, `LocalStack`. Do NOT use `AWS Lambda`, `API Gateway`, `Step Functions`.
- **Servers and runtimes:** Use `Firecracker`, `Corretto`. Do NOT use `EC2`, `Lightsail`, `App Runner`, `Amplify Hosting`.
- **Data and search:** Use `OpenSearch`. Do NOT use `S3`, `DynamoDB`, `RDS`, `Aurora`.
- **Auth and policy:** Use `Cedar`. Do NOT use `Cognito`.
- **The plumbing:** Local/open-source only. Do NOT use `CloudFront`, `Route 53`, `EventBridge`, `SQS`, `SNS`, `CloudWatch`.
