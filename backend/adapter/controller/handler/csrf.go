package handler

import (
	"backend/adapter/controller/presenter"
	"backend/api"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ICsrfHandler interface {
	GetCsrfToken(c *gin.Context)
}

type csrfHandler struct{}

func NewCsrfHandler() ICsrfHandler {
	return &csrfHandler{}
}

func (ch *csrfHandler) GetCsrfToken(c *gin.Context) {
	token := c.GetString("csrf")
	c.JSON(http.StatusOK, presenter.CsrfTokenResponse{
			ApiVersion: api.Version,
			Data: presenter.CsrfToken(token),
		},
	)
}
