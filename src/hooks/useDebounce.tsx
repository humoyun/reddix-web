import React from 'react'

export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedVal, setDebouncedVal] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(value)
    }, delay)

    // Cancel the timeout if value changes (also on delay change or un-mount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler)  
    }
  }, [value, delay]) // Only re-call effect if value or delay changes

  return debouncedVal
}
