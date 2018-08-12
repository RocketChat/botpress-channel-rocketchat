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

  async connect(bp) {
    try {
      // make the connection with RocketChat
      var useSSL = true
      if (this.config.useSSL === "false") {
        var useSSL = false
      }
      await driver.connect({ host: this.config.hostname, useSsl: useSSL })
      await driver.login({ username: this.config.username, password: this.config.password })
      await driver.joinRooms(this.config.subscribeTo.split(','))
      await driver.subscribeToMessages()
      this.connected = true
    } catch (error) {
      console.log(error)
    }
  }



  async listen(bp) {
    async function getOrCreateUser(message) {
      //console.log('GETORCREATEUSER')
      const userId = message.u._id
      //console.log(userId)
      const id = `rocketchat:${userId}`
      // console.log("ID:")
      // console.log(id)
      const existingUser = await bp.db
        .get()
        .then(knex => knex('users').where('id', id))
        .then(users => users[0])
  
      // console.log("EXISTINGUSER")
      // console.log(existingUser)
      if (existingUser) {
        existingUser.id = userId
        return existingUser
      } else {
        const newUser = {
          id: id,
          userId: userId,
          username: message.u.username,
          platform: 'rocketchat',
          first_name: message.u.name,
          last_name: '',
          gender: '',
          timezone: null,
          picture_url: null,
          locale: null,
          created_on: '',
          number: userId
        }
        // console.log("NEWUSER")
        // console.log(newUser)
        await bp.db.saveUser(newUser)
        return newUser
      }
    }
    console.log("LISTEN TRIGGERED")    
    return driver.respondToMessages(async function (err, message, meta) {
      // console.log("MESSAGE:")
      // console.log(message)
      const user = await getOrCreateUser(message)
      // console.log(user)
      await bp.middlewares.sendIncoming({
        platform: 'rocketchat',
        type: 'message',
        text: message.msg,
        user: user,
        channel: message.rid,
        ts: message.ts.$date,
        direct: false,
        roomType: meta.roomType,
        raw: message
      })
    }, { dm: true })
  }

  setConfig(config) {
    this.config = config
  }

  sendText(text, options, event) {
    let messageType = event.raw.options.roomType
    let channelId = event.raw.channelId
    let username = event.raw.options.user.username
    if (messageType !== undefined) {
      if (messageType == 'c') {
        console.log("CHANNEL")
        return driver.sendToRoomId(text, channelId);
      } else if (messageType == 'p') {
        console.log("PRIVATE")
        return driver.sendToRoomId(text, channelId);
      } else if (messageType == 'd') {
        console.log("DIRECT")
        return driver.sendDirectToUser(text, username);
      } else if (messageType == 'l') {
        console.log("LIVECHAT")
        return driver.sendToRoomId(text, channelId);
      } else {
        console.log("ERROR WHILE SENDING MESSAGE")
      }
    } else {
      console.log("MESSAGE TYPE UNDEFINED")
    }
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

  isConnected() {
    return this.connected
  }

  async disconnect() {
    await driver.disconnect()
  }

}

module.exports = RocketChat
