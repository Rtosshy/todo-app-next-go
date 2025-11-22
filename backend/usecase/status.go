package usecase

import (
	"backend/adapter/gateway"
	"backend/entity"
)

type IStatusUsecase interface {
	GetOrCreate(status *entity.Status) (*entity.Status, error)
}

type statusUsecase struct {
	sr gateway.IStatusRepository
}

func NewStatusUsecase(sr gateway.IStatusRepository) IStatusUsecase {
	return &statusUsecase{sr: sr}
}

func (su statusUsecase) GetOrCreate(status *entity.Status) (*entity.Status, error) {
	return su.sr.GetOrCreateStatus(status)
}
