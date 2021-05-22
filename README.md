# express-boilerplate


해커톤이나 가볍게 사이드 프로젝트를 할 때 빠르게 시작하기 위해서 작성하였습니다.

---

## 구조 설명


bin : run web server

config: 환경 변수 및 설정 파일

controllers: 입력을 받고 결과를 돌려주는 계층

middlewares: 요청이 들어오고 응답을 할 때까지 **등록한 순서대로** 실행하는 코드

models: database에서 테이블과 매핑되는 객체

public: 정적인 파일들이 있는 디렉토리

routes: 해당 url에 맞는 컨트롤러 계층으로 연결

service: 비지니스 로직이 있는 계층

utils: 미들웨어 보다 사용되는 빈도수가 적은 모듈

repository: database를 사용하는 코드

---

## Todo
- [x] database 연결 모듈
- [ ] https 서버 모듈 추가
- [x] Exception 미들웨어
- [x] request Validation 미들웨어
- [x] Https 확인 미들웨어
- [x] promise 생성 유틸
- [ ] Log 유틸
- [x] Controller 레이어 템플릿
- [x] Service 레이어 템플릿
- [x] Repository 레이어 템플릿(database query)
- [ ] 테스트 환경 설정(git-hook, jest)
- [ ] ci를 위한 설정 파일(circle-ci)
- [x] migration 설정
