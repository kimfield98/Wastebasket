import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface Routes {
  [key: string]: boolean;
}
const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
  '/github/start': true,
  '/github/complete': true,
};
export async function middleware(request: NextRequest) {
  // 헤더 확인 후 쿠키를 가져옴
  const cookie = await getSession();
  // 요청 URL이 공개 페이지인지 확인
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  // 쿠키가 없는 경우 (로그인되지 않은 상태)
  if (!cookie.id) {
    // 공개 페이지가 아닌 경우 홈페이지로 리다이렉션
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // 쿠키가 있는 경우 (로그인된 상태)
  } else {
    // 공개 페이지인 경우 제품 페이지로 리다이렉션
    if (exists) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }
}

export const config = {
  // 정적 파일과 favicon.ico를 제외한 모든 URL을 대상으로 함
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
