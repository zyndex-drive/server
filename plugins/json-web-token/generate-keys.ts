import { Keys } from '@models';
import { objectID } from '@plugins/misc';
import { generateKeyPair, generateSecret, exportJWK } from 'jose';

import type { IKeyDoc } from '@models/types';

/**
 * Generates a PEM based Public and Private Keys
 *
 * @returns {Promise<IKeyDoc[]>} - Promise Resolving to Key pairs
 */
export default async function (): Promise<IKeyDoc[]> {
  const { privateKey, publicKey } = await generateKeyPair('PS256');
  const secretKey = await generateSecret('HS256');
  const [pvtKey, pubKey, sctKey] = await Promise.all([
    exportJWK(privateKey),
    exportJWK(publicKey),
    exportJWK(secretKey),
  ]);
  const [uid1, uid2, uid3] = [objectID(), objectID(), objectID()];
  const newkeys = [
    {
      _id: uid1,
      type: 'privatekey',
      key: pvtKey,
    },
    {
      _id: uid2,
      type: 'publickey',
      key: pubKey,
    },
    {
      _id: uid3,
      type: 'secretkey',
      key: sctKey,
    },
  ];
  const savedKeys = await Keys.create(newkeys);
  return savedKeys;
}
