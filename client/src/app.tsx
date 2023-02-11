import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './views/Homepage';
import Postspage from './views/Postspage';
import Userspage from './views/Userspage';
import Loginpage from './views/Loginpage';
import MainNav from './components/common/MainNav';
import Footer from './components/common/Footer';
import Signuppage from './views/Signuppage';
import Postpage from './views/Postpage';
import Profilepage from './views/Profilepage';
import { Container } from 'react-bootstrap';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <BrowserRouter>
      <MainNav />
      <Container className="my-auto">
        <Routes>
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/posts/:pid" element={<Postpage />} />
          <Route path="/posts" element={<Postspage />} />
          <Route path="/users" element={<Userspage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/profile" element={<Profilepage />} />
          <Route path="/" element={<Homepage />} />
          {/*<Route path="/">
            <Redirect to="/" />
          </Route>*/}
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
