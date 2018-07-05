const CanvasApi = require('kth-canvas-api')

function isInScope (context, msg) {
  const affArray = msg.affiliation
  const result = affArray && (affArray.includes('employee') || affArray.includes('student') || affArray.includes('member'))

  if (!result) {
    context.log(
      'User is not an employee and not a student, out of the affilication scope',
      'User ' + msg.username + ' ' + msg.kthid + ' with affiliation ' + msg.affiliation
    )
  }

  return result
}

function convertToCanvasUser (context, msg) {
  context.log(
    'Converting the user-type message to canvasApi format for: ',
    msg.username + ' ' + msg.kthid, '  - affiliation ' + msg.affiliation
  )

  if (msg.username && (msg.given_name || msg.family_name) && msg.kthid) {
    return {
      pseudonym: {
        unique_id: `${msg.username}@kth.se`, // CSVs analogi av 'login_id'
        sis_user_id: msg.kthid // CSVs analogi av 'user_id' needed for enrollments
      },
      user: {
        'name': `${msg.given_name} ${msg.family_name}`,
        'email': msg.primary_email, // must be when 'updating' user
        'sortable_name': `${msg.family_name}, ${msg.given_name}`,
        'short_name': null // a fix to make sure that display name is updated
      },
      communication_channel: { // must be when 'creating' user
        type: 'email',
        address: msg.primary_email,
        skip_confirmation: true
      }
    }
  } else {
    context.log(
      'Incomplete fields to create user in canvas, skipping. Probably,it is missing a name(given_name, family_name) or a username or kth_id.....',
      msg
    )
  }
}

async function createOrUpdate (context, user) {
  const config = {
    canvas: {
      apiUrl: process.env.CanvasApiUrl  || 'https://kth.test.instructure.com/api/v1',
      apiKey: process.env.CanvasApiKey
    }
  }

  const canvasApi = new CanvasApi(config.canvas.apiUrl, config.canvas.apiKey)

  try {
    const userFromCanvas = await canvasApi.getUser(user.pseudonym.sis_user_id)
    context.log('Found user in canvas', userFromCanvas)
    context.log('Update the user with new values: ', user)
    await canvasApi.updateUser(user, userFromCanvas.id)
  } catch (e) {
    if (e.statusCode === 404) {
      context.log('User doesnt exist in canvas. Create it.', user)
      const res = await canvasApi.createUser(user)
      context.log('Success! User created', res)
      return res
    } else {
      throw e
    }
  }
}

module.exports = async function (context, msg) {
  const user = convertToCanvasUser(context, msg)

  if (isInScope(context, msg) && user) {
    await createOrUpdate(context, user)
  }

  return msg
}
