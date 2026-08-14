# InnerVoice React DOM - Connected

This version combines the main InnerVoice React/Vite project with the uploaded profile page.

Changes:
- Replaced `src/pages/profile/index.jsx` with the uploaded `src/pages/profile/profile.jsx`.
- Added `src/pages/profile/profile.css`.
- Removed the broken `./pages/identity` import/route from App.jsx.
- Added `/feed` as a protected alias for the Home feed.
- Fixed Welcome -> Browse the feed to use React Router and send the user to Login first.
- Login now returns the user to `/feed` after successful frontend login when they came from Browse the feed.
- Added dedicated responsive feed CSS for feed filters, post spacing and media.
- No MongoDB or backend is used.

Run:
npm install
npm run dev
