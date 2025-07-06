# MakeAndUploadFiles – Distributed File Creation and S3 Upload System

This Node.js/TypeScript-based application simulates generation of large files and uploads them to an AWS S3 bucket in a distributed fashion using RabbitMQ and Docker containers.

## 🧩 Architecture Overview

- **App1**: Orchestrator. Accepts the `MakeAndUploadFiles` task and publishes `MakeUploadFile` jobs to RabbitMQ.
- **App2**: Worker nodes (scalable) that listen to the queue and perform file creation + upload to S3.
- **RabbitMQ**: Message broker to dispatch and manage upload jobs.
- **Docker Compose**: Orchestrates all containers.

## 🚀 Features

- Parallel file creation and upload
- Custom input parameters (file size/count/path)
- AWS S3 integration
- RabbitMQ-based task distribution
- Full VS Code Docker debugging support

---

## 📦 Input Parameters

| Param        | Description                              | Type   |
|--------------|------------------------------------------|--------|
| `fileCount`  | Number of files to generate & upload     | number |
| `fileSize`   | Size of each file in GB                  | number |
| `s3Path`     | Destination path in S3 bucket            | string |

## 📤 Output Metrics (logged after completion)

- `timeToCopy`: Total time to complete all uploads
- `fileSizeCreated`: Total data uploaded
- `copySpeed`: Upload speed in GB/sec

---

## 🛠 Prerequisites

- Docker & Docker Compose
- AWS credentials with access to S3
- AWS CLI (optional, for verification)
- Node.js (for local dev)

---

## 🧪 Getting Started

1. **Clone the repo**
2. **Build & start containers**

```bash
docker-compose up --build
