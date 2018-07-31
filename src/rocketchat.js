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

    return Promise.fromCallback(cb => {
      // simple messages sent to test RocketChat connection
      //driver.sendToRoomId('BOTPRESSSS!', 'GENERAL', {})
      driver.sendToRoomId(text, channelId, {})
    })
  }

  listen(bp) {
    console.log("RECEIVE TEXT")
    bp.middlewares.sendIncoming({
      platform: 'rocketchat',
      type: 'message',
      text: message.msg,
      user: message.u.username,
      channel: message.rid,
      ts: message.ts.$date,
      direct: false,
      raw: message
    })
    // driver.respondToMessages(async function (err, message, meta) {
    //   console.log('I RECEIVE A MESSAGE:')
    //   console.log(message)
    //   driver.sendToRoomId("I receive the message: " + message.msg, message.rid)
    // })
  }

  isConnected() {
    return this.connected
  }

  getData() {
    return this.data
  }

  async connect(bp) {
    try {
      // make the connection with RocketChat
      await driver.connect({ host: this.config.hostname, useSsl: this.config.useSsl })
      await driver.login({ username: this.config.username, password: this.config.password })
      await driver.joinRooms(this.config.subscribeTo.split(','))
      await driver.subscribeToMessages()
    } catch (error) {
      console.log(error)
    }
  }

  async disconnect() {
    await driver.disconnect()
  }
  
  callMethod(){
    //TODO
  }
}

module.exports = RocketChat
