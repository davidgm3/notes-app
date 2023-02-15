import React from "react";
import styled from "styled-components";
const LoadingModal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;
const LoadingSpinner = styled.div`
	animation: spin 1s linear infinite;
	border: 4px solid ${(props) => props.theme.colors.neutral100};
	border-top: 4px solid ${(props) => props.theme.colors.primary};
	border-radius: 50%;
	width: 50px;
	height: 50px;
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export const LoadingModalFull = () => {
	return (
		<LoadingModal>
			<LoadingSpinner />
		</LoadingModal>
	);
};
