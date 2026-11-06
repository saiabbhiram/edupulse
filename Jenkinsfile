
pipeline {
    agent any

    stages {

        stage('Check Tools') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci --include=dev'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'sudo mkdir -p /var/www/edupulse'
                sh 'sudo rm -rf /var/www/edupulse/*'
                sh 'sudo cp -r dist/. /var/www/edupulse/'
                sh 'sudo chown -R www-data:www-data /var/www/edupulse'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Your site is live on the server.'
        }

        failure {
            echo 'FAILED: Check the Jenkins console output.'
        }
    }
}
