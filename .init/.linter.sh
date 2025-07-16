#!/bin/bash
cd /home/kavia/workspace/code-generation/stock-market-dashboard-44696/stock_market_dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

