import React from "react";
import styled from "styled-components";
import image01 from "../assets/image01.jpg";
import image02 from "../assets/image02.jpg";
import image03 from "../assets/image03.jpg";

export default function Hero() {
  return (
    <Wrapper>
      <div className="section section-center">
        <div className="hero">
          <div className="text__box">
            <h2>AMAZING ART</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit
              pariatur obcaecati adipisci, corrupti alias rem blanditiis
              necessitatibus et magni excepturi ea. Culpa modi ea nostrum
              laborum sed vero. Provident, omnis.
            </p>
          </div>
          <div className="image__box">
            <img src={image03} alt="" className="image03" />
            <img src={image02} alt="" className="image02" />
            <img src={image01} alt="" className="image01" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  background-color: var(--clr-primary-9);
  height: 20rem;
  .hero {
    display: flex;
    /* flex-direction: column-reverse; */
  }
  .text__box {
    margin-right: 3rem;
    width: 50%;
  }
  .image__box {
    position: relative;
    width: 50%;
    /* width: 90%; */
    img {
      position: absolute;
      width: 10rem;
    }
    .image01 {
      top: 50%;
      left: 50%;
      transform: translateX(-70%) translateY(-80%);
    }
    .image02 {
      top: 50%;
      left: 50%;
    }
    .image03 {
      top: 50%;
      left: 50%;
      transform: translateX(40%) translateY(-50%);
    }
  }

  @media (max-width: 620px) {
    .hero {
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
    }
    .text__box {
      margin-right: 0;
      width: 100%;
    }
    .image__box {
      display: none;
    }
  }
`;
