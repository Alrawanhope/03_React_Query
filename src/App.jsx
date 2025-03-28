import { styled } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProfileList from "./ProfileList";
import { Toaster } from "react-hot-toast";

const StyledApp = styled.div`
  background-color: red;
  padding: 10px;
`;

const Header = styled.h1`
  background-color: #40ff00;
  padding: 10px;
  text-align: center;
  text-decoration: underline;
  text-transform: uppercase;
  letter-spacing: 5px;
`;

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ReactQueryDevtools />
      <StyledApp>
        <GlobalStyle />
        <Header>React Query with Supabase</Header>
        <ProfileList />
      </StyledApp>
    </QueryClientProvider>
  );
}

export default App;
