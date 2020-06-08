
export function PostData(type, userData) {
    let BaseURL = 'http://localhost:8080/';
    // let BaseURL = 'http://localhost/PHP-Slim-Restful/api/';

    return new Promise((resolve, reject) => {
    
         
        fetch(BaseURL+type, {
            mode: 'no-cors',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
          })
          .then((response) => {
            return response.json();
          })
          .then((responseJson) => {
            resolve(responseJson);
          })
          .catch((error) => {
            reject(error);
          });
  
      });
}