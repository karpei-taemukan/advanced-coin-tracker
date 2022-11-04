import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {ThemeProvider} from "styled-components";
import {darkTheme, lightTheme} from "./theme";
import {useRecoilValue} from "recoil";
import { isDarkAtom } from "./atom";


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap'),
html, body, div, span, applet, object, iframe,
h1,h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }

  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }

  body {
    line-height: 1;
  }

  menu, ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  //style custom
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor}
  }

  a {
    text-decoration: none;
  }
`;
//<></> : Fragment이다 일종의 유령 컴포넌트(부모 컴포넌트없이 서로 붙어있는 많은 것들을 리턴할 수 있게해준다)

function App() {
/*const [isDark, setIsDark] = useState(false);
const toggleDark = () => {
setIsDark((current) => !current);
} */


const isDark = useRecoilValue(isDarkAtom);


 /*
 Global state는 어플리케이션이 특정 value(isDark, toggleDark)에 접근 해야할때 사용
 */
return (
    <>
     <ThemeProvider theme={isDark? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router /*isDark={isDark} toggleDark={toggleDark} *//>
      {/* Coins는 Router 내부에 있다
      */}
      <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
