# Setup Instructions for TaskFlow Real-Time To-Do List

## Quick Start Guide

### 1. Firebase Setup (Required for Real-Time Sync)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project called "TaskFlow" (or any name)
3. In the left sidebar, click **Realtime Database**
4. Click **Create Database**
5. Start in **Test Mode** (for development)
6. Choose a location close to you
7. Once created, go to **Project Settings** (gear icon)
8. Under **Your apps**, select **</> Web** to create a web app
9. Copy your Firebase configuration

### 2. Add Firebase Config to Your App

1. Open `src/firebase.ts` in the project
2. Replace the Firebase config with your own:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
};
```

### 3. Start the Development Server

```bash
npm run dev
```

Visit **http://localhost:5173** in your browser. The app should now work with real-time sync!

## Firebase Database Security Rules (Important!)

For test mode, your database is open. For production, update your security rules:

Go to **Realtime Database** → **Rules** tab and use:

```json
{
  "rules": {
    "todos": {
      ".read": true,
      ".write": true,
      "$uid": {
        ".validate": "newData.val() == auth.uid"
      }
    }
  }
}
```

## Project Features

✅ **Real-Time Sync** - Tasks update instantly across all devices
📱 **Mobile Responsive** - Works on phone, tablet, desktop
🎨 **Modern UI** - Tailwind CSS with beautiful gradient logo
✅ **Task Management** - Add, complete, delete tasks
📊 **Statistics** - See pending vs completed task count

## File Structure

```
src/
├── components/
│   ├── Logo.tsx              # TaskFlow branding with gradient
│   ├── AddTodo.tsx           # Input form for new tasks
│   ├── TodoItem.tsx          # Individual task with checkbox
│   ├── TodoList.tsx          # List container with real-time sync
├── firebase.ts              # Firebase config & initialization
├── App.tsx                  # Main component
├── index.css                # Tailwind styles
└── main.tsx                 # React entry point
```

## Build & Deploy

### Build for Production
```bash
npm run build
```
Output in `dist/` folder

### Preview Build
```bash
npm run preview
```

### Deploy to Netlify/Vercel
1. Connect your GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## Customization

### Change Logo Colors
Edit `src/components/Logo.tsx` - change the gradient colors in the component

### Change Task Limit
Edit `tailwind.config.js` for responsive breakpoints

### Add Due Dates
Extend the todo object in Firebase to include `dueDate: timestamp`

## Troubleshooting

**Error: "Cannot parse Firebase url"**
- Firebase config not set or incorrect databaseURL

**Tasks not saving?**
- Check Firebase Realtime Database rules
- Ensure you have read/write permissions

**Build fails?**
- Run `npm install` again
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## Next Steps

- Add user authentication (login/signup)
- Add task due dates and reminders
- Add task categories and filtering
- Deploy to production
- Add PWA support for offline use

Happy task managing! 🚀
