// Initialization
import express from 'express';

// Model
import { Roles } from '@models';

// Types
import { IRoleDoc } from '@models/role/types';

// Others
import { map as rolesMap } from '@setup/roles';

const router = express.Router();

router.post('/add', (req, res) => {
  const docs: IRoleDoc[] = [];
  const pushedStatus: boolean[] = [];
  rolesMap.forEach((role) => {
    Roles.createDoc(role)
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
      message: 'Successfully Posted all the Roles Details to Database',
      docs,
    });
  }
});

router.post('/status', (req, res) => {
  Roles.find({})
    .then((roles) => {
      const totalRoles = rolesMap.length;
      const ids = {
        map: rolesMap.map((role) => role._id),
        toCompare: roles.map((role) => role._id),
      };
      const presentStatus: boolean[] = [];
      ids.map.forEach((role) => {
        presentStatus.push(ids.toCompare.includes(role));
      });
      const truthy = presentStatus.filter((status) => status).length;
      if (truthy === totalRoles) {
        res.status(200).json({
          status: 200,
          success: true,
          present: true,
          totalRoles,
        });
      } else {
        res.status(200).json({
          status: 200,
          success: true,
          present: false,
          totalRoles,
          remainingRoles: totalRoles - truthy,
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
  Roles.clearAll()
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
