module.exports = (bp, rocketchat) => {
  const isDirect = messageType => {
    if(messageType == 'd') return true; else return false;
  }
  const isLiveChat = messageType => {
    if (messageType == 'l') return true;
    else return false;
  }
  const isSystem = messageType => {
    if (messageType == 's') return true;
    else return false;
  }
  const isChannel = messageType => {
    if (messageType == 'c') return true;
    else return false;
  }
  const isPrivate = messageType => {
    if (messageType == 'p') return true;
    else return false;
  }

  const isBotMentioned = text => {
    //TODO:
    // Verify if bot name is on message
    return false
  }
}
