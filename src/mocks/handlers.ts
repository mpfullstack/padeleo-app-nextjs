import { ResponseData } from '@/modules/common/model';
import { SignInPayload } from '@/modules/user-access/model';
import { User } from '@/modules/users/model';
import { rest, PathParams } from 'msw';

export const handlers = [
  rest.post<SignInPayload, PathParams, ResponseData<User>>(
    'http://localhost/api/auth/signin',
    async (req, res, ctx) => {
      const { nickname, password } = await req.json();

      if (nickname === 'Nickname' && password === 'Password') {
        return res(
          ctx.json({
            success: true,
            result: {
              id: '9kspa03420l29lkmn',
              firstname: 'Marc',
              lastname: 'Perez',
              nickname: nickname,
              email: 'marcperez@gmail.com',
            },
          })
        );
      }

      ctx.status(400);

      return res(
        ctx.json({
          success: false,
          error: '',
        })
      );
    }
  ),
  rest.get('http://localhost/api/auth', async (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        result: {},
      })
    );
  }),
];
