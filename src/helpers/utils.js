export function getFormBody(params) {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property); //  'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); //  'abc 123' => 'abc%20123'

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); // 'user%20name=abc%20123&password=123123'
}
