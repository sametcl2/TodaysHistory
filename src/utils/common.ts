// lodash get
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const get = (object: Record<string, unknown>, path: string | Record<string, any>, defval = null) => {
  if (typeof path === 'string') {
    // eslint-disable-next-line no-param-reassign
    path = path.split('.')
  }
  return path.reduce((xs: { [x: string]: unknown }, x: string | number) => (xs && xs[x] ? xs[x] : defval), object)
}

export const t = (s: string) => s
