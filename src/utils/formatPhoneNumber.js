export const formatPhoneNumberForRequest = (n = '') => {
	if (!n) return '';
	return `+998${n.at(1)}${n.at(2)}${n.at(5)}${n.at(6)}${n.at(7)}${n.at(
		9
	)}${n.at(10)}${n.at(12)}${n.at(13)}`;
};

export const formatPhoneNumberForForm = (n = '') => {
	if (!n) return '';
	return `(${n.at(4)}${n.at(5)}) ${n.at(6)}${n.at(7)}${n.at(8)}-${n.at(
		9
	)}${n.at(10)}-${n.at(11)}${n.at(12)}`;
};
