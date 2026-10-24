# MAIN NOTES
tar -czf - ./dist | ssh root@159.65.232.189 "mkdir -p /webapps/yamassi/dist && tar -xzf - -C /webapps/yamassi && find /webapps/yamassi/dist/assets -type f -mtime +1 -delete"
#
nginx -t && systemctl reload nginx

# IA NOTES
