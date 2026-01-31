import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import { UserContext } from "../../context/UserContext";
import useProfile from "../../hooks/useProfile";

export const Login = () => {
	const navigate = useNavigate();
	const {
		currentUserName,
		setCurrentUserName,
		isLogined,
		setIsLogined,
		loginRef,
	} = useContext(UserContext);
	const [loginProfile, exitProfile] = useProfile();
	const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentUserName(e.target.value);
	};
	const login = () => {
		if (!currentUserName) {
			loginRef.current?.focus();
			return null;
		}
		loginProfile(currentUserName);
		setIsLogined(true);
		navigate("/");
	};
	return (
		<div className="loginForm">
			<Title size="h1">Вход</Title>
			<Input
				ref={loginRef}
				type="text"
				value={currentUserName}
				onChange={changeName}
				name="auth"
				placeholder="Ваше имя"
			/>
			<div>
				<Button onClick={login}>Войти в профиль</Button>
			</div>
		</div>
	);
};
