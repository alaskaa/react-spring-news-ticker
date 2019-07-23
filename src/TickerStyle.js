import styled from 'styled-components'
import { animated } from 'react-spring'

const TickerStyle = styled.div`
  cursor: pointer;
  position: absolute;
  /* width: 20%; */
  width: auto;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 800;
  font-size: 1em;
  will-change: transform, opacity;
  text-shadow: 0px 2px 40px #00000020, 0px 2px 5px #00000030;
  text-transform: uppercase;

  a {
    color: #ffffff;
  }
`

export default animated(TickerStyle)
