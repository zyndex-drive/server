import { step } from 'mocha-steps';
import pingTestServer from '../test-helpers/ping-test-server';

describe('Ping the Test Server', () => {
  step('Pings the Server and Gets the Status of the Server', pingTestServer);
});
