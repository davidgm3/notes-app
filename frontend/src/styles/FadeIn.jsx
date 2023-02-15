import styled from "styled-components";
export const FadeIn = styled.div`
	animation: fadeIn ease-out 0.4s;
	@keyframes fadeIn {
		0% {
			translate: 100vw;
		}
		100% {
			translate: 0;
		}
	}
`;
