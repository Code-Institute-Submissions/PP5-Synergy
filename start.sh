set -o errexit
cd backend/
gunicorn backend.wsgi