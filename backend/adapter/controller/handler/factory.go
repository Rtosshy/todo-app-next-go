package handler

import "sync"

var (
	serverHandler *ServerHandler
	once          sync.Once
)

type ServerHandler struct {
	IUserHandler
	ITaskHandler
	ICsrfHandler
}

func NewHandler() *ServerHandler {
	once.Do(func() {
		serverHandler = &ServerHandler{}
	})
	return serverHandler
}

func (h *ServerHandler) Register(i any) *ServerHandler {
	switch interfaceType := i.(type) {
	case IUserHandler:
		serverHandler.IUserHandler = interfaceType
	case ITaskHandler:
		serverHandler.ITaskHandler = interfaceType
	case ICsrfHandler:
		serverHandler.ICsrfHandler = interfaceType
	}
	return serverHandler
}
