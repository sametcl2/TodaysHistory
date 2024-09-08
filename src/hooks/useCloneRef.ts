import { ForwardedRef, useEffect, useRef } from 'react'

export const useCloneRef = <T>(ref?: ForwardedRef<T>, initialValue: T | undefined | null = null) => {
  const targetRef = useRef<T>(initialValue)

  useEffect(() => {
    if (!ref) {
      return
    }
    if (typeof ref === 'function') {
      ref(targetRef.current)
    } else {
      // eslint-disable-next-line no-param-reassign
      ref.current = targetRef.current
    }
  }, [ref])

  return targetRef
}
