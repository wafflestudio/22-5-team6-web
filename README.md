# 22-5-team6-web

## 🏡 Intro

안녕하세요, 와플 토이프로젝트 팀 6조입니다.

**WaffleBnB**는 `Airbnb`의 클론 코딩을 주제로 진행한 프로젝트입니다 !

[프로젝트 바로가기](https://d2gjarpl85ijp5.cloudfront.net/)

## ✨ Team

🚀 **WaffleBnB 팀 6조**

- 🏡 김민수
- 🚀 박준병
- 🔑 최승민
- 🫧 인소윤
- 🖍️ 최서현
- 📍 윤시헌

## 🎯 프로젝트 목표

- 완성도 있는 Airbnb 서비스의 클론 코딩
- 기존 Airbnb 서비스의 디자인을 유지하되, 유저 친화적인 서비스 구현
- Spring boot 활용 실무형 백엔드 서비스 개발
- CI/CD 구축 및 AWS 인프라 활용
- 깃허브 컨벤션과 노션 칸반, 대면/비대면 하이브리드를 통한 협업 경험

## 🏗️ Project View

### 1. 회원 가입 창

사용자가 초기에 회원가입을 할 수 있는 페이지입니다.

소셜 로그인으로 접근 할 경우, 프로필 사진 선택부터 별명 입력, 자기소개를 입력할 수 있습니다.

- **BE API**
  - `POST /api/auth/register` : 회원 가입 API
  - 소셜 로그인 시에는 `POST /api/v1/profile` : 프로필 생성 API

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/5a6e20b5-8252-46cb-b2b8-fc9484f53d21" alt="readme1">
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/4470a168-b953-46b5-b799-db00e4bcb89b" alt="readme2">
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/724ed4ac-2d94-46a5-ad7f-6d155a31364d" alt="readme3">
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/62cf1263-dd90-4412-ad5b-fe72446172cb" alt="readme4">
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/91a9d7ed-f04d-4810-a27b-7f4b56805d6b" alt="readme5">
    </td>
  </tr>
</table>

---

### 2. 메인 페이지

조건에 맞는 숙소 검색 및 핫플레이스를 제공하는 메인 페이지입니다.

- 여행지 주소, 예약 가능 날짜, 게스트 인원에 맞춰서 검색 가능
- 필터바를 통해 아이콘에 따라 숙소 유형으로 필터링
- 정렬 모달을 통해 가격, 이름, 등록, 평점 순으로 정렬 가능
- 필터 모달을 통해 가격 범위, 시설 정보, 편의 시설, 별점으로 필터링 가능
- 숙소 카드 내 하트 버튼을 통해 위시리스트 추가 및 삭제 기능 제공
- 로그인하지 않은 유저도 메인 화면 접근과 검색 가능
- **핫플 기능**: 주어진 기간 내 예약이 가장 많은 숙소들을 큐레이팅하는 추가 기능 구현

**BE API**

- `GET /api/v1/rooms/main` : 페이지네이션이 적용된 전체 숙소 리스트 제공
- `GET /api/v1/rooms/search` : 조건에 맞는 방 검색 (가격, 주소, 평점, 예약 가능 날짜 등 필터 적용)
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e8d3f32b-791c-4374-b8db-02d34fd76132" alt="readme6"></td>
    <td><img src="https://github.com/user-attachments/assets/a3bb1d3d-2e2e-43fb-8aef-fddffe3d69a2" alt="readme7"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/8011f996-90e7-4866-9475-2271dac8e46a" alt="readme8"></td>
    <td><img src="https://github.com/user-attachments/assets/1574c950-3efe-4dae-bfa0-c05745549112" alt="readme9"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/ec8655ee-b36b-41e1-ade2-cfd203f416cd" alt="readme10"></td>
    <td><img src="https://github.com/user-attachments/assets/5412f77e-3cdb-48bd-a40a-585d6778a4b9" alt="readme11"></td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <img src="https://github.com/user-attachments/assets/e8c8a978-816d-4435-8adf-1ec2d457b1e2" alt="readme12">
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <img src="https://github.com/user-attachments/assets/881b05c9-b1b8-4a97-af73-a7a1f509ac4a" alt="readme13">
    </td>
  </tr>
</table>

---

### 3. 숙소 등록 페이지

사용자가 직접 호스팅할 숙소를 등록할 수 있는 페이지입니다.

숙소 등록을 4단계로 나눠서 진행할 수 있도록 하였습니다. 상단에 프로그레스 바를 구현하여 진행 단계를 알 수 있도록 하였습니다. 각 단계에서 넣는 정보는 다음과 같습니다

- **단계별 정보 입력**

  1. **1단계**: 숙소 타입, 숙소 주소
  2. **2단계**: 숙소 이름, 숙소 설명, 숙소 시설, 시설 정보, 숙소 이미지
  3. **3단계**: 숙소 요금, 최대 수용 인원
  4. **4단계**: 최종 검토

- **API**
  - `POST /api/v1/rooms` : 숙소 생성 API
    - 결과로 이미지 업로드를 위한 Presigned URL 리스트 리턴
    - 프론트에서는 Presigned URL을 이용해 image PUT 요청으로 이미지 업로드 진행

<table>
  <tr>
    <td><img width="1840" alt="post1" src="https://github.com/user-attachments/assets/5df6e5f6-7e05-4f4e-b72f-11d341c5b09d" /></td>
    <td><img width="1840" alt="post2" src="https://github.com/user-attachments/assets/0844e627-b7e8-40ec-8338-e40027c3b632" /></td>
  </tr>
  <tr>
    <td><img width="1840" alt="post3" src="https://github.com/user-attachments/assets/46ad0bae-ea2e-4c3c-918b-739d98eacb9e" /></td>
    <td><img width="1840" alt="post4" src="https://github.com/user-attachments/assets/a87dc884-a065-48ea-9052-2aefe2fff559" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <img width="1840" alt="post5" src="https://github.com/user-attachments/assets/1fb35801-6c1a-4a4f-8fa4-8d8c545d8807" />
    </td>
  </tr>
</table>

---

### 4. 숙소 상세페이지

- **API**
  - `GET /api/v1/rooms/{roomId}` : 메인 페이지에서 숙소 클릭 시 상세 정보 조회

숙소 상세 페이지에서는 다음의 정보를 확인할 수 있습니다:

- POST Room 시 등록한 정보
- 호스트 이름
- 리뷰 조회
- 예약 가능 여부
- 이미지 등

![readme14](https://github.com/user-attachments/assets/e2b2d06e-8ffe-48a0-89cc-72b7dad2e5e6)

#### 숙소 이미지 상세

- RoomDetails의 Response로 이미지 조회 URL 리스트 제공
- 이미지 조회는 S3 버킷과 연결된 CloudFront 도메인 주소 + key path로 구성
- 이미지 접근은 Public으로 설정

![readme15](https://github.com/user-attachments/assets/f98c70d6-1fc9-4c99-a25b-935ecd46a7d8)

#### 상세 리뷰

- **API**
  - `GET /api/v1/reviews/room/{roomId}` : 특정 방에 대한 리뷰 조회 (페이지네이션 적용, 최신 순/별점 순 정렬 가능)
- **참고**: 평균 별점 정보 반영 (별점 개수는 시간적 요인으로 하드 코딩)

<img width="944" alt="image" src="https://github.com/user-attachments/assets/eaee88e3-1a02-49cb-8e22-ab7abd70aeaf" />

#### 예약 가능 여부 확인

- **API**
  - `POST /api/v1/reservations` : 예약 생성
  - `GET /api/v1/reservations/availability/{roomId}` : 해당 월의 예약 가능 날짜 조회
- 프론트와 백엔드 모두 과거 날짜 예약 불가 설정

![readme17](https://github.com/user-attachments/assets/bff86e23-2c8a-457f-9188-086436ef7f3b)

![readme18](https://github.com/user-attachments/assets/f5fa6896-b689-455b-b256-8372f9b14c4d)

#### 예약 성공

![readme19](https://github.com/user-attachments/assets/47d5d28a-18dd-4768-8d54-850d42b098ce)

---

### 5. 프로필 페이지

사용자 닉네임, 프로필 bio, 생성한 예약, 작성한 후기, 위시리스트를 조회할 수 있습니다.

다른 유저에게 본인의 정보를 공개할지, 비공개 할지도 설정 가능.

- **API**
  - `GET /api/v1/profile` : 프로필 조회
  - `GET /api/v1/reservations/user/{userId}` : 사용자의 예약 조회
  - `GET /api/v1/reviews/user/{userId}` : 사용자가 남긴 리뷰 조회
  - `PUT /api/v1/profile` : 프로필 정보 변경 (회원 가입 시 이미지 업로드를 스킵하고, 이후 업로드 가능)

![readme20](https://github.com/user-attachments/assets/0e61b7ca-5e5f-4e99-b48b-1d8da86987b0)

#### 프로필 수정

- 프로필 수정 시 자신의 이전 여행지(예약 내역)와 작성한 후기를 공개 여부 선택 가능
- 위시리스트 공개 여부 설정 가능

![readme21](https://github.com/user-attachments/assets/f7c6c6a6-05d3-42e7-ae3c-63a13c2c79bd)

#### 다가오는 여행 - 예약 수정 및 변경

- **API**
  - `PUT /api/v1/reservations/{reservationId}` : 예약 변경 API
  - `DELETE /api/v1/reservations/{reservationId}` : 예약 취소 API
- 예약 변경 시 체크인-체크아웃 날짜와 게스트 인원 수정 가능
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/fd8e7ef7-d1de-4bf9-b179-244f0708a898" alt="readme22"></td>
    <td><img src="https://github.com/user-attachments/assets/9308fdb2-1df9-4abf-a92a-8a956e4a9dfc" alt="readme23"></td>
    <td><img src="https://github.com/user-attachments/assets/f04cecba-2649-4f65-a852-0d5e1c870dd2" alt="readme24"></td>
  </tr>
</table>

#### 사용자가 작성한 후기

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/d05982ad-b4d2-4a61-89fb-ed4b9e46ae24" alt="readme25"></td>
    <td><img src="https://github.com/user-attachments/assets/fe315a0d-be56-4f6e-bf2f-982b9d92b26e" alt="readme26"></td>
  </tr>
</table>

#### 리뷰 작성

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/65bab8b6-0727-4932-9c21-3856de12cc60" alt="readme27"></td>
    <td><img src="https://github.com/user-attachments/assets/91b14f94-1889-4eda-a830-906e590d3501" alt="readme28"></td>
  </tr>
</table>

---

## 🏗️ Tech Stack

### 💻 **Frontend**

| 기술                       | 버전      |
| -------------------------- | --------- |
| `React`                    | `18.2.0`  |
| `React Router`             | `7.1.1`   |
| `TypeScript`               | `5.7.2`   |
| `Tailwind CSS`             | `3.4.17`  |
| `Material UI`              | `6.3.1`   |
| `Emotion (React & Styled)` | `11.14.0` |
| `Prettier`                 | `3.3.3`   |
| `Vite`                     | `5.0.12`  |
| `Axios`                    | `1.7.9`   |
| `yarn`                     | `4.4.1`   |

## 🔥 프로젝트 기여

### 🫧 인소윤

- 템플릿 사용 레포 초기 설정 (절대 경로, tailwind css)
- 위시리스트 목록 페이지 구현
- 상세화면 페이지/GET 구현
  - 위시리스트 모달/POST/DELETE 구현
  - 공유하기 모달 /링크복사 구현
  - 사진 투어 구현
  - 예약 POST 구현
  - 리뷰 모달/GET 페이지네이션/정렬 구현

### 🖍️ 최서현

- FE 레포지토리 초기 설정
- 회원가입 / 로그인 / 소설 로그인 화면 UI 및 기능 구현
- 마이 페이지 화면 / 유저 별 프로필 정보 조회 및 수정 기능 구현
- 예약 조회 화면 / 유저 별 예약 조회, 수정, 삭제 기능 구현
- 리뷰 조회 화면 / 유저 별 리뷰 조회, 수정, 삭제 기능 구현
- 숙소 관리 화면 / 유저 별 등록한 숙소 조회, 수정, 삭제 기능 구현

### 📍 윤시헌

- 메인 페이지 구현
  - 검색바 및 검색 모달 구현
  - 필터바 설계 및 정렬 모달/필터 모달 구현
  - 숙소 리스팅 구현
  - 위시 리스트 구현
  - 전체 UI 디자인 담당
  - 핫플 기능 추가 구현
- 숙소 등록 페이지 구현
  - 숙소 등록 및 이미지 연결 POST 구현
  - 숙소 등록 과정 새로운 UI 디자인 구현

## 📑 API 문서

API 명세는 [Swagger](http://ec2-15-165-159-152.ap-northeast-2.compute.amazonaws.com:8080/swagger-ui/index.html#/Review%20Controller/getReviewDetails) 또는 [노션 문서](https://www.notion.so/c893040ae3c74a24a10954e7e7c365c8?pvs=21)에서 확인 가능합니다.

## 🔗 Repository

🔗 [Frontend Repository](https://github.com/wafflestudio/22-5-team6-web)
🔗 [Backend Repository](https://github.com/wafflestudio/22-5-team6-server)
