import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserProvider.js";
import { RequiredAuth } from "./helpers/RequiredAuth.js";
import "./index.css";
import { Layout } from "./layout/layout";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage.js";
import { Favorites } from "./pages/Favorites/Favorites";
import { Login } from "./pages/Login/Login";
import { Main } from "./pages/Main/Main";
import { Movie } from "./pages/Movie/Movie";
import { Profile } from "./pages/Profile/Profile";
import { getFilm } from "./services/movieApi.js";
import { store } from "./store/store.js";
// Получаем элемент
const rootElement: HTMLElement | null = document.getElementById("root");

// Проверяем, что элемент существует
if (rootElement === null) {
	throw new Error(
		'Root element not found. Make sure you have a div with id="root" in your index.html',
	);
}
// Создаем корень
const root = createRoot(rootElement);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: (
					<RequiredAuth>
						<Main />
					</RequiredAuth>
				),
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/profile/:name",
				element: (
					<RequiredAuth>
						<Profile />
					</RequiredAuth>
				),
			},
			{
				path: "/movie/:id",
				element: (
					<RequiredAuth>
						<Movie />
					</RequiredAuth>
				),
				loader: getFilm,
				errorElement: <ErrorPage />,
			},
			{
				path: "/favorites",
				element: (
					<RequiredAuth>
						<Favorites />
					</RequiredAuth>
				),
			},
		],
	},
	{
		path: "*",
		element: <>Страница ошибки</>,
	},
]);

// Рендерим приложение
root.render(
	<StrictMode>
		<Provider store={store}>
			<UserProvider>
				<RouterProvider router={router} />
			</UserProvider>
		</Provider>
	</StrictMode>,
);
