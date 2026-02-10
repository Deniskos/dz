import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import { AppContext } from "../../context/AppContext";
import useProfile from "../../hooks/useProfile";
import { setUserProfile } from "../../store/userProfile.slice";

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [currentUserName, changeCurrentUserName] = useState<string>("");
	const { loginRef } = useContext(AppContext);
	const [loginProfile] = useProfile();
	const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		changeCurrentUserName(e.target.value);
	};
	const login = () => {
		if (!currentUserName) {
			loginRef.current?.focus();
			return null;
		}
		loginProfile(currentUserName);
		dispatch(setUserProfile(currentUserName));
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
