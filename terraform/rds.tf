resource "aws_db_instance" "todo-db" {
  identifier     = "todo-db"
  engine         = "postgres"
  engine_version = "17.6"

  instance_class = "db.t3.micro"

  allocated_storage = 20
  username          = var.db_username
  password          = var.db_password
  db_name           = "todo_db"

  vpc_security_group_ids = [aws_security_group.db-sg.id]
  availability_zone      = "ap-northeast-1a"
  skip_final_snapshot    = true
}
