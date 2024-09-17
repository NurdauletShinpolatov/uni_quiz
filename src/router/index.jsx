import { observer } from 'mobx-react-lite';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import Login from '../modules/Login';
import authStore from '../store/auth.store';
import Dashboard from '../modules/Dashboard';
const Router = () => {
	const { isAuth } = authStore;

	if (!isAuth)
		return (
			<Routes>
				<Route path="/" element={<AuthLayout />}>
					<Route index element={<Navigate to="/login " />} />
					<Route path="login" element={<Login />} />
					<Route path="*" element={<Navigate to="/login" />} />
				</Route>
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		);

	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Navigate to="/dashboard" />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="*" element={<Navigate to="/dashboard" />} />
			</Route>

			<Route path="*" element={<Navigate to="/dashboard" />} />
		</Routes>
	);
};

export default observer(Router);
