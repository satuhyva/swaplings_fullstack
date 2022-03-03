import { Context } from '../../Context'

type HealthQueryResolversType = {
  health: (parent: unknown, args: unknown, context: Context) => string
}

export const HealthQueryResolvers: HealthQueryResolversType = {
  health: (_parent, _args, _context) => {
    return 'ok'
  }
}
