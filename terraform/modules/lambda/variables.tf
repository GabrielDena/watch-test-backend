variable "lambda_name" {
  description = "The name of the Lambda function"
  type        = string
}

variable "source_dir" {
  description = "The directory containing the Lambda source code"
  type        = string
}

variable "handler" {
  description = "The entrypoint function for the Lambda"
  type        = string
}

variable "s3_bucket_name" {
  description = "S3 bucket for Lambda ZIP storage"
  type        = string
}

variable "environment_variables" {
  description = "Environment variables for the Lambda function"
  type        = map(string)
  default     = {}
}
