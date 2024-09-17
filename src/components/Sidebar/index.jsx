import { Box, Icon, Text } from '@chakra-ui/react';
import styles from './Sidebar.module.scss';

import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillLeftCircle } from 'react-icons/ai';

const Sidebar = ({ elements }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const onRowClick = (element) => {
		navigate(element.link);
	};

	return (
		<Box className={styles.sidebar}>
			<Box className={styles.header}>
				{/* <img src={Logo} alt="logo" /> */}
        Logo
				<Icon
					as={AiFillLeftCircle}
					boxSize="24px"
					color="primary.main"
					cursor="pointer"
					_hover={{ color: 'primary.500' }}
				/>
			</Box>

			<Box className={styles.body}>
				{elements?.map((element, index) => (
					<Box
						key={index}
						className={clsx(styles.row, {
							[styles.active]: pathname.startsWith(element.link),
						})}
						onClick={() => onRowClick(element)}
					>
						<Box className={styles.element}>
							<Icon as={element.icon} className={styles.icon} />
							<Text className={styles.label}>{element.label}</Text>
						</Box>
					</Box>
				))}
			</Box>
		</Box>
	);
};
export default Sidebar;
