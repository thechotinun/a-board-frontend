pipeline {
    agent any

    environment {
        NEXTAUTH_URL = credentials('NEXTAUTH_URL')
        NEXTAUTH_SECRET = credentials('NEXTAUTH_SECRET')
        NEXT_PUBLIC_API_URL = credentials('NEXT_PUBLIC_API_URL')
        NEXT_PUBLIC_SOCKET_URL = credentials('NEXT_PUBLIC_SOCKET_URL2')
    }

    stages {
        stage('Build and run containers') {
            steps {
                echo "Stopping and removing containers"
                sh 'docker-compose down --rmi all'
                
                echo "Building and running containers"
                sh '''
                    docker-compose build \
                        --build-arg NEXTAUTH_URL=${NEXTAUTH_URL} \
                        --build-arg NEXTAUTH_SECRET=${NEXTAUTH_SECRET} \
                        --build-arg NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
                        --build-arg NEXT_PUBLIC_SOCKET_URL=${NEXT_PUBLIC_SOCKET_URL}
                    docker-compose up -d
                '''
            }
        }
    }
}