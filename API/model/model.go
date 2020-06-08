package model

type User struct {
	Username   string `json:"username"`
	FirstName  string `json:"firstname"`
	LastName   string `json:"lastname"`
	Password   string `json:"password"`
	Occupation string `json:"occupation"`
	Token      string `json:"token"`
	Wallet     string `json:"wallet"`
}

type Customer struct {
	Username  string `json:"username"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Password  string `json:"password"`
	Token     string `json:"token"`
	Wallet    string `json:"wallet"`
}

type Feedback struct {
	Username string `json:"username"`
	Feedback string `json:"feedback"`
}

type ResponseResult struct {
	Error  string `json:"error"`
	Result string `json:"result"`
}
