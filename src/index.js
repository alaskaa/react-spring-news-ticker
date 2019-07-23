import { render } from 'react-dom'
import { MediaQuery } from 'react-responsive'
import React, { useState, useEffect } from 'react'
import { useTransition } from 'react-spring'
import './styles.css'
import FlexContainer from './FlexContainer'
import TickerStyle from './TickerStyle'
import TickerWrapper from './TickerWrapper'
import PlainText from './PlainText'
import GridWrapper from './GridWrapper'
import CloseButton from './CloseButton'

const headlines = [
  { name: 'Zürich, 08.09', href: 'https://google.com' },
  { name: 'Mannheim, 23.08', href: 'https://wikipedia.org' },
  { name: 'Berlin, 09.09', href: 'https://amazon.de' },
  { name: 'Bonn, 31.09', href: 'https://amazon.de' },
]

const tickerItems = headlines.map(item => ({ style }) => {
  return (
    <TickerStyle style={{ ...style }}>
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {item.name}
      </a>
    </TickerStyle>
  )
})

// ({ style }) => <TickerStyle style={{ ...style }}>Mannheim, 23.08</TickerStyle>,
// ({ style }) => <TickerStyle style={{ ...style }}>Berlin, 09.09</TickerStyle>,

export default function App() {
  const [index, set] = useState(0)
  const [isVisible, setVisible] = useState(true)

  useEffect(() => void setInterval(() => set(state => (state + 1) % 3), 3000), [])

  const mobileTransitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(0,100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-50%,0)' },
  })

  const desktopTransitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

  const handleClose = () => {
    setVisible(false)
  }

  return (
    <React.Fragment>
      {isVisible ? (
        <FlexContainer>
          <PlainText>
            <h3>New event:</h3>
          </PlainText>
          <React.Fragment>
            <MediaQuery query="(max-width: 47em)">
              <TickerWrapper>
                {mobileTransitions.map(({ item, props, key }) => {
                  const TickerItem = tickerItems[item]
                  return <TickerItem key={key} style={props} />
                })}
              </TickerWrapper>
            </MediaQuery>
            <MediaQuery query="(min-width: 48em)">
              {tickerItems.length > 3 ? (
                <TickerWrapper>
                  {desktopTransitions.map(({ item, props, key }) => {
                    const TickerItem = tickerItems[item]
                    return <TickerItem key={key} style={props} />
                  })}
                </TickerWrapper>
              ) : (
                <GridWrapper>
                  {headlines.map(item => (
                    <a href={item.href}>{` ${item.name}   `}</a>
                  ))}
                </GridWrapper>
              )}
            </MediaQuery>
          </React.Fragment>
          <CloseButton onClick={handleClose}>X</CloseButton>
        </FlexContainer>
      ) : null}
    </React.Fragment>
  )
}

render(<App />, document.getElementById('root'))
