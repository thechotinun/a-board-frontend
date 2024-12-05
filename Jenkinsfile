pipeline {
    agent any


    environment {
        APP_ID = credentials('app_id')
        NEXTAUTH_URL = credentials('nextauth_url')
        NEXTAUTH_SECRET = credentials('nextauth_secret')
    }

    stages {
        stage('Build and run containers') {
            steps {
                echo "Stopping and removing containers"
                sh 'docker-compose down --rmi all'
                
                echo "Building and running containers"
                sh '''
                    docker-compose build \
                        --build-arg APP_ID=${APP_ID} \
                        --build-arg NEXTAUTH_URL=${NEXTAUTH_URL} \
                        --build-arg NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
                    docker-compose up -d
                '''
            }
        }
    }
}