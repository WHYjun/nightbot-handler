package nightbot

import "encoding/json"

type Channel struct {
	Name        string `json:"name"`
	DisplayName string `json:"displayName"`
	Provider    string `json:"provider"`
	ProviderID  string `json:"providerId"`
}

type User struct {
	Name        string `json:"name"`
	DisplayName string `json:"displayName"`
	Provider    string `json:"provider"`
	ProviderID  string `json:"providerId"`
	UserLevel   string `json:"userLevel"`
}

func ParseNightbotChannel(params string) (*Channel, error) {
	channel := &Channel{}
	if err := json.Unmarshal([]byte(params), channel); err != nil {
		return nil, err
	}
	return channel, nil
}

func ParseNightbotUser(params string) (*User, error) {
	user := &User{}
	if err := json.Unmarshal([]byte(params), user); err != nil {
		return nil, err
	}
	return user, nil
}
