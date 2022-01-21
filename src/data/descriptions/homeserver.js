const str = `
Docker config for my home server.

The primary use for the server is as a NAS with a public share. The data is made accessable on my local network with samba or from outside my network with [filebrowser](https://hub.docker.com/r/hurlenko/filebrowser). Anything in the /\`public\` folder is served over https.

FileBrowser also allows me to share any file in the NAS, optionally with an expiring link or a password.

Since I don't have a static IP at home, I use [cloudflare-ddns](https://hub.docker.com/r/joshava/cloudflare-ddns) to keep the DNS records pointed at my house up to date.


## Summary of Services:

 - [nginx](https://hub.docker.com/_/nginx): nginx reverse proxy 
   - Routes to filebrowser / plausible
   - Serves files in the \`/public\` directory
 - [postgres](https://hub.docker.com/_/postgres): PostgreSQL database
 - [hurlenko/filebrowser](https://hub.docker.com/r/hurlenko/filebrowser): Web based file manager
   - Remote access to files at home.matthewmeade.ca/filebrowser
   - Ability to share any file publically with custom rules per shared file
 - [dperson/samba](https://hub.docker.com/r/dperson/samba): samba server
   - Provides access to files to LAN devices
 - [joshava/cloudflare-ddns](https://hub.docker.com/r/joshava/cloudflare-ddns): Dynamic DNS 
   - Updates my cloudflare records when my home ip changes
 - [jlesage/handbrake](https://hub.docker.com/r/jlesage/handbrake): Video Encoding
   - Automatically encodes any video placed in a watched directory and outputs them at a smaller size
   - Used for my screen recordings that don't require a high resolution
 - [plausible/analytics](https://hub.docker.com/r/plausible/analytics): Analytics Dashboard
   - Tracks analytics data for my web projects
`;

export default str;
