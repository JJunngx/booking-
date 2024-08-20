"use strict";

function saveToStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

class User {
  constructor(FirstName, LastName, UserName, Password) {
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.UserName = UserName;
    this.Password = Password;
  }
}
export { saveToStorage, getFromStorage, User };
