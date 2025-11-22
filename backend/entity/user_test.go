package entity_test

import (
	"backend/entity"
	"backend/pkg"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestUser(t *testing.T) {
	now := pkg.Str2time("2025-01-01")
	user := entity.User{
		ID:        1,
		Email:     "test@test.com",
		Password:  "password",
		CreatedAt: now,
	}

	assert.Equal(t, entity.UserID(1), user.ID)
	assert.Equal(t, "test@test.com", user.Email)
	assert.Equal(t, "password", user.Password)
	assert.Equal(t, now, user.CreatedAt)
}
