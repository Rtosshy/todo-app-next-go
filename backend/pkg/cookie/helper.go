package cookie

import (
	"net/http"
	"os"
)

// GetCookieConfig returns cookie configuration based on the environment
func GetCookieConfig() (sameSite http.SameSite, secure bool, domain string) {
	isProduction := os.Getenv("APP_ENV") == "production"

	if isProduction {
		sameSite = http.SameSiteNoneMode // AWSのHTTPの時だけLaxMode
		secure = true                    // AWSのHTTPの時だけfalse
		domain = ""                      // 将来的に同一ドメインに移行するなら設定が必要
	} else {
		sameSite = http.SameSiteLaxMode
		secure = false
		domain = ""
	}

	return
}
