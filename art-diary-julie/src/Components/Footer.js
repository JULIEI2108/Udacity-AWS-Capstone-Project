import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <Wrapper>
      <div className="section-center footer">
        <h5>
          &copy;{new Date().getFullYear()}
          <span> ART DIARY </span>
        </h5>
        <h5> All rights reserved</h5>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  height: 5rem;
  background: var(--clr-primary-7);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  .footer {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  span {
    color: var(--clr-primary-1);
  }

  h5 {
    color: var(--clr-white);
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    .footer {
      flex-direction: row;
    }
  }
`;
