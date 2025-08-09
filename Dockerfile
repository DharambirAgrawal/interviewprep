# # Base Python image
# FROM python:3.10-slim

# # Install Node.js and npm
# RUN apt-get update && \
#     apt-get install -y curl && \
#     curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
#     apt-get install -y nodejs && \
#     apt-get clean

# # Install Supervisor to run both processes
# RUN apt-get install -y supervisor

# # Create working directory
# WORKDIR /app

# # Copy both apps
# COPY flask-backend /app/flask-backend
# COPY express-server /app/express-server

# # Install Python dependencies
# RUN pip install -r /app/flask-backend/requirements.txt

# # Install Node dependencies
# RUN cd /app/express-server && npm install

# # Copy supervisor config
# COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# # Expose both ports
# EXPOSE 5000 3000

# # Start both servers
# CMD ["/usr/bin/supervisord"]
