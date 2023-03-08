import jwt from 'jsonwebtoken'
import config from 'config'
import log from './logger'

const sign = (payload: Object): string => {
  return jwt.sign(payload, config.get('jwt.secret'))
}

const verify = (token: string): Record<string, any> => {
  try {
    const decoded = jwt.verify(token, config.get('jwt.secret'))

    return {
      valid: true,
      decoded
    }
  } catch (err: any) {
    log.error(err)
    return {
      valid: false,
      decoded: null
    }
  }
}

export default { sign, verify }
