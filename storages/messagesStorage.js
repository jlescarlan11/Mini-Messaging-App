class MessagesStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addMessage({ messageText, messageUser, added }) {
    const id = this.id;
    this.storage[id] = { id, messageText, messageUser, added };
    this.id++;
  }

  getMessages() {
    return Object.values(this.storage);
  }

  getMessage(id) {
    return this.storage[id];
  }

  updateMessage(id, { messageText, messageUser, added }) {
    this.storage[id] = { id, messageText, messageUser, added };
  }

  deleteMessage(id) {
    delete this.storage[id];
  }
}

module.exports = new MessagesStorage();
