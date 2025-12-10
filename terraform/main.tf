provider "aws" {
  profile = "default"
  region  = "ap-northeast-1"
}

data "http" "my_ip" {
  url = "https://ifconfig.me/ip"
}
