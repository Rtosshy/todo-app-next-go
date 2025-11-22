package entity

import "time"

type TaskID int

type Task struct {
	ID        TaskID    `gorm:"primaryKey"`
	Name      string    `gorm:"not null"`
	StatusID  StatusID  `gorm:"not null"`
	Status    Status    `gorm:"not null; foreignKey:StatusID"`
	UserID    UserID    `gorm:"not null"`
	User      User      `gorm:"not null; foreignKey:UserID"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
}
