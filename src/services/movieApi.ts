import { LoaderFunctionArgs } from "react-router-dom";
import axios from "axios";
import { API_URL, API_KEY } from "../constants";

export async function getFilm({ params }: LoaderFunctionArgs) {
	const { id } = params;

	if (!id || typeof id !== "string") {
		// Бросаем Response для правильной обработки ошибок React Router
		throw new Response("Movie ID is required", { status: 400 });
	}

	try {
		const response = await axios.get(
			`${API_URL}/?apikey=${API_KEY}&i=${id}`,
		);

		if (response?.data?.Response === "False") {
			throw new Response("Incorrect IMDb ID", {
				status: 400,
			});
		}

		console.log("response.data", response.data);

		return response.data;
	} catch (error) {
		if (error instanceof Response) {
			throw error;
		}

		if (axios.isAxiosError(error)) {
			throw new Response(
				error.response?.data?.Error || "Network error",
				{
					status: error.response?.status || 500,
				},
			);
		}

		throw new Response("Internal server error", { status: 500 });
	}
}
