resource "aws_instance" "todo-frontend" {
  tags = {
    Name = "todo-frontend"
  }
  ami                    = "ami-03852a41f1e05c8e4"
  instance_type          = "t3.micro"
  vpc_security_group_ids = [aws_security_group.frontend-sg.id]
  key_name               = "todo-app"
  availability_zone      = "ap-northeast-1a"
}


resource "aws_instance" "todo-backend" {
  tags = {
    Name = "todo-backend"
  }
  ami                    = "ami-03852a41f1e05c8e4"
  instance_type          = "t3.micro"
  vpc_security_group_ids = [aws_security_group.backend-sg.id]
  key_name               = "todo-app"
  availability_zone      = "ap-northeast-1a"
}
