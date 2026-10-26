# Xsocium Password Generator & QR Utility

A small, privacy-first browser utility. Vanilla HTML, CSS, and JavaScript; no backend, accounts, cookies, analytics, APIs or database.

## Features
- Length 6–64 and Weak / Medium / Strong options, equivalent to the provided Python `passgen.py` rules.
- Cryptographically secure Web Crypto random values, unbiased character selection and Fisher–Yates shuffle.
- Mask/reveal/copy password; opt-in QR creation and PNG download.
- German default, English toggle, responsive design and keyboard-accessible controls.
- Strict `connect-src 'none'` content security policy and exclusively local assets.

### QR security
QR codes include **the password in plain text**. Reveal/download one only if you know how it will be shared and stored. Passwords and QR images are generated in memory; this application never uploads, stores or logs them. Clipboard contents are controlled by the user's browser/OS and may be retained by clipboard managers. Do not share screenshots.

### Usage
Open `index.html` in a modern browser. For local HTTPS-equivalent development, serve the directory:

```sh
python -m http.server 8000
```

Visit http://localhost:8000. `navigator.clipboard` requires a secure context (localhost or HTTPS).

### Tests
```sh
node --test tests/password.test.cjs
```

### Deploy to Cloudflare Pages
1. Create repository `xsocium-passgen` in the `Xsocium` GitHub account.
2. Upload these files to the repository's `main` branch.
3. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git. Select this repository.
4. Framework preset: **None**; Build command: **empty**; Build output directory: **/** or `.`; production branch: `main`.
5. Deploy; optionally add a custom domain later.

Cloudflare's `_headers` file configures the HTTP security headers on Pages. No Workers Functions or other resources are required.

## Branding
Public branding: **Powered by Xsocium**. No ownership links or other brand credits in the public interface.
Palette: deliberately conservative navy/teal. Exact reference palette values were not independently verified. Update the CSS custom properties in `css/style.css` if approved brand colors become available.

## Third-party license
The locally bundled QR generator is based on Kazuhiko Arase's MIT-licensed QRCode for JavaScript, via `qrcode-terminal`. Its license and attributions are preserved in `vendor/QR-LICENSE.txt`.

## Live application

https://xsocium-passgen.pages.dev
