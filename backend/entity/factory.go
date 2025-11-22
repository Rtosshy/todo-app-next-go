package entity

func NewDomains() []any {
	return []any{&Status{}, &Task{}, &User{}}
}
