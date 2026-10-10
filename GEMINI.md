# AWS Architecture Policy: "Build It" Only (Open Source On-Machine)

## 🚨 MANDATORY DIRECTIVE FOR THIS PROJECT

In this project, we **MUST ONLY use Open Source "Build It" modules from AWS**.
We **MUST NOT** use, introduce, or depend on any **"Ship It"** cloud-deployed modules or proprietary cloud services that require an AWS account, credit card, or cloud billing.

* **Build It (PERMITTED & MANDATORY):** Open source, runs locally on your machine. No AWS account, no credit card, no bill.
* **Ship It (STRICTLY PROHIBITED):** Cloud-deployed, managed cloud services requiring AWS infrastructure, account setup, billing, or cloud credits.

---

## 📋 Comprehensive Module Matrix

| Category | ✅ Build It (ALLOWED — Open Source, Local) | ❌ Ship It (PROHIBITED — Cloud / Deployed) |
|---|---|---|
| **Agents and AI** | **Strands Agents SDK**, **PartyRock** | SageMaker AI |
| **Containers & Kubernetes** | **Finch**, **EKS Distro**, **EKS Anywhere** | EKS, ECS, Fargate |
| **Serverless** | **SAM CLI**, **LocalStack** | AWS Lambda, API Gateway, Step Functions |
| **Servers & Runtimes** | **Firecracker**, **Corretto** | EC2, Lightsail, App Runner, Amplify Hosting |
| **Data & Search** | **OpenSearch** | S3, DynamoDB, RDS, Aurora |
| **Auth & Policy** | **Cedar** | Cognito |
| **The Plumbing** | *Local open-source alternatives / in-memory* | CloudFront, Route 53, EventBridge, SQS, SNS, CloudWatch |

---

## 🛠️ Implementation Rules
1. **Localhost & Self-Contained First:** All application logic, APIs, background jobs, search indices, storage mocks, and AI agent hooks must execute on-machine using open-source tools (e.g., LocalStack for local AWS API emulation, OpenSearch for indexing, Cedar for authorization policies, SAM CLI for local serverless testing, Finch/EKS Distro for containers, Corretto for Java runtimes if needed, and Strands Agents SDK / PartyRock for agents).
2. **No Cloud Credentials or Billing:** Never request, configure, or require AWS access keys, secret keys, cloud VPCs, or cloud deployment pipelines that connect to paid AWS cloud infrastructure.
3. **Preserve Open Source Purity:** If mock services, storage, or auth are needed, wire them through LocalStack, OpenSearch, Cedar, or local in-memory engines.
