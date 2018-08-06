const { driver } = require('@rocket.chat/sdk');
import Promise from 'bluebird'
import _ from 'lodash'

class RocketChat {
  constructor(bp, config) {

    if (!bp || !config) {
      throw new Error('You need to specify botpress and config')
    }

    this.config = config
    this.connected = false
  }
  
  setConfig(config) {
    this.config = config
  }

  sendText(channelId, text, options) {
    return driver.sendToRoomId(text, channelId)    
  }
  sendUpdateText(ts, channelId, text, options) {
    return Promise.fromCallback(cb => {
      driver.sendToRoomId(text, channelId, {})
    })
  }

  sendDeleteTextOrAttachments(ts, channelId, options) {
    return Promise.fromCallback(cb => {
      //TODO
    })
  }

  sendAttachments(channelId, attachments, options) {
    return Promise.fromCallback(cb => {
      // TODO
    })
  }

  sendUpdateAttachments(ts, channelId, attachments, options) {
    return Promise.fromCallback(cb => {
      //TODO
    })
  }

  sendReaction(name, options) {
    return Promise.fromCallback(cb => {
      //TODO
    })
  }

  sendRemoveReaction(name, options) {
    return Promise.fromCallback(cb => {
      //TODO
    })
  }
  callMethod() {
    //TODO
  }
  
async listen(bp) {
  console.log("LISTEN TRIGGERED")
  return driver.respondToMessages(async function (err, message, meta) {
    await bp.middlewares.sendIncoming({
      platform: 'rocketchat',
      type: 'message',
      text: message.msg,
      user: message.u.username,
      channel: message.rid,
      ts: message.ts.$date,
      direct: false,
      roomType: meta.roomType,
      raw: message
    })
    
  })
}

  isConnected() {
    return this.connected
  }

  async connect(bp) {
    try {
      // make the connection with RocketChat
      await driver.connect({ host: this.config.hostname, useSsl: this.config.useSsl })
      await driver.login({ username: this.config.username, password: this.config.password })
      await driver.joinRooms(this.config.subscribeTo.split(','))
      await driver.subscribeToMessages()
      this.connected = true
    } catch (error) {
      console.log(error)
    }
  }

  async disconnect() {
    await driver.disconnect()
  }

}

module.exports = RocketChat
