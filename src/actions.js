import Promise from 'bluebird'

const create = obj => {
  let resolve = null
  let reject = null
  const promise = new Promise((r, rj) => {
    resolve = r
    reject = rj
  })

  const messageId = new Date().toISOString() + Math.random()

  const newEvent = Object.assign({
    _promise: promise,
    _resolve: resolve,
    _reject: reject,
    __id: messageId
  }, obj)

  return newEvent
}

// TODO
const validateChannelId = (channelId) => {
}

const validateText = (text) => {
  if (typeof (text) !== 'string') {
    throw new Error('Text must be a string.')
  }
}

const validateAttachments = (attachments) => {
  if (typeof (attachments) !== 'object') {
    throw new Error('Expected attachments type to be an object')
  }
}

const createText = (channelId, text, options = {}) => {
  validateChannelId(channelId)
  validateText(text)
  return create({
    platform: 'rocketchat',
    type: 'text',
    text: text,
    raw: {
      channelId: channelId,
      options: options
    }
  })
}

const createAttachments = (channelId, attachments, options = {}) => {
  validateChannelId(channelId)
  validateAttachments(attachments)

  return create({
    platform: 'rocketchat',
    type: 'attachments',
    text: 'App sent an attachments',
    raw: {
      channelId: channelId,
      attachments: attachments,
      options: options
    }
  })
}

const createReaction = (name, options = {}) => {
  return create({
    platform: 'rocketchat',
    type: 'reaction',
    text: 'App sent a reaction',
    raw: {
      name: name,
      options: options
    }
  })
}

// TODO
const createUpdateText = (ts, channelId, text, options = {}) => {
  validateChannelId(channelId)
  validateText(text)

  // return create({
  //   platform: 'rocketchat',
  //   type: 'update_text',
  //   text: text,
  //   raw: {
  //     channelId: channelId,
  //     ts: ts,
  //     options: options
  //   }
  // })
}

// TODO
const createUpdateAttachments = (ts, channelId, attachments, options = {}) => {
  validateChannelId(channelId)
  validateAttachments(attachments)

  // return create({
  //   platform: 'rocketchat',
  //   type: 'update_attachments',
  //   text: 'App updated an attachments',
  //   raw: {
  //     channelId: channelId,
  //     attachments: attachments,
  //     ts: ts,
  //     options: options
  //   }
  // })
}

// TODO
const createDeleteTextOrAttachments = (ts, channelId, options = {}) => {
  validateChannelId(channelId)
}

// TODO
const createRemoveReaction = (name, options = {}) => {
}

// TODO
const livechatTransfer = (name, options = {}) => {
  return create({
    platform: 'rocketchat',
    type: 'livechat_transfer',
    text: 'transfer livechat',
    raw: {
      name: name,
      options: options
    }
  })
}

const callMethod = (method, ...args) => {
  return driver.callMethod(method, args)
}

module.exports = {
  createText,
  createAttachments,
  createReaction,
  createUpdateText,
  createUpdateAttachments,
  createDeleteTextOrAttachments,
  createRemoveReaction,
  livechatTransfer,
  callMethod,
}
