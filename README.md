# 프론트엔드 CI/CD 파이프라인

## 개요

[예시이미지](https://file.notion.so/f/f/83c75a39-3aba-4ba4-a792-7aefe4b07895/6912169d-ce70-41bf-b624-946d4ee984eb/Untitled.png?id=85426052-e1c3-43af-bfb0-4dea20954fc0&table=block&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&expirationTimestamp=1722038400000&signature=ZcRd8Kee9jOSTXVrXwb-0MnkmqTRTUaD0R-Pg6AY8iI&downloadName=Untitled.png)

GitHub Actions에 워크플로우를 작성해 다음과 같이 배포가 진행되도록 함

1. 저장소를 체크아웃합니다.
2. Node.js 18.x 버전을 설정합니다.
3. 프로젝트 의존성을 설치합니다.
4. Next.js 프로젝트를 빌드합니다.
5. AWS 자격 증명을 구성합니다.
6. 빌드된 파일을 S3 버킷에 동기화합니다.
7. CloudFront 캐시를 무효화합니다.

## 주요 링크

- S3 버킷 웹사이트 엔드포인트: _________
- CloudFrount 배포 도메인 이름: _________

## 주요 개념

- GitHub Actions과 CI/CD 도구: _________
- S3와 스토리지: _________
- CloudFront와 CDN: _________
- 캐시 무효화(Cache Invalidation): _________
- Repository secret과 환경변수: _________

## 팁

- 팁1: 다이어그램 작성엔 Draw.io, Lucidchart 등을 이용합니다.
- 팁2: 새로운 프로젝트 진행시, 프론트엔드팀 리더는 예시에 있는 다이어그램을 준비한 후, 전사 회의에 들어가 발표하게 됩니다. 미리 팀장이 되었다 생각하고 아키텍쳐 도식화 하는걸 연습해봅시다.
- 팁3: 캐시 무효화는 장애 대응에 중요한 개념입니다. `.github/workflows/deployment.yml` 에서 캐시 무효화가 어떤 시점에 동작하는지 보고, 추가 리서치를 통해 반드시 개념을 이해하고 넘어갑시다.
- 팁4: 상용 프로젝트에선 DNS 서비스가 필요합니다. 도메인 구입이 필요해 본 과제에선 ‘Route53’을 붙이는걸 하지 않았지만, 실무에선 다음과 같은 인프라 구성이 필요하다는걸 알아둡시다.