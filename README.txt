CHRISTIAN NUWAGABA PORTFOLIO — DEPLOYMENT NOTES

FILES TO UPLOAD TO NETLIFY / GITHUB
- index.html
- css.css
- JavaScript.js
- cv.html
- robots.txt
- sitemap.xml
- _headers
- profile.jpg (your real profile photo)

GOOGLE SEARCH CONSOLE
1. Deploy the site first.
2. Add https://nuwagaba.netlify.app/ as a URL-prefix property in Google Search Console.
3. Choose HTML tag verification.
4. Copy the complete <meta name="google-site-verification" ...> tag Google gives you.
5. Paste it in index.html under the GOOGLE SEARCH CONSOLE comment inside <head>.
6. Redeploy.
7. Click Verify in Search Console.
8. Submit this sitemap URL:
   https://nuwagaba.netlify.app/sitemap.xml
9. Use URL Inspection for the homepage and click Request Indexing.

IMPORTANT
- Keep the deployed filename as index.html so Netlify serves it at the root URL.
- Add profile.jpg beside index.html. If it is missing, the site automatically shows a CN fallback graphic.
- cv.html has a Print / Save as PDF button, so it can be used as a browser-printable CV.
