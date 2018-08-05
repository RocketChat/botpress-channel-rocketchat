const handlePromise = (event, next, promise) => {
  return promise
    .then(res => {
      console.log('WE ARE GOING NEXT PROMISE')
      next()
      event._resolve && event._resolve()
      return res
    })
    .catch(err => {
      console.log('THERE WAS AN ERROR')
      next(err)
      event._reject && event._reject(err)
      throw err
    })
}

const handleText = (event, next, rocketchat) => {
  if (event.platform !== 'rocketchat' || event.type !== 'text') {
    return next()
  }

  const channelId = event.raw.channelId
  const text = event.text
  const options = {}

  return handlePromise(event, next, rocketchat.sendText(channelId, text, options))
}

const handleUpdateText = (event, next, rocketchat) => {
  if (event.platform !== 'rocketchat' || event.type !== 'update_text') {
    return next()
  }

  const channelId = event.raw.channelId
  const text = event.text
  const options = event.raw.options
  const ts = event.raw.ts

  return handlePromise(event, next, rocketchat.sendUpdateText(ts, channelId, text, options))
}

const handleAttachments = (event, next, rocketchat) => {
  if (event.platform !== 'rocketchat' || event.type !== 'attachments') {
    return next()
  }

  const channelId = event.raw.channelId
  const attachments = event.raw.attachments
  const options = event.raw.options

  return handlePromise(event, next, rocketchat.sendAttachments(channelId, attachments, options))
}

const handleUpdateAttachments = (event, next, rocketchat) => {
  if (event.platform !== 'rocketchat' || event.type !== 'update_attachments') {
    return next()
  }

  const channelId = event.raw.channelId
  const attachments = event.raw.attachments
  const options = event.raw.options
  const ts = event.raw.ts

  return handlePromise(event, next, rocketchat.sendUpdateAttachments(ts, channelId, attachments, options))
}

const handleDeleteTextOrAttachments = (event, next, rocketchat) => {
  if (event.platform !== 'rocketchat' || event.type !== 'delete_text_or_attachments') {
    return next()
  }

  const channelId = event.raw.channelId
  const options = event.raw.options
  const ts = event.raw.ts

  return handlePromise(event, next, rocketchat.sendDeleteTextOrAttachments(ts, channelId, options))
}

const handleReaction = (event, next, rocketchat) => {
  if (event.platform !== 'rocketchat' || event.type !== 'reaction') {
    return next()
  }

  const name = event.raw.name
  const options = event.raw.options

  return handlePromise(event, next, rocketchat.sendReaction(name, options))
}

const handleRemoveReaction = (event, next, rocketchat) => {
  if (event.platform !== 'rocketchat' || event.type !== 'remove_reaction') {
    return next()
  }

  const name = event.raw.name
  const options = event.raw.options

  return handlePromise(event, next, rocketchat.sendRemoveReaction(name, options))
}

module.exports = {
  text: handleText,
  attachments: handleAttachments,
  reaction: handleReaction,
  update_text: handleUpdateText,
  update_attachments: handleUpdateAttachments,
  delete_text_or_attachments: handleDeleteTextOrAttachments,
  remove_reaction: handleRemoveReaction
}
