package usecase

import (
	"backend/adapter/gateway"
	"backend/entity"
)

type ITaskUsecase interface {
	Create(task *entity.Task) (*entity.Task, error)
	Get(taskID entity.TaskID, userID entity.UserID) (*entity.Task, error)
	GetAll(userID entity.UserID) (*[]entity.Task, error)
	Save(task *entity.Task) (*entity.Task, error)
	Delete(taskID entity.TaskID, userID entity.UserID) error
}

type taskUsecase struct {
	tr gateway.ITaskRepository
}

func NewTaskUsecase(tr gateway.ITaskRepository) ITaskUsecase {
	return &taskUsecase{tr: tr}
}

func (tu *taskUsecase) Create(task *entity.Task) (*entity.Task, error) {
	return tu.tr.Create(task)
}

func (tu *taskUsecase) Get(taskID entity.TaskID, userID entity.UserID) (*entity.Task, error) {
	return tu.tr.Get(taskID, userID)
}

func (tu *taskUsecase) GetAll(userID entity.UserID) (*[]entity.Task, error) {
	return tu.tr.GetAll(userID)
}

func (tu *taskUsecase) Save(task *entity.Task) (*entity.Task, error) {
	return tu.tr.Save(task)
}

func (tu *taskUsecase) Delete(taskID entity.TaskID, userID entity.UserID) error {
	return tu.tr.Delete(taskID, userID)
}
