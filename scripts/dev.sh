#!/bin/bash
concurrently "cd frontend && npm start" "cd backend && npm run dev"
