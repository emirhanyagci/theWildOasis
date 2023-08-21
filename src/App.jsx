import styled from "styled-components";
import GlobalStyles from "./styles/globalStyles.js";
const H1 = styled.h1`
  color: red;
`;

function App() {
  return (
    <div>
      <GlobalStyles />
      <H1>Hello new App</H1>
    </div>
  );
}

export default App;
