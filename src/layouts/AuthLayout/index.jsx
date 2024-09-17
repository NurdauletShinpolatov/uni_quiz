import { Box, Center } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

const AuthLayout = () => {
	return (
		<Box className={styles.layout}>
			<Center className={styles.logoSide}>Logo</Center>

			<Box className={styles.formSide}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default AuthLayout;
