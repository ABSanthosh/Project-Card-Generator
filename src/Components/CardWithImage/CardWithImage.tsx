import { useEffect } from "react";
import "./CardWithImage.scss";
import * as htmlToImage from "html-to-image";
const download = require("downloadjs");
const cs2 = require("canvas2svg");
export interface ICardWithImageProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  showFork: boolean;
  showImage: boolean;
  showStars: boolean;
  showIssues: boolean;
  showLicense: boolean;
  showDescription: boolean;
  cardSrc: string;
  stars: number;
  forks: number;
  issues: number;
  license: string | { name?: string };
  language: string;
  setCardSrc: (src: string) => void;
}

const dynamicFontSize = (element: HTMLElement) => {
  let step = 1;

  const ptag = document.querySelector(
    ".CardWithImage__content--title--text"
  ) as HTMLElement;

  let i = parseInt(ptag.style.fontSize.replace("px", "")) || 35;
  if (ptag.scrollWidth > element.offsetWidth) {
    while (ptag.scrollWidth > element.offsetWidth) {
      i -= step;
      ptag.style.fontSize = `${i}px`;
    }
  } else {
    while (
      ptag.clientWidth < element.offsetWidth &&
      parseInt(ptag.style.fontSize.replace("px", "")) < 35
    ) {
      i += step;
      ptag.style.fontSize = `${i}px`;
    }
  }
};

export function CardWithImage(props: ICardWithImageProps) {
  useEffect(() => {
    if (document.querySelector(".CardWithImage__content--title--text")) {
      dynamicFontSize(
        document.querySelector(".CardWithImage__content--title")!
      );
    }
  }, [props.title]);

  useEffect(() => {
    if (document.querySelector(".CardWithImage")) {
      var node: HTMLElement = document.querySelector(".CardWithImage")!;
      htmlToImage.toSvg(node).then((svg) => {
        if (props.cardSrc !== svg) {
          props.setCardSrc(svg);
          // download(svg, "card.svg");
        }
      });
      // htmlToImage.toPng(node).then((dataUrl) => {
      //   if (props.cardSrc !== dataUrl) {
      //     props.setCardSrc(dataUrl);
      //     // download(svg, "card.svg");
      //   }
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.title,
    props.description,
    props.image,
    props.imageAlt,
    props.showFork,
    props.showImage,
    props.showStars,
    props.showIssues,
    props.showLicense,
    props.showDescription,
    props.stars,
    props.forks,
    props.issues,
    props.license,
    props.language,
  ]);

  return (
    <div
      className="CardWithImage"
      style={{
        height: props.showImage ? undefined : "auto",
        width: props.showImage ? undefined : "350px",
      }}
    >
      {props.showImage && <div className="CardWithImage__image"></div>}
      <div
        className="CardWithImage__content"
        style={{
          height: props.showImage ? undefined : "100%",
          gap: props.showImage ? undefined : "20px",
        }}
      >
        <div className="CardWithImage__content--top">
          <div className="CardWithImage__content--title">
            <p className="CardWithImage__content--title--text">
              {props.title.split("/")[1]}
            </p>
          </div>
          {props.showDescription && (
            <div className="CardWithImage__content--description">
              {props.description}
            </div>
          )}
        </div>
        <hr />
        <div className="CardWithImage__content--footer">
          <div className="CardWithImage__content--footer--left">
            {props.showFork && (
              <div className="CardWithImage__content--footer--left--item">
                <svg
                  width="11"
                  height="13"
                  viewBox="0 0 11 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.737 4.07044V8.92956C1.20597 9.03654 0.736018 9.32351 0.417614 9.73523C0.0992105 10.1469 -0.0451348 10.6543 0.0123674 11.1596C0.0698696 11.6649 0.325154 12.1325 0.729075 12.4722C1.13299 12.812 1.657 13 2.2002 13C2.7434 13 3.2674 12.812 3.67132 12.4722C4.07524 12.1325 4.33052 11.6649 4.38803 11.1596C4.44553 10.6543 4.30118 10.1469 3.98278 9.73523C3.66438 9.32351 3.19442 9.03654 2.6634 8.92956V7.20415H7.06378C7.6778 7.2035 8.26648 6.97502 8.70066 6.56884C9.13484 6.16266 9.37907 5.61196 9.37977 5.03753V4.0439C9.9036 3.91008 10.356 3.59973 10.6499 3.17258C10.9438 2.74544 11.0585 2.23169 10.9718 1.73022C10.8851 1.22875 10.6032 0.774994 10.1803 0.456296C9.75747 0.137598 9.22356 -0.0235217 8.68134 0.00394878C8.13912 0.0314193 7.62693 0.245538 7.24334 0.605093C6.85975 0.964648 6.63188 1.44423 6.60358 1.95153C6.57529 2.45882 6.74856 2.95799 7.09007 3.35294C7.43157 3.74789 7.91716 4.01072 8.45337 4.09083V5.03753C8.45295 5.38219 8.30641 5.71261 8.04591 5.95632C7.7854 6.20002 7.43219 6.33711 7.06378 6.3375H2.6634V4.07044C3.19442 3.96346 3.66438 3.67649 3.98278 3.26477C4.30118 2.85306 4.44553 2.34571 4.38803 1.8404C4.33052 1.33509 4.07524 0.867538 3.67132 0.527761C3.2674 0.187984 2.7434 0 2.2002 0C1.657 0 1.13299 0.187984 0.729075 0.527761C0.325154 0.867538 0.0698696 1.33509 0.0123674 1.8404C-0.0451348 2.34571 0.0992105 2.85306 0.417614 3.26477C0.736018 3.67649 1.20597 3.96346 1.737 4.07044V4.07044ZM7.52698 2.05844C7.52698 1.82275 7.60168 1.59236 7.74165 1.3964C7.88162 1.20044 8.08056 1.0477 8.31331 0.957509C8.54607 0.867316 8.80219 0.843718 9.04928 0.889697C9.29637 0.935677 9.52334 1.04917 9.70148 1.21582C9.87963 1.38248 10.0009 1.59481 10.0501 1.82596C10.0992 2.05712 10.074 2.29672 9.97761 2.51446C9.8812 2.7322 9.71793 2.91831 9.50846 3.04925C9.29898 3.18019 9.05271 3.25008 8.80077 3.25008C8.46306 3.24973 8.13928 3.12407 7.90048 2.90067C7.66168 2.67727 7.52735 2.37437 7.52698 2.05844V2.05844ZM3.47399 10.9416C3.47399 11.1772 3.39929 11.4076 3.25932 11.6036C3.11935 11.7996 2.92041 11.9523 2.68766 12.0425C2.4549 12.1327 2.19878 12.1563 1.95169 12.1103C1.7046 12.0643 1.47763 11.9508 1.29949 11.7842C1.12134 11.6175 1.00003 11.4052 0.950877 11.174C0.901728 10.9429 0.926953 10.7033 1.02336 10.4855C1.11977 10.2678 1.28304 10.0817 1.49251 9.95075C1.70199 9.81981 1.94826 9.74992 2.2002 9.74992C2.53791 9.75027 2.86169 9.87593 3.10049 10.0993C3.33929 10.3227 3.47362 10.6256 3.47399 10.9416V10.9416ZM2.2002 0.866801C2.45213 0.866801 2.69841 0.936689 2.90788 1.06763C3.11735 1.19857 3.28062 1.38468 3.37703 1.60242C3.47344 1.82016 3.49867 2.05976 3.44952 2.29092C3.40037 2.52207 3.27905 2.7344 3.10091 2.90105C2.92276 3.06771 2.69579 3.1812 2.4487 3.22718C2.20161 3.27316 1.94549 3.24956 1.71274 3.15937C1.47998 3.06918 1.28104 2.91644 1.14107 2.72048C1.00111 2.52451 0.926402 2.29412 0.926402 2.05844C0.926777 1.7425 1.0611 1.43961 1.2999 1.21621C1.5387 0.992812 1.86248 0.867152 2.2002 0.866801V0.866801Z"
                    fill="#8F8F8E"
                  />
                </svg>

                <div className="CardWithImage__content--footer--left--item--text">
                  {props.forks}
                </div>
              </div>
            )}
            {props.showStars && (
              <div className="CardWithImage__content--footer--left--item">
                <svg
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5475 4.57767L9.35058 3.98457L7.47444 0.28611C7.4232 0.184848 7.3389 0.102875 7.23476 0.0530477C6.97359 -0.0723237 6.65621 0.0321525 6.52563 0.28611L4.64949 3.98457L0.452561 4.57767C0.336853 4.59374 0.231061 4.64679 0.150065 4.72715C0.0521452 4.82502 -0.00181317 4.95668 4.65248e-05 5.09321C0.00190622 5.22974 0.0594318 5.35996 0.159983 5.45527L3.19652 8.33399L2.47912 12.3989C2.4623 12.4935 2.47306 12.5907 2.51018 12.6796C2.54731 12.7686 2.60931 12.8456 2.68916 12.902C2.76901 12.9584 2.86352 12.9919 2.96196 12.9987C3.0604 13.0055 3.15883 12.9854 3.24611 12.9406L7.00003 11.0214L10.754 12.9406C10.8564 12.9936 10.9755 13.0113 11.0895 12.992C11.3771 12.9438 11.5705 12.6786 11.5209 12.3989L10.8036 8.33399L13.8401 5.45527C13.9227 5.37651 13.9773 5.27364 13.9938 5.16113C14.0384 4.87985 13.8368 4.61946 13.5475 4.57767ZM9.52579 7.92894L10.1225 11.3092L7.00003 9.71468L3.87755 11.3108L4.47427 7.93055L1.94851 5.53564L5.43962 5.04219L7.00003 1.96737L8.56045 5.04219L12.0516 5.53564L9.52579 7.92894Z"
                    fill="#8F8F8E"
                  />
                </svg>

                <div className="CardWithImage__content--footer--left--item--text">
                  {props.stars}
                </div>
              </div>
            )}
            {props.showIssues && (
              <div className="CardWithImage__content--footer--left--item">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 0C4.77609 0 3.12279 0.684819 1.90381 1.90381C0.684819 3.12279 0 4.77609 0 6.5C0 8.22391 0.684819 9.87721 1.90381 11.0962C3.12279 12.3152 4.77609 13 6.5 13C8.22391 13 9.87721 12.3152 11.0962 11.0962C12.3152 9.87721 13 8.22391 13 6.5C13 4.77609 12.3152 3.12279 11.0962 1.90381C9.87721 0.684819 8.22391 0 6.5 0V0ZM6.5 12C5.04131 12 3.64236 11.4205 2.61091 10.3891C1.57946 9.35764 1 7.95869 1 6.5C1 5.04131 1.57946 3.64236 2.61091 2.61091C3.64236 1.57946 5.04131 1 6.5 1C7.95869 1 9.35764 1.57946 10.3891 2.61091C11.4205 3.64236 12 5.04131 12 6.5C12 7.95869 11.4205 9.35764 10.3891 10.3891C9.35764 11.4205 7.95869 12 6.5 12V12Z"
                    fill="#8F8F8E"
                  />
                  <path
                    d="M6.5 7.5C7.05228 7.5 7.5 7.05228 7.5 6.5C7.5 5.94772 7.05228 5.5 6.5 5.5C5.94772 5.5 5.5 5.94772 5.5 6.5C5.5 7.05228 5.94772 7.5 6.5 7.5Z"
                    fill="#8F8F8E"
                  />
                </svg>

                <div className="CardWithImage__content--footer--left--item--text">
                  {props.issues}
                </div>
              </div>
            )}
            {props.showLicense && (
              <div className="CardWithImage__content--footer--left--item">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.92352 0.4875C6.92352 0.358207 6.87885 0.234209 6.79934 0.142785C6.71983 0.0513614 6.61199 0 6.49955 0C6.3871 0 6.27926 0.0513614 6.19975 0.142785C6.12024 0.234209 6.07557 0.358207 6.07557 0.4875V1.625H4.95967C4.76108 1.6249 4.56706 1.69352 4.40286 1.82195L3.44467 2.57205C3.42115 2.59037 3.39337 2.60011 3.36497 2.6H1.04611C0.933666 2.6 0.825826 2.65136 0.746316 2.74279C0.666805 2.83421 0.622137 2.95821 0.622137 3.0875C0.622137 3.21679 0.666805 3.34079 0.746316 3.43221C0.825826 3.52364 0.933666 3.575 1.04611 3.575H1.93759L0.0342258 8.567C-0.00172656 8.66442 -0.00959792 8.77251 0.0117653 8.87545C0.0331285 8.97838 0.082603 9.07075 0.152939 9.139C0.198162 9.1806 0.243952 9.22025 0.327616 9.28265C0.432761 9.3613 0.583131 9.46335 0.775333 9.5641C1.15974 9.76625 1.71486 9.9671 2.40113 9.9671C2.96192 9.96833 3.51639 9.8309 4.02693 9.5641C4.21913 9.46335 4.3695 9.3613 4.47465 9.28265C4.55944 9.2196 4.60467 9.17995 4.64989 9.1377C4.72079 9.07021 4.77066 8.97803 4.79198 8.87507C4.81329 8.77212 4.80489 8.66398 4.76804 8.567L2.86411 3.575H3.36497C3.56339 3.575 3.75728 3.5061 3.92122 3.37805L4.87997 2.62795C4.90333 2.60976 4.93089 2.60002 4.95911 2.6H6.07557V12.025H3.53908C3.42663 12.025 3.31879 12.0764 3.23928 12.1678C3.15977 12.2592 3.1151 12.3832 3.1151 12.5125C3.1151 12.6418 3.15977 12.7658 3.23928 12.8572C3.31879 12.9486 3.42663 13 3.53908 13H9.46002C9.57246 13 9.6803 12.9486 9.75981 12.8572C9.83932 12.7658 9.88399 12.6418 9.88399 12.5125C9.88399 12.3832 9.83932 12.2592 9.75981 12.1678C9.6803 12.0764 9.57246 12.025 9.46002 12.025H6.92352V2.6H8.03942C8.06769 2.6 8.09595 2.60975 8.11856 2.62795L9.07788 3.37805C9.24181 3.5061 9.43571 3.575 9.63413 3.575H10.135L8.23106 8.567C8.19299 8.66682 8.18511 8.77842 8.20868 8.88399C8.23225 8.98956 8.2859 9.08301 8.36108 9.1494C8.36786 9.15525 8.36108 9.1494 8.36221 9.1494C8.41828 9.19796 8.47679 9.24267 8.53745 9.2833C8.64203 9.3561 8.79183 9.4497 8.98404 9.5433C9.49519 9.78897 10.044 9.91451 10.598 9.9125C11.1522 9.91439 11.7012 9.78863 12.2125 9.54265C12.4035 9.4497 12.5539 9.3561 12.659 9.2833C12.7195 9.24227 12.778 9.19758 12.8343 9.1494C12.9095 9.08301 12.9631 8.98956 12.9867 8.88399C13.0103 8.77842 13.0024 8.66682 12.9643 8.567L11.0615 3.575H11.9536C12.066 3.575 12.1738 3.52364 12.2533 3.43221C12.3329 3.34079 12.3775 3.21679 12.3775 3.0875C12.3775 2.95821 12.3329 2.83421 12.2533 2.74279C12.1738 2.65136 12.066 2.6 11.9536 2.6H9.6347C9.60648 2.59998 9.57892 2.59024 9.55555 2.57205L8.59624 1.82195C8.43219 1.69365 8.23839 1.62503 8.03999 1.625H6.92352V0.4875ZM0.955663 8.5787C1.40061 8.85094 1.89711 8.99272 2.40113 8.99145C2.90515 8.99272 3.40165 8.85094 3.8466 8.5787L2.40113 4.7892L0.955663 8.5787ZM9.15815 8.5631C9.2045 8.5891 9.25651 8.61705 9.31361 8.645C9.61321 8.78995 10.0513 8.9375 10.598 8.9375C11.0963 8.93912 11.5885 8.81113 12.0378 8.5631L10.598 4.78855L9.15815 8.5631Z"
                    fill="#8F8F8E"
                  />
                </svg>

                <div className="CardWithImage__content--footer--left--item--text">
                  {props.license === null
                    ? "None"
                    : typeof props.license === "string"
                    ? props.license
                    : props.license?.name || "None"}
                </div>
              </div>
            )}
          </div>
          <div className="CardWithImage__content--footer--right">
            {props.language && (
              <img
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${props.language?.toLocaleLowerCase()}/${props.language?.toLocaleLowerCase()}-original.svg`}
                alt={props.language}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
