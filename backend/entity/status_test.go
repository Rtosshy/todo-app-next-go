package entity_test

import (
	"backend/entity"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestStatus(t *testing.T) {
	status := entity.Status{
		ID:   1,
		Name: "todo",
	}
	assert.Equal(t, entity.StatusID(1), status.ID)
	assert.Equal(t, entity.StatusName("todo"), status.Name)
}
