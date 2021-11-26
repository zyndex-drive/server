import chai from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { LOCAL_SECRET, SECRET } = process.env;

export function getRequester(
  URL: string,
  path: string,
  callback: (err: any, res: Response) => void,
) {
  return chai
    .request(URL)
    .get(path)
    .set('x-secret-pass', SECRET)
    .set('x-local-dev-pass', LOCAL_SECRET)
    .end(callback);
}

export function postRequester(
  URL: string,
  path: string,
  data: Record<string | number, unknown>,
  callback: (err: any, res: Response) => void,
) {
  return chai
    .request(URL)
    .post(path)
    .set('x-secret-pass', SECRET)
    .set('x-local-dev-pass', LOCAL_SECRET)
    .send(data)
    .end(callback);
}
