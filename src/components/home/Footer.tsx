import LanguageIcon from '@mui/icons-material/Language';

const Footer = () => {
  return (
    <footer className="w-full h-full flex flex-col items-center bg-gray-100 border-t border-gray-300">
      <div className="w-2/3 flex flex-col justify-center items-center py-7">
        <div className="flex w-full justify-between">
          <p>© 2025 Wafflebnb.</p>
          <div className="flex gap-5 items-center">
            <div className="flex items-center gap-1">
              <LanguageIcon className="w-4 h-4" />
              <p>한국어(KR)</p>
            </div>
            <p>&#8361; KRW</p>
            <a
              href="https://github.com/wafflestudio/22-5-team6-web"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <svg
                height="24"
                aria-hidden="true"
                viewBox="0 0 24 24"
                version="1.1"
                width="24"
                data-view-component="true"
                className="octicon octicon-mark-github v-align-middle"
              >
                <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/wafflestudio_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="512"
                height="512"
                x="0"
                y="0"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                className="w-6 h-6"
              >
                <g>
                  <path
                    d="M301 256c0 24.852-20.148 45-45 45s-45-20.148-45-45 20.148-45 45-45 45 20.148 45 45zm0 0"
                    fill="#000000"
                    opacity="1"
                    data-original="#000000"
                    className=""
                  ></path>
                  <path
                    d="M332 120H180c-33.086 0-60 26.914-60 60v152c0 33.086 26.914 60 60 60h152c33.086 0 60-26.914 60-60V180c0-33.086-26.914-60-60-60zm-76 211c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75zm86-146c-8.285 0-15-6.715-15-15s6.715-15 15-15 15 6.715 15 15-6.715 15-15 15zm0 0"
                    fill="#000000"
                    opacity="1"
                    data-original="#000000"
                    className=""
                  ></path>
                  <path
                    d="M377 0H135C60.562 0 0 60.563 0 135v242c0 74.438 60.563 135 135 135h242c74.438 0 135-60.563 135-135V135C512 60.562 451.437 0 377 0zm45 332c0 49.625-40.375 90-90 90H180c-49.625 0-90-40.375-90-90V180c0-49.625 40.375-90 90-90h152c49.625 0 90 40.375 90 90zm0 0"
                    fill="#000000"
                    opacity="1"
                    data-original="#000000"
                    className=""
                  ></path>
                </g>
              </svg>
            </a>
          </div>
        </div>
        <hr className="w-full my-2 border-t border-gray-300" />
        <p className="text-xs text-gray-600">
          웹사이트 제공자: Waffle Studio 22.5 Rookies toy project Team 6,
          웹사이트: https://d2gjarpl85ijp5.cloudfront.net | 호스팅 서비스
          제공업체: 아마존 웹서비스 | 와플비앤비는 와플 스튜디오 루키
          토이프로젝트에서 에어비앤비 플랫폼을 클론한 사이트이며, 실제 서비스를
          제공하는 사이트가 아닙니다. 와플비앤비를 통하여 예약된 숙소, 체험,
          호스트 서비스에 관한 의무와 책임은 해당 서비스를 제공하는 호스트에게
          있습니다.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
