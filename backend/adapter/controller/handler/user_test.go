package handler

import (
	"backend/entity"
	"backend/usecase"
	"testing"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

type MockUserUseCase struct {
	mock.Mock
}

func NewMockUserUseCase() usecase.IUserUsecase {
	return &MockUserUseCase{}
}

func (m *MockUserUseCase) SignUp(user *entity.User) (*entity.User, error) {
	args := m.Called(user)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*entity.User), args.Error(1)
}

func (m *MockUserUseCase) Login(user *entity.User) (string, error) {
	args := m.Called(user)
	if args.Get(0) == nil {
		return "", args.Error(1)
	}
	return args.String(0), args.Error(1)
}

func (m *MockUserUseCase) Save(user *entity.User) (*entity.User, error) {
	args := m.Called(user)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*entity.User), args.Error(1)
}

func (m *MockUserUseCase) Delete(userID entity.UserID) error {
	args := m.Called(userID)
	return args.Error(0)
}

type UserHandlerSuite struct {
	suite.Suite
	uh IUserHandler
}

func TestUserHandlerTestSuite(t *testing.T) {
	suite.Run(t, new(UserHandlerSuite))
}

func (suite *UserHandlerSuite) TestSignUp() {}

func (suite *UserHandlerSuite) TestLogin() {}

func (suite *UserHandlerSuite) TestLogout() {}

func (suite *UserHandlerSuite) TestCsrfToken() {}
