// Initialization
import express from 'express';

// Model
import { Policies } from '@models';

// Types
import { IPolicyDoc } from '@models/policy/types';

// Others
import { map as policyMap } from '@setup/policies';

const router = express.Router();

router.post('/create', (req, res) => {
  const docs: IPolicyDoc[] = [];
  const pushedStatus: boolean[] = [];
  policyMap.forEach((policy) => {
    Policies.createPolicy(policy)
      .then((doc) => {
        docs.push(doc);
        pushedStatus.push(true);
      })
      .catch((err) => {
        console.log(err);
        pushedStatus.push(false);
      });
  });
  if (pushedStatus.includes(false)) {
    res.status(500).json({
      success: false,
      message:
        'Some Internal Error Occured, Not all Records have been Added to Database',
      docs,
    });
  } else {
    res.status(200).json({
      success: true,
      status: 200,
      message: 'Successfully Posted all the Policy Details to Database',
      docs,
    });
  }
});

router.post('/status', (req, res) => {
  Policies.find({})
    .then((policies) => {
      const totalPolicies = policyMap.length;
      const ids = {
        map: policyMap.map((policy) => policy._id),
        toCompare: policies.map((policy) => policy._id),
      };
      const presentStatus: boolean[] = [];
      ids.map.forEach((policy) => {
        presentStatus.push(ids.toCompare.includes(policy));
      });
      const truthy = presentStatus.filter((status) => status).length;
      if (truthy === totalPolicies) {
        res.status(200).json({
          status: 200,
          success: true,
          present: true,
          totalPolicies,
        });
      } else {
        res.status(200).json({
          status: 200,
          success: true,
          present: false,
          totalPolicies,
          remainingPolicies: totalPolicies - truthy,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        success: false,
        message: 'Error Occured while Getting Policies data from Database',
        error,
      });
    });
});

router.post('/reset', (req, res) => {
  Policies.clearCollection()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error,
      });
    });
});

export default router;
