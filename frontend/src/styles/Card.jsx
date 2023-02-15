import styled from "styled-components";

export const CardContainer = styled.div`
	background-color: ${(props) => props.theme.colors.neutral700};
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(89, 89, 89, 0.2);
	padding: 10px;

	cursor: pointer;
	overflow: hidden;
	position: relative;
`;

export const CardContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	overflow: hidden;
`;

export const CardTitle = styled.h3`
	font-size: 1.2rem;
	color: ${(props) => props.theme.colors.neutral100};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-weight: 500;
`;
export const CardText = styled.p`
	font-size: 1rem;
	color: ${(props) => props.theme.colors.neutral100};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
export const CardSubText = styled.p`
	font-size: 0.6rem;
	color: ${(props) => props.theme.colors.neutral100};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
