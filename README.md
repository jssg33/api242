THESE ARE THE BASE APIS ASSUMING THAT THE PROJECT WILL BE A LICENSE MANAGER.

THIS API WILL PROCESS THE FOLLOWING:
a) Startup Logs from Shareware In the Internet Universe.
b) Manage License Checks for Validation (Assuming App will handle exceptions)
c) Allow Direct Logins to the Console to see existing Licenses, the Last IP address they accessed the site from, and Expirations.
d) Give the User the right to upgrade the Licenses to different types... perhaps with manual queues from an Analyst?
e) Give the User the right to buy a new License.
f) Log Changes to Licenses.
g) Provide Security Logs for Shareware Apps.....

Target is similar function as cPanel has with their Licensing Server which is one instance per IP.
However FusionShell has Grid Options so HA Licenses will be more expensive.
3CX has a License Server as well that works very well and is impressive.

If we met the 3CX, and cPanel standard for License Servers we will be competitive... and they have raised VC money... so its a baseline.
We dont know quite how long this will take.....

Need to decide how to mirror EF Core Modeling in Visual Studio into some type of directory structure... will update when we do.

Phases -> Rapid Development Phase will provide massive numbers of changes usually.... and show the missing fields we have to model usually.
Once the base App is workable we will move to a change control model and version controls.

The first 4 APIS are working:
1)Users
2)Licenses
3)LicenseLogs
4)DownloadLogs
