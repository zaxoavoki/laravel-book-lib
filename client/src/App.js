import { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import { AuthContext } from './contexts/AuthContext';
import AddReview from './pages/AddReview';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Book from './pages/books/Book';
import BookList from './pages/books/BookList';
import Profile from './pages/profile/Profile';

function App() {
	const { auth } = useContext(AuthContext);

	return (
		<Router>
			<Header />
			{auth.user ? (
				<Switch>
					<Route exact path='/' component={BookList} />
					<Route exact path='/books/:id' component={Book} />
					<Route path='/users/:id' component={Profile} />
					<Route path='/reviews/create/:id' component={AddReview} />
				</Switch>
			) : (
				<Switch>
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
				</Switch>
			)}
		</Router>
	);
}

export default App;
