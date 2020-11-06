type CallbackFunctionVariadic = (...args: any[]) => void;

export const onScroll = (element: Node, callback: CallbackFunctionVariadic): void => {
  let prevPos: number
  let lastKnownScrollPos: number
  let ticking = false

  element.addEventListener(
    'scroll',
    e => {
      const bottom: number = e.target.scrollHeight - (e.target.clientHeight + e.target.scrollTop)
      if (prevPos === e.target.scrollLeft) {
        if (bottom === 0) {
          lastKnownScrollPos = e.target.scrollTop
          if (!ticking) {
            console.log('ticking')
            window.requestAnimationFrame(() => {
              callback(lastKnownScrollPos)
              ticking = false
            })
            ticking = true
          }
        }
      } else {
        // horizontal scrolling..
        prevPos = e.target.scrollLeft
      }
    },
    true
  )
}