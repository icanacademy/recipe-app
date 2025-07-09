# 🚀 Quick Start Guide

## TL;DR - Just want to run it?

```bash
# 1. Install dependencies
npm run setup

# 2. Start both servers (requires concurrently package)
npm install concurrently --save-dev
npm run dev:both
```

Then open: **http://localhost:3005** 

---

## Manual Setup (if above doesn't work)

### Terminal 1 - Backend:
```bash
npm start
```

### Terminal 2 - Frontend:
```bash
cd client
PORT=3005 npm start
```

---

## Ports Used:
- **Backend API**: http://localhost:3002
- **Frontend**: http://localhost:3005

## Troubleshooting:
- Port conflicts? Kill processes: `lsof -ti:3002 | xargs kill -9`
- Database issues? Delete: `rm recipes.db` and restart
- Dependencies broken? Run: `npm run fresh-install`

## Sample Data:
Database auto-creates with Korean & Filipino recipes on first run.

**You're ready to cook! 🍳**