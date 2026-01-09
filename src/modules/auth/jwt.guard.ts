import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  // handleRequest(err, user, info) {
  //   console.log('JWT error:', err);
  //   console.log('JWT user:', user);
  //   console.log('JWT info:', info);
  //   return user;
  // } 


// To Debug 
}
