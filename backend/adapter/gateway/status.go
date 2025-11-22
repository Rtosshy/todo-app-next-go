package gateway

import (
	"backend/entity"

	"gorm.io/gorm"
)

type IStatusRepository interface {
	GetOrCreateStatus(status *entity.Status) (*entity.Status, error)
}

type statusRepository struct {
	db *gorm.DB
}

func NewStatusRepository(db *gorm.DB) IStatusRepository {
	return &statusRepository{db: db}
}

func (sr *statusRepository) GetOrCreateStatus(status *entity.Status) (*entity.Status, error) {
	var getOrCreateStatus entity.Status
	if err := sr.db.FirstOrCreate(&getOrCreateStatus, status).Error; err != nil {
		return nil, err
	}
	return &getOrCreateStatus, nil
}
