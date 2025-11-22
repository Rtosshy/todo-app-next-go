package pkg

import (
	"fmt"
	"net"
	"net/url"
	"os"
	"time"
)

func GetEndpoint(path string) string {
	var baseURL string
	baseURL = "http://0.0.0.0:8080/"
	env := os.Getenv("APP_ENV")
	if env == "stage" {
		baseURL = "http://stage.localhost:8080"
	}
	p, _ := url.Parse(path)
	b, _ := url.Parse(baseURL)
	return b.ResolveReference(p).String()
}

func WaitForPort(host, port string, timeout time.Duration) bool {
	deadline := time.Now().Add(timeout)
	for time.Now().Before(deadline) {
		if CheckPort(host, port) {
			return true
		}
		time.Sleep(1 * time.Second)
	}
	return false
}

func CheckPort(host, port string) bool {
	conn, err := net.Dial("tcp", fmt.Sprintf("%s:%s", host, port))
	if conn != nil {
		conn.Close()
		return false
	}
	if err != nil {
		return true
	}
	return false
}
