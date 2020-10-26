import React from 'react'
import styled from '@emotion/styled'


const Dummy = styled.div`
*, *::before, *::after {
  box-sizing: border-box;
}
`

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin: auto;

	&::before, &::after {
		content: '';
		position: absolute;
  }

  &::before, &::after {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  &::before {
    border-style: solid;
    border-width: 3px 3px 3px 0;
    border-color: #333 transparent transparent;
    transform: scale(0.3) rotate(0deg);
    opacity: 0.5;
    animation-name: foregroundCircle;
  }
  
  &::after {
    background: #333;
    opacity: 0.5;
    transform: scale(0);
    animation-name: backgroundCircle;
  }

@keyframes foregroundCircle {
	0% {
		transform: scale(0.3) rotate(0deg);
	}

	12.5% {
		transform: scale(0.3) rotate(180deg);
	}

	25%, 50% {
		opacity: 1;
	}

	50% {
		transform: scale(1) rotate(720deg);
	}

	100% {
		transform: scale(0.3) rotate(1800deg);
		opacity: 0.5;
	}
}

@keyframes backgroundCircle {
	12.5% {
		transform: scale(0.3);
	}

	90%, 100% {
		transform: scale(2);
		opacity: 0;
	}
}
`

export default () => {
  return (
    <Dummy>
      <Wrapper className="reddir-loader">
      </Wrapper>
    </Dummy>
  )
}


