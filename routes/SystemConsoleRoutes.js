// routes/systemConsole.js

const express = require('express');
const router = express.Router();

// Services
const ValidationRoutines = require('../services/ValidationRoutines');
const Globals = require('../services/Globals');
const SNMPListenerService = require('../services/SNMPListenerService');
const SendTestTrap = require('../services/SendTestTrap');
const AuditBlobImport = require('../services/AuditBlobImport');
const SqlAzureSecurityAudit = require('../services/SqlAzureSecurityAudit');
const SqlAzureFieldAudit = require('../services/SqlAzureFieldAudit');
const SqlAzureTableAudit = require('../services/SqlAzureTableAudit');
const BackendWebServerPoller = require('../services/BackendWebServerPoller');

router.get('/:option/:apiusername/:apipassword/:token', async (req, res) => {

    const option = parseInt(req.params.option);
    const { apiusername, apipassword, token } = req.params;
    const value = parseInt(req.query.value || 0);

    const validation = await ValidationRoutines.validateRequest(
        apiusername,
        apipassword,
        token
    );

    if (validation) {
        return res.status(401).json(validation);
    }

    Globals.ControllerAPIName = 'ActionsController';
    Globals.ControllerAPINumber = '001';

    try {

        switch (option) {

            case 1:
                await AuditBlobImport.dumpAZSchema();
                return res.json({
                    status: 'Schema dumped.'
                });

            case 2:

                if (SNMPListenerService.isRunning()) {

                    await SNMPListenerService.stop();

                    return res.json({
                        status: 'SNMPListenerService stopped.'
                    });
                }

                await SNMPListenerService.start();

                return res.json({
                    status: 'SNMPListenerService started.'
                });

            case 3:

                await SendTestTrap.execute();

                return res.json({
                    status: 'Test SNMP trap generated.'
                });

            case 4:

                const imported =
                    await AuditBlobImport.importAuditFiles();

                return res.json({
                    status: 'Audit Blob Import Complete',
                    filesImported: imported
                });

            case 5:

                return res.json(
                    await SqlAzureSecurityAudit.showFileListIO()
                );

            case 6:

                return res.json(
                    await SqlAzureFieldAudit.runAudit()
                );

            case 7:

                return res.json(
                    await SqlAzureTableAudit.runAudit()
                );

            case 8:

                return res.json(
                    await SqlAzureSecurityAudit.runAudit()
                );

            case 9:

                return res.json(
                    await BackendWebServerPoller.pollBackendServers()
                );

            case 10:

                return res.json(
                    getRegisteredInterfaces()
                );

            default:

                return res
                    .status(400)
                    .json({ error: 'Invalid option.' });
        }

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            error: err.message
        });
    }
});

function getRegisteredInterfaces() {

    /*
      Node doesn't support reflection like .NET.
      Usually you'd manually register service metadata.
    */

    return [
        {
            interfaceName: 'IApilogService02',
            methodCount: 5,
            methods: [
                'create',
                'read',
                'update',
                'delete',
                'audit'
            ]
        }
    ];
}

module.exports = router;